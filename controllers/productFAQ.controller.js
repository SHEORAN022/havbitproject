const FAQ = require("../models/ProductFAQ.model");
const VendorProduct = require("../models/VendorProduct");

// ✅ ADD / UPDATE FAQ
exports.addFAQ = async (req, res) => {
  try {
    const { productId, faqs } = req.body;

    // 🔐 CHECK: PRODUCT BELONGS TO VENDOR
    const product = await VendorProduct.findOne({
      _id: productId,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(403).json({
        success: false,
        message: "You can only add FAQ to your own product",
      });
    }

    // MAX 4 FAQ
    if (!faqs || faqs.length === 0 || faqs.length > 4) {
      return res.status(400).json({
        success: false,
        message: "Max 4 FAQs allowed",
      });
    }

    let existing = await FAQ.findOne({
      productId,
      vendorId: req.vendor._id,
    });

    if (existing) {
      existing.faqs = faqs;
      await existing.save();
    } else {
      existing = await FAQ.create({
        productId,
        vendorId: req.vendor._id,
        faqs,
      });
    }

    res.json({
      success: true,
      message: "FAQs saved",
      data: existing,
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ GET FAQ
exports.getFAQByProduct = async (req, res) => {
  const faq = await FAQ.findOne({
    productId: req.params.productId,
  });

  res.json({
    success: true,
    data: faq?.faqs || [],
  });
};
