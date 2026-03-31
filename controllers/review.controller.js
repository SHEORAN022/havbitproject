// const Review = require("../models/Review.model");

// // ✅ CREATE REVIEW (USER)
// exports.createReview = async (req, res) => {
//   try {
//     const { userName, userEmail, rating, comment, source } = req.body;

//     if (!userName || !userEmail || !rating || !comment) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const review = await Review.create({
//       userName,
//       userEmail,
//       rating,
//       comment,
//       source,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Review submitted (pending approval)",
//       data: review,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // ✅ GET ALL (ADMIN)
// exports.getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       count: reviews.length,
//       data: reviews,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };

// // ✅ UPDATE STATUS (ADMIN)
// exports.updateReview = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["approved", "rejected"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid status",
//       });
//     }

//     const review = await Review.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!review) {
//       return res.status(404).json({
//         success: false,
//         message: "Review not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: `Review ${status}`,
//       data: review,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };

// // ✅ GET APPROVED (PUBLIC WEBSITE)
// exports.getApprovedReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ status: "approved" }).sort({
//       createdAt: -1,
//     });

//     res.json({
//       success: true,
//       data: reviews,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false });
//   }
// };



const Review = require("../models/Review.model");
const cloudinary = require("../config/cloudinary");

/* ================= CLOUDINARY UPLOAD ================= */
async function uploadCloud(file, folder = "reviews") {
  try {
    if (!file || !file.buffer) return null;

    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto:good" },
      ],
    });

    return result.secure_url;
  } catch (err) {
    console.error("❌ Cloudinary Upload Error:", err.message);
    return null;
  }
}

/* ================= CREATE REVIEW ================= */
exports.createReview = async (req, res) => {
  try {
    const { userName, userEmail, rating, comment, source } = req.body;

    // ✅ VALIDATION
    if (!userName || !userEmail || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 to 5",
      });
    }

    let gallery = [];

    // ✅ IMAGE UPLOAD
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await uploadCloud(file, "reviews/gallery");
        if (url) gallery.push(url);
      }
    }

    // ✅ CREATE REVIEW
    const review = await Review.create({
      userName: userName.trim(),
      userEmail: userEmail.toLowerCase(),
      rating: Number(rating),
      comment: comment.trim(),
      source,
      gallery, // 🔥 NEW
    });

    res.status(201).json({
      success: true,
      message: "Review submitted (pending approval)",
      data: review,
    });
  } catch (err) {
    console.error("❌ CREATE REVIEW ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};

/* ================= GET ALL REVIEWS (ADMIN) ================= */
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    console.error("❌ GET ALL REVIEWS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= UPDATE REVIEW STATUS ================= */
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
    console.error("❌ UPDATE REVIEW ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= GET APPROVED REVIEWS ================= */
exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("❌ GET APPROVED REVIEWS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ================= DELETE REVIEW (OPTIONAL ADMIN) ================= */
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    console.error("❌ DELETE REVIEW ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
