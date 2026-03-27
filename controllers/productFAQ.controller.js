// const FAQ = require("../models/ProductFAQ.model");
// const VendorProduct = require("../models/VendorProduct");

// // ✅ ADD / UPDATE FAQ
// exports.addFAQ = async (req, res) => {
//   try {
//     const { productId, faqs } = req.body;

//     // 🔐 CHECK: PRODUCT BELONGS TO VENDOR
//     const product = await VendorProduct.findOne({
//       _id: productId,
//       vendor: req.vendor._id,
//     });

//     if (!product) {
//       return res.status(403).json({
//         success: false,
//         message: "You can only add FAQ to your own product",
//       });
//     }

//     // MAX 4 FAQ
//     if (!faqs || faqs.length === 0 || faqs.length > 4) {
//       return res.status(400).json({
//         success: false,
//         message: "Max 4 FAQs allowed",
//       });
//     }

//     let existing = await FAQ.findOne({
//       productId,
//       vendorId: req.vendor._id,
//     });

//     if (existing) {
//       existing.faqs = faqs;
//       await existing.save();
//     } else {
//       existing = await FAQ.create({
//         productId,
//         vendorId: req.vendor._id,
//         faqs,
//       });
//     }

//     res.json({
//       success: true,
//       message: "FAQs saved",
//       data: existing,
//     });

//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };

// // ✅ GET FAQ
// exports.getFAQByProduct = async (req, res) => {
//   const faq = await FAQ.findOne({
//     productId: req.params.productId,
//   });

//   res.json({
//     success: true,
//     data: faq?.faqs || [],
//   });
// };



const FAQ          = require("../models/ProductFAQ.model");
const VendorProduct = require("../models/VendorProduct");
 
// ── helpers ───────────────────────────────────────────────────
const ownsProduct = async (productId, vendorId) =>
  VendorProduct.findOne({ _id: productId, vendor: vendorId });
 
const validateFaqs = (faqs) =>
  Array.isArray(faqs) && faqs.length > 0 && faqs.length <= 4;
 
// ── CREATE  POST /api/faqs ────────────────────────────────────
exports.addFAQ = async (req, res) => {
  try {
    const { productId, faqs } = req.body;
 
    const product = await ownsProduct(productId, req.vendor._id);
    if (!product)
      return res.status(403).json({ success: false, message: "Product does not belong to you" });
 
    if (!validateFaqs(faqs))
      return res.status(400).json({ success: false, message: "Provide 1 – 4 FAQs" });
 
    // Upsert: one FAQ doc per product per vendor
    let existing = await FAQ.findOne({ productId, vendorId: req.vendor._id });
 
    if (existing) {
      existing.faqs = faqs;
      await existing.save();
    } else {
      existing = await FAQ.create({ productId, vendorId: req.vendor._id, faqs });
    }
 
    await existing.populate("productId", "name");
 
    return res.status(201).json({ success: true, message: "FAQs saved", data: existing });
  } catch (err) {
    console.error("addFAQ:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ── READ ALL (vendor)  GET /api/faqs/vendor/all ───────────────
exports.getAllVendorFAQs = async (req, res) => {
  try {
    const data = await FAQ.find({ vendorId: req.vendor._id })
      .populate("productId", "name images")
      .sort({ updatedAt: -1 });
 
    return res.json({ success: true, data });
  } catch (err) {
    console.error("getAllVendorFAQs:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ── READ ONE (by record id)  GET /api/faqs/:id ────────────────
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findOne({ _id: req.params.id, vendorId: req.vendor._id })
      .populate("productId", "name");
 
    if (!faq)
      return res.status(404).json({ success: false, message: "Not found" });
 
    return res.json({ success: true, data: faq });
  } catch (err) {
    console.error("getFAQById:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ── READ (by product id – public)  GET /api/faqs/product/:productId ──
exports.getFAQByProduct = async (req, res) => {
  try {
    const faq = await FAQ.findOne({ productId: req.params.productId });
    return res.json({ success: true, data: faq?.faqs || [] });
  } catch (err) {
    console.error("getFAQByProduct:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ── UPDATE  PUT /api/faqs/:id ─────────────────────────────────
exports.updateFAQ = async (req, res) => {
  try {
    const { faqs } = req.body;
 
    if (!validateFaqs(faqs))
      return res.status(400).json({ success: false, message: "Provide 1 – 4 FAQs" });
 
    const faq = await FAQ.findOne({ _id: req.params.id, vendorId: req.vendor._id });
 
    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ record not found" });
 
    faq.faqs = faqs;
    await faq.save();
    await faq.populate("productId", "name");
 
    return res.json({ success: true, message: "FAQs updated", data: faq });
  } catch (err) {
    console.error("updateFAQ:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
 
// ── DELETE  DELETE /api/faqs/:id ─────────────────────────────
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findOneAndDelete({ _id: req.params.id, vendorId: req.vendor._id });
 
    if (!faq)
      return res.status(404).json({ success: false, message: "FAQ record not found" });
 
    return res.json({ success: true, message: "FAQs deleted" });
  } catch (err) {
    console.error("deleteFAQ:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
