
const Product = require("../models/Product");

/* ================= GET ALL (WEBSITE) ================= */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email") // 🔥 vendor id + store
      .sort({ createdAt: -1 });

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET ONE ================= */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name")
      .populate("vendor", "_id storeName email");

    if (!product)
      return res.status(404).json({ success: false, message: "Not found" });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE (ADMIN) ================= */
exports.addProduct = async (req, res) => {
  try {
    const data = req.body;

    if (req.files?.image) data.image = req.files.image[0].path;
    if (req.files?.logo) data.logo = req.files.logo[0].path;

    // optional vendor support
    if (req.body.vendor) data.vendor = req.body.vendor;

    const product = await Product.create(data);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
exports.updateProduct = async (req, res) => {
  try {
    const data = req.body;

    if (req.files?.image) data.image = req.files.image[0].path;
    if (req.files?.logo) data.logo = req.files.logo[0].path;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Product deleted" });
};
