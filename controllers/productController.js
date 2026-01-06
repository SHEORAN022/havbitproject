
// const Product = require("../models/Product");
// const { Parser } = require("json2csv");

// /* GET ALL */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* GET BY ID */
// exports.getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id)
//     .populate("category")
//     .populate("subcategory");

//   if (!product)
//     return res.status(404).json({ success: false, message: "Not found" });

//   res.json({ success: true, data: product });
// };

// /* ADD */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.create(data);
//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* UPDATE */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = req.body;

//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* DELETE */
// exports.deleteProduct = async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: "Deleted" });
// };

// /* EXPORT CSV */
// exports.exportProductsCSV = async (req, res) => {
//   const products = await Product.find().lean();
//   const parser = new Parser();
//   const csv = parser.parse(products);

//   res.header("Content-Type", "text/csv");
//   res.attachment("products.csv");
//   res.send(csv);
// };






// const Product = require("../models/Product");
// const { Parser } = require("json2csv");
// const fs = require("fs");

// /* GET ALL PRODUCTS */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .sort({ createdAt: -1 });
//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* GET PRODUCT BY ID */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate("subcategory", "name");
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });
//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ADD PRODUCT */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.create(data);
//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* UPDATE PRODUCT */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });
//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* DELETE PRODUCT */
// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* EXPORT CSV */
// exports.exportProductsCSV = async (req, res) => {
//   try {
//     const products = await Product.find().populate("category", "name").populate("subcategory", "name").lean();
//     if (!products.length) return res.status(400).json({ message: "No products found" });

//     const parser = new Parser();
//     const csv = parser.parse(products);

//     res.header("Content-Type", "text/csv");
//     res.attachment("products.csv");
//     res.send(csv);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };





// const Product = require("../models/Product");
// const { Parser } = require("json2csv");

// /* GET ALL PRODUCTS */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find()
//       .populate("category", "name")
//       .populate({
//         path: "subcategory",
//         select: "name parent",
//         populate: {
//           path: "parent",
//           select: "name"
//         }
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* GET BY ID */
// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id)
//       .populate("category", "name")
//       .populate({
//         path: "subcategory",
//         populate: { path: "parent", select: "name" }
//       });

//     if (!product)
//       return res.status(404).json({ success: false, message: "Not found" });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ADD */
// exports.addProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.create(data);
//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* UPDATE */
// exports.updateProduct = async (req, res) => {
//   try {
//     const data = req.body;
//     if (req.files?.image) data.image = req.files.image[0].path;
//     if (req.files?.logo) data.logo = req.files.logo[0].path;

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       data,
//       { new: true }
//     );

//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* DELETE */
// exports.deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* EXPORT CSV */
// exports.exportProductsCSV = async (req, res) => {
//   const products = await Product.find().lean();
//   const parser = new Parser();
//   const csv = parser.parse(products);

//   res.header("Content-Type", "text/csv");
//   res.attachment("products.csv");
//   res.send(csv);
// };





const Product = require("../models/Product");

/* GET ALL */
exports.getProducts = async (req, res) => {
  const products = await Product.find()
    .populate("category", "name")
    .populate("subcategory", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: products });
};

/* GET ONE */
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category", "name")
    .populate("subcategory", "name");

  if (!product) {
    return res.status(404).json({ success: false, message: "Not found" });
  }

  res.json({ success: true, data: product });
};

/* CREATE */
exports.addProduct = async (req, res) => {
  const data = req.body;

  if (req.files?.image) data.image = req.files.image[0].path;
  if (req.files?.logo) data.logo = req.files.logo[0].path;

  const product = await Product.create(data);
  res.status(201).json({ success: true, data: product });
};

/* UPDATE */
exports.updateProduct = async (req, res) => {
  const data = req.body;

  if (req.files?.image) data.image = req.files.image[0].path;
  if (req.files?.logo) data.logo = req.files.logo[0].path;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );

  res.json({ success: true, data: product });
};

/* DELETE */
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Product deleted" });
};
