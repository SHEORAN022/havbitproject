const express = require("express");
const router = express.Router();
const cloudUpload = require("../middleware/cloudUpload");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/userController");

// CREATE user
router.post("/", cloudUpload.single("image"), createUser);

// READ all users
router.get("/", getUsers);

// READ single user
router.get("/:id", getUserById);

// UPDATE user
router.put("/:id", cloudUpload.single("image"), updateUser);

// DELETE user
router.delete("/:id", deleteUser);

module.exports = router;
