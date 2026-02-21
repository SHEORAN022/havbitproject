// // // // const parcelx = require("../config/parcelx");


// // // // exports.createWarehouse = async (req, res) => {
// // // //   try {
// // // //     const {
// // // //       address_title,
// // // //       sender_name,
// // // //       full_address,
// // // //       phone,
// // // //       pincode,
// // // //     } = req.body;

// // // //     /* ================= VALIDATION ================= */
// // // //     if (
// // // //       !address_title ||
// // // //       !sender_name ||
// // // //       !full_address ||
// // // //       !phone ||
// // // //       !pincode
// // // //     ) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message:
// // // //           "address_title, sender_name, full_address, phone and pincode are required",
// // // //       });
// // // //     }

// // // //     /* ============== PARCELX PAYLOAD ============== */
// // // //     const parcelxPayload = {
// // // //       address_title: address_title,   // required
// // // //       sender_name: sender_name,       // required
// // // //       full_address: full_address,     // required
// // // //       phone: phone,                   // required
// // // //       pincode: pincode,               // required
// // // //     };

// // // //     // Debug (optional – remove later)
// // // //     console.log("ParcelX Create Warehouse Payload:", parcelxPayload);

// // // //     /* ============== API CALL ===================== */
// // // //     const response = await parcelx.post(
// // // //       "/create_warehouse",
// // // //       parcelxPayload
// // // //     );

// // // //     /* ============== SUCCESS RESPONSE ============= */
// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       data: response.data,
// // // //     });
// // // //   } catch (error) {
// // // //     /* ============== ERROR HANDLING =============== */
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };


// // // // exports.createOrder = async (req, res) => {
// // // //   try {
// // // //     const {
// // // //       client_order_id,
// // // //       consignee_emailid,
// // // //       consignee_pincode,
// // // //       consignee_mobile,
// // // //       consignee_phone,
// // // //       consignee_address1,
// // // //       consignee_address2,
// // // //       consignee_name,
// // // //       invoice_number,
// // // //       express_type,
// // // //       pick_address_id,
// // // //       return_address_id,
// // // //       cod_amount,
// // // //       tax_amount,
// // // //       mps,
// // // //       courier_type,
// // // //       courier_code,
// // // //       products,
// // // //       address_type,
// // // //       payment_mode,
// // // //       order_amount,
// // // //       extra_charges,
// // // //       shipment_width,
// // // //       shipment_height,
// // // //       shipment_length,
// // // //       shipment_weight,
// // // //     } = req.body;

// // // //     /* ================= VALIDATION ================= */
// // // //     if (
// // // //       !client_order_id ||
// // // //       !consignee_pincode ||
// // // //       !consignee_mobile ||
// // // //       !consignee_address1 ||
// // // //       !consignee_name ||
// // // //       !pick_address_id ||
// // // //       !products ||
// // // //       !shipment_weight
// // // //     ) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "Missing required order fields",
// // // //       });
// // // //     }

// // // //     /* ============== PARCELX PAYLOAD (EXACT) ============== */
// // // //     const parcelxPayload = {
// // // //       client_order_id,
// // // //       consignee_emailid: consignee_emailid || "",
// // // //       consignee_pincode,
// // // //       consignee_mobile,
// // // //       consignee_phone: consignee_phone || "",
// // // //       consignee_address1,
// // // //       consignee_address2: consignee_address2 || "",
// // // //       consignee_name,
// // // //       invoice_number,
// // // //       express_type,
// // // //       pick_address_id,
// // // //       return_address_id: return_address_id || "",
// // // //       cod_amount: cod_amount || "0",
// // // //       tax_amount: tax_amount || "0",
// // // //       mps: mps || "0",
// // // //       courier_type,
// // // //       courier_code,
// // // //       products,
// // // //       address_type,
// // // //       payment_mode,
// // // //       order_amount,
// // // //       extra_charges: extra_charges || "0",
// // // //       shipment_width,
// // // //       shipment_height,
// // // //       shipment_length,
// // // //       shipment_weight,
// // // //     };

// // // //     // 🔍 Debug (remove later)
// // // //     console.log("ParcelX Create Order Payload:", parcelxPayload);

// // // //     /* ============== API CALL ===================== */
// // // //     const response = await parcelx.post(
// // // //       "/order/create_order",
// // // //       parcelxPayload
// // // //     );

// // // //     /* ============== SUCCESS RESPONSE ============= */
// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       data: response.data,
// // // //     });
// // // //   } catch (error) {
// // // //     /* ============== ERROR HANDLING =============== */
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };

// // // // /* =====================================================
// // // //    3️⃣ TRACK ORDER (DYNAMIC)
// // // // ===================================================== */
// // // // exports.trackOrder = async (req, res) => {
// // // //   try {
// // // //     const { awb } = req.query;

// // // //     if (!awb) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "AWB is required",
// // // //       });
// // // //     }

// // // //     const response = await parcelx.get(`/track_order?awb=${awb}`);

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: response.data,
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };

// // // // /* =====================================================
// // // //    4️⃣ SHIPMENT DETAILS (DYNAMIC)
// // // // ===================================================== */
// // // // exports.shipmentDetails = async (req, res) => {
// // // //   try {
// // // //     const { awb } = req.query;

// // // //     if (!awb) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "AWB is required",
// // // //       });
// // // //     }

// // // //     const response = await parcelx.get(
// // // //       `/shipments-details?awb=${awb}`
// // // //     );

// // // //     res.status(200).json({
// // // //       success: true,
// // // //       data: response.data,
// // // //     });
// // // //   } catch (error) {
// // // //     res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };


// // // // exports.getCourierRates = async (req, res) => {
// // // //   try {
// // // //     const { pick_address_id, delivery_pincode, weight } = req.body;

// // // //     if (!pick_address_id || !delivery_pincode || !weight) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "pick_address_id, delivery_pincode, weight are required",
// // // //       });
// // // //     }

// // // //     const payload = {
// // // //       pick_address_id: Number(pick_address_id),
// // // //       delivery_pincode,
// // // //       weight,
// // // //       payment_mode: "Prepaid",
// // // //     };

// // // //     console.log("ParcelX Serviceability Payload:", payload);

// // // //     // ✅ CORRECT PARCELX ENDPOINT
// // // //     const response = await parcelx.post(
// // // //       "/courier/serviceability",
// // // //       payload
// // // //     );

// // // //     return res.status(200).json({
// // // //       success: true,
// // // //       data: response.data,
// // // //     });
// // // //   } catch (error) {
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };
// // // const parcelx = require("../config/parcelx");
// // // const Warehouse = require("../models/Warehouse");
// // // const CustomerOrder = require("../models/CustomerOrder");

// // // /* =====================================================
// // //    1️⃣ CREATE WAREHOUSE (MONGODB ONLY – SAFE & STABLE)
// // //    👉 pick_address_id dashboard se aata hai
// // // ===================================================== */
// // // exports.createWarehouse = async (req, res) => {
// // //   try {
// // //     const {
// // //       vendorId,
// // //       address_title,
// // //       sender_name,
// // //       full_address,
// // //       phone,
// // //       pincode,
// // //       pick_address_id,
// // //     } = req.body;

// // //     if (
// // //       !vendorId ||
// // //       !address_title ||
// // //       !sender_name ||
// // //       !full_address ||
// // //       !phone ||
// // //       !pincode ||
// // //       !pick_address_id
// // //     ) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "All fields including pick_address_id are required",
// // //       });
// // //     }

// // //     const warehouse = await Warehouse.create({
// // //       vendorId,
// // //       address_title,
// // //       sender_name,
// // //       full_address,
// // //       phone: String(phone),
// // //       pincode: String(pincode),
// // //       pick_address_id: Number(pick_address_id),
// // //     });

// // //     return res.status(201).json({
// // //       success: true,
// // //       warehouse,
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    2️⃣ GET VENDOR WAREHOUSES
// // // ===================================================== */
// // // exports.getVendorWarehouses = async (req, res) => {
// // //   try {
// // //     const warehouses = await Warehouse.find({
// // //       vendorId: req.params.vendorId,
// // //     }).sort({ createdAt: -1 });

// // //     return res.json({
// // //       success: true,
// // //       warehouses,
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    3️⃣ CREATE CUSTOMER ORDER (PARCELX ORDER CREATE)
// // // ===================================================== */
// // // // exports.createCustomerOrder = async (req, res) => {
// // // //   try {
// // // //     const {
// // // //       customer,
// // // //       orderItems,
// // // //       warehouseId,
// // // //       shippingAddress,
// // // //       paymentMethod = "cod",
// // // //     } = req.body;

// // // //     if (
// // // //       !customer ||
// // // //       !orderItems ||
// // // //       orderItems.length === 0 ||
// // // //       !warehouseId ||
// // // //       !shippingAddress
// // // //     ) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "Missing required order fields",
// // // //       });
// // // //     }

// // // //     const warehouse = await Warehouse.findById(warehouseId);
// // // //     if (!warehouse) {
// // // //       return res.status(400).json({
// // // //         success: false,
// // // //         message: "Invalid warehouse selected",
// // // //       });
// // // //     }

// // // //     /* ===== CALCULATE AMOUNT ===== */
// // // //     let amount = 0;
// // // //     orderItems.forEach((item) => {
// // // //       amount += Number(item.price) * Number(item.qty);
// // // //     });

// // // //     /* ===== CREATE ORDER IN DB ===== */
// // // //     const order = await CustomerOrder.create({
// // // //       customer,
// // // //       orderItems,
// // // //       warehouse: warehouse._id,
// // // //       pick_address_id: warehouse.pick_address_id,
// // // //       amount,
// // // //       totalPayable: amount,
// // // //       paymentMethod,
// // // //       paymentStatus: "Pending",
// // // //       orderStatus: "Pending",
// // // //       shippingAddress,
// // // //     });

// // // //     /* ===== PARCELX ORDER PAYLOAD ===== */
// // // //     const pxPayload = {
// // // //       client_order_id: order._id.toString(),

// // // //       consignee_name: shippingAddress.name,
// // // //       consignee_mobile: String(shippingAddress.phone),
// // // //       consignee_address1: shippingAddress.address,
// // // //       consignee_pincode: String(shippingAddress.pincode),

// // // //       pick_address_id: warehouse.pick_address_id,
// // // //       express_type: "surface",

// // // //       products: orderItems.map((item) => ({
// // // //         product_name: item.productName,
// // // //         product_quantity: item.qty,
// // // //         product_value: item.price,
// // // //       })),

// // // //       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
// // // //       order_amount: amount,

// // // //       shipment_weight: ["1"],
// // // //       shipment_length: ["10"],
// // // //       shipment_width: ["10"],
// // // //       shipment_height: ["10"],
// // // //     };

// // // //     if (paymentMethod === "cod") {
// // // //       pxPayload.cod_amount = amount;
// // // //     }

// // // //     /* ===== CREATE PARCELX ORDER ===== */
// // // //     const pxRes = await parcelx.post("/order/create_order", pxPayload);

// // // //     if (!pxRes?.data?.data?.awb_number) {
// // // //       throw new Error("ParcelX order creation failed");
// // // //     }

// // // //     /* ===== SAVE AWB DETAILS ===== */
// // // //     order.parcelx = {
// // // //       awb: pxRes.data.data.awb_number,
// // // //       courier: pxRes.data.data.courier_name || "",
// // // //     };
// // // //     order.orderStatus = "Confirmed";
// // // //     await order.save();

// // // //     return res.status(201).json({
// // // //       success: true,
// // // //       order,
// // // //       parcelx: pxRes.data,
// // // //     });
// // // //   } catch (error) {
// // // //     return res.status(500).json({
// // // //       success: false,
// // // //       error: error.response?.data || error.message,
// // // //     });
// // // //   }
// // // // };
// // // exports.createCustomerOrder = async (req, res) => {
// // //   try {
// // //     const {
// // //       customer,
// // //       orderItems,
// // //       warehouseId,
// // //       shippingAddress,
// // //       paymentMethod = "cod",
// // //     } = req.body;

// // //     // ❗ Validation
// // //     if (
// // //       !customer ||
// // //       !orderItems ||
// // //       orderItems.length === 0 ||
// // //       !warehouseId ||
// // //       !shippingAddress
// // //     ) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Missing required order fields",
// // //       });
// // //     }

// // //     // ❗ Warehouse check
// // //     const warehouse = await Warehouse.findById(warehouseId);
// // //     if (!warehouse) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid warehouse selected",
// // //       });
// // //     }

// // //     /* ===== CALCULATE AMOUNT ===== */
// // //     let amount = 0;
// // //     orderItems.forEach((item) => {
// // //       amount += Number(item.price) * Number(item.qty);
// // //     });

// // //     /* ===== CREATE ORDER IN DB ===== */
// // //     const order = await CustomerOrder.create({
// // //       customer,
// // //       orderItems,
// // //       warehouse: warehouse._id,
// // //       pick_address_id: warehouse.pick_address_id,
// // //       amount,
// // //       totalPayable: amount,
// // //       paymentMethod,
// // //       paymentStatus: "Pending",
// // //       orderStatus: "Pending",
// // //       shippingAddress,
// // //     });

// // //     /* ===== PARCELX PAYLOAD ===== */
// // //     const pxPayload = {
// // //       client_order_id: order._id.toString(),

// // //       consignee_name: shippingAddress.name,
// // //       consignee_mobile: String(shippingAddress.phone),
// // //       consignee_address1: shippingAddress.address,
// // //       consignee_pincode: String(shippingAddress.pincode),

// // //       pick_address_id: warehouse.pick_address_id,
// // //       express_type: "surface",

// // //       products: orderItems.map((item) => ({
// // //         product_name: item.productName,
// // //         product_quantity: Number(item.qty),
// // //         product_value: Number(item.price),
// // //       })),

// // //       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
// // //       order_amount: amount,

// // //       // ParcelX expects numeric values, not arrays
// // //       shipment_weight: 1,
// // //       shipment_length: 10,
// // //       shipment_width: 10,
// // //       shipment_height: 10,
// // //     };

// // //     if (paymentMethod === "cod") {
// // //       pxPayload.cod_amount = amount;
// // //     }

// // //     /* ===== PARCELX ORDER CREATE CALL ===== */
// // //     const pxRes = await parcelx.post("/order/add", pxPayload);

// // //     // ParcelX might respond differently depending on account config
// // //     if (!pxRes?.data?.data?.awb_number) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "ParcelX order creation failed",
// // //         parcelx: pxRes.data,
// // //       });
// // //     }

// // //     /* ===== SAVE AWB + COURIER INFO ===== */
// // //     order.parcelx = {
// // //       awb: pxRes.data.data.awb_number,
// // //       courier: pxRes.data.data.courier_name || "",
// // //     };

// // //     order.orderStatus = "Confirmed";
// // //     order.paymentStatus = paymentMethod === "cod" ? "Pending" : "Paid";

// // //     await order.save();

// // //     return res.status(201).json({
// // //       success: true,
// // //       order,
// // //       parcelx: pxRes.data,
// // //     });
// // //   } catch (error) {
// // //     console.error("ParcelX Order Error:", error.response?.data || error.message);
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.response?.data || error.message,
// // //     });
// // //   }
// // // };


// // // /* =====================================================
// // //    4️⃣ TRACK ORDER
// // // ===================================================== */
// // // exports.trackOrder = async (req, res) => {
// // //   try {
// // //     const { awb } = req.query;

// // //     if (!awb) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "AWB is required",
// // //       });
// // //     }

// // //     const response = await parcelx.get(`/track_order?awb=${awb}`);

// // //     return res.json({
// // //       success: true,
// // //       data: response.data,
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //     });
// // //   }
// // // };

// // // /* =====================================================
// // //    5️⃣ COURIER SERVICEABILITY / RATES
// // // ===================================================== */
// // // exports.getCourierRates = async (req, res) => {
// // //   try {
// // //     const { pick_address_id, delivery_pincode, weight } = req.body;

// // //     if (!pick_address_id || !delivery_pincode || !weight) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "pick_address_id, delivery_pincode, weight required",
// // //       });
// // //     }

// // //     const response = await parcelx.post("/courier/serviceability", {
// // //       pick_address_id: Number(pick_address_id),
// // //       delivery_pincode: String(delivery_pincode),
// // //       weight,
// // //       payment_mode: "Prepaid",
// // //     });

// // //     return res.json({
// // //       success: true,
// // //       data: response.data,
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //     });
// // //   }
// // // };
// // // /* =====================================================
// // //    SHIPMENT DETAILS
// // // ===================================================== */
// // // exports.shipmentDetails = async (req, res) => {
// // //   try {
// // //     const { awb } = req.query;

// // //     if (!awb) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "AWB is required",
// // //       });
// // //     }

// // //     const response = await parcelx.get(`/shipments-details?awb=${awb}`);

// // //     return res.json({
// // //       success: true,
// // //       data: response.data,
// // //     });
// // //   } catch (error) {
// // //     return res.status(500).json({
// // //       success: false,
// // //       error: error.message,
// // //     });
// // //   }
// // // };

// // const parcelx = require("../config/parcelx");
// // const Warehouse = require("../models/Warehouse");
// // const CustomerOrder = require("../models/CustomerOrder");

// // /* =====================================================
// //    1️⃣ CREATE WAREHOUSE (ParcelX + DB)
// // ===================================================== */
// // exports.createWarehouse = async (req, res) => {
// //   try {
// //     const vendorId = req.vendor._id;

// //     const {
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone,
// //       city,
// //       state,
// //       pincode,
// //       country
// //     } = req.body;

// //     if (
// //       !address_title || !sender_name || !full_address ||
// //       !phone || !city || !state || !pincode
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All warehouse fields are required"
// //       });
// //     }

// //     /* 🔹 ParcelX API */
// //     const pxRes = await parcelx.post("/warehouse/create", {
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone: String(phone),
// //       city,
// //       state,
// //       pincode: String(pincode),
// //       country: country || "India"
// //     });

// //     const pick_address_id = pxRes?.data?.data?.pick_address_id;
// //     if (!pick_address_id) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "ParcelX warehouse failed",
// //         parcelx: pxRes.data
// //       });
// //     }

// //     /* 🔹 DB Save */
// //     const warehouse = await Warehouse.create({
// //       vendorId,
// //       address_title,
// //       sender_name,
// //       full_address,
// //       phone,
// //       city,
// //       state,
// //       pincode,
// //       country: country || "India",
// //       pick_address_id
// //     });

// //     res.status(201).json({ success: true, warehouse });

// //   } catch (err) {
// //     res.status(500).json({
// //       success: false,
// //       error: err.response?.data || err.message
// //     });
// //   }
// // };

// // /* =====================================================
// //    2️⃣ GET VENDOR WAREHOUSES
// // ===================================================== */
// // exports.getVendorWarehouses = async (req, res) => {
// //   try {
// //     const warehouses = await Warehouse.find({
// //       vendorId: req.params.vendorId,
// //     });

// //     return res.json({ success: true, warehouses });
// //   } catch (error) {
// //     return res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // /* =====================================================
// //    3️⃣ CREATE CUSTOMER ORDER + PARCELX ORDER
// // ===================================================== */
// // exports.createCustomerOrder = async (req, res) => {
// //   try {
// //     const vendorId = req.vendor._id; // 🔐 JWT se

// //     const {
// //       customer,
// //       orderItems,
// //       warehouseId,
// //       shippingAddress,
// //       shipment,          // 🔥 REQUIRED (dynamic)
// //       paymentMethod = "cod",
// //     } = req.body;

// //     /* ===== VALIDATION ===== */
// //     if (
// //       !customer ||
// //       !orderItems?.length ||
// //       !warehouseId ||
// //       !shippingAddress ||
// //       !shipment
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Missing required order fields",
// //       });
// //     }

// //     if (
// //       !shipment.weight ||
// //       !shipment.length ||
// //       !shipment.width ||
// //       !shipment.height
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Shipment weight & dimensions required",
// //       });
// //     }

// //     /* ===== WAREHOUSE ===== */
// //     const warehouse = await Warehouse.findById(warehouseId);
// //     if (!warehouse) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid warehouse selected",
// //       });
// //     }

// //     /* ===== AMOUNT ===== */
// //     const amount = orderItems.reduce(
// //       (sum, item) => sum + Number(item.price) * Number(item.qty),
// //       0
// //     );

// //     /* ===== DB ORDER (FIRST) ===== */
// //     const order = await CustomerOrder.create({
// //       customer,
// //       vendorId,
// //       orderItems,
// //       warehouse: warehouse._id,
// //       pick_address_id: String(warehouse.pick_address_id),

// //       shipment, // 🔥 save shipment

// //       amount,
// //       totalPayable: amount,
// //       paymentMethod,
// //       shippingAddress,

// //       orderStatus: "Pending",
// //       paymentStatus: "Pending",
// //     });

// //     /* ===== PARCELX PAYLOAD (NO STATIC) ===== */
// //     const pxPayload = {
// //       client_order_id: order._id.toString(),

// //       consignee_name: shippingAddress.name,
// //       consignee_mobile: String(shippingAddress.phone),
// //       consignee_address1: shippingAddress.address,
// //       consignee_pincode: String(shippingAddress.pincode),

// //       pick_address_id: String(warehouse.pick_address_id),

// //       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
// //       order_amount: amount,

// //       shipment_weight: String(shipment.weight),
// //       shipment_length: String(shipment.length),
// //       shipment_width: String(shipment.width),
// //       shipment_height: String(shipment.height),

// //       products: orderItems.map(item => ({
// //         product_name: item.productName,
// //         product_quantity: item.qty,
// //         product_value: item.price,
// //       })),
// //     };

// //     if (paymentMethod === "cod") {
// //       pxPayload.cod_amount = amount;
// //     }

// //     /* ===== CREATE PARCELX ORDER ===== */
// //     const pxRes = await parcelx.post("/order/create_order", pxPayload);

// //     if (!pxRes?.data?.data?.awb_number) {
// //       throw new Error("ParcelX order creation failed");
// //     }

// //     /* ===== SAVE PARCELX RESPONSE ===== */
// //     order.parcelx = {
// //       awb: pxRes.data.data.awb_number,
// //       courier: pxRes.data.data.courier_name || "",
// //       status: "Created",
// //       last_updated: new Date(),
// //     };

// //     order.parcelxOrderCreated = true;
// //     order.orderStatus = "Confirmed";
// //     await order.save();

// //     return res.status(201).json({
// //       success: true,
// //       order,
// //     });

// //   } catch (error) {
// //     console.error("ParcelX Order Error:", error.response?.data || error.message);
// //     return res.status(500).json({
// //       success: false,
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };

// // /* =====================================================
// //    5️⃣ SHIPMENT DETAILS
// // ===================================================== */
// // exports.shipmentDetails = async (req, res) => {
// //   try {
// //     const { awb } = req.query;
// //     if (!awb) {
// //       return res.status(400).json({ success: false, message: "AWB is required" });
// //     }

// //     const response = await parcelx.get(`/shipments-details?awb=${awb}`);
// //     return res.json({ success: true, data: response.data });

// //   } catch (error) {
// //     return res.status(500).json({ success: false, error: error.message });
// //   }
// // };

// // /* =====================================================
// //    6️⃣ COURIER SERVICEABILITY / RATES
// // ===================================================== */
// // exports.getCourierRates = async (req, res) => {
// //   try {
// //     const { pick_address_id, delivery_pincode, weight } = req.body;

// //     if (!pick_address_id || !delivery_pincode || !weight) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "pick_address_id, delivery_pincode, weight required",
// //       });
// //     }

// //     const response = await parcelx.post("/courier/serviceability", {
// //       pick_address_id: Number(pick_address_id),
// //       delivery_pincode: String(delivery_pincode),
// //       weight,
// //       payment_mode: "Prepaid",
// //     });

// //     return res.json({ success: true, data: response.data });

// //   } catch (error) {
// //     return res.status(500).json({ success: false, error: error.message });
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
// //         message: "AWB is required",
// //       });
// //     }

// //     const response = await parcelx.get(`/track_order?awb=${awb}`);

// //     return res.json({
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
//    1️⃣ CREATE WAREHOUSE (ParcelX + DB)
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
//     } = req.body;

//     // Validation
//     if (!vendorId || !address_title || !sender_name || !full_address || !phone || !pincode) {
//       return res.status(400).json({
//         success: false,
//         message: "All warehouse fields are required",
//       });
//     }

//     console.log("📦 Creating ParcelX warehouse...");

//     // ParcelX API Call
//     const pxRes = await parcelx.post("/warehouse/create", {
//       address_title,
//       sender_name,
//       full_address,
//       phone: String(phone).trim(),
//       pincode: String(pincode).trim(),
//     });

//     console.log("✅ ParcelX Response:", pxRes.data);

//     const pick_address_id = pxRes?.data?.data?.pick_address_id;

//     if (!pick_address_id) {
//       return res.status(400).json({
//         success: false,
//         message: "ParcelX warehouse creation failed",
//         parcelx_response: pxRes?.data
//       });
//     }

//     // Save in DB
//     const warehouse = await Warehouse.create({
//       vendorId,
//       address_title,
//       sender_name,
//       full_address,
//       phone: String(phone),
//       pincode: String(pincode),
//       pick_address_id,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Warehouse created successfully",
//       warehouse,
//       parcelx_id: pick_address_id
//     });

//   } catch (error) {
//     console.error("❌ Warehouse Error:", error.response?.data || error.message);
//     return res.status(500).json({
//       success: false,
//       error: error.response?.data || error.message,
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
//       count: warehouses.length,
//       warehouses 
//     });
//   } catch (error) {
//     return res.status(500).json({ 
//       success: false, 
//       error: error.message 
//     });
//   }
// };

// /* =====================================================
//    3️⃣ CREATE CUSTOMER ORDER + PARCELX ORDER (FIXED)
// ===================================================== */
// exports.createCustomerOrder = async (req, res) => {
//   try {
//     const {
//       customer,
//       orderItems,
//       warehouseId,
//       shippingAddress,
//       paymentMethod = "cod",
//       shippingCharge = 0,
//       discount = 0
//     } = req.body;

//     // Validation
//     if (!customer) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer ID required"
//       });
//     }

//     if (!orderItems?.length) {
//       return res.status(400).json({
//         success: false,
//         message: "Order items required"
//       });
//     }

//     if (!warehouseId) {
//       return res.status(400).json({
//         success: false,
//         message: "Warehouse ID required"
//       });
//     }

//     if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || 
//         !shippingAddress.address || !shippingAddress.pincode) {
//       return res.status(400).json({
//         success: false,
//         message: "Complete shipping address required"
//       });
//     }

//     // Get warehouse
//     const warehouse = await Warehouse.findById(warehouseId);
//     if (!warehouse) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid warehouse selected"
//       });
//     }

//     // Calculate amount
//     let amount = 0;
//     for (const item of orderItems) {
//       if (!item.vendorId) {
//         return res.status(400).json({
//           success: false,
//           message: "vendorId required in each order item"
//         });
//       }
//       amount += Number(item.price) * Number(item.qty);
//     }

//     const totalPayable = amount + (shippingCharge || 0) - (discount || 0);

//     // Create DB order first
//     const order = await CustomerOrder.create({
//       customer,
//       orderItems,
//       warehouse: warehouse._id,
//       pick_address_id: warehouse.pick_address_id,
//       amount,
//       shippingCharge: shippingCharge || 0,
//       discount: discount || 0,
//       totalPayable,
//       paymentMethod,
//       paymentStatus: "Pending",
//       orderStatus: "Pending",
//       shippingAddress,
//     });

//     console.log("✅ Order saved in DB:", order._id);

//     // Prepare ParcelX payload
//     const parcelxPayload = {
//       client_order_id: order._id.toString(),
//       consignee_name: shippingAddress.name,
//       consignee_mobile: String(shippingAddress.phone).trim(),
//       consignee_address1: shippingAddress.address,
//       consignee_pincode: String(shippingAddress.pincode).trim(),
//       pick_address_id: warehouse.pick_address_id,
//       express_type: "surface",
//       products: orderItems.map(item => ({
//         product_name: item.productName || "Product",
//         product_quantity: Number(item.qty),
//         product_value: Number(item.price)
//       })),
//       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
//       order_amount: Number(totalPayable),
//       shipment_weight: ["1"], // Default weight in kg
//       shipment_length: ["10"],
//       shipment_width: ["10"],
//       shipment_height: ["10"]
//     };

//     // Add COD amount if payment method is COD
//     if (paymentMethod === "cod") {
//       parcelxPayload.cod_amount = Number(totalPayable);
//     }

//     console.log("📤 Sending to ParcelX:", JSON.stringify(parcelxPayload, null, 2));

//     // Call ParcelX API
//     const pxRes = await parcelx.post("/order/create_order", parcelxPayload);
    
//     console.log("📥 ParcelX Response:", pxRes.data);

//     // Check response
//     if (!pxRes?.data?.data?.awb_number) {
//       throw new Error("ParcelX order creation failed: No AWB number received");
//     }

//     // Update order with ParcelX data
//     order.parcelx = {
//       awb: pxRes.data.data.awb_number,
//       courier: pxRes.data.data.courier_name || "Unknown"
//     };
//     order.orderStatus = "Confirmed";
//     await order.save();

//     return res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order,
//       parcelx: {
//         awb: pxRes.data.data.awb_number,
//         courier: pxRes.data.data.courier_name,
//         response: pxRes.data
//       }
//     });

//   } catch (error) {
//     console.error("❌ Order Creation Error:", error.response?.data || error.message);
    
//     // If order was created but ParcelX failed, still return order with error
//     if (error.response?.data) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX order creation failed",
//         error: error.response.data,
//         order: req.body // Return the order data for debugging
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// };

// /* =====================================================
//    4️⃣ TRACK ORDER (FIXED)
// ===================================================== */
// exports.trackOrder = async (req, res) => {
//   try {
//     const { awb } = req.query;
    
//     if (!awb) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "AWB number is required" 
//       });
//     }

//     console.log(`🔍 Tracking AWB: ${awb}`);

//     const response = await parcelx.get(`/track-order`, {
//       params: { awb: awb.trim() }
//     });

//     console.log("📦 Track Response:", response.data);

//     return res.json({ 
//       success: true, 
//       data: response.data 
//     });

//   } catch (error) {
//     console.error("❌ Track Error:", error.response?.data || error.message);
//     return res.status(500).json({ 
//       success: false, 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// /* =====================================================
//    5️⃣ SHIPMENT DETAILS
// ===================================================== */
// exports.shipmentDetails = async (req, res) => {
//   try {
//     const { awb } = req.query;
    
//     if (!awb) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "AWB is required" 
//       });
//     }

//     const response = await parcelx.get(`/shipment-details`, {
//       params: { awb: awb.trim() }
//     });

//     return res.json({ 
//       success: true, 
//       data: response.data 
//     });

//   } catch (error) {
//     console.error("❌ Shipment Details Error:", error.response?.data || error.message);
//     return res.status(500).json({ 
//       success: false, 
//       error: error.response?.data || error.message 
//     });
//   }
// };

// /* =====================================================
//    6️⃣ COURIER SERVICEABILITY / RATES
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
//       delivery_pincode: String(delivery_pincode).trim(),
//       weight: Number(weight),
//       payment_mode: "Prepaid",
//     });

//     return res.json({ 
//       success: true, 
//       data: response.data 
//     });

//   } catch (error) {
//     console.error("❌ Rates Error:", error.response?.data || error.message);
//     return res.status(500).json({ 
//       success: false, 
//       error: error.response?.data || error.message 
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

    // ===== VALIDATION =====
    const errors = [];
    if (!vendorId) errors.push("vendorId is required");
    if (!address_title) errors.push("address_title is required");
    if (!sender_name) errors.push("sender_name is required");
    if (!full_address) errors.push("full_address is required");
    if (!phone) errors.push("phone is required");
    if (!pincode) errors.push("pincode is required");
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
      });
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10 digits"
      });
    }

    // Pincode validation
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Pincode must be 6 digits"
      });
    }

    console.log("\n📦 Creating ParcelX warehouse...");
    console.log("Request Data:", {
      address_title,
      sender_name,
      full_address,
      phone,
      pincode
    });

    // ===== PARCELX API CALL =====
    const pxRes = await parcelx.post("/warehouse/create", {
      address_title,
      sender_name,
      full_address,
      phone: String(phone).trim(),
      pincode: String(pincode).trim()
    });

    console.log("✅ ParcelX Response Received");

    // Check response structure
    if (!pxRes?.data) {
      throw new Error("Empty response from ParcelX");
    }

    // ParcelX response mein data ka structure check karo
    const pick_address_id = pxRes.data.data?.pick_address_id || pxRes.data.pick_address_id;

    if (!pick_address_id) {
      return res.status(400).json({
        success: false,
        message: "ParcelX warehouse creation failed - No pick_address_id",
        parcelx_response: pxRes.data
      });
    }

    // ===== SAVE TO DATABASE =====
    const warehouse = await Warehouse.create({
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone: String(phone),
      pincode: String(pincode),
      pick_address_id,
      is_active: true
    });

    console.log(`✅ Warehouse saved to DB with ID: ${warehouse._id}`);

    return res.status(201).json({
      success: true,
      message: "Warehouse created successfully",
      warehouse: {
        _id: warehouse._id,
        vendorId: warehouse.vendorId,
        address_title: warehouse.address_title,
        pick_address_id: warehouse.pick_address_id,
        phone: warehouse.phone,
        pincode: warehouse.pincode
      },
      parcelx: {
        pick_address_id: pick_address_id,
        response: pxRes.data
      }
    });

  } catch (error) {
    console.error("\n❌ Warehouse Creation Error:");
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
      
      return res.status(error.response.status || 500).json({
        success: false,
        message: "ParcelX API Error",
        error: {
          status: error.response.status,
          data: error.response.data
        }
      });
    } else if (error.request) {
      console.error("No response received:", error.request);
      return res.status(504).json({
        success: false,
        message: "ParcelX server not responding",
        error: error.message
      });
    } else {
      console.error("Error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message
      });
    }
  }
};

/* =====================================================
   2️⃣ GET VENDOR WAREHOUSES
===================================================== */
exports.getVendorWarehouses = async (req, res) => {
  try {
    const { vendorId } = req.params;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "vendorId is required"
      });
    }

    const warehouses = await Warehouse.find({ 
      vendorId: vendorId,
      is_active: true 
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: warehouses.length,
      warehouses: warehouses.map(w => ({
        _id: w._id,
        address_title: w.address_title,
        sender_name: w.sender_name,
        full_address: w.full_address,
        phone: w.phone,
        pincode: w.pincode,
        pick_address_id: w.pick_address_id
      }))
    });

  } catch (error) {
    console.error("❌ Get Warehouses Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
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
      shippingCharge = 0,
      discount = 0
    } = req.body;

    // ===== VALIDATION =====
    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer ID required"
      });
    }

    if (!orderItems?.length) {
      return res.status(400).json({
        success: false,
        message: "At least one order item required"
      });
    }

    if (!warehouseId) {
      return res.status(400).json({
        success: false,
        message: "Warehouse ID required"
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address required"
      });
    }

    // Validate shipping address fields
    const { name, phone, address, pincode } = shippingAddress;
    if (!name || !phone || !address || !pincode) {
      return res.status(400).json({
        success: false,
        message: "Shipping address must include name, phone, address, pincode"
      });
    }

    // Get warehouse from database
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: "Warehouse not found"
      });
    }

    // Calculate order amount
    let amount = 0;
    for (const item of orderItems) {
      if (!item.vendorId) {
        return res.status(400).json({
          success: false,
          message: "Each order item must have vendorId"
        });
      }
      amount += Number(item.price) * Number(item.qty);
    }

    const totalPayable = amount + Number(shippingCharge) - Number(discount);

    // ===== CREATE ORDER IN DATABASE =====
    const order = new CustomerOrder({
      customer,
      orderItems: orderItems.map(item => ({
        productId: item.productId,
        productName: item.productName,
        qty: Number(item.qty),
        price: Number(item.price),
        vendorId: item.vendorId,
        image: item.image || ''
      })),
      warehouse: warehouse._id,
      pick_address_id: warehouse.pick_address_id,
      amount,
      shippingCharge: Number(shippingCharge),
      discount: Number(discount),
      totalPayable,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending",
      shippingAddress: {
        name: shippingAddress.name,
        phone: shippingAddress.phone,
        email: shippingAddress.email || '',
        address: shippingAddress.address,
        city: shippingAddress.city || '',
        state: shippingAddress.state || '',
        pincode: shippingAddress.pincode
      }
    });

    await order.save();
    console.log(`✅ Order saved to DB with ID: ${order._id}`);

    // ===== PREPARE PARCELX PAYLOAD =====
    const parcelxPayload = {
      client_order_id: order._id.toString(),
      consignee_name: shippingAddress.name,
      consignee_mobile: String(shippingAddress.phone).trim(),
      consignee_address1: shippingAddress.address,
      consignee_pincode: String(shippingAddress.pincode).trim(),
      pick_address_id: warehouse.pick_address_id,
      express_type: "surface",
      products: orderItems.map(item => ({
        product_name: item.productName || "Product",
        product_quantity: Number(item.qty),
        product_value: Number(item.price)
      })),
      payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
      order_amount: Number(totalPayable),
      shipment_weight: ["1"], // Default 1kg
      shipment_length: ["10"],
      shipment_width: ["10"],
      shipment_height: ["10"]
    };

    // Add COD amount if applicable
    if (paymentMethod === "cod") {
      parcelxPayload.cod_amount = Number(totalPayable);
    }

    console.log("\n📤 Sending order to ParcelX...");
    console.log("Payload:", JSON.stringify(parcelxPayload, null, 2));

    // ===== CALL PARCELX API =====
    const pxRes = await parcelx.post("/order/create_order", parcelxPayload);

    console.log("✅ ParcelX Order Response:", JSON.stringify(pxRes.data, null, 2));

    // Check if AWB number received
    const awbNumber = pxRes.data?.data?.awb_number || pxRes.data?.awb_number;
    
    if (!awbNumber) {
      throw new Error("No AWB number in ParcelX response");
    }

    // ===== UPDATE ORDER WITH PARCELX DATA =====
    order.parcelx = {
      awb: awbNumber,
      courier: pxRes.data?.data?.courier_name || pxRes.data?.courier_name || "Unknown",
      response: pxRes.data
    };
    order.orderStatus = "Confirmed";
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        _id: order._id,
        orderStatus: order.orderStatus,
        totalPayable: order.totalPayable,
        paymentMethod: order.paymentMethod,
        awb_number: awbNumber,
        courier: order.parcelx.courier
      },
      tracking_url: `https://parcelx.in/track/${awbNumber}`
    });

  } catch (error) {
    console.error("\n❌ Order Creation Error:", error);
    
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        message: "ParcelX order creation failed",
        error: {
          status: error.response.status,
          data: error.response.data
        }
      });
    }
    
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
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
        message: "AWB number is required"
      });
    }

    console.log(`\n🔍 Tracking AWB: ${awb}`);

    // Pehle database mein check karo
    const order = await CustomerOrder.findOne({ "parcelx.awb": awb });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with this AWB number"
      });
    }

    // ParcelX se tracking info lo
    const response = await parcelx.get("/track-order", {
      params: { awb: awb.trim() }
    });

    console.log("✅ Track Response:", response.data);

    return res.json({
      success: true,
      order: {
        _id: order._id,
        awb: order.parcelx.awb,
        courier: order.parcelx.courier,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt
      },
      tracking: response.data
    });

  } catch (error) {
    console.error("❌ Track Error:", error);
    
    if (error.response) {
      return res.status(error.response.status).json({
        success: false,
        error: error.response.data
      });
    }
    
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* =====================================================
   5️⃣ GET COURIER RATES
===================================================== */
exports.getCourierRates = async (req, res) => {
  try {
    const { pick_address_id, delivery_pincode, weight } = req.body;

    if (!pick_address_id || !delivery_pincode || !weight) {
      return res.status(400).json({
        success: false,
        message: "pick_address_id, delivery_pincode, and weight are required"
      });
    }

    console.log("\n💰 Getting courier rates...");
    console.log("Request:", { pick_address_id, delivery_pincode, weight });

    const response = await parcelx.post("/courier/serviceability", {
      pick_address_id: Number(pick_address_id),
      delivery_pincode: String(delivery_pincode).trim(),
      weight: Number(weight),
      payment_mode: "Prepaid"
    });

    return res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("❌ Courier Rates Error:", error);
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
};
