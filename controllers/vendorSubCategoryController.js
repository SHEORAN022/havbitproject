// const VendorSubCategory = require("../models/VendorSubCategory");

// /* =========================
//    GET ALL (Vendor Wise)
// ========================= */
// exports.getVendorSubCategories = async (req, res) => {
//   try {
//     const data = await VendorSubCategory.find({
//       vendor: req.vendor._id,
//     }).populate("parent", "name");

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* =========================
//    CREATE
// ========================= */
// exports.createVendorSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;

//     const image = req.file ? `/uploads/${req.file.filename}` : "";

//     const sub = await VendorSubCategory.create({
//       name,
//       parent,
//       image,
//       vendor: req.vendor._id,
//     });

//     res.status(201).json(sub);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* =========================
//    UPDATE
// ========================= */
// exports.updateVendorSubCategory = async (req, res) => {
//   try {
//     const updateData = {
//       name: req.body.name,
//       parent: req.body.parent,
//     };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await VendorSubCategory.findOneAndUpdate(
//       { _id: req.params.id, vendor: req.vendor._id }, // 🔐 vendor check
//       updateData,
//       { new: true }
//     );

//     if (!updated)
//       return res.status(404).json({ message: "SubCategory not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// /* =========================
//    DELETE
// ========================= */
// exports.deleteVendorSubCategory = async (req, res) => {
//   try {
//     const deleted = await VendorSubCategory.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!deleted)
//       return res.status(404).json({ message: "SubCategory not found" });

//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };









// const VendorSubCategory = require("../models/VendorSubCategory");

// // GET ALL
// exports.getVendorSubCategories = async (req, res) => {
//   try {
//     const data = await VendorSubCategory.find({
//       vendor: req.vendor._id,
//     }).populate("parent", "name");

//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE
// exports.createVendorSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;

//     const sub = await VendorSubCategory.create({
//       name,
//       parent,
//       vendor: req.vendor._id,
//       image: req.file ? `/uploads/${req.file.filename}` : "",
//     });

//     res.status(201).json(sub);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE
// exports.updateVendorSubCategory = async (req, res) => {
//   try {
//     const updateData = {
//       name: req.body.name,
//       parent: req.body.parent,
//     };

//     if (req.file) {
//       updateData.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await VendorSubCategory.findOneAndUpdate(
//       { _id: req.params.id, vendor: req.vendor._id },
//       updateData,
//       { new: true }
//     );

//     if (!updated)
//       return res.status(404).json({ message: "SubCategory not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE
// exports.deleteVendorSubCategory = async (req, res) => {
//   try {
//     const deleted = await VendorSubCategory.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!deleted)
//       return res.status(404).json({ message: "SubCategory not found" });

//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };







// const VendorSubCategory = require("../models/VendorSubCategory");

// // GET ALL
// exports.getVendorSubCategories = async (req, res) => {
//   try {
//     const data = await VendorSubCategory.find({ vendor: req.vendor._id }).populate("parent", "name");
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // CREATE
// exports.createVendorSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;

//     const sub = await VendorSubCategory.create({
//       name,
//       parent,
//       vendor: req.vendor._id,
//       image: req.file ? `/uploads/${req.file.filename}` : "",
//     });

//     res.status(201).json(sub);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE
// exports.updateVendorSubCategory = async (req, res) => {
//   try {
//     const updateData = { name: req.body.name, parent: req.body.parent };
//     if (req.file) updateData.image = `/uploads/${req.file.filename}`;

//     const updated = await VendorSubCategory.findOneAndUpdate(
//       { _id: req.params.id, vendor: req.vendor._id },
//       updateData,
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ message: "SubCategory not found" });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE
// exports.deleteVendorSubCategory = async (req, res) => {
//   try {
//     const deleted = await VendorSubCategory.findOneAndDelete({
//       _id: req.params.id,
//       vendor: req.vendor._id,
//     });

//     if (!deleted) return res.status(404).json({ message: "SubCategory not found" });

//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };










const VendorSubCategory = require("../models/VendorSubCategory");

// GET ALL
exports.getVendorSubCategories = async (req, res) => {
  try {
    const data = await VendorSubCategory.find({ vendor: req.vendor._id }).populate("parent", "name");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createVendorSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const sub = await VendorSubCategory.create({
      name,
      parent,
      vendor: req.vendor._id,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json(sub);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateVendorSubCategory = async (req, res) => {
  try {
    const updateData = { name: req.body.name, parent: req.body.parent };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updated = await VendorSubCategory.findOneAndUpdate(
      { _id: req.params.id, vendor: req.vendor._id },
      updateData,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "SubCategory not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteVendorSubCategory = async (req, res) => {
  try {
    const deleted = await VendorSubCategory.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!deleted) return res.status(404).json({ message: "SubCategory not found" });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

