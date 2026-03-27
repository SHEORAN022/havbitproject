const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  updateReview,
  getApprovedReviews,
} = require("../controllers/review.controller");

// USER
router.post("/", createReview);

// PUBLIC (Website)
router.get("/approved", getApprovedReviews);

// ADMIN
router.get("/admin", getAllReviews);
router.put("/admin/:id", updateReview);

module.exports = router;
