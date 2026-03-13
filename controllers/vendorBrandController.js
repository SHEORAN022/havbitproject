const VendorBrand = require("../models/VendorBrand");
const Vendor = require("../models/VendorModel");
const cloudinary = require("../config/cloudinary");

/* =========================================================
   VENDOR CONTROLLERS
   ========================================================= */

/* ================= CREATE BRAND (VENDOR) ================= */
exports.createBrand = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const vendor = await Vendor.findById(vendorId).select("brandName");
    if (!vendor || !vendor.brandName) {
      return res.status(400).json({
        success: false,
        message: "Vendor brand name not found in profile",
      });
    }

    const exists = await VendorBrand.findOne({ vendor: vendorId });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Brand already exists",
      });
    }

    let logo = {};
    let banner = {};

    if (req.files?.logo) {
      const uploadLogo = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/logo" }
      );
      logo = {
        url: uploadLogo.secure_url,
        public_id: uploadLogo.public_id,
      };
    }

    if (req.files?.banner) {
      const uploadBanner = await cloudinary.uploader.upload(
        `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/banner" }
      );
      banner = {
        url: uploadBanner.secure_url,
        public_id: uploadBanner.public_id,
      };
    }

    const brand = await VendorBrand.create({
      vendor: vendorId,
      brandName: vendor.brandName,
      logo,
      banner,
    });

    res.status(201).json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("createBrand error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= GET OWN BRAND (VENDOR) ================= */
exports.getBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("getBrand error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= UPDATE OWN BRAND (VENDOR) ================= */
exports.updateBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    if (req.files?.logo) {
      if (brand.logo?.public_id) {
        await cloudinary.uploader.destroy(brand.logo.public_id);
      }

      const uploadLogo = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/logo" }
      );

      brand.logo = {
        url: uploadLogo.secure_url,
        public_id: uploadLogo.public_id,
      };
    }

    if (req.files?.banner) {
      if (brand.banner?.public_id) {
        await cloudinary.uploader.destroy(brand.banner.public_id);
      }

      const uploadBanner = await cloudinary.uploader.upload(
        `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/banner" }
      );

      brand.banner = {
        url: uploadBanner.secure_url,
        public_id: uploadBanner.public_id,
      };
    }

    await brand.save();

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("updateBrand error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= DELETE BRAND (VENDOR) ================= */
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    if (brand.logo?.public_id) {
      await cloudinary.uploader.destroy(brand.logo.public_id);
    }

    if (brand.banner?.public_id) {
      await cloudinary.uploader.destroy(brand.banner.public_id);
    }

    await brand.deleteOne();

    res.json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (err) {
    console.error("deleteBrand error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   ADMIN CONTROLLERS
   ========================================================= */

/* ================= ADMIN: GET ALL BRANDS ================= */
exports.getAllVendorBrands = async (req, res) => {
  try {
    const brands = await VendorBrand.find()
      .populate("vendor", "name email brandName")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: brands,
    });
  } catch (err) {
    console.error("getAllVendorBrands error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= ADMIN: GET BRAND BY VENDOR ================= */
exports.getBrandByVendorId = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({
      vendor: req.params.vendorId,
    }).populate("vendor", "name email brandName");

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("getBrandByVendorId error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= ADMIN: UPDATE BRAND BY VENDOR ================= */
exports.updateBrandByVendorId = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({
      vendor: req.params.vendorId,
    });

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    if (req.files?.logo) {
      if (brand.logo?.public_id) {
        await cloudinary.uploader.destroy(brand.logo.public_id);
      }

      const uploadLogo = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/logo" }
      );

      brand.logo = {
        url: uploadLogo.secure_url,
        public_id: uploadLogo.public_id,
      };
    }

    if (req.files?.banner) {
      if (brand.banner?.public_id) {
        await cloudinary.uploader.destroy(brand.banner.public_id);
      }

      const uploadBanner = await cloudinary.uploader.upload(
        `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
          "base64"
        )}`,
        { folder: "vendor_brand/banner" }
      );

      brand.banner = {
        url: uploadBanner.secure_url,
        public_id: uploadBanner.public_id,
      };
    }

    await brand.save();

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("updateBrandByVendorId error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================================================
   PUBLIC CONTROLLERS (WEBSITE)
   ========================================================= */

/* ================= PUBLIC: ALL VENDORS ================= */
exports.getAllPublicBrands = async (req, res) => {
  try {
    const brands = await VendorBrand.find()
      .select("brandName logo banner vendor")
      .populate("vendor", "name");

    res.json({
      success: true,
      data: brands,
    });
  } catch (err) {
    console.error("getAllPublicBrands error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= PUBLIC: SINGLE VENDOR ================= */
exports.getPublicBrandByVendorId = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({
      vendor: req.params.vendorId,
    }).select("brandName logo banner");

    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (err) {
    console.error("getPublicBrandByVendorId error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

