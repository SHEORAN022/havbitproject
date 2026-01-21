


// const SubCategory = require("../models/SubCategory");

// /* GET ALL SUBCATEGORIES */
// exports.getAllSubCategories = async (req, res) => {
//   try {
//     const data = await SubCategory.find()
//       .populate("parent", "_id name")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* CREATE */
// exports.createSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const image = req.file ? req.file.path : "";

//     const sub = await SubCategory.create({ name, parent, image });
//     res.status(201).json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* UPDATE */
// exports.updateSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const update = { name, parent };

//     if (req.file) update.image = req.file.path;

//     const sub = await SubCategory.findByIdAndUpdate(
//       req.params.id,
//       update,
//       { new: true }
//     );

//     res.json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* DELETE */
// exports.deleteSubCategory = async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "SubCategory deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };









// const SubCategory = require("../models/SubCategory");

// exports.getAllSubCategories = async (req, res) => {
//   try {
//     const data = await SubCategory.find()
//       .populate("parent", "name")
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.createSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

//     const sub = await SubCategory.create({ name, parent, image });
//     res.status(201).json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.updateSubCategory = async (req, res) => {
//   try {
//     const { name, parent } = req.body;
//     const update = { name, parent };

//     if (req.file) update.image = req.file.path.replace(/\\/g, "/");

//     const sub = await SubCategory.findByIdAndUpdate(req.params.id, update, {
//       new: true,
//     });

//     res.status(200).json({ success: true, data: sub });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.deleteSubCategory = async (req, res) => {
//   try {
//     await SubCategory.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: "SubCategory deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };









const SubCategory = require("../models/SubCategory");

exports.getAllSubCategories = async (req, res) => {
  try {
    const data = await SubCategory.find()
      .populate("parent", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const image = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const sub = await SubCategory.create({ name, parent, image });
    res.status(201).json({ success: true, data: sub });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const update = { name, parent };

    if (req.file) update.image = req.file.path.replace(/\\/g, "/");

    const sub = await SubCategory.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.status(200).json({ success: true, data: sub });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    await SubCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "SubCategory deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

