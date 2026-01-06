const express = require("express");
const router = express.Router();
const cloudUpload = require("../middleware/cloudUpload");
const Category = require("../models/Category");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

// CREATE
router.post("/", cloudUpload.single("image"), createCategory);

// READ ALL
router.get("/", getCategories);

// READ SINGLE
router.get("/:id", getCategoryById);

// UPDATE
router.put("/:id", cloudUpload.single("image"), updateCategory);

// DELETE
router.delete("/:id", deleteCategory);

module.exports = router;
