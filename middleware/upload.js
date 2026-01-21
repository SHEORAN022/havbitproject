// // const multer = require("multer");
// // const path = require("path");
// // const fs = require("fs");

// // // Ensure uploads folder exists
// // const uploadDir = path.join(__dirname, "../uploads");
// // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({ storage });

// // module.exports = upload;





// // const multer = require("multer");

// // const storage = multer.memoryStorage();

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
// // });

// // module.exports = upload;



// const multer = require("multer");

// module.exports = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 50 * 1024 * 1024 },
// });












const multer = require("multer");

module.exports = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
});
