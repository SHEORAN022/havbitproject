// const parcelx = require("../config/parcelx");


// exports.createWarehouse = async (req, res) => {
//   try {
//     const {
//       address_title,
//       sender_name,
//       full_address,
//       phone,
//       pincode,
//     } = req.body;

//     /* ================= VALIDATION ================= */
//     if (
//       !address_title ||
//       !sender_name ||
//       !full_address ||
//       !phone ||
//       !pincode
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "address_title, sender_name, full_address, phone and pincode are required",
//       });
//     }

//     /* ============== PARCELX PAYLOAD ============== */
//     const parcelxPayload = {
//       address_title: address_title,   // required
//       sender_name: sender_name,       // required
//       full_address: full_address,     // required
//       phone: phone,                   // required
//       pincode: pincode,               // required
//     };

//     // Debug (optional – remove later)
//     console.log("ParcelX Create Warehouse Payload:", parcelxPayload);

//     /* ============== API CALL ===================== */
//     const response = await parcelx.post(
//       "/create_warehouse",
//       parcelxPayload
//     );

//     /* ============== SUCCESS RESPONSE ============= */
//     return res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     /* ============== ERROR HANDLING =============== */
//     return res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };


// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       client_order_id,
//       consignee_emailid,
//       consignee_pincode,
//       consignee_mobile,
//       consignee_phone,
//       consignee_address1,
//       consignee_address2,
//       consignee_name,
//       invoice_number,
//       express_type,
//       pick_address_id,
//       return_address_id,
//       cod_amount,
//       tax_amount,
//       mps,
//       courier_type,
//       courier_code,
//       products,
//       address_type,
//       payment_mode,
//       order_amount,
//       extra_charges,
//       shipment_width,
//       shipment_height,
//       shipment_length,
//       shipment_weight,
//     } = req.body;

//     /* ================= VALIDATION ================= */
//     if (
//       !client_order_id ||
//       !consignee_pincode ||
//       !consignee_mobile ||
//       !consignee_address1 ||
//       !consignee_name ||
//       !pick_address_id ||
//       !products ||
//       !shipment_weight
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required order fields",
//       });
//     }

//     /* ============== PARCELX PAYLOAD (EXACT) ============== */
//     const parcelxPayload = {
//       client_order_id,
//       consignee_emailid: consignee_emailid || "",
//       consignee_pincode,
//       consignee_mobile,
//       consignee_phone: consignee_phone || "",
//       consignee_address1,
//       consignee_address2: consignee_address2 || "",
//       consignee_name,
//       invoice_number,
//       express_type,
//       pick_address_id,
//       return_address_id: return_address_id || "",
//       cod_amount: cod_amount || "0",
//       tax_amount: tax_amount || "0",
//       mps: mps || "0",
//       courier_type,
//       courier_code,
//       products,
//       address_type,
//       payment_mode,
//       order_amount,
//       extra_charges: extra_charges || "0",
//       shipment_width,
//       shipment_height,
//       shipment_length,
//       shipment_weight,
//     };

//     // 🔍 Debug (remove later)
//     console.log("ParcelX Create Order Payload:", parcelxPayload);

//     /* ============== API CALL ===================== */
//     const response = await parcelx.post(
//       "/order/create_order",
//       parcelxPayload
//     );

//     /* ============== SUCCESS RESPONSE ============= */
//     return res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     /* ============== ERROR HANDLING =============== */
//     return res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* =====================================================
//    3️⃣ TRACK ORDER (DYNAMIC)
// ===================================================== */
// exports.trackOrder = async (req, res) => {
//   try {
//     const { awb } = req.query;

//     if (!awb) {
//       return res.status(400).json({
//         success: false,
//         message: "AWB is required",
//       });
//     }

//     const response = await parcelx.get(`/track_order?awb=${awb}`);

//     res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* =====================================================
//    4️⃣ SHIPMENT DETAILS (DYNAMIC)
// ===================================================== */
// exports.shipmentDetails = async (req, res) => {
//   try {
//     const { awb } = req.query;

//     if (!awb) {
//       return res.status(400).json({
//         success: false,
//         message: "AWB is required",
//       });
//     }

//     const response = await parcelx.get(
//       `/shipments-details?awb=${awb}`
//     );

//     res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };


// exports.getCourierRates = async (req, res) => {
//   try {
//     const { pick_address_id, delivery_pincode, weight } = req.body;

//     if (!pick_address_id || !delivery_pincode || !weight) {
//       return res.status(400).json({
//         success: false,
//         message: "pick_address_id, delivery_pincode, weight are required",
//       });
//     }

//     const payload = {
//       pick_address_id: Number(pick_address_id),
//       delivery_pincode,
//       weight,
//       payment_mode: "Prepaid",
//     };

//     console.log("ParcelX Serviceability Payload:", payload);

//     // ✅ CORRECT PARCELX ENDPOINT
//     const response = await parcelx.post(
//       "/courier/serviceability",
//       payload
//     );

//     return res.status(200).json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };

const parcelx = require("../config/parcelx");
const Warehouse = require("../models/Warehouse");
const CustomerOrder = require("../models/CustomerOrder");

/* =====================================================
   1️⃣ CREATE WAREHOUSE (ParcelX + DB)
===================================================== */
exports.createWarehouse = async (req, res) => {
  try {
    const {
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
    } = req.body;

    if (!vendorId || !address_title || !sender_name || !full_address || !phone || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All warehouse fields are required",
      });
    }

    // 🔹 ParcelX API
    const pxRes = await parcelx.post("/create_warehouse", {
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
    });

    const pick_address_id = pxRes?.data?.data?.pick_address_id;

    if (!pick_address_id) {
      return res.status(400).json({
        success: false,
        message: "ParcelX warehouse creation failed",
      });
    }

    // 🔹 Save in DB
    const warehouse = await Warehouse.create({
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
      pick_address_id,
    });

    return res.status(201).json({
      success: true,
      warehouse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   2️⃣ GET VENDOR WAREHOUSES (Order page dropdown)
===================================================== */
exports.getVendorWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({
      vendorId: req.params.vendorId,
    });

    return res.json({
      success: true,
      warehouses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   3️⃣ CREATE CUSTOMER ORDER + PARCELX ORDER
===================================================== */
exports.createCustomerOrder = async (req, res) => {
  try {
    const {
      customer,
      orderItems,
      warehouseId,
      shippingAddress,
      paymentMethod = "cod",
    } = req.body;

    if (!customer || !orderItems?.length || !warehouseId || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields",
      });
    }

    // 🔹 Get warehouse
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(400).json({
        success: false,
        message: "Invalid warehouse selected",
      });
    }

    // 🔹 Calculate amount
    let amount = 0;
    orderItems.forEach(item => {
      amount += item.price * item.qty;
    });

    // 🔹 Create DB order
    const order = await CustomerOrder.create({
      customer,
      orderItems,
      warehouse: warehouse._id,
      pick_address_id: warehouse.pick_address_id,
      amount,
      totalPayable: amount,
      paymentMethod,
      shippingAddress,
      orderStatus: "Pending",
      paymentStatus: "Pending",
    });

    // 🔹 ParcelX Order Payload
    const pxPayload = {
      client_order_id: order._id.toString(),
      consignee_name: shippingAddress.name,
      consignee_mobile: shippingAddress.phone,
      consignee_address1: shippingAddress.address,
      consignee_pincode: shippingAddress.pincode,
      pick_address_id: warehouse.pick_address_id,
      products: orderItems.map(item => ({
        product_name: item.productName,
        product_quantity: item.qty,
        product_value: item.price,
      })),
      payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
      order_amount: amount,
      shipment_weight: ["1"],
      shipment_length: ["1"],
      shipment_width: ["1"],
      shipment_height: ["1"],
    };

    // 🔹 Create ParcelX Order
    const pxRes = await parcelx.post("/order/create_order", pxPayload);

    // 🔹 Save AWB
    order.parcelx = {
      awb: pxRes?.data?.data?.awb_number || "",
      courier: pxRes?.data?.data?.courier_name || "",
    };
    order.orderStatus = "Confirmed";
    await order.save();

    return res.status(201).json({
      success: true,
      order,
      parcelx: pxRes.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   4️⃣ TRACK ORDER
===================================================== */
exports.trackOrder = async (req, res) => {
  try {
    const { awb } = req.query;

    if (!awb) {
      return res.status(400).json({
        success: false,
        message: "AWB is required",
      });
    }

    const response = await parcelx.get(`/track_order?awb=${awb}`);

    return res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   5️⃣ SHIPMENT DETAILS
===================================================== */
exports.shipmentDetails = async (req, res) => {
  try {
    const { awb } = req.query;

    if (!awb) {
      return res.status(400).json({
        success: false,
        message: "AWB is required",
      });
    }

    const response = await parcelx.get(`/shipments-details?awb=${awb}`);

    return res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/* =====================================================
   6️⃣ COURIER SERVICEABILITY / RATES
===================================================== */
exports.getCourierRates = async (req, res) => {
  try {
    const { pick_address_id, delivery_pincode, weight } = req.body;

    if (!pick_address_id || !delivery_pincode || !weight) {
      return res.status(400).json({
        success: false,
        message: "pick_address_id, delivery_pincode, weight required",
      });
    }

    const payload = {
      pick_address_id: Number(pick_address_id),
      delivery_pincode,
      weight,
      payment_mode: "Prepaid",
    };

    const response = await parcelx.post("/courier/serviceability", payload);

    return res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
