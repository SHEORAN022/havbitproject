const axios = require("axios");
const Warehouse = require("../models/Warehouse");
const { shiprocketLogin } = require("../services/shiprocket.service");

exports.createWarehouse = async (req, res) => {
  try {
    /* ================= AUTH SAFETY CHECK ================= */
    if (!req.vendor || !req.vendor._id) {
      return res.status(401).json({
        success: false,
        message: "Vendor authentication failed",
      });
    }

    const vendorId = req.vendor._id.toString(); // 🔥 FIXED

    /* ================= SHIPROCKET LOGIN ================= */
    const token = await shiprocketLogin();

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Shiprocket token generation failed",
      });
    }

    /* ================= UNIQUE PICKUP LOCATION ================= */
    const pickupLocation = `HAVBIT_VENDOR_${vendorId}_${Date.now()}`;

    /* ================= PAYLOAD ================= */
    const payload = {
      pickup_location: pickupLocation,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      address_2: req.body.address2 || "",
      city: req.body.city,
      state: req.body.state,
      country: "India",
      pin_code: req.body.pincode,
    };

    /* ================= SHIPROCKET API CALL ================= */
    const response = await axios.post(
      `${process.env.SHIPROCKET_BASE_URL}/settings/company/addpickup`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    /* ================= VALIDATE RESPONSE ================= */
    if (!response.data || !response.data.pickup_id) {
      return res.status(500).json({
        success: false,
        message: "Invalid response from Shiprocket",
        data: response.data,
      });
    }

    /* ================= SAVE IN DB ================= */
    const warehouse = await Warehouse.create({
      vendorId,
      shiprocketWarehouseId: response.data.pickup_id,
      warehouseName: pickupLocation,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      state: payload.state,
      pincode: payload.pin_code,
      address: payload.address,
    });

    /* ================= SUCCESS RESPONSE ================= */
    return res.status(201).json({
      success: true,
      message: "Warehouse created & linked with vendor",
      data: warehouse,
    });
  } catch (error) {
    console.error("WAREHOUSE CREATE ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Warehouse creation failed",
      error: error.response?.data || error.message,
    });
  }
};
