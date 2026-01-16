const WebsiteUser = require("../models/WebsiteUser");
const bcrypt = require("bcryptjs");

/* =======================
   SIGNUP
======================= */
exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await WebsiteUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await WebsiteUser.create({
      fullName,
      email,
      phone,
      password,
    });

    res.status(201).json({
      message: "Signup successful",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

/* =======================
   LOGIN
======================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await WebsiteUser.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* =======================
   GET ALL USERS (ADMIN)
======================= */
exports.getAllWebsiteUsers = async (req, res) => {
  try {
    const users = await WebsiteUser.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
