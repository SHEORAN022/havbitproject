const parcelx = require("../config/parcelx");
const Warehouse = require("../models/Warehouse");

exports.createWarehouse = async (req, res) => {
  try {
    if (!req.vendor || !req.vendor._id) {
      return res.status(401).json({
        success: false,
        message: "Vendor authentication failed",
      });
    }

    const vendorId = req.vendor._id;

    const {
      address_title,
      sender_name,
      full_address,
      phone,
      city,
      state,
      pincode,
      country,
    } = req.body;

    // Validation
    if (
      !address_title || !sender_name || !full_address ||
      !phone || !city || !state || !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All warehouse fields are required",
      });
    }

    // Duplicate check (vendor + pincode)
    const exists = await Warehouse.findOne({ vendorId, pincode: String(pincode) });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Warehouse already exists for this pincode",
      });
    }

    // ParcelX API
    const pxRes = await parcelx.post("/warehouse/create", {
      address_title,
      sender_name,
      full_address,
      phone: String(phone),
      city,
      state,
      pincode: String(pincode),
      country: country || "India",
    });

    const pick_address_id = pxRes?.data?.data?.pick_address_id;
    if (!pick_address_id) {
      return res.status(400).json({
        success: false,
        message: "ParcelX warehouse creation failed",
        parcelx: pxRes?.data,
      });
    }

    // Save in DB
    const warehouse = await Warehouse.create({
      vendorId,
      address_title,
      sender_name,
      full_address,
      phone: String(phone),
      city,
      state,
      pincode: String(pincode),
      country: country || "India",
      pick_address_id: String(pick_address_id),
    });

    return res.status(201).json({
      success: true,
      message: "ParcelX warehouse created",
      data: warehouse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

