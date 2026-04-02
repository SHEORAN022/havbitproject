// routes/blogRoutes.js
const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");
const {
  createBlog,
  getBlogs,
} = require("../controllers/blogController");

router.post("/create", upload.single("media"), createBlog);
router.get("/", getBlogs);

module.exports = router;
