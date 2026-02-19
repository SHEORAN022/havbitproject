// // const parcelx = require("../config/parcelx");


// // exports.createWarehouse = async (req, res) => {
// //   try {
// //     const {
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone,
// //       pincode,
// //     } = req.body;

// //     /* ================= VALIDATION ================= */
// //     if (
// //       !address_title ||
// //       !sender_name ||
// //       !full_address ||
// //       !phone ||
// //       !pincode
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message:
// //           "address_title, sender_name, full_address, phone and pincode are required",
// //       });
// //     }

// //     /* ============== PARCELX PAYLOAD ============== */
// //     const parcelxPayload = {
// //       address_title: address_title,   // required
// //       sender_name: sender_name,       // required
// //       full_address: full_address,     // required
// //       phone: phone,                   // required
// //       pincode: pincode,               // required
// //     };

// //     // Debug (optional – remove later)
// //     console.log("ParcelX Create Warehouse Payload:", parcelxPayload);

// //     /* ============== API CALL ===================== */
// //     const response = await parcelx.post(
// //       "/create_warehouse",
// //       parcelxPayload
// //     );

// //     /* ============== SUCCESS RESPONSE ============= */
// //     return res.status(200).json({
// //       success: true,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     /* ============== ERROR HANDLING =============== */
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };


// // exports.createOrder = async (req, res) => {
// //   try {
// //     const {
// //       client_order_id,
// //       consignee_emailid,
// //       consignee_pincode,
// //       consignee_mobile,
// //       consignee_phone,
// //       consignee_address1,
// //       consignee_address2,
// //       consignee_name,
// //       invoice_number,
// //       express_type,
// //       pick_address_id,
// //       return_address_id,
// //       cod_amount,
// //       tax_amount,
// //       mps,
// //       courier_type,
// //       courier_code,
// //       products,
// //       address_type,
// //       payment_mode,
// //       order_amount,
// //       extra_charges,
// //       shipment_width,
// //       shipment_height,
// //       shipment_length,
// //       shipment_weight,
// //     } = req.body;

// //     /* ================= VALIDATION ================= */
// //     if (
// //       !client_order_id ||
// //       !consignee_pincode ||
// //       !consignee_mobile ||
// //       !consignee_address1 ||
// //       !consignee_name ||
// //       !pick_address_id ||
// //       !products ||
// //       !shipment_weight
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Missing required order fields",
// //       });
// //     }

// //     /* ============== PARCELX PAYLOAD (EXACT) ============== */
// //     const parcelxPayload = {
// //       client_order_id,
// //       consignee_emailid: consignee_emailid || "",
// //       consignee_pincode,
// //       consignee_mobile,
// //       consignee_phone: consignee_phone || "",
// //       consignee_address1,
// //       consignee_address2: consignee_address2 || "",
// //       consignee_name,
// //       invoice_number,
// //       express_type,
// //       pick_address_id,
// //       return_address_id: return_address_id || "",
// //       cod_amount: cod_amount || "0",
// //       tax_amount: tax_amount || "0",
// //       mps: mps || "0",
// //       courier_type,
// //       courier_code,
// //       products,
// //       address_type,
// //       payment_mode,
// //       order_amount,
// //       extra_charges: extra_charges || "0",
// //       shipment_width,
// //       shipment_height,
// //       shipment_length,
// //       shipment_weight,
// //     };

// //     // 🔍 Debug (remove later)
// //     console.log("ParcelX Create Order Payload:", parcelxPayload);

// //     /* ============== API CALL ===================== */
// //     const response = await parcelx.post(
// //       "/order/create_order",
// //       parcelxPayload
// //     );

// //     /* ============== SUCCESS RESPONSE ============= */
// //     return res.status(200).json({
// //       success: true,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     /* ============== ERROR HANDLING =============== */
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    3️⃣ TRACK ORDER (DYNAMIC)
// // ===================================================== */
// // exports.trackOrder = async (req, res) => {
// //   try {
// //     const { awb } = req.query;

// //     if (!awb) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "AWB is required",
// //       });
// //     }

// //     const response = await parcelx.get(`/track_order?awb=${awb}`);

// //     res.status(200).json({
// //       success: true,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    4️⃣ SHIPMENT DETAILS (DYNAMIC)
// // ===================================================== */
// // exports.shipmentDetails = async (req, res) => {
// //   try {
// //     const { awb } = req.query;

// //     if (!awb) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "AWB is required",
// //       });
// //     }

// //     const response = await parcelx.get(
// //       `/shipments-details?awb=${awb}`
// //     );

// //     res.status(200).json({
// //       success: true,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };


// // exports.getCourierRates = async (req, res) => {
// //   try {
// //     const { pick_address_id, delivery_pincode, weight } = req.body;

// //     if (!pick_address_id || !delivery_pincode || !weight) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "pick_address_id, delivery_pincode, weight are required",
// //       });
// //     }

// //     const payload = {
// //       pick_address_id: Number(pick_address_id),
// //       delivery_pincode,
// //       weight,
// //       payment_mode: "Prepaid",
// //     };

// //     console.log("ParcelX Serviceability Payload:", payload);

// //     // ✅ CORRECT PARCELX ENDPOINT
// //     const response = await parcelx.post(
// //       "/courier/serviceability",
// //       payload
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       data: response.data,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };
// const parcelx = require("../config/parcelx");
// const Warehouse = require("../models/Warehouse");
// const CustomerOrder = require("../models/CustomerOrder");

// /* =====================================================
//    1️⃣ CREATE WAREHOUSE (MONGODB ONLY – SAFE & STABLE)
//    👉 pick_address_id dashboard se aata hai
// ===================================================== */
// exports.createWarehouse = async (req, res) => {
//   try {
//     const {
//       vendorId,
//       address_title,
//       sender_name,
//       full_address,
//       phone,
//       pincode,
//       pick_address_id,
//     } = req.body;

//     if (
//       !vendorId ||
//       !address_title ||
//       !sender_name ||
//       !full_address ||
//       !phone ||
//       !pincode ||
//       !pick_address_id
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields including pick_address_id are required",
//       });
//     }

//     const warehouse = await Warehouse.create({
//       vendorId,
//       address_title,
//       sender_name,
//       full_address,
//       phone: String(phone),
//       pincode: String(pincode),
//       pick_address_id: Number(pick_address_id),
//     });

//     return res.status(201).json({
//       success: true,
//       warehouse,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// /* =====================================================
//    2️⃣ GET VENDOR WAREHOUSES
// ===================================================== */
// exports.getVendorWarehouses = async (req, res) => {
//   try {
//     const warehouses = await Warehouse.find({
//       vendorId: req.params.vendorId,
//     }).sort({ createdAt: -1 });

//     return res.json({
//       success: true,
//       warehouses,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// /* =====================================================
//    3️⃣ CREATE CUSTOMER ORDER (PARCELX ORDER CREATE)
// ===================================================== */
// // exports.createCustomerOrder = async (req, res) => {
// //   try {
// //     const {
// //       customer,
// //       orderItems,
// //       warehouseId,
// //       shippingAddress,
// //       paymentMethod = "cod",
// //     } = req.body;

// //     if (
// //       !customer ||
// //       !orderItems ||
// //       orderItems.length === 0 ||
// //       !warehouseId ||
// //       !shippingAddress
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Missing required order fields",
// //       });
// //     }

// //     const warehouse = await Warehouse.findById(warehouseId);
// //     if (!warehouse) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid warehouse selected",
// //       });
// //     }

// //     /* ===== CALCULATE AMOUNT ===== */
// //     let amount = 0;
// //     orderItems.forEach((item) => {
// //       amount += Number(item.price) * Number(item.qty);
// //     });

// //     /* ===== CREATE ORDER IN DB ===== */
// //     const order = await CustomerOrder.create({
// //       customer,
// //       orderItems,
// //       warehouse: warehouse._id,
// //       pick_address_id: warehouse.pick_address_id,
// //       amount,
// //       totalPayable: amount,
// //       paymentMethod,
// //       paymentStatus: "Pending",
// //       orderStatus: "Pending",
// //       shippingAddress,
// //     });

// //     /* ===== PARCELX ORDER PAYLOAD ===== */
// //     const pxPayload = {
// //       client_order_id: order._id.toString(),

// //       consignee_name: shippingAddress.name,
// //       consignee_mobile: String(shippingAddress.phone),
// //       consignee_address1: shippingAddress.address,
// //       consignee_pincode: String(shippingAddress.pincode),

// //       pick_address_id: warehouse.pick_address_id,
// //       express_type: "surface",

// //       products: orderItems.map((item) => ({
// //         product_name: item.productName,
// //         product_quantity: item.qty,
// //         product_value: item.price,
// //       })),

// //       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
// //       order_amount: amount,

// //       shipment_weight: ["1"],
// //       shipment_length: ["10"],
// //       shipment_width: ["10"],
// //       shipment_height: ["10"],
// //     };

// //     if (paymentMethod === "cod") {
// //       pxPayload.cod_amount = amount;
// //     }

// //     /* ===== CREATE PARCELX ORDER ===== */
// //     const pxRes = await parcelx.post("/order/create_order", pxPayload);

// //     if (!pxRes?.data?.data?.awb_number) {
// //       throw new Error("ParcelX order creation failed");
// //     }

// //     /* ===== SAVE AWB DETAILS ===== */
// //     order.parcelx = {
// //       awb: pxRes.data.data.awb_number,
// //       courier: pxRes.data.data.courier_name || "",
// //     };
// //     order.orderStatus = "Confirmed";
// //     await order.save();

// //     return res.status(201).json({
// //       success: true,
// //       order,
// //       parcelx: pxRes.data,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };
// exports.createCustomerOrder = async (req, res) => {
//   try {
//     const {
//       customer,
//       orderItems,
//       warehouseId,
//       shippingAddress,
//       paymentMethod = "cod",
//     } = req.body;

//     // ❗ Validation
//     if (
//       !customer ||
//       !orderItems ||
//       orderItems.length === 0 ||
//       !warehouseId ||
//       !shippingAddress
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required order fields",
//       });
//     }

//     // ❗ Warehouse check
//     const warehouse = await Warehouse.findById(warehouseId);
//     if (!warehouse) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid warehouse selected",
//       });
//     }

//     /* ===== CALCULATE AMOUNT ===== */
//     let amount = 0;
//     orderItems.forEach((item) => {
//       amount += Number(item.price) * Number(item.qty);
//     });

//     /* ===== CREATE ORDER IN DB ===== */
//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       warehouse: warehouse._id,
//       pick_address_id: warehouse.pick_address_id,
//       amount,
//       totalPayable: amount,
//       paymentMethod,
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//       shippingAddress,
//     });

//     /* ===== PARCELX PAYLOAD ===== */
//     const pxPayload = {
//       client_order_id: order._id.toString(),

//       consignee_name: shippingAddress.name,
//       consignee_mobile: String(shippingAddress.phone),
//       consignee_address1: shippingAddress.address,
//       consignee_pincode: String(shippingAddress.pincode),

//       pick_address_id: warehouse.pick_address_id,
//       express_type: "surface",

//       products: orderItems.map((item) => ({
//         product_name: item.productName,
//         product_quantity: Number(item.qty),
//         product_value: Number(item.price),
//       })),

//       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
//       order_amount: amount,

//       // ParcelX expects numeric values, not arrays
//       shipment_weight: 1,
//       shipment_length: 10,
//       shipment_width: 10,
//       shipment_height: 10,
//     };

//     if (paymentMethod === "cod") {
//       pxPayload.cod_amount = amount;
//     }

//     /* ===== PARCELX ORDER CREATE CALL ===== */
//     const pxRes = await parcelx.post("/order/add", pxPayload);

//     // ParcelX might respond differently depending on account config
//     if (!pxRes?.data?.data?.awb_number) {
//       return res.status(400).json({
//         success: false,
//         message: "ParcelX order creation failed",
//         parcelx: pxRes.data,
//       });
//     }

//     /* ===== SAVE AWB + COURIER INFO ===== */
//     order.parcelx = {
//       awb: pxRes.data.data.awb_number,
//       courier: pxRes.data.data.courier_name || "",
//     };

//     order.orderStatus = "Confirmed";
//     order.paymentStatus = paymentMethod === "cod" ? "Pending" : "Paid";

//     await order.save();

//     return res.status(201).json({
//       success: true,
//       order,
//       parcelx: pxRes.data,
//     });
//   } catch (error) {
//     console.error("ParcelX Order Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
//     });
//   }
// };


// /* =====================================================
//    4️⃣ TRACK ORDER
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

//     return res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// /* =====================================================
//    5️⃣ COURIER SERVICEABILITY / RATES
// ===================================================== */
// exports.getCourierRates = async (req, res) => {
//   try {
//     const { pick_address_id, delivery_pincode, weight } = req.body;

//     if (!pick_address_id || !delivery_pincode || !weight) {
//       return res.status(400).json({
//         success: false,
//         message: "pick_address_id, delivery_pincode, weight required",
//       });
//     }

//     const response = await parcelx.post("/courier/serviceability", {
//       pick_address_id: Number(pick_address_id),
//       delivery_pincode: String(delivery_pincode),
//       weight,
//       payment_mode: "Prepaid",
//     });

//     return res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
// /* =====================================================
//    SHIPMENT DETAILS
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

//     const response = await parcelx.get(`/shipments-details?awb=${awb}`);

//     return res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
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
    const vendorId = req.vendor._id;

    const {
      address_title,
      sender_name,
      full_address,
      phone,
      city,
      state,
      pincode,
      country
    } = req.body;

    if (
      !address_title || !sender_name || !full_address ||
      !phone || !city || !state || !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All warehouse fields are required"
      });
    }

    /* 🔹 ParcelX API */
    const pxRes = await parcelx.post("/warehouse/create", {
      address_title,
      sender_name,
      full_address,
      phone: String(phone),
      city,
      state,
      pincode: String(pincode),
      country: country || "India"
    });

    const pick_address_id = pxRes?.data?.data?.pick_address_id;
    if (!pick_address_id) {
      return res.status(400).json({
        success: false,
        message: "ParcelX warehouse failed",
        parcelx: pxRes.data
      });
    }

    /* 🔹 DB Save */
    const warehouse = await Warehouse.create({
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone,
      city,
      state,
      pincode,
      country: country || "India",
      pick_address_id
    });

    res.status(201).json({ success: true, warehouse });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message
    });
  }
};

/* =====================================================
   2️⃣ GET VENDOR WAREHOUSES
===================================================== */
exports.getVendorWarehouses = async (req, res) => {
  try {
    const warehouses = await Warehouse.find({
      vendorId: req.params.vendorId,
    });

    return res.json({ success: true, warehouses });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

/* =====================================================
   3️⃣ CREATE CUSTOMER ORDER + PARCELX ORDER
===================================================== */
exports.createCustomerOrder = async (req, res) => {
  try {
    const vendorId = req.vendor._id; // 🔐 JWT se

    const {
      customer,
      orderItems,
      warehouseId,
      shippingAddress,
      shipment,          // 🔥 REQUIRED (dynamic)
      paymentMethod = "cod",
    } = req.body;

    /* ===== VALIDATION ===== */
    if (
      !customer ||
      !orderItems?.length ||
      !warehouseId ||
      !shippingAddress ||
      !shipment
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields",
      });
    }

    if (
      !shipment.weight ||
      !shipment.length ||
      !shipment.width ||
      !shipment.height
    ) {
      return res.status(400).json({
        success: false,
        message: "Shipment weight & dimensions required",
      });
    }

    /* ===== WAREHOUSE ===== */
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(400).json({
        success: false,
        message: "Invalid warehouse selected",
      });
    }

    /* ===== AMOUNT ===== */
    const amount = orderItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );

    /* ===== DB ORDER (FIRST) ===== */
    const order = await CustomerOrder.create({
      customer,
      vendorId,
      orderItems,
      warehouse: warehouse._id,
      pick_address_id: String(warehouse.pick_address_id),

      shipment, // 🔥 save shipment

      amount,
      totalPayable: amount,
      paymentMethod,
      shippingAddress,

      orderStatus: "Pending",
      paymentStatus: "Pending",
    });

    /* ===== PARCELX PAYLOAD (NO STATIC) ===== */
    const pxPayload = {
      client_order_id: order._id.toString(),

      consignee_name: shippingAddress.name,
      consignee_mobile: String(shippingAddress.phone),
      consignee_address1: shippingAddress.address,
      consignee_pincode: String(shippingAddress.pincode),

      pick_address_id: String(warehouse.pick_address_id),

      payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
      order_amount: amount,

      shipment_weight: String(shipment.weight),
      shipment_length: String(shipment.length),
      shipment_width: String(shipment.width),
      shipment_height: String(shipment.height),

      products: orderItems.map(item => ({
        product_name: item.productName,
        product_quantity: item.qty,
        product_value: item.price,
      })),
    };

    if (paymentMethod === "cod") {
      pxPayload.cod_amount = amount;
    }

    /* ===== CREATE PARCELX ORDER ===== */
    const pxRes = await parcelx.post("/order/create_order", pxPayload);

    if (!pxRes?.data?.data?.awb_number) {
      throw new Error("ParcelX order creation failed");
    }

    /* ===== SAVE PARCELX RESPONSE ===== */
    order.parcelx = {
      awb: pxRes.data.data.awb_number,
      courier: pxRes.data.data.courier_name || "",
      status: "Created",
      last_updated: new Date(),
    };

    order.parcelxOrderCreated = true;
    order.orderStatus = "Confirmed";
    await order.save();

    return res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("ParcelX Order Error:", error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
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
      return res.status(400).json({ success: false, message: "AWB is required" });
    }

    const response = await parcelx.get(`/shipments-details?awb=${awb}`);
    return res.json({ success: true, data: response.data });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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

    const response = await parcelx.post("/courier/serviceability", {
      pick_address_id: Number(pick_address_id),
      delivery_pincode: String(delivery_pincode),
      weight,
      payment_mode: "Prepaid",
    });

    return res.json({ success: true, data: response.data });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
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
      error: error.response?.data || error.message,
    });
  }
};
