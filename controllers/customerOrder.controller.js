const CustomerOrder = require("../models/CustomerOrder");
const Warehouse = require("../models/Warehouse");
const parcelx = require("../config/parcelx");

/* ======================================================
   CREATE ORDER (DB + PARCELX)
====================================================== */
exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      orderItems,
      warehouseId,
      shippingCharge = 0,
      discount = 0,
      paymentMethod = "cod",
      shippingAddress,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (!customer)
      return res.status(400).json({ success: false, message: "Customer required" });

    if (!Array.isArray(orderItems) || orderItems.length === 0)
      return res.status(400).json({ success: false, message: "Order items required" });

    if (!warehouseId)
      return res.status(400).json({ success: false, message: "warehouseId required" });

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || !shippingAddress.address || !shippingAddress.pincode)
      return res.status(400).json({ success: false, message: "Complete shippingAddress required" });

    /* ================= WAREHOUSE ================= */
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse)
      return res.status(400).json({ success: false, message: "Invalid warehouse selected" });

    /* ================= CALCULATE AMOUNT ================= */
    let amount = 0;
    for (const item of orderItems) {
      if (!item.vendorId)
        return res.status(400).json({
          success: false,
          message: "vendorId required in each order item",
        });

      amount += Number(item.price) * Number(item.qty);
    }

    const totalPayable = amount + shippingCharge - discount;

    /* ================= CREATE DB ORDER ================= */
    const order = await CustomerOrder.create({
      customer,
      orderItems,
      warehouse: warehouse._id,
      pick_address_id: warehouse.pick_address_id,
      amount,
      shippingCharge,
      discount,
      totalPayable,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      shippingAddress,
    });

    /* ================= PARCELX PAYLOAD ================= */
    const parcelxPayload = {
      client_order_id: order._id.toString(),

      consignee_name: shippingAddress.name,
      consignee_mobile: shippingAddress.phone,
      consignee_address1: shippingAddress.address,
      consignee_pincode: shippingAddress.pincode,

      pick_address_id: warehouse.pick_address_id,
      express_type: "surface",

      products: orderItems.map(item => ({
        product_name: item.productName,
        product_quantity: item.qty,
        product_value: item.price,
      })),

      payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
      order_amount: totalPayable,

      shipment_weight: ["1"],
      shipment_length: ["10"],
      shipment_width: ["10"],
      shipment_height: ["10"],
    };

    if (paymentMethod === "cod") {
      parcelxPayload.cod_amount = totalPayable;
    }

    /* ================= PARCELX ORDER ================= */
    const pxRes = await parcelx.post("/order/create_order", parcelxPayload);

    if (!pxRes?.data?.data?.awb_number) {
      throw new Error("ParcelX order creation failed");
    }

    /* ================= SAVE PARCELX DATA ================= */
    order.parcelx = {
      awb: pxRes.data.data.awb_number,
      courier: pxRes.data.data.courier_name || "",
    };
    order.orderStatus = "Confirmed";
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
      parcelx: pxRes.data,
    });

  } catch (error) {
    console.error("Create Order Error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error?.response?.data || error.message,
    });
  }
};

/* ======================================================
   GET CUSTOMER ORDERS
====================================================== */
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({ customer: req.params.customerId })
      .populate("warehouse")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   GET SINGLE ORDER
====================================================== */
exports.getOrderById = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id).populate("warehouse");
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   CANCEL ORDER
====================================================== */
exports.cancelOrder = async (req, res) => {
  try {
    const order = await CustomerOrder.findById(req.params.id);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    if (order.orderStatus === "Cancelled")
      return res.json({ success: false, message: "Order already cancelled" });

    order.orderStatus = "Cancelled";
    order.cancelledAt = new Date();
    await order.save();

    res.json({ success: true, message: "Order cancelled", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   UPDATE ORDER STATUS (ADMIN)
====================================================== */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    if (!orderStatus)
      return res.status(400).json({ message: "orderStatus required" });

    const order = await CustomerOrder.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   VENDOR ORDERS
====================================================== */
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({
      "orderItems.vendorId": req.params.vendorId,
    }).sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================================================
   ADMIN – ALL ORDERS
====================================================== */
exports.getAllOrdersForAdmin = async (req, res) => {
  try {
    const orders = await CustomerOrder.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   DELETE ORDER
====================================================== */
exports.deleteOrder = async (req, res) => {
  try {
    await CustomerOrder.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ======================================================
   MY ORDERS (LOGGED IN USER)
====================================================== */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await CustomerOrder.find({ customer: req.user.id })
      .populate("warehouse")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
