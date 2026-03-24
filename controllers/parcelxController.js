const axios = require("axios");
const parcelx = require("../config/parcelx");
const Warehouse = require("../models/Warehouse");
const CustomerOrder = require("../models/CustomerOrder");

/* ===============================
   CREATE WAREHOUSE
================================ */
exports.createWarehouse = async (req, res) => {
  try {
    const {
      vendorId,
      name,
      address,
      city,
      state,
      pincode,
      phone,
      contactPerson,
    } = req.body;

    if (!vendorId || !name || !address || !city || !state || !pincode || !phone) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const exists = await Warehouse.findOne({ vendorId, name });
    if (exists) {
      return res.status(409).json({ success: false, message: "Warehouse already exists" });
    }

    const parcelxPayload = {
      address_title: name,
      sender_name: contactPerson || name,
      full_address: address,
      city,
      state,
      phone,
      pincode,
    };

    const pxRes = await parcelx.post("/create_warehouse", parcelxPayload);

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX warehouse creation failed",
        parcelx: pxRes.data,
      });
    }

    const parcelxWarehouseId = pxRes.data?.data?.pick_address_id;

    if (!parcelxWarehouseId) {
      return res.status(500).json({
        success: false,
        message: "ParcelX warehouse ID not received",
      });
    }

    const warehouse = await Warehouse.create({
      vendorId,
      parcelxWarehouseId,
      name,
      address,
      city,
      state,
      pincode,
      phone,
      contactPerson,
    });

    return res.status(201).json({
      success: true,
      message: "Warehouse created successfully",
      warehouse,
    });
  } catch (error) {
    console.error("WAREHOUSE ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "Warehouse creation failed",
      error: error.response?.data || error.message,
    });
  }
};

/* ===============================
   GET VENDOR WAREHOUSES
================================ */
exports.getVendorWarehouses = async (req, res) => {
  try {
    const vendorId =
      req.vendor?._id?.toString() ||
      req.vendor?.id?.toString() ||
      req.user?._id?.toString() ||
      req.user?.id?.toString() ||
      req.query.vendorId ||
      req.body.vendorId;

    if (!vendorId) {
      return res.status(401).json({ success: false, message: "Unauthorized - vendorId not found" });
    }

    const warehouses = await Warehouse.find({ vendorId }).sort({ createdAt: -1 });

    return res.json({ success: true, count: warehouses.length, warehouses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET WAREHOUSE FOR CUSTOMER
================================ */
exports.getWarehouseForCustomer = async (req, res) => {
  try {
    const warehouse = await Warehouse.findOne({
      parcelxWarehouseId: { $exists: true, $ne: null, $ne: "" },
    })
      .sort({ createdAt: 1 })
      .lean();

    console.log(
      "🏭 Customer warehouse lookup:",
      warehouse
        ? `found _id=${warehouse._id} pickId=${warehouse.parcelxWarehouseId}`
        : "NOT FOUND"
    );

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "No warehouse configured. Please contact support.",
        warehouses: [],
      });
    }

    return res.json({ success: true, warehouses: [warehouse] });
  } catch (error) {
    console.error("getWarehouseForCustomer error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   CREATE PARCELX ORDER
================================ */
exports.createParcelxOrder = async (req, res) => {
  let order = null;

  try {
    const {
      customer,
      vendorId,
      warehouseId,
      isPublicOrder,
      orderItems,
      shipment,
      shippingAddress,
      amount,
      paymentMethod = "cod",
      couponCode,
      couponDiscount,
      subtotal,
      deliveryFee,
      platformFee,
      gst,
    } = req.body;

    /* ── 1. VALIDATION ── */
    if (!customer)
      return res.status(400).json({ success: false, message: "Customer ID is required" });
    if (!isPublicOrder && !vendorId)
      return res.status(400).json({ success: false, message: "Vendor ID is required for vendor orders" });
    if (!isPublicOrder && !warehouseId)
      return res.status(400).json({ success: false, message: "Warehouse ID is required for vendor orders" });
    if (!Array.isArray(orderItems) || orderItems.length === 0)
      return res.status(400).json({ success: false, message: "Order items are required" });
    if (!shipment?.weight || !shipment?.length || !shipment?.width || !shipment?.height)
      return res.status(400).json({ success: false, message: "Shipment dimensions are required" });
    if (!shippingAddress?.name || !shippingAddress?.phone || !shippingAddress?.address || !shippingAddress?.pincode)
      return res.status(400).json({ success: false, message: "Complete shipping address is required" });
    if (!amount)
      return res.status(400).json({ success: false, message: "Order amount is required" });

    /* ── 2. RESOLVE WAREHOUSE ── */
    let warehouse = null;
    let pickAddressId = null;

    if (!isPublicOrder) {
      warehouse = await Warehouse.findById(warehouseId);
      if (!warehouse || !warehouse.parcelxWarehouseId) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found or ParcelX pickup address not configured",
        });
      }
      pickAddressId = warehouse.parcelxWarehouseId;
    } else {
      const totalCount = await Warehouse.countDocuments();
      console.log("🔍 Total warehouses in DB:", totalCount);

      const platformWarehouse = await Warehouse.findOne({
        parcelxWarehouseId: { $exists: true, $ne: null, $ne: "" },
      })
        .sort({ createdAt: 1 })
        .lean();

      console.log("🔍 Found platform warehouse:", JSON.stringify(platformWarehouse));

      if (!platformWarehouse || !platformWarehouse.parcelxWarehouseId) {
        return res.status(500).json({
          success: false,
          message: `No warehouse found in DB (total: ${totalCount}). Please create one from Seller Panel.`,
        });
      }

      pickAddressId = platformWarehouse.parcelxWarehouseId;
      warehouse = platformWarehouse;
      console.log("✅ Platform warehouse resolved:", pickAddressId);
    }

    /* ── 3. FIX ORDER ITEMS ── */
    const fixedOrderItems = orderItems.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      qty: item.qty,
      price: item.price,
      vendorId: vendorId || null,
    }));

    /* ── 4. CREATE ORDER IN DB ── */
    order = await CustomerOrder.create({
      customer,
      vendorId: vendorId || null,
      isPublicOrder: !!isPublicOrder,
      orderItems: fixedOrderItems,
      warehouse: warehouse?._id || null,
      pick_address_id: pickAddressId,
      shipment,
      shippingAddress,
      amount,
      totalPayable: amount,
      subtotal: subtotal || amount,
      deliveryFee: deliveryFee || 0,
      platformFee: platformFee || 0,
      gst: gst || 0,
      couponCode: couponCode || null,
      couponDiscount: couponDiscount || 0,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Initiated",
      orderStatus: "Pending",
    });

    /* ── 5. BUILD PARCELX PAYLOAD ── */
    const parcelxPayload = {
      client_order_id: order._id.toString(),
      consignee_name: shippingAddress.name,
      consignee_mobile: shippingAddress.phone.toString(),
      consignee_phone: shippingAddress.phone.toString(),
      consignee_emailid: shippingAddress.email || "",
      consignee_pincode: shippingAddress.pincode.toString(),
      consignee_address1: shippingAddress.address,
      consignee_address2: "",
      address_type: "Home",
      pick_address_id: parseInt(pickAddressId),
      payment_mode: paymentMethod === "cod" ? "Cod" : "Prepaid",
      cod_amount: paymentMethod === "cod" ? amount.toString() : "0",
      order_amount: amount.toString(),
      tax_amount: "0",
      extra_charges: "0",
      courier_type: "0",
      courier_code: "",
      express_type: "surface",
      products: fixedOrderItems.map((item) => ({
        product_sku: item.productId.toString(),
        product_name: item.productName,
        product_value: item.price.toString(),
        product_quantity: item.qty.toString(),
        product_taxper: 0,
        product_hsnsac: "",
        product_category: "general",
        product_description: item.productName,
      })),
      shipment_weight: [shipment.weight.toString()],
      shipment_length: [shipment.length.toString()],
      shipment_width: [shipment.width.toString()],
      shipment_height: [shipment.height.toString()],
    };

    /* ── 6. CALL PARCELX API ── */
    const pxRes = await parcelx.post("/order/create_order", parcelxPayload);
    console.log("📦 ParcelX Response:", JSON.stringify(pxRes.data));

    if (!pxRes?.data?.status) {
      await CustomerOrder.findByIdAndDelete(order._id);
      return res.status(500).json({
        success: false,
        message: pxRes.data?.message || "ParcelX shipment creation failed",
        parcelx: pxRes.data,
        parcelxError: pxRes.data?.message || JSON.stringify(pxRes.data),
      });
    }

    /* ── 7. SAVE PARCELX RESPONSE ── */
    order.parcelx = {
      awb: pxRes.data.data?.awb_number,
      courier: pxRes.data.data?.courier_name,
      status: pxRes.data.data?.current_status,
      tracking_url: pxRes.data.data?.tracking_url,
      last_updated: new Date(),
    };
    order.parcelxOrderCreated = true;
    order.orderStatus = "Processing";
    await order.save();

    /* ── 8. SUCCESS ── */
    return res.status(201).json({
      success: true,
      message: "Order created & ParcelX shipment booked successfully",
      order,
    });
  } catch (error) {
    console.error("PARCELX ORDER ERROR:", error.response?.data || error.message);

    if (order?._id) {
      try {
        await CustomerOrder.findByIdAndDelete(order._id);
      } catch (rollbackErr) {
        console.error("Rollback failed:", rollbackErr.message);
      }
    }

    return res.status(500).json({
      success: false,
      message: "Order creation failed. Please try again.",
      error: error.response?.data || error.message,
    });
  }
};

/* ===============================
   TRACK PARCELX ORDER
================================ */
exports.trackParcelxOrder = async (req, res) => {
  try {
    const { awb } = req.params;

    if (!awb) {
      return res.status(400).json({ success: false, message: "AWB number is required" });
    }

    const pxRes = await parcelx.get(`/track_order?awb=${awb}`);

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX tracking failed",
        parcelx: pxRes.data,
      });
    }

    const currentStatus = pxRes.data.current_status;

    const order = await CustomerOrder.findOne({ "parcelx.awb": awb });

    if (order) {
      order.parcelx.status = currentStatus.status_title;
      order.parcelx.last_updated = new Date(currentStatus.event_date);

      if (currentStatus.status_title === "delivered") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date();
        order.paymentStatus = order.paymentMethod === "cod" ? "Success" : order.paymentStatus;
      }

      if (currentStatus.status_title === "cancelled") {
        order.orderStatus = "Cancelled";
        order.cancelledAt = new Date();
      }

      await order.save();
    }

    return res.json({ success: true, parcelx_tracking: pxRes.data });
  } catch (error) {
    console.error("PARCELX TRACK ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "ParcelX tracking error",
      error: error.response?.data || error.message,
    });
  }
};

/* ===============================
   GET PARCELX SHIPMENT DETAILS
================================ */
exports.getParcelxShipmentDetails = async (req, res) => {
  try {
    const { awb } = req.params;

    if (!awb) {
      return res.status(400).json({ success: false, message: "AWB number is required" });
    }

    const pxRes = await parcelx.get(`/shipments-details?awb=${awb}`);

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX shipment details failed",
        parcelx: pxRes.data,
      });
    }

    const order = await CustomerOrder.findOne({ "parcelx.awb": awb });

    if (order && pxRes.data.data?.status) {
      order.parcelx.status = pxRes.data.data.status;
      order.parcelx.last_updated = new Date();
      await order.save();
    }

    return res.json({ success: true, shipment_details: pxRes.data });
  } catch (error) {
    console.error("PARCELX SHIPMENT DETAILS ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: "ParcelX shipment details error",
      error: error.response?.data || error.message,
    });
  }
};

/* ===============================
   GET ALL ORDERS (Admin - sabhi orders)
================================ */
exports.getAllOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 25,
      status,
      paymentMethod,
      search,
      startDate,
      endDate,
    } = req.query;

    const filter = {};

    if (status && status !== "All") filter.orderStatus = status;

    if (paymentMethod && paymentMethod !== "All") {
      filter.paymentMethod = { $regex: new RegExp(paymentMethod, "i") };
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { "shippingAddress.name": { $regex: search, $options: "i" } },
        { "shippingAddress.phone": { $regex: search, $options: "i" } },
        { "shippingAddress.email": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      CustomerOrder.find(filter)
        .populate("customer", "name email phone")
        .populate("warehouse", "name city state")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      CustomerOrder.countDocuments(filter),
    ]);

    /* ── Stats aggregation ── */
    const statsAgg = await CustomerOrder.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    const stats = {};
    let totalRevenue = 0;
    statsAgg.forEach((s) => {
      stats[s._id] = { count: s.count, revenue: s.revenue };
      if (s._id !== "Cancelled") totalRevenue += s.revenue;
    });

    return res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      stats,
      totalRevenue,
      orders,
    });
  } catch (error) {
    console.error("GET ALL ORDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET PARCELX ORDERS (Admin - sirf parcelx wale)
================================ */
exports.getParcelxOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      paymentMethod,
      search,
      startDate,
      endDate,
    } = req.query;

    /* ── Build filter ── */
    const filter = { parcelxOrderCreated: true };

    if (status && status !== "All") filter.orderStatus = status;

    if (paymentMethod && paymentMethod !== "All") {
      filter.paymentMethod = { $regex: new RegExp(paymentMethod, "i") };
    }

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }

    if (search) {
      filter.$or = [
        { "shippingAddress.name":  { $regex: search, $options: "i" } },
        { "shippingAddress.phone": { $regex: search, $options: "i" } },
        { "parcelx.awb":           { $regex: search, $options: "i" } },
        { "parcelx.courier":       { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      CustomerOrder.find(filter)
        .populate("customer", "name email phone")
        .populate("warehouse", "name city state")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      CustomerOrder.countDocuments(filter),
    ]);

    /* ── Stats aggregation (sirf parcelx orders ki) ── */
    const statsAgg = await CustomerOrder.aggregate([
      { $match: { parcelxOrderCreated: true } },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    const stats = {};
    let totalRevenue = 0;
    statsAgg.forEach((s) => {
      stats[s._id] = { count: s.count, revenue: s.revenue };
      if (s._id !== "Cancelled") totalRevenue += s.revenue;
    });

    return res.json({
      success: true,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      stats,
      totalRevenue,
      orders,
    });
  } catch (error) {
    console.error("GET PARCELX ORDERS ERROR:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.downloadParcelxLabel = async (req, res) => {
  try {
    const { awb } = req.params;

    if (!awb) {
      return res.status(400).json({
        success: false,
        message: "AWB number is required"
      });
    }

    // ParcelX label API
    const pxRes = await axios.get(
      `https://app.parcelx.in/api/v1/label?awb=${awb}&label_type=label`,
      {
        headers: {
          "access-token": process.env.PARCELX_ACCESS_TOKEN
        }
      }
    );

    if (!pxRes.data.status) {
      return res.status(400).json({
        success: false,
        message: "Label not available",
        parcelx: pxRes.data
      });
    }

    const labelUrl = pxRes.data.label_url;

    return res.redirect(labelUrl);

  } catch (error) {
    console.error("PARCELX LABEL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "ParcelX label download failed",
      error: error.response?.data || error.message
    });
  }
};

/* ===============================
   GET VENDOR ORDERS
================================ */
// exports.getVendorOrders = async (req, res) => {
//   try {
//     const vendorId =
//       req.vendor?._id?.toString() ||
//       req.vendor?.id?.toString() ||
//       req.query.vendorId;

//     if (!vendorId) {
//       return res.status(401).json({
//         success: false,
//         message: "Vendor ID not found",
//       });
//     }

//     const orders = await CustomerOrder.find({ vendorId })
//       .populate("customer", "name email phone")
//       .populate("warehouse", "name city state")
//       .sort({ createdAt: -1 })
//       .lean();

//     return res.json({
//       success: true,
//       count: orders.length,
//       orders,
//     });
//   } catch (error) {
//     console.error("GET VENDOR ORDERS ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


exports.getVendorOrders = async (req, res) => {
  try {

    const vendorId =
      req.vendor?._id?.toString() ||
      req.vendor?.id?.toString() ||
      req.query.vendorId;

    if (!vendorId) {
      return res.status(401).json({
        success: false,
        message: "Vendor ID not found",
      });
    }

    const orders = await CustomerOrder.find({
      $or: [
        { vendorId },
        { "orderItems.vendorId": vendorId }
      ]
    })
      .populate("customer", "name email phone")
      .populate("warehouse", "name city state")
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("GET VENDOR ORDERS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ===============================
   CANCEL PARCELX ORDER
================================ */
exports.cancelParcelxOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    /* ===============================
       1. VALIDATION
    ============================== */
    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    /* ===============================
       2. FIND ORDER
    ============================== */
    const order = await CustomerOrder.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    /* ===============================
       3. SAFETY CHECKS
    ============================== */

    // Already cancelled
    if (order.orderStatus === "Cancelled") {
      return res.json({
        success: true,
        message: "Order already cancelled",
        order,
      });
    }

    // Delivered check
    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }

    // ParcelX shipment check
    if (!order.parcelx?.awb) {
      return res.status(400).json({
        success: false,
        message: "No ParcelX shipment found for this order",
      });
    }

    /* ===============================
       4. PREPARE PAYLOAD
    ============================== */
    const payload = {
      awb_numbers: [order.parcelx.awb.toString()],
    };

    console.log("🚫 Cancel Payload:", payload);

    /* ===============================
       5. CALL PARCELX API
    ============================== */
    const pxRes = await parcelx.post("/cancel_order", payload);

    console.log("🚫 ParcelX Cancel Response:", pxRes.data);

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: pxRes.data?.message || "ParcelX cancel failed",
        parcelx: pxRes.data,
      });
    }

    /* ===============================
       6. UPDATE DATABASE
    ============================== */
    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();

    order.parcelx.status = "Cancelled";
    order.parcelx.last_updated = new Date();

    // Optional: payment update
    if (order.paymentMethod === "cod") {
      order.paymentStatus = "Cancelled";
    }

    await order.save();

    /* ===============================
       7. RESPONSE
    ============================== */
    return res.json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    console.error("❌ CANCEL ORDER ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Cancel order failed",
      error: error.response?.data || error.message,
    });
  }
};
