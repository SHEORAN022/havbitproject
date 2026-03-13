const bcrypt = require("bcryptjs");

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    // login wala password check
    const isMatch = await bcrypt.compare(
      oldPassword,
      req.vendor.password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Confirm password does not match",
      });
    }

    req.vendor.password = await bcrypt.hash(newPassword, 10);
    await req.vendor.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

