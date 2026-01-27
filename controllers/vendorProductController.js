




// const VendorProduct = require("../models/VendorProduct");
// const Vendor = require("../models/Vendor");
// const cloudinary = require("../config/cloudinary");

// const csv = require("csv-parser");
// const fs = require("fs");
// const { Parser } = require("json2csv");

// /* ================= CLOUDINARY UPLOAD ================= */
// async function uploadCloud(file) {
//   const base64 = file.buffer.toString("base64");
//   const dataUri = `data:${file.mimetype};base64,${base64}`;
//   const result = await cloudinary.uploader.upload(dataUri, {
//     folder: "vendor_products",
//     resource_type: "auto",
//   });
//   return result.secure_url;
// }

// /* ================= GET PRODUCTS ================= */
// exports.getVendorProducts = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     })
//       .populate("category", "name")
//       .populate("subcategory", "name");

//     const vendor = await Vendor.findById(req.vendor._id);

//     res.json({
//       success: true,
//       vendorId: vendor._id,
//       storeName: vendor.storeName || "",
//       data: products,
//     });
//   } catch (err) {
//     console.error("Get products error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CREATE PRODUCT - UPDATED ================= */
// exports.createVendorProduct = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.vendor._id);

//     // FIX: Always save shop name if provided in request
//     // Remove the condition that checks if vendor.storeName is empty
//     if (req.body.restaurantName && req.body.restaurantName.trim() !== "") {
//       vendor.storeName = req.body.restaurantName;
//       await vendor.save();
//     }

//     let image = null,
//       logo = null,
//       gallery = [];

//     if (req.files?.image) image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       for (const g of req.files.gallery) {
//         gallery.push(await uploadCloud(g));
//       }
//     }

//     // IMPORTANT: Use vendor's storeName for restaurantName
//     // This ensures all products have consistent shop name
//     const restaurantNameToUse = vendor.storeName || req.body.restaurantName || "";

//     const product = await VendorProduct.create({
//       ...req.body,
//       vendor: req.vendor._id,
//       restaurantName: restaurantNameToUse, // Use saved store name
//       image,
//       logo,
//       gallery,
//     });

//     res.json({ 
//       success: true, 
//       data: product,
//       storeName: vendor.storeName // Send back updated store name
//     });
//   } catch (err) {
//     console.error("Create product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= UPDATE PRODUCT ================= */
// exports.updateVendorProduct = async (req, res) => {
//   try {
//     const product = await VendorProduct.findOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Not Found" });
//     }

//     Object.assign(product, req.body);

//     if (req.files?.image) product.image = await uploadCloud(req.files.image[0]);
//     if (req.files?.logo) product.logo = await uploadCloud(req.files.logo[0]);

//     if (req.files?.gallery) {
//       product.gallery = [];
//       for (const g of req.files.gallery) {
//         product.gallery.push(await uploadCloud(g));
//       }
//     }

//     await product.save();
//     res.json({ success: true, data: product });
//   } catch (err) {
//     console.error("Update product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= DELETE PRODUCT ================= */
// exports.deleteVendorProduct = async (req, res) => {
//   try {
//     await VendorProduct.deleteOne({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Delete product error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// /* ================= CSV IMPORT (DISK STORAGE) ================= */
// exports.importCSV = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "CSV file required" });
//     }

//     const vendorId = req.vendor._id;
//     const vendor = await Vendor.findById(vendorId);
//     const rows = [];

//     fs.createReadStream(req.file.path)
//       .pipe(csv())
//       .on("data", (row) => rows.push(row))
//       .on("end", async () => {
//         let created = 0;
//         let updated = 0;

//         for (const r of rows) {
//           if (!r.name || !r.newPrice) continue;

//           const payload = {
//             name: r.name,
//             brandName: r.brandName || "", // FSSAI Code
//             description: r.description || "",
//             oldPrice: Number(r.oldPrice) || 0,
//             newPrice: Number(r.newPrice),
//             stock: Number(r.stock) || 0,
//             quality: r.quality || "Standard",
//             State: r.State || "", // Location
//             vendor: vendorId,
//             restaurantName: vendor.storeName || r.restaurantName || "", // Shop Name
//             category: r.category || null,
//             subcategory: r.subcategory || null,
//             productTypes: r.productTypes || "",
//             flavors: r.flavors || "",
//             dietPreference: r.dietPreference || "Veg",
//             nutrition: r.nutrition || "",
//             materialTypes: r.materialTypes || "",
//             ingredients: r.ingredients || "",
//             allergenInfo: r.allergenInfo || "",
//             dietaryPreferences: r.dietaryPreferences || "",
//             cuisine: r.cuisine || "",
//             size: r.size || "",
//           };

//           if (r._id) {
//             await VendorProduct.updateOne(
//               { _id: r._id, vendor: vendorId },
//               payload
//             );
//             updated++;
//           } else {
//             await VendorProduct.create(payload);
//             created++;
//           }
//         }

//         fs.unlinkSync(req.file.path);

//         res.json({
//           success: true,
//           created,
//           updated,
//           total: rows.length,
//         });
//       });
//   } catch (err) {
//     console.error("CSV import error:", err);
//     res.status(500).json({ message: "CSV Import Failed" });
//   }
// };

// /* ================= CSV EXPORT ================= */
// exports.exportCSV = async (req, res) => {
//   try {
//     const products = await VendorProduct.find({
//       vendor: req.vendor._id,
//     }).lean();

//     const fields = Object.keys(VendorProduct.schema.paths).filter(
//       (f) => f !== "__v"
//     );

//     const parser = new Parser({ fields });
//     const csvData = parser.parse(products);

//     res.setHeader("Content-Type", "text/csv");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=vendor_products.csv"
//     );
//     res.send(csvData);
//   } catch (err) {
//     console.error("CSV export error:", err);
//     res.status(500).json({ message: "CSV Export Failed" });
//   }
// };

// /* ================= BULK UPDATE ================= */
// exports.bulkUpdate = async (req, res) => {
//   try {
//     const { ids, data } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ message: "IDs required" });
//     }

//     const result = await VendorProduct.updateMany(
//       { _id: { $in: ids }, vendor: req.vendor._id },
//       { $set: data }
//     );

//     res.json({ success: true, modified: result.modifiedCount });
//   } catch (err) {
//     console.error("Bulk update error:", err);
//     res.status(500).json({ message: "Bulk update failed" });
//   }
// };

// /* ================= BULK DELETE ================= */
// exports.bulkDelete = async (req, res) => {
//   try {
//     const { ids } = req.body;
//     if (!ids?.length) {
//       return res.status(400).json({ message: "IDs required" });
//     }

//     const result = await VendorProduct.deleteMany({
//       _id: { $in: ids },
//       vendor: req.vendor._id,
//     });

//     res.json({ success: true, deleted: result.deletedCount });
//   } catch (err) {
//     console.error("Bulk delete error:", err);
//     res.status(500).json({ message: "Bulk delete failed" });
//   }
// };






/********************************************************************
 *  Vendor Product Controller
 *
 *  All CRUD operations now correctly map:
 *    • fssaiLicense  → brandName
 *    • location      → State
 *    • restaurantName (shop name) is saved once on the Vendor and reused.
 *
 *  The GET routes return the virtual fields so the front‑end can read
 *  them directly.
 ********************************************************************/
const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const cloudinary = require("../config/cloudinary");

const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");

/* -----------------------------------------------------------------
   CLOUDINARY UPLOAD
----------------------------------------------------------------- */
async function uploadCloud(file) {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "vendor_products",
    resource_type: "auto",
  });
  return result.secure_url;
}

/* -----------------------------------------------------------------
   GET VENDOR PRODUCTS (public for a vendor)
----------------------------------------------------------------- */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({ vendor: req.vendor._id })
      .populate("category", "name")
      .populate("subcategory", "name")
      .lean(); // virtuals are kept when using .lean()

    const vendor = await Vendor.findById(req.vendor._id).lean();

    // Add the virtual fields for the front‑end
    const cleaned = products.map((p) => ({
      ...p,
      fssaiLicense: p.brandName,
      location: p.State,
      shopName: p.restaurantName,
    }));

    res.json({
      success: true,
      vendorId: vendor._id,
      storeName: vendor.storeName || "",
      data: cleaned,
    });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* -----------------------------------------------------------------
   CREATE VENDOR PRODUCT
----------------------------------------------------------------- */
exports.createVendorProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    /* ---------- STORE NAME ----------
       First product can set the shop name.  It is saved on the
       Vendor document so that subsequent products automatically
       inherit the same name. */
    if (req.body.restaurantName?.trim()) {
      vendor.storeName = req.body.restaurantName.trim();
      await vendor.save();
    }

    /* ---------- FILE UPLOAD ----------
       Same as before – upload image, logo, gallery. */
    let image = null,
      logo = null,
      gallery = [];

    if (req.files?.image) image = await uploadCloud(req.files.image[0]);
    if (req.files?.logo) logo = await uploadCloud(req.files.logo[0]);
    if (req.files?.gallery) {
      for (const g of req.files.gallery) {
        gallery.push(await uploadCloud(g));
      }
    }

    /* ---------- FIELD MAPPING ----------
       UI → DB
       -------------------------------------------------
       fssaiLicense   → brandName
       location (state) → State
       restaurantName → restaurantName (shop)
       ------------------------------------------------- */
    const product = await VendorProduct.create({
      ...req.body,
      brandName: req.body.fssaiLicense?.trim() || req.body.brandName,
      State: req.body.location?.trim() || req.body.State,
      // If the vendor already has a storeName, keep it;
      // otherwise use the one submitted now.
      restaurantName:
        vendor.storeName ||
        req.body.restaurantName?.trim() ||
        "",

      vendor: req.vendor._id,
      image,
      logo,
      gallery,
    });

    res.json({
      success: true,
      data: product,
      storeName: vendor.storeName, // return for UI to pre‑fill next forms
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -----------------------------------------------------------------
   UPDATE VENDOR PRODUCT
----------------------------------------------------------------- */
exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    // Same mapping as CREATE
    const updates = {
      ...req.body,
      brandName: req.body.fssaiLicense?.trim() || req.body.brandName,
      State: req.body.location?.trim() || req.body.State,
      restaurantName:
        req.body.restaurantName?.trim() || product.restaurantName,
    };

    // Files (if new ones are uploaded)
    if (req.files?.image) updates.image = await uploadCloud(req.files.image[0]);
    if (req.files?.logo) updates.logo = await uploadCloud(req.files.logo[0]);
    if (req.files?.gallery) {
      updates.gallery = [];
      for (const g of req.files.gallery) {
        updates.gallery.push(await uploadCloud(g));
      }
    }

    Object.assign(product, updates);
    await product.save();

    res.json({ success: true, data: product });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/* -----------------------------------------------------------------
   DELETE VENDOR PRODUCT
----------------------------------------------------------------- */
exports.deleteVendorProduct = async (req, res) => {
  try {
    await VendorProduct.deleteOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* -----------------------------------------------------------------
   CSV IMPORT (DISK STORAGE)
----------------------------------------------------------------- */
exports.importCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file required" });
    }

    const vendorId = req.vendor._id;
    const vendor = await Vendor.findById(vendorId);
    const rows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        let created = 0,
          updated = 0;

        for (const r of rows) {
          if (!r.name || !r.newPrice) continue;

          const payload = {
            // BASIC
            name: r.name,
            description: r.description || "",

            // MAP LEGACY → NEW
            brandName: r.fssaiLicense?.trim() || "", // FSSAI
            State: r.location?.trim() || "",        // State / location

            // SHOP NAME – only the first product supplies it
            restaurantName:
              vendor.storeName ||
              r.restaurantName?.trim() ||
              "",

            // PRICING / STOCK
            oldPrice: Number(r.oldPrice) || 0,
            newPrice: Number(r.newPrice),
            stock: Number(r.stock) || 0,
            dietPreference: r.dietPreference || "Veg",
            quality: r.quality || "Standard",

            // PRODUCT DETAILS
            productTypes: r.productTypes || "",
            flavors: r.flavors ? r.flavors.split(",").map(f => f.trim()).join(", ") : "",
            size: r.size ? r.size.split(",").map(s => s.trim()).join(", ") : "",
            materialTypes: r.materialTypes || "",
            ingredients: r.ingredients || "",

            // DIET / NUTRITION
            dietaryPreferences: r.dietaryPreferences || "",
            allergenInfo: r.allergenInfo || "",
            nutrition: r.nutrition || "",
            cuisine: r.cuisine || "",

            // RELATIONS
            vendor: vendorId,
            category: r.category || null,
            subcategory: r.subcategory || null,
          };

          if (r._id) {
            await VendorProduct.updateOne(
              { _id: r._id, vendor: vendorId },
              payload
            );
            updated++;
          } else {
            await VendorProduct.create(payload);
            created++;
          }
        }

        fs.unlinkSync(req.file.path);

        res.json({
          success: true,
          created,
          updated,
          total: rows.length,
        });
      });
  } catch (err) {
    console.error("CSV import error:", err);
    res.status(500).json({ message: "CSV Import Failed" });
  }
};

/* -----------------------------------------------------------------
   CSV EXPORT
----------------------------------------------------------------- */
exports.exportCSV = async (req, res) => {
  try {
    const products = await VendorProduct.find({ vendor: req.vendor._id }).lean();

    const fields = Object.keys(VendorProduct.schema.paths).filter(
      (f) => f !== "__v"
    );

    const parser = new Parser({ fields });
    const csvData = parser.parse(products);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=vendor_products.csv"
    );
    res.send(csvData);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({ message: "CSV Export Failed" });
  }
};

/* -----------------------------------------------------------------
   BULK UPDATE
----------------------------------------------------------------- */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ message: "IDs required" });
    }

    // Map UI fields to DB fields if they exist
    const mapped = { ...data };
    if (data.fssaiLicense) mapped.brandName = data.fssaiLicense;
    if (data.location) mapped.State = data.location;
    if (data.restaurantName) mapped.restaurantName = data.restaurantName;

    delete mapped.fssaiLicense;
    delete mapped.location;

    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { $set: mapped }
    );

    res.json({ success: true, modified: result.modifiedCount });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ message: "Bulk update failed" });
  }
};

/* -----------------------------------------------------------------
   BULK DELETE
----------------------------------------------------------------- */
exports.bulkDelete = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ message: "IDs required" });
    }

    const result = await VendorProduct.deleteMany({
      _id: { $in: ids },
      vendor: req.vendor._id,
    });

    res.json({ success: true, deleted: result.deletedCount });
  } catch (err) {
    console.error("Bulk delete error:", err);
    res.status(500).json({ message: "Bulk delete failed" });
  }
};
