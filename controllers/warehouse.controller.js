const axios = require("axios");
const Warehouse = require("../models/Warehouse");
const { shiprocketLogin } = require("../services/shiprocket.service");

exports.createWarehouse = async (req, res) => {
  try {
    const vendorId = req.user.id; // JWT se vendor id

    const token = await shiprocketLogin();

    const payload = {
      pickup_location: "HAVBIT_VENDOR_" + vendorId,
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

    const response = await axios.post(
      `${process.env.SHIPROCKET_BASE_URL}/settings/company/addpickup`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const warehouse = await Warehouse.create({
      vendorId,
      shiprocketWarehouseId: response.data.pickup_id,
      warehouseName: payload.pickup_location,
      email: payload.email,
      phone: payload.phone,
      city: payload.city,
      state: payload.state,
      pincode: payload.pin_code,
      address: payload.address,
    });

    res.status(201).json({
      success: true,
      message: "Warehouse created & linked with vendor",
      data: warehouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Warehouse creation failed",
      error: error.response?.data || error.message,
    });
  }
};
