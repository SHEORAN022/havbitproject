// // routes/blogRoutes.js
// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/uploads");
// const {
//   createBlog,
//   getBlogs,
// } = require("../controllers/blogController");

// router.post("/create", upload.single("media"), createBlog);
// router.get("/", getBlogs);

// module.exports = router;

















const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploads");

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

/* CREATE */
router.post("/create", upload.single("media"), createBlog);

/* READ */
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);

/* UPDATE */
router.put("/:id", upload.single("media"), updateBlog);

/* DELETE */
router.delete("/:id", deleteBlog);

module.exports = router;
