const Category = require("../models/Category");

// GET all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE category
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  let image = req.file ? req.file.path : null; // Cloudinary URL

  const newCategory = new Category({ name, description, image });

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE category
exports.updateCategory = async (req, res) => {
  try {
    const updatedData = { name: req.body.name, description: req.body.description };
    if (req.file) updatedData.image = req.file.path; // Update image if uploaded

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
