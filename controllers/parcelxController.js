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
/* ===============================
   GET WAREHOUSES BY VENDOR
================================ */
exports.getVendorWarehouses = async (req, res) => {
  try {
    // ✅ params ki jagah middleware se lo
    const vendorId = req.vendor?._id?.toString() || req.vendor?.id?.toString();

    if (!vendorId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const warehouses = await Warehouse.find({ vendorId }).sort({ createdAt: -1 });

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

// exports.createParcelxOrder = async (req, res) => {
//   try {
//     const {
//       customer,
//       vendorId,
//       warehouseId,
//       orderItems,
//       shipment,
//       shippingAddress,
//       amount,
//       paymentMethod = "cod",
//     } = req.body;

//     /* ===================== 1. VALIDATION ===================== */
//     if (
//       !customer ||
//       !vendorId ||
//       !warehouseId ||
//       !Array.isArray(orderItems) ||
//       orderItems.length === 0 ||
//       !shipment ||
//       !shippingAddress ||
//       !amount
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     /* ===================== 2. FETCH WAREHOUSE ===================== */
//     const warehouse = await Warehouse.findById(warehouseId);
//     if (!warehouse) {
//       return res.status(404).json({
//         success: false,
//         message: "Warehouse not found",
//       });
//     }

//     /* ===================== 3. FIX ORDER ITEMS (SCHEMA SAFE) ===================== */
//     const fixedOrderItems = orderItems.map((item) => ({
//       productId: item.productId,
//       productName: item.productName,
//       qty: item.qty,
//       price: item.price,
//       vendorId: vendorId, // 🔥 REQUIRED BY ORDER ITEM SCHEMA
//     }));

//     /* ===================== 4. CREATE ORDER IN DB ===================== */
//     const order = await CustomerOrder.create({
//       customer,
//       vendorId,
//       orderItems: fixedOrderItems,
//       warehouse: warehouse._id,
//       pick_address_id: warehouse.parcelxWarehouseId, // 🔥 VERY IMPORTANT
//       shipment,
//       shippingAddress,
//       amount,
//       totalPayable: amount,
//       paymentMethod,
//       paymentStatus: paymentMethod === "cod" ? "Pending" : "Success",
//       orderStatus: "Pending",
//     });

//     /* ===================== 5. PARCELX PAYLOAD (EXACT AS DOCS) ===================== */
//     const parcelxPayload = {
//       client_order_id: order._id.toString(),

//       consignee_name: shippingAddress.name,
//       consignee_mobile: shippingAddress.phone,
//       consignee_phone: shippingAddress.phone,
//       consignee_pincode: shippingAddress.pincode,

//       consignee_address1: shippingAddress.address,
//       consignee_address2: "",
//       consignee_emailid: "",

//       pick_address_id: warehouse.parcelxWarehouseId,

//       payment_mode: paymentMethod === "cod" ? "COD" : "Prepaid",
//       cod_amount: paymentMethod === "cod" ? amount.toString() : "0",
//       order_amount: amount.toString(),

//       courier_type: 1,
//       express_type: "surface",

//       products: fixedOrderItems.map((item) => ({
//         product_sku: item.productId.toString(),
//         product_name: item.productName,
//         product_value: item.price.toString(),
//         product_quantity: item.qty.toString(),
//         product_taxper: 0,
//         product_hsnsac: "",
//         product_category: "general",
//         product_description: item.productName,
//       })),

//       shipment_weight: [shipment.weight.toString()],
//       shipment_length: [shipment.length.toString()],
//       shipment_width: [shipment.width.toString()],
//       shipment_height: [shipment.height.toString()],
//     };

//     /* ===================== 6. CREATE PARCELX ORDER ===================== */
//     const pxRes = await parcelx.post(
//       "/order/create_order", // 🔥 CORRECT ENDPOINT
//       parcelxPayload
//     );

//     if (!pxRes?.data?.status) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX order creation failed",
//         parcelx: pxRes.data,
//       });
//     }

//     /* ===================== 7. SAVE PARCELX RESPONSE ===================== */
//     order.parcelx = {
//       awb: pxRes.data.data.awb_number,
//       courier: pxRes.data.data.courier_name,
//       status: pxRes.data.data.current_status,
//       tracking_url: pxRes.data.data.tracking_url,
//       last_updated: new Date(),
//     };

//     order.parcelxOrderCreated = true;
//     order.orderStatus = "Processing";

//     await order.save();

//     /* ===================== 8. FINAL RESPONSE ===================== */
//     return res.status(201).json({
//       success: true,
//       message: "Order created & ParcelX shipment generated successfully",
//       order,
//     });

//   } catch (error) {
//     console.error(
//       "PARCELX ORDER ERROR:",
//       error.response?.data || error.message
//     );

//     return res.status(500).json({
//       success: false,
//       message: "ParcelX order creation failed",
//       error: error.response?.data || error.message,
//     });
//   }
// };
exports.createParcelxOrder = async (req, res) => {
  let order = null;

  try {
    const {
      customer,
      vendorId,
      warehouseId,
      orderItems,
      shipment,
      shippingAddress,
      amount,
      paymentMethod = "cod",
    } = req.body;

    /* ===================== 1. VALIDATION ===================== */
    if (
      !customer ||
      !vendorId ||
      !warehouseId ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0 ||
      !shipment?.weight ||
      !shipment?.length ||
      !shipment?.width ||
      !shipment?.height ||
      !shippingAddress?.name ||
      !shippingAddress?.phone ||
      !shippingAddress?.address ||
      !shippingAddress?.pincode ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* ===================== 2. FETCH WAREHOUSE ===================== */
    const warehouse = await Warehouse.findById(warehouseId);
    if (!warehouse || !warehouse.parcelxWarehouseId) {
      return res.status(404).json({
        success: false,
        message: "Warehouse or ParcelX pickup address not found",
      });
    }

    /* ===================== 3. FIX ORDER ITEMS ===================== */
    const fixedOrderItems = orderItems.map(item => ({
      productId: item.productId,
      productName: item.productName,
      qty: item.qty,
      price: item.price,
      vendorId: vendorId, // schema requirement
    }));

    /* ===================== 4. CREATE ORDER (DB FIRST) ===================== */
    order = await CustomerOrder.create({
      customer,
      vendorId,
      orderItems: fixedOrderItems,
      warehouse: warehouse._id,
      pick_address_id: warehouse.parcelxWarehouseId,
      shipment,
      shippingAddress,
      amount,
      totalPayable: amount,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Success",
      orderStatus: "Pending",
    });

    /* ===================== 5. PARCELX PAYLOAD (DOCS MATCH) ===================== */
    const parcelxPayload = {
      client_order_id: order._id.toString(),

      consignee_name: shippingAddress.name,
      consignee_mobile: shippingAddress.phone,
      consignee_phone: shippingAddress.phone,
      consignee_emailid: shippingAddress.email || "",
      consignee_pincode: shippingAddress.pincode,

      consignee_address1: shippingAddress.address,
      consignee_address2: "",
      address_type: "Home",

      pick_address_id: warehouse.parcelxWarehouseId,

      // 🔥 FIXED PAYMENT MODE
      payment_mode: paymentMethod === "cod" ? "Cod" : "Prepaid",
      cod_amount: paymentMethod === "cod" ? amount.toString() : "0",
      order_amount: amount.toString(),
      tax_amount: "0",
      extra_charges: "0",

      courier_type: 1,
      courier_code: "PXDEL01",
      express_type: "surface",

      products: fixedOrderItems.map(item => ({
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

    /* ===================== 6. CREATE PARCELX ORDER ===================== */
    const pxRes = await parcelx.post(
      "/order/create_order",
      parcelxPayload
    );

    if (!pxRes?.data?.status) {
      // ❌ rollback DB order
      await CustomerOrder.findByIdAndDelete(order._id);

      return res.status(500).json({
        success: false,
        message: "ParcelX order creation failed",
        parcelx: pxRes.data,
      });
    }

    /* ===================== 7. SAVE PARCELX RESPONSE ===================== */
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

    /* ===================== 8. SUCCESS RESPONSE ===================== */
    return res.status(201).json({
      success: true,
      message: "Order created & ParcelX shipment generated successfully",
      order,
    });

  } catch (error) {
    console.error("PARCELX ORDER ERROR:", error.response?.data || error.message);

    // rollback safety
    if (order?._id) {
      await CustomerOrder.findByIdAndDelete(order._id);
    }

    return res.status(500).json({
      success: false,
      message: "ParcelX order creation failed",
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
      return res.status(400).json({
        success: false,
        message: "AWB number is required",
      });
    }

    /* ===================== 1. CALL PARCELX TRACK API ===================== */
    const pxRes = await parcelx.get(
      `/track_order?awb=${awb}`
    );

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX tracking failed",
        parcelx: pxRes.data,
      });
    }

    const currentStatus = pxRes.data.current_status;

    /* ===================== 2. UPDATE ORDER IN DB ===================== */
    const order = await CustomerOrder.findOne({
      "parcelx.awb": awb,
    });

    if (order) {
      order.parcelx.status = currentStatus.status_title;
      order.parcelx.last_updated = new Date(
        currentStatus.event_date
      );

      // Auto order status mapping
      if (currentStatus.status_title === "delivered") {
        order.orderStatus = "Delivered";
        order.deliveredAt = new Date();
        order.paymentStatus =
          order.paymentMethod === "cod" ? "Success" : order.paymentStatus;
      }

      if (currentStatus.status_title === "cancelled") {
        order.orderStatus = "Cancelled";
        order.cancelledAt = new Date();
      }

      await order.save();
    }

    /* ===================== 3. RESPONSE ===================== */
    return res.json({
      success: true,
      parcelx_tracking: pxRes.data,
    });

  } catch (error) {
    console.error(
      "PARCELX TRACK ERROR:",
      error.response?.data || error.message
    );

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
      return res.status(400).json({
        success: false,
        message: "AWB number is required",
      });
    }

    /* ===================== CALL PARCELX API ===================== */
    const pxRes = await parcelx.get(
      `/shipments-details?awb=${awb}`
    );

    if (!pxRes?.data?.status) {
      return res.status(500).json({
        success: false,
        message: "ParcelX shipment details failed",
        parcelx: pxRes.data,
      });
    }

    /* ===================== OPTIONAL: DB SYNC ===================== */
    const order = await CustomerOrder.findOne({
      "parcelx.awb": awb,
    });

    if (order && pxRes.data.data?.status) {
      order.parcelx.status = pxRes.data.data.status;
      order.parcelx.last_updated = new Date();
      await order.save();
    }

    /* ===================== RESPONSE ===================== */
    return res.json({
      success: true,
      shipment_details: pxRes.data,
    });

  } catch (error) {
    console.error(
      "PARCELX SHIPMENT DETAILS ERROR:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "ParcelX shipment details error",
      error: error.response?.data || error.message,
    });
  }
};


// const parcelx = require("../config/parcelx");
// const Warehouse = require("../models/Warehouse");
// const CustomerOrder = require("../models/CustomerOrder");

// /* ===============================
//    CREATE WAREHOUSE
// ================================ */
// // exports.createWarehouse = async (req, res) => {
// //   try {
// //     const {
// //       vendorId,
// //       name,
// //       address,
// //       city,
// //       state,
// //       pincode,
// //       phone,
// //       contactPerson,
// //     } = req.body;

// //     // Validation
// //     if (
// //       !vendorId ||
// //       !name ||
// //       !address ||
// //       !city ||
// //       !state ||
// //       !pincode ||
// //       !phone
// //     ) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Required fields missing",
// //       });
// //     }

// //     // Duplicate check (vendor + warehouse name)
// //     const exists = await Warehouse.findOne({ vendorId, name });
// //     if (exists) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Warehouse already exists",
// //       });
// //     }

// //     // ParcelX payload (EXACT as working curl)
// //     const parcelxPayload = {
// //       address_title: name,
// //       sender_name: contactPerson || name,
// //       full_address: address,
// //       city: city,
// //       state: state,
// //       phone: phone,
// //       pincode: pincode,
// //     };

// //     // Call ParcelX
// //     const pxRes = await parcelx.post(
// //       "/create_warehouse",
// //       parcelxPayload
// //     );

// //     if (!pxRes?.data?.status) {
// //       return res.status(500).json({
// //         success: false,
// //         message: "ParcelX warehouse creation failed",
// //         parcelx: pxRes.data,
// //       });
// //     }

// //     // ✅ CORRECT KEY FROM PARCELX
// //     const parcelxWarehouseId = pxRes.data?.data?.pick_address_id;

// //     if (!parcelxWarehouseId) {
// //       return res.status(500).json({
// //         success: false,
// //         message: "ParcelX warehouse ID not received",
// //       });
// //     }

// //     // Save in DB
// //     const warehouse = await Warehouse.create({
// //       vendorId,
// //       parcelxWarehouseId,
// //       name,
// //       address,
// //       city,
// //       state,
// //       pincode,
// //       phone,
// //       contactPerson,
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "Warehouse created successfully",
// //       warehouse,
// //     });
// //   } catch (error) {
// //     console.error(
// //       "WAREHOUSE ERROR:",
// //       error.response?.data || error.message
// //     );

// //     return res.status(500).json({
// //       success: false,
// //       message: "Warehouse creation failed",
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // };
// exports.createWarehouse = async (req, res) => {
//   try {
//     // 🔑 vendorId TOKEN se lo
//     const vendorId = req.vendor._id;

//     const {
//       name,
//       address,
//       city,
//       state,
//       pincode,
//       phone,
//       contactPerson,
//     } = req.body;

//     // ✅ vendorId validation hata do
//     if (!name || !address || !city || !state || !pincode || !phone) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     const exists = await Warehouse.findOne({ vendorId, name });
//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "Warehouse already exists",
//       });
//     }

//     // const parcelxPayload = {
//     //   address_title: name,
//     //   sender_name: contactPerson || name,
//     //   full_address: address,
//     //   city,
//     //   state,
//     //   phone,
//     //   pincode,
//     // };
//      const parcelxPayload = {
//   address_title: name.trim(),
//   sender_name: (contactPerson || name).trim(),
//   full_address: address.trim(),
//   city: city.trim(),
//   state: state.trim(),
//   phone: phone.toString(),
//   pincode: pincode.toString(),
// };

//     const pxRes = await parcelx.post("/create_warehouse", parcelxPayload);

//     if (!pxRes?.data?.status) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX warehouse creation failed",
//         parcelx: pxRes.data,
//       });
//     }

//     const parcelxWarehouseId = pxRes.data.data.pick_address_id;
// if (!parcelxWarehouseId) {
//   return res.status(400).json({
//     success: false,
//     message: "ParcelX pickup address not generated",
//     parcelx: pxRes.data,
//   });
// }
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
//       warehouse,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// /* ===============================
//    GET WAREHOUSES BY VENDOR
// ================================ */
// // exports.getVendorWarehouses = async (req, res) => {
// //   try {
// //     const { vendorId } = req.params;

// //     const warehouses = await Warehouse.find({ vendorId }).sort({
// //       createdAt: -1,
// //     });

// //     return res.json({
// //       success: true,
// //       count: warehouses.length,
// //       warehouses,
// //     });
// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       message: error.message,
// //     });
// //   }
// // };

// exports.getVendorWarehouses = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id; // 🔑 TOKEN

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
// exports.createParcelxOrder = async (req, res) => {
//   let order = null;

//   try {
//     const {
//       customer,
//       vendorId,         // ✅ Public products ke liye null aayega
//       warehouseId,      // ✅ Public products ke liye null aayega
//       isPublicOrder,    // ✅ true = platform/public product order
//       orderItems,
//       shipment,
//       shippingAddress,
//       amount,
//       couponCode,       // ✅ Optional
//       couponDiscount,   // ✅ Optional
//       subtotal,         // ✅ Optional
//       deliveryFee,      // ✅ Optional
//       platformFee,      // ✅ Optional
//       gst,              // ✅ Optional
//       paymentMethod = "cod",
//     } = req.body;

//     /* ===================== 1. VALIDATION =====================
//        ✅ FIX: vendorId aur warehouseId ab OPTIONAL hain
//                (public products ke liye null bheja jaata hai)
//                Baaki sab fields required hain
//     ============================================================ */
//     if (
//       !customer ||
//       !Array.isArray(orderItems) ||
//       orderItems.length === 0 ||
//       !shipment?.weight ||
//       !shipment?.length ||
//       !shipment?.width ||
//       !shipment?.height ||
//       !shippingAddress?.name ||
//       !shippingAddress?.phone ||
//       !shippingAddress?.address ||
//       !shippingAddress?.pincode ||
//       !amount
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing (customer, orderItems, shipment, shippingAddress, amount)",
//       });
//     }

//     // ✅ Vendor order ke liye warehouseId zaroor chahiye
//     if (vendorId && !warehouseId) {
//       return res.status(400).json({
//         success: false,
//         message: "warehouseId is required for vendor orders",
//       });
//     }

//     /* ===================== 2. WAREHOUSE RESOLVE =====================
//        ✅ FIX: Vendor order aur Public order dono handle karo

//        VENDOR ORDER  → DB se vendor ka warehouse nikalo (purana logic)
//        PUBLIC ORDER  → Platform warehouse use karo:
//                        Step 1: .env ka PLATFORM_PARCELX_WAREHOUSE_ID check karo
//                        Step 2: Nahi mila toh DB mein isDefault: true wala dhundo
//     ================================================================= */
//     let pickAddressId = null;
//     let warehouseDbId = null;

//     if (vendorId && warehouseId) {
//       // ─────────────────────────────────────────────
//       // VENDOR PRODUCT ORDER — purana logic same hai
//       // ─────────────────────────────────────────────
//       const warehouse = await Warehouse.findById(warehouseId);
//       if (!warehouse || !warehouse.parcelxWarehouseId) {
//         return res.status(404).json({
//           success: false,
//           message: "Warehouse or ParcelX pickup address not found",
//         });
//       }
//       pickAddressId = warehouse.parcelxWarehouseId;
//       warehouseDbId = warehouse._id;
//       console.log("Vendor order → warehouseId:", warehouseId, "| ParcelX pick_address_id:", pickAddressId);

//     } else {
//       // ─────────────────────────────────────────────────────────
//       // PUBLIC PRODUCT ORDER — platform warehouse use karo
//       // ─────────────────────────────────────────────────────────

//       // Option A: .env mein PLATFORM_PARCELX_WAREHOUSE_ID set karo
//       pickAddressId = process.env.PLATFORM_PARCELX_WAREHOUSE_ID;

//       // Option B: DB mein isDefault: true wala Warehouse dhundo
//       if (!pickAddressId) {
//         const platformWarehouse = await Warehouse.findOne({ isDefault: true }).sort({ createdAt: -1 });
//         if (platformWarehouse?.parcelxWarehouseId) {
//           pickAddressId = platformWarehouse.parcelxWarehouseId;
//           warehouseDbId = platformWarehouse._id;
//         }
//       }

//       // Dono options se nahi mila → error
//       if (!pickAddressId) {
//         return res.status(500).json({
//           success: false,
//           message:
//             "Platform warehouse not configured. " +
//             "SOLUTION: Set PLATFORM_PARCELX_WAREHOUSE_ID in .env file " +
//             "OR mark one Warehouse document as isDefault: true in DB.",
//         });
//       }
//       console.log("Public product order → platform warehouse pick_address_id:", pickAddressId);
//     }

//     /* ===================== 3. FIX ORDER ITEMS ===================== */
//     const fixedOrderItems = orderItems.map((item) => ({
//       productId: item.productId,
//       productName: item.productName,
//       qty: item.qty,
//       price: item.price,
//       vendorId: vendorId || null, // ✅ null for public products
//     }));

//     /* ===================== 4. CREATE ORDER IN DB FIRST ===================== */
//     order = await CustomerOrder.create({
//       customer,
//       vendorId: vendorId || null,        // ✅ null for public products
//       isPublicOrder: isPublicOrder || false, // ✅ naya field
//       orderItems: fixedOrderItems,
//       warehouse: warehouseDbId || null,  // ✅ null for public products
//       pick_address_id: pickAddressId,
//       shipment,
//       shippingAddress,
//       amount,
//       subtotal: subtotal || amount,      // ✅ breakdown fields
//       deliveryFee: deliveryFee || 0,
//       platformFee: platformFee || 0,
//       gst: gst || 0,
//       couponCode: couponCode || null,
//       couponDiscount: couponDiscount || 0,
//       totalPayable: amount,
//       paymentMethod,
//       paymentStatus: paymentMethod === "cod" ? "Pending" : "Success",
//       orderStatus: "Pending",
//     });

//     /* ===================== 5. PARCELX PAYLOAD (DOCS MATCH) ===================== */
//     const parcelxPayload = {
//       client_order_id: order._id.toString(),

//       consignee_name: shippingAddress.name,
//       consignee_mobile: shippingAddress.phone,
//       consignee_phone: shippingAddress.phone,
//       consignee_emailid: shippingAddress.email || "",
//       consignee_pincode: shippingAddress.pincode,

//       consignee_address1: shippingAddress.address,
//       consignee_address2: "",
//       address_type: "Home",

//       // ✅ Ab vendor ya platform dono ke liye sahi pick_address_id aayega
//       pick_address_id: pickAddressId,

//       // 🔥 FIXED PAYMENT MODE
//       payment_mode: paymentMethod === "cod" ? "Cod" : "Prepaid",
//       cod_amount: paymentMethod === "cod" ? amount.toString() : "0",
//       order_amount: amount.toString(),
//       tax_amount: "0",
//       extra_charges: "0",

//       courier_type: 1,
//       courier_code: "PXDEL01",
//       express_type: "surface",

//       products: fixedOrderItems.map((item) => ({
//         product_sku: item.productId.toString(),
//         product_name: item.productName,
//         product_value: item.price.toString(),
//         product_quantity: item.qty.toString(),
//         product_taxper: 0,
//         product_hsnsac: "",
//         product_category: "general",
//         product_description: item.productName,
//       })),

//       shipment_weight: [shipment.weight.toString()],
//       shipment_length: [shipment.length.toString()],
//       shipment_width: [shipment.width.toString()],
//       shipment_height: [shipment.height.toString()],
//     };

//     /* ===================== 6. CREATE PARCELX ORDER ===================== */
//     console.log("Calling ParcelX /order/create_order | pick_address_id:", pickAddressId);

//     const pxRes = await parcelx.post(
//       "/order/create_order",
//       parcelxPayload
//     );

//     if (!pxRes?.data?.status) {
//       // ❌ ParcelX fail → DB order rollback
//       await CustomerOrder.findByIdAndDelete(order._id);

//       return res.status(500).json({
//         success: false,
//         message: "ParcelX order creation failed",
//         parcelx: pxRes.data,
//       });
//     }

//     /* ===================== 7. SAVE PARCELX RESPONSE ===================== */
//     order.parcelx = {
//       awb: pxRes.data.data?.awb_number,
//       courier: pxRes.data.data?.courier_name,
//       status: pxRes.data.data?.current_status,
//       tracking_url: pxRes.data.data?.tracking_url,
//       last_updated: new Date(),
//     };

//     order.parcelxOrderCreated = true;
//     order.orderStatus = "Processing";
//     await order.save();

//     console.log("✅ Order created successfully | _id:", order._id, "| AWB:", order.parcelx?.awb);

//     /* ===================== 8. SUCCESS RESPONSE ===================== */
//     return res.status(201).json({
//       success: true,
//       message: "Order created & ParcelX shipment generated successfully",
//       order,
//     });

//   } catch (error) {
//     console.error("PARCELX ORDER ERROR:", error.response?.data || error.message);

//     // Rollback agar order DB mein ban gaya tha
//     if (order?._id) {
//       await CustomerOrder.findByIdAndDelete(order._id);
//     }

//     return res.status(500).json({
//       success: false,
//       message: "ParcelX order creation failed",
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* ===============================
//    TRACK PARCELX ORDER
// ================================ */
// exports.trackParcelxOrder = async (req, res) => {
//   try {
//     const { awb } = req.params;

//     if (!awb) {
//       return res.status(400).json({
//         success: false,
//         message: "AWB number is required",
//       });
//     }

//     /* ===================== 1. CALL PARCELX TRACK API ===================== */
//     const pxRes = await parcelx.get(
//       `/track_order?awb=${awb}`
//     );

//     if (!pxRes?.data?.status) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX tracking failed",
//         parcelx: pxRes.data,
//       });
//     }

//     const currentStatus = pxRes.data.current_status;

//     /* ===================== 2. UPDATE ORDER IN DB ===================== */
//     const order = await CustomerOrder.findOne({
//       "parcelx.awb": awb,
//     });

//     if (order) {
//       order.parcelx.status = currentStatus.status_title;
//       order.parcelx.last_updated = new Date(
//         currentStatus.event_date
//       );

//       // Auto order status mapping
//       if (currentStatus.status_title === "delivered") {
//         order.orderStatus = "Delivered";
//         order.deliveredAt = new Date();
//         order.paymentStatus =
//           order.paymentMethod === "cod" ? "Success" : order.paymentStatus;
//       }

//       if (currentStatus.status_title === "cancelled") {
//         order.orderStatus = "Cancelled";
//         order.cancelledAt = new Date();
//       }

//       await order.save();
//     }

//     /* ===================== 3. RESPONSE ===================== */
//     return res.json({
//       success: true,
//       parcelx_tracking: pxRes.data,
//     });

//   } catch (error) {
//     console.error(
//       "PARCELX TRACK ERROR:",
//       error.response?.data || error.message
//     );

//     return res.status(500).json({
//       success: false,
//       message: "ParcelX tracking error",
//       error: error.response?.data || error.message,
//     });
//   }
// };

// /* ===============================
//    GET PARCELX SHIPMENT DETAILS
// ================================ */
// exports.getParcelxShipmentDetails = async (req, res) => {
//   try {
//     const { awb } = req.params;

//     if (!awb) {
//       return res.status(400).json({
//         success: false,
//         message: "AWB number is required",
//       });
//     }

//     /* ===================== CALL PARCELX API ===================== */
//     const pxRes = await parcelx.get(
//       `/shipments-details?awb=${awb}`
//     );

//     if (!pxRes?.data?.status) {
//       return res.status(500).json({
//         success: false,
//         message: "ParcelX shipment details failed",
//         parcelx: pxRes.data,
//       });
//     }

//     /* ===================== OPTIONAL: DB SYNC ===================== */
//     const order = await CustomerOrder.findOne({
//       "parcelx.awb": awb,
//     });

//     if (order && pxRes.data.data?.status) {
//       order.parcelx.status = pxRes.data.data.status;
//       order.parcelx.last_updated = new Date();
//       await order.save();
//     }

//     /* ===================== RESPONSE ===================== */
//     return res.json({
//       success: true,
//       shipment_details: pxRes.data,
//     });

//   } catch (error) {
//     console.error(
//       "PARCELX SHIPMENT DETAILS ERROR:",
//       error.response?.data || error.message
//     );

//     return res.status(500).json({
//       success: false,
//       message: "ParcelX shipment details error",
//       error: error.response?.data || error.message,
//     });
//   }
// };
