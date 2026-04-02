// // controllers/blogController.js
// const Blog = require("../models/Blog");

// /* CREATE BLOG */
// exports.createBlog = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "File required" });
//     }

//     let mediaType = "";

//     if (req.file.mimetype.startsWith("image/")) {
//       mediaType = "image";
//     } else if (req.file.mimetype.startsWith("video/")) {
//       mediaType = "video";
//     }

//     const blog = new Blog({
//       title,
//       description,
//       media: req.file.path,
//       mediaType,
//     });

//     await blog.save();

//     res.status(201).json({
//       message: "Blog created",
//       blog,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// /* GET BLOGS */



















const Blog = require("../models/Blog");

/* ================= CREATE BLOG ================= */
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
      media: req.file.path.replace(/\\/g, "/"),
      mediaType,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created",
      blog,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET ALL BLOGS ================= */
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= GET SINGLE BLOG ================= */
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= UPDATE BLOG ================= */
exports.updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // update text
    blog.title = title || blog.title;
    blog.description = description || blog.description;

    // update file (optional)
    if (req.file) {
      if (req.file.mimetype.startsWith("image/")) {
        blog.mediaType = "image";
      } else if (req.file.mimetype.startsWith("video/")) {
        blog.mediaType = "video";
      }

      blog.media = req.file.path.replace(/\\/g, "/");
    }

    await blog.save();

    res.json({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ================= DELETE BLOG ================= */
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json({
      success: true,
      message: "Blog deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// exports.getBlogs = async (req, res) => {
//   const blogs = await Blog.find().sort({ createdAt: -1 });
//   res.json(blogs);
// };
