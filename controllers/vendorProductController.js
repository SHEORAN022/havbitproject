// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// /* ================= GET (VENDOR PANEL) ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName"); // 🔥 safe

//     res.json({ success: true, data: products });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= CREATE ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     // 🔥 store name one-time save
//     if (!vendor.storeName && req.body.restaurantName) {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     if (!vendor.storeName) {
//       return res.status(400).json({
//         needStoreName: true,
//         message: "Store name required",
//       });
//     }

//     let image = "";
//     let logo = "";
//     let gallery = [];

//     if (req.files?.image) {
//       const img = await cloudinary.uploader.upload(
//         `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString("base64")}`
//       );
//       image = img.secure_url;
//     }

//     if (req.files?.logo) {
//       const lg = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`
//       );
//       logo = lg.secure_url;
//     }

//     if (req.files?.gallery) {
//       for (let g of req.files.gallery) {
//         const up = await cloudinary.uploader.upload(
//           `data:${g.mimetype};base64,${g.buffer.toString("base64")}`
//         );
//         gallery.push(up.secure_url);
//       }
//     }

//     const product = await VendorProduct.create({
//       ...req.body,
//       image,
//       logo,
//       gallery,
//       vendor: vendor._id,
//       restaurantName: vendor.storeName,
//     });

//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= UPDATE (FIXED) ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product)
//       return res.status(404).json({ message: "Product not found" });

//     // text fields
//     Object.assign(product, req.body);

//     // 🔥 image updates
//     if (req.files?.image) {
//       const img = await cloudinary.uploader.upload(
//         `data:${req.files.image[0].mimetype};base64,${req.files.image[0].buffer.toString("base64")}`
//       );
//       product.image = img.secure_url;
//     }

//     if (req.files?.logo) {
//       const lg = await cloudinary.uploader.upload(
//         `data:${req.files.logo[0].mimetype};base64,${req.files.logo[0].buffer.toString("base64")}`
//       );
//       product.logo = lg.secure_url;
//     }

//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (let g of req.files.gallery) {
//         const up = await cloudinary.uploader.upload(
//           `data:${g.mimetype};base64,${g.buffer.toString("base64")}`
//         );
//         product.gallery.push(up.secure_url);
//       }
//     }

//     await product.save();
//     res.json({ success: true, data: product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* ================= DELETE ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   await VendorProduct.findOneAndDelete({
//     _id: req.params.id,
//     vendor: req.vendor._id,
//   });

//   res.json({ success: true, message: "Product deleted" });
// };





// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// /** Helper to upload any file **/
// const uploadFile = async (file) => {
//   const uploaded = await cloudinary.uploader.upload(
//     `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
//   );
//   return uploaded.secure_url;
// };

// /* ================= GET (VENDOR PANEL) ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name")
//       .populate("vendor", "_id storeName");

//     const vendor = await Vendor.findById(req.vendor._id);

//     res.json({
//       success: true,
//       vendorId: vendor?._id,
//       storeName: vendor?.storeName || "",
//       total: products.length,
//       data: products,
//     });
//   } catch (err) {
//     console.log("GET VENDOR PRODUCTS ERROR:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CREATE ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     // STORE NAME SET
//     if (!vendor.storeName && req.body.restaurantName) {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     if (!vendor.storeName) {
//       return res.status(400).json({
//         needStoreName: true,
//         message: "Store name required",
//       });
//     }

//     // FILES
//     let image = null,
//       logo = null,
//       gallery = [];

//     if (req.files?.image) image = await uploadFile(req.files.image[0]);
//     if (req.files?.logo) logo = await uploadFile(req.files.logo[0]);

//     if (req.files?.gallery) {
//       for (let g of req.files.gallery) {
//         gallery.push(await uploadFile(g));
//       }
//     }

//     // CREATE
//     const product = await VendorProduct.create({
//       ...req.body,
//       image,
//       logo,
//       gallery,
//       vendor: vendor._id,
//       restaurantName: vendor.storeName,
//     });

//     res.status(201).json({
//       success: true,
//       vendorId: vendor._id,
//       data: product,
//     });
//   } catch (err) {
//     console.log("CREATE ERROR:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= UPDATE ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     // TEXT UPDATE
//     Object.assign(product, req.body);

//     // IMAGE UPDATE
//     if (req.files?.image) product.image = await uploadFile(req.files.image[0]);
//     if (req.files?.logo) product.logo = await uploadFile(req.files.logo[0]);

//     // GALLERY UPDATE
//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (let g of req.files.gallery) {
//         product.gallery.push(await uploadFile(g));
//       }
//     }

//     await product.save();

//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.log("UPDATE ERROR:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= DELETE ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   try {
//     const deleted = await VendorProduct.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!deleted)
//       return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     console.log("DELETE ERROR:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };









// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const { uploadFile } = require("../helpers/cloudinaryUpload");

// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({ vendor: req.vendor._id })
//       .populate("category", "name")
//       .populate("subcategory", "name");

//     const vendor = await Vendor.findById(req.vendor._id);

//     res.json({
//       success: true,
//       vendorId: vendor?._id,
//       storeName: vendor?.storeName || "",
//       total: products.length,
//       data: products,
//     });
//   } catch (err) {
//     console.log("GET ERROR:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     if (!vendor.storeName && req.body.restaurantName) {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     if (!vendor.storeName) {
//       return res.status(400).json({ needStoreName: true });
//     }

//     let image = null,
//       logo = null,
//       gallery = [];

//     if (req.files?.image) {
//       image = await uploadFile(req.files.image[0]);
//     }

//     if (req.files?.logo) {
//       logo = await uploadFile(req.files.logo[0]);
//     }

//     if (req.files?.gallery) {
//       for (let g of req.files.gallery) {
//         gallery.push(await uploadFile(g));
//       }
//     }

//     const product = await VendorProduct.create({
//       name: req.body.name,
//       brandName: req.body.brandName,
//       phone: req.body.phone,
//       contactName: req.body.contactName,
//       description: req.body.description,
//       oldPrice: req.body.oldPrice,
//       newPrice: req.body.newPrice,
//       quality: req.body.quality,
//       stock: req.body.stock,
//       religion: req.body.religion,
//       productTypes: req.body.productTypes,
//       flavors: req.body.flavors,
//       dietPreference: req.body.dietPreference,
//       nutrition: req.body.nutrition,
//       materialTypes: req.body.materialTypes,
//       ingredients: req.body.ingredients,
//       allergenInfo: req.body.allergenInfo,
//       dietaryPreferences: req.body.dietaryPreferences,
//       cuisine: req.body.cuisine,
//       size: req.body.size,
//       State: req.body.State,
//       category: req.body.category,
//       subcategory: req.body.subcategory,
//       restaurantName: vendor.storeName,
//       image,
//       logo,
//       gallery,
//       vendor: vendor._id,
//     });

//     res.status(201).json({ success: true, data: product });
//   } catch (err) {
//     console.log("CREATE ERROR:", err.message);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product) return res.status(404).json({ success: false });

//     Object.assign(product, {
//       name: req.body.name,
//       brandName: req.body.brandName,
//       phone: req.body.phone,
//       contactName: req.body.contactName,
//       description: req.body.description,
//       oldPrice: req.body.oldPrice,
//       newPrice: req.body.newPrice,
//       quality: req.body.quality,
//       stock: req.body.stock,
//       religion: req.body.religion,
//       productTypes: req.body.productTypes,
//       flavors: req.body.flavors,
//       dietPreference: req.body.dietPreference,
//       nutrition: req.body.nutrition,
//       materialTypes: req.body.materialTypes,
//       ingredients: req.body.ingredients,
//       allergenInfo: req.body.allergenInfo,
//       dietaryPreferences: req.body.dietaryPreferences,
//       cuisine: req.body.cuisine,
//       size: req.body.size,
//       State: req.body.State,
//       category: req.body.category,
//       subcategory: req.body.subcategory,
//     });

//     if (req.files?.image) product.image = await uploadFile(req.files.image[0]);
//     if (req.files?.logo) product.logo = await uploadFile(req.files.logo[0]);

//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (let g of req.files.gallery) {
//         product.gallery.push(await uploadFile(g));
//       }
//     }

//     await product.save();

//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };


// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// async function uploadCloud(file) {
//   const base64 = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64}`;
//   const result = await cloudinary.uploader.upload(dataUri, {
//     folder: "vendor_products",
//     resource_type: "auto",
//   });
//   return result.secure_url;
// }

// exports.getVendorProducts = async (req, res) => {
//   const products = await VendorProduct.find({ vendor: req.vendor._id })
//     .populate("category", "name")
//     .populate("subcategory", "name");

//   const vendor = await Vendor.findById(req.vendor._id);

//   res.json({
//     success: true,
//     vendorId: vendor._id,
//     storeName: vendor.storeName || "",
//     data: products,
//   });
// };

// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     if (!vendor.storeName && req.body.restaurantName) {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     let image = null, logo = null, gallery = [];

//     if (req.files?.image) image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       for (let g of req.files.gallery) gallery.push(await uploadCloud(g));
//     }

//     const product = await VendorProduct.create({
//       ...req.body,
//       vendor: req.vendor._id,
//       restaurantName: vendor.storeName,
//       image, logo, gallery
//     });

//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.log("CREATE ERROR:", err);
//     res.status(500).json({ success:false, message:"Server Error" });
//   }
// };

// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({ _id:req.params.id, vendor:req.vendor._id });
//     if (!product) return res.status(404).json({ success:false, message:"Not Found" });

//     Object.assign(product, req.body);

//     if (req.files?.image) product.image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) product.logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (let g of req.files.gallery) product.gallery.push(await uploadCloud(g));
//     }

//     await product.save();

//     res.json({ success:true, data:product });
//   } catch (err) {
//     console.log("UPDATE ERROR:", err);
//     res.status(500).json({ success:false, message:"Server Error" });
//   }
// };

// exports.deleteVendorProduct = async (req, res) => {
//   await VendorProduct.deleteOne({ _id:req.params.id, vendor:req.vendor._id });
//   res.json({ success:true });
// };




const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const cloudinary = require("../config/cloudinary");
const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");

/* ================= CLOUDINARY ================= */
async function uploadCloud(file) {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "vendor_products",
    resource_type: "auto",
  });
  return result.secure_url;
}

/* ================= GET ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({ vendor: req.vendor._id })
      .populate("category", "name")
      .populate("subcategory", "name");

    const vendor = await Vendor.findById(req.vendor._id);

    res.json({
      success: true,
      vendorId: vendor._id,
      storeName: vendor.storeName || "",
      data: products,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    if (!vendor.storeName && req.body.restaurantName) {
      vendor.storeName = req.body.restaurantName;
      await vendor.save();
    }

    let image = null;
    let gallery = [];

    if (req.files?.image) image = await uploadCloud(req.files.image[0]);
    if (req.files?.gallery) {
      for (const g of req.files.gallery) {
        gallery.push(await uploadCloud(g));
      }
    }

    const product = await VendorProduct.create({
      ...req.body,
      vendor: req.vendor._id,
      restaurantName: vendor.storeName,
      image,
      gallery,
    });

    res.json({ success: true, data: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Create failed" });
  }
};

/* ================= UPDATE ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    Object.assign(product, req.body);

    if (req.files?.image) product.image = await uploadCloud(req.files.image[0]);
    if (req.files?.gallery) {
      product.gallery = [];
      for (const g of req.files.gallery) {
        product.gallery.push(await uploadCloud(g));
      }
    }

    await product.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= DELETE ================= */
exports.deleteVendorProduct = async (req, res) => {
  await VendorProduct.deleteOne({
    _id: req.params.id,
    vendor: req.vendor._id,
  });
  res.json({ success: true });
};

/* ================= CSV IMPORT ================= */
exports.importCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV required" });
  }

  const vendorId = req.vendor._id;
  const rows = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => rows.push(row))
    .on("end", async () => {
      for (const r of rows) {
        if (!r.name || !r.newPrice) continue;

        await VendorProduct.create({
          name: r.name,
          newPrice: Number(r.newPrice),
          stock: Number(r.stock) || 0,
          vendor: vendorId,
        });
      }

      fs.unlinkSync(req.file.path);
      res.json({ success: true });
    });
};

/* ================= CSV EXPORT ================= */
exports.exportCSV = async (req, res) => {
  const products = await VendorProduct.find({
    vendor: req.vendor._id,
  }).lean();

  const parser = new Parser();
  const csvData = parser.parse(products);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=products.csv");
  res.send(csvData);
};

/* ================= BULK UPDATE ================= */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Product IDs required" });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Update data required" });
    }

    // ✅ allowed fields only (security)
    const allowedFields = [
      "name",
      "brandName",
      "phone",
      "contactName",
      "description",
      "oldPrice",
      "newPrice",
      "stock",
      "quality",
      "State",
      "productTypes",
      "flavors",
      "dietPreference",
      "nutrition",
      "materialTypes",
      "ingredients",
      "allergenInfo",
      "dietaryPreferences",
      "cuisine",
      "size",
      "category",
      "subcategory",
      "restaurantName",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (data[field] !== undefined && data[field] !== "") {
        updateData[field] = data[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const result = await VendorProduct.updateMany(
      {
        _id: { $in: ids },
        vendor: req.vendor._id,
      },
      { $set: updateData }
    );

    return res.json({
      success: true,
      modified: result.modifiedCount,
    });
  } catch (err) {
    console.error("BULK UPDATE ERROR:", err);
    return res.status(500).json({ message: "Bulk update failed" });
  }
};


/* ================= BULK DELETE ================= */
// exports.bulkDelete = async (req, res) => {
//   const { ids } = req.body;

//   if (!Array.isArray(ids) || !ids.length) {
//     return res.status(400).json({ message: "IDs required" });
//   }

//   const result = await VendorProduct.deleteMany({
//     _id: { $in: ids },
//     vendor: req.vendor._id,
//   });

//   res.json({ success: true, deleted: result.deletedCount });
// };


/* ================= BULK DELETE (SAFE) ================= */
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product IDs required",
      });
    }

    const result = await VendorProduct.deleteMany({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    // ✅ SAFE LOG (number only)
    console.log("Deleted count:", result.deletedCount);

    return res.json({
      success: true,
      deleted: result.deletedCount,
    });
  } catch (err) {
    console.error("BULK DELETE ERROR:", err.message);
    return res.status(500).json({
      success: false,
      message: "Bulk delete failed",
    });
  }
};

