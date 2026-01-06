const User = require("../models/User");
const bcrypt = require("bcryptjs");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE user
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role, image });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    if (req.body.password) {
      updatedData.password = await bcrypt.hash(req.body.password, 10);
    }
    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
