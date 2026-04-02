// const multer = require("multer");
// const path = require("path");

// /* STORAGE CONFIG */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // uploads folder
//   },

//   filename: function (req, file, cb) {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9);

//     cb(null, uniqueName + path.extname(file.originalname));
//   },
// });

// /* FILE FILTER */
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.startsWith("image/") ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only Images & PDFs allowed"), false);
//   }
// };

// /* MULTER INSTANCE */
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 10 * 1024 * 1024, // 10MB
//   },
// });

// module.exports = upload;



const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ===============================
   CREATE UPLOAD FOLDER IF NOT EXISTS
================================= */
const uploadPath = "uploads/";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ===============================
   STORAGE CONFIG
================================= */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

/* ===============================
   FILE FILTER (IMAGE + VIDEO + PDF)
================================= */
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/",
    "video/",
    "application/pdf",
  ];

  const isAllowed = allowedTypes.some((type) =>
    file.mimetype.startsWith(type)
  );

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(
      new Error("Only Images, Videos & PDFs are allowed"),
      false
    );
  }
};

/* ===============================
   MULTER INSTANCE
================================= */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // ✅ 50MB (video support)
  },
});

module.exports = upload;
