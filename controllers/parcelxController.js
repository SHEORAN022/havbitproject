// // const parcelx = require("../config/parcelx");
// // const Warehouse = require("../models/Warehouse");
// // const CustomerOrder = require("../models/CustomerOrder");

// // /* =====================================================
// //    1️⃣ CREATE WAREHOUSE (ParcelX + DB)
// // ===================================================== */
// // exports.createWarehouse = async (req, res) => {
// //   try {
// //     const {
// //       vendorId,
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone,
// //       pincode,
// //     } = req.body;

// //     // ===== VALIDATION =====
// //     const errors = [];
// //     if (!vendorId) errors.push("vendorId is required");
// //     if (!address_title) errors.push("address_title is required");
// //     if (!sender_name) errors.push("sender_name is required");
// //     if (!full_address) errors.push("full_address is required");
// //     if (!phone) errors.push("phone is required");
// //     if (!pincode) errors.push("pincode is required");
    
// //     if (errors.length > 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Validation failed",
// //         errors
// //       });
// //     }

// //     // Phone validation
// //     if (!/^\d{10}$/.test(phone)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Phone must be 10 digits"
// //       });
// //     }

// //     // Pincode validation
// //     if (!/^\d{6}$/.test(pincode)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Pincode must be 6 digits"
// //       });
// //     }

// //     console.log("\n📦 Creating ParcelX warehouse...");
// //     console.log("Request Data:", {
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone,
// //       pincode
// //     });

// //     // ===== PARCELX API CALL - CORRECT ENDPOINT =====
// //     // ✅ FIXED: /pickup-location/create (NOT /warehouse/create)
// //     const pxRes = await parcelx.post("/pickup-location/create", {
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone: String(phone).trim(),
// //       pincode: String(pincode).trim()
// //     });

// //     console.log("✅ ParcelX Response Received");
// //     console.log("Response Data:", JSON.stringify(pxRes.data, null, 2));

// //     // Check response structure
// //     if (!pxRes?.data) {
// //       throw new Error("Empty response from ParcelX");
// //     }

// //     // ParcelX response mein data ka structure check karo
// //     const pick_address_id = pxRes.data.data?.pick_address_id || pxRes.data.pick_address_id;

// //     if (!pick_address_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "ParcelX warehouse creation failed - No pick_address_id",
// //         parcelx_response: pxRes.data
// //       });
// //     }

// //     // ===== SAVE TO DATABASE =====
// //     const warehouse = await Warehouse.create({
// //       vendorId,
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone: String(phone),
// //       pincode: String(pincode),
// //       pick_address_id,
// //       is_active: true
// //     });

// //     console.log(`✅ Warehouse saved to DB with ID: ${warehouse._id}`);

// //     return res.status(201).json({
// //       success: true,
// //       message: "Warehouse created successfully",
// //       warehouse: {
// //         _id: warehouse._id,
// //         vendorId: warehouse.vendorId,
// //         address_title: warehouse.address_title,
// //         pick_address_id: warehouse.pick_address_id,
// //         phone: warehouse.phone,
// //         pincode: warehouse.pincode
// //       },
// //       parcelx: {
// //         pick_address_id: pick_address_id,
// //         response: pxRes.data
// //       }
// //     });

// //   } catch (error) {
// //     console.error("\n❌ Warehouse Creation Error:");
    
// //     if (error.response) {
// //       console.error("Status:", error.response.status);
// //       console.error("Data:", error.response.data);
// //       console.error("Headers:", error.response.headers);
      
// //       return res.status(error.response.status || 500).json({
// //         success: false,
// //         message: "ParcelX API Error",
// //         error: {
// //           status: error.response.status,
// //           data: error.response.data
// //         }
// //       });
// //     } else if (error.request) {
// //       console.error("No response received:", error.request);
// //       return res.status(504).json({
// //         success: false,
// //         message: "ParcelX server not responding",
// //         error: error.message
// //       });
// //     } else {
// //       console.error("Error:", error.message);
// //       return res.status(500).json({
// //         success: false,
// //         message: "Internal server error",
// //         error: error.message
// //       });
// //     }
// //   }
// // };

// // /* =====================================================
// //    2️⃣ GET VENDOR WAREHOUSES
// // ===================================================== */
// // exports.getVendorWarehouses = async (req, res) => {
// //   try {
// //     const { vendorId } = req.params;

// //     if (!vendorId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "vendorId is required"
// //       });
// //     }

// //     const warehouses = await Warehouse.find({ 
// //       vendorId: vendorId,
// //       is_active: true 
// //     }).sort({ createdAt: -1 });

// //     return res.json({
// //       success: true,
// //       count: warehouses.length,
// //       warehouses: warehouses.map(w => ({
// //         _id: w._id,
// //         address_title: w.address_title,
// //         sender_name: w.sender_name,
// //         full_address: w.full_address,
// //         phone: w.phone,
// //         pincode: w.pincode,
// //         pick_address_id: w.pick_address_id
// //       }))
// //     });

// //   } catch (error) {
// //     console.error("❌ Get Warehouses Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message
// //     });
// //   }
// // };

// // /* =====================================================
// //    3️⃣ CREATE CUSTOMER ORDER + PARCELX ORDER
// // ===================================================== */
// // exports.createCustomerOrder = async (req, res) => {
// //   try {
// //     const {
// //       customer,
// //       orderItems,
// //       warehouseId,
// //       shippingAddress,
// //       paymentMethod = "cod",
// //       shippingCharge = 0,
// //       discount = 0
// //     } = req.body;

// //     // ===== VALIDATION =====
// //     if (!customer) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Customer ID required"
// //       });
// //     }

// //     if (!orderItems?.length) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "At least one order item required"
// //       });
// //     }

// //     if (!warehouseId) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Warehouse ID required"
// //       });
// //     }

// //     if (!shippingAddress) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Shipping address required"
// //       });
// //     }

// //     // Validate shipping address fields
// //     const { name, phone, address, pincode } = shippingAddress;
// //     if (!name || !phone || !address || !pincode) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Shipping address must include name, phone, address, pincode"
// //       });
// //     }

// //     // Get warehouse from database
// //     const warehouse = await Warehouse.findById(warehouseId);
// //     if (!warehouse) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Warehouse not found"
// //       });
// //     }

// //     // Calculate order amount
// //     let amount = 0;
// //     for (const item of orderItems) {
// //       if (!item.vendorId) {
// //         return res.status(400).json({
// //           success: false,
// //           message: "Each order item must have vendorId"
// //         });
// //       }
// //       amount += Number(item.price) * Number(item.qty);
// //     }

// //     const totalPayable = amount + Number(shippingCharge) - Number(discount);

// //     // ===== CREATE ORDER IN DATABASE =====
// //     const order = new CustomerOrder({
// //       customer,
// //       orderItems: orderItems.map(item => ({
// //         productId: item.productId,
// //         productName: item.productName,
// //         qty: Number(item.qty),
// //         price: Number(item.price),
// //         vendorId: item.vendorId,
// //         image: item.image || ''
// //       })),
// //       warehouse: warehouse._id,
// //       pick_address_id: warehouse.pick_address_id,
// //       amount,
// //       shippingCharge: Number(shippingCharge),
// //       discount: Number(discount),
// //       totalPayable,
// //       paymentMethod,
// //       paymentStatus: "Pending",
// //       orderStatus: "Pending",
// //       shippingAddress: {
// //         name: shippingAddress.name,
// //         phone: shippingAddress.phone,
// //         email: shippingAddress.email || '',
// //         address: shippingAddress.address,
// //         city: shippingAddress.city || '',
// //         state: shippingAddress.state || '',
// //         pincode: shippingAddress.pincode
// //       }
// //     });

// //     await order.save();
// //     console.log(`✅ Order saved to DB with ID: ${order._id}`);

// //     // ===== PREPARE PARCELX PAYLOAD =====
// //     const parcelxPayload = {
// //       client_order_id: order._id.toString(),
// //       consignee_name: shippingAddress.name,
// //       consignee_mobile: String(shippingAddress.phone).trim(),
// //       consignee_address1: shippingAddress.address,
// //       consignee_pincode: String(shippingAddress.pincode).trim(),
// //       pick_address_id: warehouse.pick_address_id,
// //       express_type: "surface",
// //       products: orderItems.map(item => ({
// //         product_name: item.productName || "Product",
// //         product_quantity: Number(item.qty),
// //         product_value: Number(item.price)
// //       })),
// //       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
// //       order_amount: Number(totalPayable),
// //       shipment_weight: ["1"], // Default 1kg
// //       shipment_length: ["10"],
// //       shipment_width: ["10"],
// //       shipment_height: ["10"]
// //     };

// //     // Add COD amount if applicable
// //     if (paymentMethod === "cod") {
// //       parcelxPayload.cod_amount = Number(totalPayable);
// //     }

// //     console.log("\n📤 Sending order to ParcelX...");
// //     console.log("Payload:", JSON.stringify(parcelxPayload, null, 2));

// //     // ===== CALL PARCELX API - CORRECT ENDPOINT =====
// //     // ✅ FIXED: /order/create (NOT /order/create_order)
// //     const pxRes = await parcelx.post("/order/create", parcelxPayload);

// //     console.log("✅ ParcelX Order Response:", JSON.stringify(pxRes.data, null, 2));

// //     // Check if AWB number received
// //     const awbNumber = pxRes.data?.data?.awb_number || pxRes.data?.awb_number;
    
// //     if (!awbNumber) {
// //       throw new Error("No AWB number in ParcelX response");
// //     }

// //     // ===== UPDATE ORDER WITH PARCELX DATA =====
// //     order.parcelx = {
// //       awb: awbNumber,
// //       courier: pxRes.data?.data?.courier_name || pxRes.data?.courier_name || "Unknown",
// //       response: pxRes.data
// //     };
// //     order.orderStatus = "Confirmed";
// //     await order.save();

// //     return res.status(201).json({
// //       success: true,
// //       message: "Order created successfully",
// //       order: {
// //         _id: order._id,
// //         orderStatus: order.orderStatus,
// //         totalPayable: order.totalPayable,
// //         paymentMethod: order.paymentMethod,
// //         awb_number: awbNumber,
// //         courier: order.parcelx.courier
// //       },
// //       tracking_url: `https://parcelx.in/track/${awbNumber}`
// //     });

// //   } catch (error) {
// //     console.error("\n❌ Order Creation Error:", error);
    
// //     if (error.response) {
// //       return res.status(error.response.status || 500).json({
// //         success: false,
// //         message: "ParcelX order creation failed",
// //         error: {
// //           status: error.response.status,
// //           data: error.response.data
// //         }
// //       });
// //     }
    
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message || "Internal server error"
// //     });
// //   }
// // };

// // /* =====================================================
// //    4️⃣ TRACK ORDER
// // ===================================================== */
// // exports.trackOrder = async (req, res) => {
// //   try {
// //     const { awb } = req.query;

// //     if (!awb) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "AWB number is required"
// //       });
// //     }

// //     console.log(`\n🔍 Tracking AWB: ${awb}`);

// //     // Pehle database mein check karo
// //     const order = await CustomerOrder.findOne({ "parcelx.awb": awb });
    
// //     if (!order) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Order not found with this AWB number"
// //       });
// //     }

// //     // ===== CALL PARCELX API - CORRECT ENDPOINT =====
// //     // ✅ FIXED: POST /track-order (NOT GET)
// //     const response = await parcelx.post("/track-order", {
// //       awb: awb.trim()
// //     });

// //     console.log("✅ Track Response:", response.data);

// //     return res.json({
// //       success: true,
// //       order: {
// //         _id: order._id,
// //         awb: order.parcelx.awb,
// //         courier: order.parcelx.courier,
// //         orderStatus: order.orderStatus,
// //         createdAt: order.createdAt
// //       },
// //       tracking: response.data
// //     });

// //   } catch (error) {
// //     console.error("❌ Track Error:", error);
    
// //     if (error.response) {
// //       return res.status(error.response.status).json({
// //         success: false,
// //         error: error.response.data
// //       });
// //     }
    
// //     return res.status(500).json({
// //       success: false,
// //       error: error.message
// //     });
// //   }
// // };

// // /* =====================================================
// //    5️⃣ GET COURIER RATES
// // ===================================================== */
// // exports.getCourierRates = async (req, res) => {
// //   try {
// //     const { pick_address_id, delivery_pincode, weight } = req.body;

// //     if (!pick_address_id || !delivery_pincode || !weight) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "pick_address_id, delivery_pincode, and weight are required"
// //       });
// //     }

// //     console.log("\n💰 Getting courier rates...");
// //     console.log("Request:", { pick_address_id, delivery_pincode, weight });

// //     // ✅ FIXED: /courier/serviceability (ye sahi hai)
// //     const response = await parcelx.post("/courier/serviceability", {
// //       pick_address_id: Number(pick_address_id),
// //       delivery_pincode: String(delivery_pincode).trim(),
// //       weight: Number(weight),
// //       payment_mode: "Prepaid"
// //     });

// //     return res.json({
// //       success: true,
// //       data: response.data
// //     });

// //   } catch (error) {
// //     console.error("❌ Courier Rates Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message
// //     });
// //   }
// // };
// const parcelx = require("../config/parcelx");
// const Warehouse = require("../models/Warehouse");

// /* ===============================
//    CREATE WAREHOUSE
// ================================ */
// exports.createWarehouse = async (req, res) => {
//   try {
//     const {
//       vendorId,
//       name,
//       address,
//       city,
//       state,
//       pincode,
//       phone,
//       contactPerson,
//     } = req.body;

//     // Validation
//     if (
//       !vendorId ||
//       !name ||
//       !address ||
//       !city ||
//       !state ||
//       !pincode ||
//       !phone
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     // Duplicate check
//     const exists = await Warehouse.findOne({ vendorId, name });
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "Warehouse already exists",
//       });
//     }

//     // ParcelX payload (EXACT)
//     const parcelxPayload = {
//       address_title: name,
//       sender_name: contactPerson || name,
//       full_address: address,
//       city: city,
//       state: state,
//       phone: phone,
//       pincode: pincode,
//     };

//     const pxRes = await parcelx.post(
//       "/create_warehouse",
//       parcelxPayload
//     );

//     if (!pxRes?.data?.status) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX warehouse creation failed",
//         parcelx: pxRes.data,
//       });
//     }

//     const parcelxWarehouseId =
//       pxRes.data?.data?.warehouse_id || pxRes.data?.data?.id;

//     if (!parcelxWarehouseId) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX warehouse ID not received",
//       });
//     }

//     // Save in DB
//     const warehouse = await Warehouse.create({
//       vendorId,
//       parcelxWarehouseId,
//       name,
//       address,
//       city,
//       state,
//       pincode,
//       phone,
//       contactPerson,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Warehouse created successfully",
//       warehouse,
//     });
//   } catch (error) {
//     console.error("WAREHOUSE ERROR:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       message: "Warehouse creation failed",
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* ===============================
//    GET WAREHOUSES BY VENDOR
// ================================ */
// exports.getVendorWarehouses = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const warehouses = await Warehouse.find({ vendorId }).sort({
//       createdAt: -1,
//     });

//     return res.json({
//       success: true,
//       count: warehouses.length,
//       warehouses,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const parcelx = require("../config/parcelx");
const Warehouse = require("../models/Warehouse");

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

    // Validation
    if (
      !vendorId ||
      !name ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    // Duplicate check (vendor + warehouse name)
    const exists = await Warehouse.findOne({ vendorId, name });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Warehouse already exists",
      });
    }

    // ParcelX payload (EXACT as working curl)
    const parcelxPayload = {
      address_title: name,
      sender_name: contactPerson || name,
      full_address: address,
      city: city,
      state: state,
      phone: phone,
      pincode: pincode,
    };

    // Call ParcelX
    const pxRes = await parcelx.post(
      "/create_warehouse",
      parcelxPayload
    );

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX warehouse creation failed",
        parcelx: pxRes.data,
      });
    }

    // ✅ CORRECT KEY FROM PARCELX
    const parcelxWarehouseId = pxRes.data?.data?.pick_address_id;

    if (!parcelxWarehouseId) {
      return res.status(500).json({
        success: false,
        message: "ParcelX warehouse ID not received",
      });
    }

    // Save in DB
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
    console.error(
      "WAREHOUSE ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Warehouse creation failed",
      error: error.response?.data || error.message,
    });
  }
};

/* ===============================
   GET WAREHOUSES BY VENDOR
================================ */
exports.getVendorWarehouses = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const warehouses = await Warehouse.find({ vendorId }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      count: warehouses.length,
      warehouses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
