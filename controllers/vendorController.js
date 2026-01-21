


// const Vendor = require("../models/Vendor");

// // Get Vendor Profile
// exports.getProfile = async (req, res) => {
//   try {
//     res.json(req.vendor);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Update Vendor Profile
// exports.updateProfile = async (req, res) => {
//   try {
//     const updates = req.body;
//     const vendor = await Vendor.findByIdAndUpdate(req.vendor._id, updates, { new: true });
//     res.json({ message: "Profile updated successfully", vendor });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Delete Vendor (optional)
// exports.deleteProfile = async (req, res) => {
//   try {
//     await Vendor.findByIdAndDelete(req.vendor._id);
//     res.json({ message: "Vendor deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };










const Vendor = require("../models/Vendor");

// Get Vendor Profile
exports.getProfile = async (req, res) => {
  try {
    res.json(req.vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Vendor Profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const vendor = await Vendor.findByIdAndUpdate(req.vendor._id, updates, { new: true });
    res.json({ message: "Profile updated successfully", vendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Vendor (optional)
exports.deleteProfile = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.vendor._id);
    res.json({ message: "Vendor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

