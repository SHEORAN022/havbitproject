

// const Customer = require("../models/customerModel");
// const bcrypt = require("bcryptjs");

// // GET customers
// exports.getCustomers = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 5;
//     const skip = (page - 1) * limit;

//     const customers = await Customer.find({ vendor: req.vendor._id })
//       .select("-password")
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     const total = await Customer.countDocuments({ vendor: req.vendor._id });

//     res.json({
//       success: true,
//       customers,
//       totalPages: Math.ceil(total / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE customer
// exports.createCustomer = async (req, res) => {
//   try {
//     const { name, email, phone, password } = req.body;
//     if (!name || !email || !phone || !password)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const exists = await Customer.findOne({
//       vendor: req.vendor._id,
//       $or: [{ email }, { phone }],
//     });

//     if (exists) return res.status(400).json({ success: false, message: "Customer already exists" });

//     const customer = await Customer.create({ vendor: req.vendor._id, name, email, phone, password });
//     res.status(201).json({ success: true, message: "Customer added", customer });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE customer
// exports.updateCustomer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, email, phone, password } = req.body;

//     const customer = await Customer.findOne({ _id: id, vendor: req.vendor._id }).select("+password");
//     if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

//     if (name) customer.name = name;
//     if (email) customer.email = email;
//     if (phone) customer.phone = phone;
//     if (password) customer.password = await bcrypt.hash(password, 10);

//     await customer.save();
//     res.json({ success: true, message: "Customer updated" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE customer
// exports.deleteCustomer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const customer = await Customer.findOneAndDelete({ _id: id, vendor: req.vendor._id });
//     if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });

//     res.json({ success: true, message: "Customer deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
