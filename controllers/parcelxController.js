const parcelx = require("../config/parcelx");


exports.createWarehouse = async (req, res) => {
  try {
    const {
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (
      !address_title ||
      !sender_name ||
      !full_address ||
      !phone ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message:
          "address_title, sender_name, full_address, phone and pincode are required",
      });
    }

    /* ============== PARCELX PAYLOAD ============== */
    const parcelxPayload = {
      address_title: address_title,   // required
      sender_name: sender_name,       // required
      full_address: full_address,     // required
      phone: phone,                   // required
      pincode: pincode,               // required
    };

    // Debug (optional – remove later)
    console.log("ParcelX Create Warehouse Payload:", parcelxPayload);

    /* ============== API CALL ===================== */
    const response = await parcelx.post(
      "/create_warehouse",
      parcelxPayload
    );

    /* ============== SUCCESS RESPONSE ============= */
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    /* ============== ERROR HANDLING =============== */
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};


exports.createOrder = async (req, res) => {
  try {
    const {
      client_order_id,
      consignee_emailid,
      consignee_pincode,
      consignee_mobile,
      consignee_phone,
      consignee_address1,
      consignee_address2,
      consignee_name,
      invoice_number,
      express_type,
      pick_address_id,
      return_address_id,
      cod_amount,
      tax_amount,
      mps,
      courier_type,
      courier_code,
      products,
      address_type,
      payment_mode,
      order_amount,
      extra_charges,
      shipment_width,
      shipment_height,
      shipment_length,
      shipment_weight,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (
      !client_order_id ||
      !consignee_pincode ||
      !consignee_mobile ||
      !consignee_address1 ||
      !consignee_name ||
      !pick_address_id ||
      !products ||
      !shipment_weight
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields",
      });
    }

    /* ============== PARCELX PAYLOAD (EXACT) ============== */
    const parcelxPayload = {
      client_order_id,
      consignee_emailid: consignee_emailid || "",
      consignee_pincode,
      consignee_mobile,
      consignee_phone: consignee_phone || "",
      consignee_address1,
      consignee_address2: consignee_address2 || "",
      consignee_name,
      invoice_number,
      express_type,
      pick_address_id,
      return_address_id: return_address_id || "",
      cod_amount: cod_amount || "0",
      tax_amount: tax_amount || "0",
      mps: mps || "0",
      courier_type,
      courier_code,
      products,
      address_type,
      payment_mode,
      order_amount,
      extra_charges: extra_charges || "0",
      shipment_width,
      shipment_height,
      shipment_length,
      shipment_weight,
    };

    // 🔍 Debug (remove later)
    console.log("ParcelX Create Order Payload:", parcelxPayload);

    /* ============== API CALL ===================== */
    const response = await parcelx.post(
      "/order/create_order",
      parcelxPayload
    );

    /* ============== SUCCESS RESPONSE ============= */
    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    /* ============== ERROR HANDLING =============== */
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

/* =====================================================
   3️⃣ TRACK ORDER (DYNAMIC)
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

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

/* =====================================================
   4️⃣ SHIPMENT DETAILS (DYNAMIC)
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

    const response = await parcelx.get(
      `/shipments-details?awb=${awb}`
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};
