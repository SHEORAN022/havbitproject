const parcelx = require("../config/parcelx");
const Warehouse = require("../models/Warehouse");

exports.createWarehouse = async (req, res) => {
  try {
    // 🔥 VendorId token se lo (body se nahi)
    const vendorId = req.vendor?.id;
    if (!vendorId) {
      return res.status(401).json({
        success: false,
        message: "Vendor authentication failed",
      });
    }

    const {
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
      country = "India"
    } = req.body;

    // ===== VALIDATION =====
    const errors = [];
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

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone must be 10 digits"
      });
    }

    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        message: "Pincode must be 6 digits"
      });
    }

    // ===== DUPLICATE CHECK =====
    const existing = await Warehouse.findOne({ vendorId, pincode });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Warehouse already exists for this pincode"
      });
    }

    // ===== PARCELX API CALL =====
    const pxRes = await parcelx.post("/pickup-location/create", {
      address_title,
      sender_name,
      full_address,
      phone: phone.trim(),
      pincode: pincode.trim(),
      country
    });

    const pick_address_id =
      pxRes.data.data?.pick_address_id || pxRes.data.pick_address_id;

    if (!pick_address_id) {
      return res.status(400).json({
        success: false,
        message: "ParcelX warehouse creation failed",
        parcelx_response: pxRes.data
      });
    }

    // ===== SAVE IN DATABASE =====
    const warehouse = await Warehouse.create({
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone,
      pincode,
      country,
      pick_address_id,
      is_active: true
    });

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
      parcelx: pxRes.data
    });

  } catch (error) {
    console.error("❌ Warehouse Creation Error:", error.response?.data || error.message);

    // ParcelX API error
    if (error.response) {
      return res.status(error.response.status || 500).json({
        success: false,
        message: "ParcelX API Error",
        error: error.response.data
      });
    }

    // Other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
