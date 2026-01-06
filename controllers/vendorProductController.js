

const VendorProduct = require("../models/VendorProduct");

/* GET ALL PRODUCTS */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
      .populate("category", "_id name")
      .populate("subcategory", "_id name parent");

    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE PRODUCT */
exports.createVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.create({
      ...req.body,
      vendor: req.vendor._id,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATE PRODUCT */
exports.updateVendorProduct = async (req, res) => {
  try {
    const updated = await VendorProduct.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    // based on the user's language preference (Hindi Hinglish)
    res.status(400).json({ message: err.message });
  }
};

/* DELETE PRODUCT */
exports.deleteVendorProduct = async (req, res) => {
  try {
    const deleted = await VendorProduct.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!deleted)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
