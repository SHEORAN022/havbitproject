const Review = require("../models/Review.model");

// ✅ CREATE REVIEW (USER)
exports.createReview = async (req, res) => {
  try {
    const { userName, userEmail, rating, comment, source } = req.body;

    if (!userName || !userEmail || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const review = await Review.create({
      userName,
      userEmail,
      rating,
      comment,
      source,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted (pending approval)",
      data: review,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ GET ALL (ADMIN)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ UPDATE STATUS (ADMIN)
exports.updateReview = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: `Review ${status}`,
      data: review,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// ✅ GET APPROVED (PUBLIC WEBSITE)
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
