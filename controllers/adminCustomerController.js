


const Customer = require("../models/customerModel");
const bcrypt = require("bcryptjs");

// GET all customers with pagination
exports.getCustomers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Customer.countDocuments();
    const customers = await Customer.find()
      .select("-password") // never send password
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      customers,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ADD customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = await Customer.create({ name, email, phone, password: hashedPassword });

    res.status(201).json({ success: true, customer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// UPDATE customer
exports.updateCustomer = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updateData = { ...rest };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");

    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, customer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

    res.json({ success: true, message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
