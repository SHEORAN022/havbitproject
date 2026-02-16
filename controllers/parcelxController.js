const parcelx = require("../config/parcelx");

/* =====================================================
   1️⃣ CREATE WAREHOUSE (DYNAMIC)
===================================================== */
exports.createWarehouse = async (req, res) => {
  try {
    const {
      warehouse_name,
      contact_person,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      country,
    } = req.body;

    if (
      !warehouse_name ||
      !contact_person ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "All warehouse fields are required",
      });
    }

    const response = await parcelx.post("/create_warehouse", {
      warehouse_name,
      contact_person,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      country,
    });

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
   2️⃣ CREATE ORDER (DYNAMIC)
===================================================== */
exports.createOrder = async (req, res) => {
  try {
    const {
      order_id,
      warehouse_id,
      customer_name,
      customer_phone,
      customer_email,
      address,
      city,
      state,
      pincode,
      payment_mode,
      order_amount,
      weight,
      length,
      breadth,
      height,
    } = req.body;

    if (
      !order_id ||
      !warehouse_id ||
      !customer_name ||
      !customer_phone ||
      !address ||
      !city ||
      !state ||
      !pincode ||
      !payment_mode ||
      !order_amount ||
      !weight
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields",
      });
    }

    const response = await parcelx.post("/order/create_order", {
      order_id,
      warehouse_id,
      customer_name,
      customer_phone,
      customer_email,
      address,
      city,
      state,
      pincode,
      payment_mode,
      order_amount,
      weight,
      length,
      breadth,
      height,
    });

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
