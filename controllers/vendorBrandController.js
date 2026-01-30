// const VendorBrand = require("../models/VendorBrand");
// const cloudinary = require("../config/cloudinary");

// /* CREATE */
// exports.createBrand = async (req, res) => {
//   const { brandName } = req.body;

//   if (!brandName) {
//     return res.status(400).json({ success: false, message: "Brand name required" });
//   }

//   const exists = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (exists) {
//     return res.status(400).json({ success: false, message: "Brand already exists" });
//   }

//   let logo = {};
//   let banner = {};

//   if (req.files?.logo) {
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`,
//       { folder: "vendor_brand/logo" }
//     );
//     logo = { url: up.secure_url, public_id: up.public_id };
//   }

//   if (req.files?.banner) {
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
//       { folder: "vendor_brand/banner" }
//     );
//     banner = { url: up.secure_url, public_id: up.public_id };
//   }

//   const brand = await VendorBrand.create({
//     vendor: req.vendor._id,
//     brandName,
//     logo,
//     banner,
//   });

//   res.status(201).json({ success: true, data: brand });
// };

// /* READ */
// exports.getBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   res.json({ success: true, data: brand });
// };

// /* UPDATE */
// exports.updateBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   if (req.body.brandName) brand.brandName = req.body.brandName;

//   if (req.files?.logo) {
//     if (brand.logo?.public_id) {
//       await cloudinary.uploader.destroy(brand.logo.public_id);
//     }
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`,
//       { folder: "vendor_brand/logo" }
//     );
//     brand.logo = { url: up.secure_url, public_id: up.public_id };
//   }

//   if (req.files?.banner) {
//     if (brand.banner?.public_id) {
//       await cloudinary.uploader.destroy(brand.banner.public_id);
//     }
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
//       { folder: "vendor_brand/banner" }
//     );
//     brand.banner = { url: up.secure_url, public_id: up.public_id };
//   }

//   await brand.save();
//   res.json({ success: true, data: brand });
// };

// /* DELETE */
// exports.deleteBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   if (brand.logo?.public_id) await cloudinary.uploader.destroy(brand.logo.public_id);
//   if (brand.banner?.public_id) await cloudinary.uploader.destroy(brand.banner.public_id);

//   await brand.deleteOne();
//   res.json({ success: true, message: "Brand deleted" });
// };

// const VendorBrand = require("../models/VendorBrand");
// const Vendor = require("../models/VendorModel");
// const cloudinary = require("../config/cloudinary");

// /* ================= CREATE ================= */
// exports.createBrand = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     // 🔥 fetch brandName from Vendor
//     const vendor = await Vendor.findById(vendorId).select("brandName");
//     if (!vendor || !vendor.brandName) {
//       return res.status(400).json({
//         success: false,
//         message: "Vendor brand name not found in profile",
//       });
//     }

//     const exists = await VendorBrand.findOne({ vendor: vendorId });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "Brand already exists",
//       });
//     }

//     let logo = {};
//     let banner = {};

//     if (req.files?.logo) {
//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/logo" }
//       );
//       logo = { url: up.secure_url, public_id: up.public_id };
//     }

//     if (req.files?.banner) {
//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/banner" }
//       );
//       banner = { url: up.secure_url, public_id: up.public_id };
//     }

//     const brand = await VendorBrand.create({
//       vendor: vendorId,
//       brandName: vendor.brandName, // ✅ AUTO
//       logo,
//       banner,
//     });

//     res.status(201).json({ success: true, data: brand });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* ================= READ ================= */
// exports.getBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   res.json({ success: true, data: brand });
// };

// /* ================= UPDATE ================= */
// exports.updateBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   // ❌ brandName update NOT allowed
//   if (req.files?.logo) {
//     if (brand.logo?.public_id) {
//       await cloudinary.uploader.destroy(brand.logo.public_id);
//     }
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
//         "base64"
//       )}`,
//       { folder: "vendor_brand/logo" }
//     );
//     brand.logo = { url: up.secure_url, public_id: up.public_id };
//   }

//   if (req.files?.banner) {
//     if (brand.banner?.public_id) {
//       await cloudinary.uploader.destroy(brand.banner.public_id);
//     }
//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
//         "base64"
//       )}`,
//       { folder: "vendor_brand/banner" }
//     );
//     brand.banner = { url: up.secure_url, public_id: up.public_id };
//   }

//   await brand.save();
//   res.json({ success: true, data: brand });
// };

// /* ================= DELETE ================= */
// exports.deleteBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   if (brand.logo?.public_id)
//     await cloudinary.uploader.destroy(brand.logo.public_id);
//   if (brand.banner?.public_id)
//     await cloudinary.uploader.destroy(brand.banner.public_id);

//   await brand.deleteOne();
//   res.json({ success: true, message: "Brand deleted successfully" });
// };





// const VendorBrand = require("../models/VendorBrand");
// const Vendor = require("../models/VendorModel");
// const cloudinary = require("../config/cloudinary");

// /* ================= VENDOR: CREATE BRAND ================= */
// exports.createBrand = async (req, res) => {
//   try {
//     const vendorId = req.vendor._id;

//     const vendor = await Vendor.findById(vendorId).select("brandName");
//     if (!vendor || !vendor.brandName) {
//       return res.status(400).json({
//         success: false,
//         message: "Vendor brand name not found in profile",
//       });
//     }

//     const exists = await VendorBrand.findOne({ vendor: vendorId });
//     if (exists) {
//       return res.status(400).json({
//         success: false,
//         message: "Brand already exists",
//       });
//     }

//     let logo = {};
//     let banner = {};

//     if (req.files?.logo) {
//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/logo" }
//       );
//       logo = { url: up.secure_url, public_id: up.public_id };
//     }

//     if (req.files?.banner) {
//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/banner" }
//       );
//       banner = { url: up.secure_url, public_id: up.public_id };
//     }

//     const brand = await VendorBrand.create({
//       vendor: vendorId,
//       brandName: vendor.brandName,
//       logo,
//       banner,
//     });

//     res.status(201).json({ success: true, data: brand });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* ================= VENDOR: GET OWN BRAND ================= */
// exports.getBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   res.json({ success: true, data: brand });
// };

// /* ================= VENDOR: UPDATE OWN BRAND ================= */
// exports.updateBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   if (req.files?.logo) {
//     if (brand.logo?.public_id) {
//       await cloudinary.uploader.destroy(brand.logo.public_id);
//     }

//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
//         "base64"
//       )}`,
//       { folder: "vendor_brand/logo" }
//     );

//     brand.logo = { url: up.secure_url, public_id: up.public_id };
//   }

//   if (req.files?.banner) {
//     if (brand.banner?.public_id) {
//       await cloudinary.uploader.destroy(brand.banner.public_id);
//     }

//     const up = await cloudinary.uploader.upload(
//       `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
//         "base64"
//       )}`,
//       { folder: "vendor_brand/banner" }
//     );

//     brand.banner = { url: up.secure_url, public_id: up.public_id };
//   }

//   await brand.save();
//   res.json({ success: true, data: brand });
// };

// /* ================= VENDOR: DELETE OWN BRAND ================= */
// exports.deleteBrand = async (req, res) => {
//   const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
//   if (!brand) {
//     return res.status(404).json({ success: false, message: "Brand not found" });
//   }

//   if (brand.logo?.public_id)
//     await cloudinary.uploader.destroy(brand.logo.public_id);

//   if (brand.banner?.public_id)
//     await cloudinary.uploader.destroy(brand.banner.public_id);

//   await brand.deleteOne();
//   res.json({ success: true, message: "Brand deleted successfully" });
// };

// /* ================= ADMIN: GET ALL VENDOR BRANDS ================= */
// exports.getAllVendorBrands = async (req, res) => {
//   try {
//     const brands = await VendorBrand.find()
//       .populate("vendor", "name email brandName")
//       .sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: brands.length,
//       data: brands,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* ================= ADMIN: GET BRAND BY VENDOR ID ================= */
// exports.getBrandByVendorId = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const brand = await VendorBrand.findOne({ vendor: vendorId }).populate(
//       "vendor",
//       "name email brandName"
//     );

//     if (!brand) {
//       return res.status(404).json({
//         success: false,
//         message: "Brand not found for this vendor",
//       });
//     }

//     res.json({ success: true, data: brand });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// /* ================= ADMIN: UPDATE BRAND BY VENDOR ID ================= */
// exports.updateBrandByVendorId = async (req, res) => {
//   try {
//     const { vendorId } = req.params;

//     const brand = await VendorBrand.findOne({ vendor: vendorId });
//     if (!brand) {
//       return res.status(404).json({
//         success: false,
//         message: "Brand not found for this vendor",
//       });
//     }

//     if (req.files?.logo) {
//       if (brand.logo?.public_id) {
//         await cloudinary.uploader.destroy(brand.logo.public_id);
//       }

//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/logo" }
//       );

//       brand.logo = { url: up.secure_url, public_id: up.public_id };
//     }

//     if (req.files?.banner) {
//       if (brand.banner?.public_id) {
//         await cloudinary.uploader.destroy(brand.banner.public_id);
//       }

//       const up = await cloudinary.uploader.upload(
//         `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString(
//           "base64"
//         )}`,
//         { folder: "vendor_brand/banner" }
//       );

//       brand.banner = { url: up.secure_url, public_id: up.public_id };
//     }

//     await brand.save();

//     res.json({
//       success: true,
//       message: "Vendor brand updated successfully",
//       data: brand,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };







const VendorBrand = require("../models/VendorBrand");
const Vendor = require("../models/VendorModel");
const cloudinary = require("../config/cloudinary");

/* ================= VENDOR: CREATE BRAND ================= */
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
      const up = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`,
        { folder: "vendor_brand/logo" }
      );
      logo = { url: up.secure_url, public_id: up.public_id };
    }

    if (req.files?.banner) {
      const up = await cloudinary.uploader.upload(
        `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
        { folder: "vendor_brand/banner" }
      );
      banner = { url: up.secure_url, public_id: up.public_id };
    }

    const brand = await VendorBrand.create({
      vendor: vendorId,
      brandName: vendor.brandName,
      logo,
      banner,
    });

    res.status(201).json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= VENDOR: GET OWN BRAND ================= */
exports.getBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
    res.json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= VENDOR: UPDATE OWN BRAND ================= */
exports.updateBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    if (req.files?.logo) {
      if (brand.logo?.public_id) {
        await cloudinary.uploader.destroy(brand.logo.public_id);
      }

      const up = await cloudinary.uploader.upload(
        `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`,
        { folder: "vendor_brand/logo" }
      );

      brand.logo = { url: up.secure_url, public_id: up.public_id };
    }

    if (req.files?.banner) {
      if (brand.banner?.public_id) {
        await cloudinary.uploader.destroy(brand.banner.public_id);
      }

      const up = await cloudinary.uploader.upload(
        `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
        { folder: "vendor_brand/banner" }
      );

      brand.banner = { url: up.secure_url, public_id: up.public_id };
    }

    await brand.save();
    res.json({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= VENDOR: DELETE BRAND ================= */
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await VendorBrand.findOne({ vendor: req.vendor._id });
    if (!brand) {
      return res.status(404).json({ success: false, message: "Brand not found" });
    }

    if (brand.logo?.public_id)
      await cloudinary.uploader.destroy(brand.logo.public_id);

    if (brand.banner?.public_id)
      await cloudinary.uploader.destroy(brand.banner.public_id);

    await brand.deleteOne();
    res.json({ success: true, message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ================= ADMIN: GET ALL BRANDS ================= */
exports.getAllVendorBrands = async (req, res) => {
  const brands = await VendorBrand.find()
    .populate("vendor", "name email brandName")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: brands });
};

/* ================= ADMIN: GET BRAND BY VENDOR ================= */
exports.getBrandByVendorId = async (req, res) => {
  const brand = await VendorBrand.findOne({ vendor: req.params.vendorId })
    .populate("vendor", "name email brandName");

  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }

  res.json({ success: true, data: brand });
};

/* ================= ADMIN: UPDATE BRAND BY VENDOR ================= */
exports.updateBrandByVendorId = async (req, res) => {
  const brand = await VendorBrand.findOne({ vendor: req.params.vendorId });
  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }

  if (req.files?.logo) {
    if (brand.logo?.public_id)
      await cloudinary.uploader.destroy(brand.logo.public_id);

    const up = await cloudinary.uploader.upload(
      `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`,
      { folder: "vendor_brand/logo" }
    );

    brand.logo = { url: up.secure_url, public_id: up.public_id };
  }

  if (req.files?.banner) {
    if (brand.banner?.public_id)
      await cloudinary.uploader.destroy(brand.banner.public_id);

    const up = await cloudinary.uploader.upload(
      `data:${req.files.banner[0].mimetype};base64,${req.files.banner[0].buffer.toString("base64")}`,
      { folder: "vendor_brand/banner" }
    );

    brand.banner = { url: up.secure_url, public_id: up.public_id };
  }

  await brand.save();
  res.json({ success: true, data: brand });
};

/* ================= PUBLIC: WEBSITE BRAND API ================= */
exports.getPublicBrandByVendorId = async (req, res) => {
  const brand = await VendorBrand.findOne({ vendor: req.params.vendorId })
    .select("brandName logo banner");

  if (!brand) {
    return res.status(404).json({ success: false, message: "Brand not found" });
  }

  res.json({ success: true, data: brand });
};

