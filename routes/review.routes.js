// const express = require("express");
// const router = express.Router();

// const {
//   createReview,
//   getAllReviews,
//   updateReview,
//   getApprovedReviews,
// } = require("../controllers/review.controller");

// // USER
// router.post("/", createReview);

// // PUBLIC (Website)
// router.get("/approved", getApprovedReviews);

// // ADMIN
// router.get("/admin", getAllReviews);
// router.put("/admin/:id", updateReview);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  updateReview,
  getApprovedReviews,
  deleteReview,
} = require("../controllers/review.controller");

/* ================= MULTER SETUP ================= */
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5, // max 5 images
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

/* ================= ERROR HANDLER ================= */
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds 5MB",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files uploaded (max 5 allowed)",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next();
};

/* ================= ROUTES ================= */

// ✅ USER - Create Review with Images
router.post(
  "/",
  upload.array("gallery", 5), // 🔥 multiple images
  handleMulterError,
  createReview
);

// ✅ PUBLIC - Approved Reviews
router.get("/approved", getApprovedReviews);

// ✅ ADMIN - Get All Reviews
router.get("/admin", getAllReviews);

// ✅ ADMIN - Update Review Status
router.put("/admin/:id", updateReview);

// ✅ ADMIN - Delete Review (optional but best practice)
router.delete("/admin/:id", deleteReview);

module.exports = router;
