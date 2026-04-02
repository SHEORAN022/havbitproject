// controllers/blogController.js
const Blog = require("../models/Blog");

/* CREATE BLOG */
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    let mediaType = "";

    if (req.file.mimetype.startsWith("image/")) {
      mediaType = "image";
    } else if (req.file.mimetype.startsWith("video/")) {
      mediaType = "video";
    }

    const blog = new Blog({
      title,
      description,
      media: req.file.path,
      mediaType,
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created",
      blog,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET BLOGS */
exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};
