
const VendorProduct = require("../models/VendorProduct");
const Vendor = require("../models/Vendor");
const cloudinary = require("../config/cloudinary");

const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");

/* ================= CLOUDINARY UPLOAD ================= */
async function uploadCloud(file) {
  const base64 = file.buffer.toString("base64");
  const dataUri = `data:${file.mimetype};base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "vendor_products",
    resource_type: "auto",
  });
  return result.secure_url;
}

/* ================= GET PRODUCTS ================= */
exports.getVendorProducts = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    })
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
    console.error("Get products error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= CREATE PRODUCT - UPDATED ================= */
exports.createVendorProduct = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendor._id);

    // FIX: Always save shop name if provided in request
    // Remove the condition that checks if vendor.storeName is empty
    if (req.body.restaurantName && req.body.restaurantName.trim() !== "") {
      vendor.storeName = req.body.restaurantName;
      await vendor.save();
    }

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

    // IMPORTANT: Use vendor's storeName for restaurantName
    // This ensures all products have consistent shop name
    const restaurantNameToUse = vendor.storeName || req.body.restaurantName || "";

    const product = await VendorProduct.create({
      ...req.body,
      vendor: req.vendor._id,
      restaurantName: restaurantNameToUse, // Use saved store name
      image,
      logo,
      gallery,
    });

    res.json({ 
      success: true, 
      data: product,
      storeName: vendor.storeName // Send back updated store name
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= UPDATE PRODUCT ================= */
exports.updateVendorProduct = async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }

    Object.assign(product, req.body);

    if (req.files?.image) product.image = await uploadCloud(req.files.image[0]);
    if (req.files?.logo) product.logo = await uploadCloud(req.files.logo[0]);

    if (req.files?.gallery) {
      product.gallery = [];
      for (const g of req.files.gallery) {
        product.gallery.push(await uploadCloud(g));
      }
    }

    await product.save();
    res.json({ success: true, data: product });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/* ================= DELETE PRODUCT ================= */
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

/* ================= CSV IMPORT (DISK STORAGE) ================= */
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
        let created = 0;
        let updated = 0;

        for (const r of rows) {
          if (!r.name || !r.newPrice) continue;

          const payload = {
            name: r.name,
            brandName: r.brandName || "", // FSSAI Code
            description: r.description || "",
            oldPrice: Number(r.oldPrice) || 0,
            newPrice: Number(r.newPrice),
            stock: Number(r.stock) || 0,
            quality: r.quality || "Standard",
            State: r.State || "", // Location
            vendor: vendorId,
            restaurantName: vendor.storeName || r.restaurantName || "", // Shop Name
            category: r.category || null,
            subcategory: r.subcategory || null,
            productTypes: r.productTypes || "",
            flavors: r.flavors || "",
            dietPreference: r.dietPreference || "Veg",
            nutrition: r.nutrition || "",
            materialTypes: r.materialTypes || "",
            ingredients: r.ingredients || "",
            allergenInfo: r.allergenInfo || "",
            dietaryPreferences: r.dietaryPreferences || "",
            cuisine: r.cuisine || "",
            size: r.size || "",
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

/* ================= CSV EXPORT ================= */
exports.exportCSV = async (req, res) => {
  try {
    const products = await VendorProduct.find({
      vendor: req.vendor._id,
    }).lean();

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

/* ================= BULK UPDATE ================= */
exports.bulkUpdate = async (req, res) => {
  try {
    const { ids, data } = req.body;
    if (!ids?.length) {
      return res.status(400).json({ message: "IDs required" });
    }

    const result = await VendorProduct.updateMany(
      { _id: { $in: ids }, vendor: req.vendor._id },
      { $set: data }
    );

    res.json({ success: true, modified: result.modifiedCount });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ message: "Bulk update failed" });
  }
};

/* ================= BULK DELETE ================= */
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



