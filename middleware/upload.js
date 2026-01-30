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












// const multer = require("multer");

// module.exports = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 50 * 1024 * 1024 },
// });






// const multer = require("multer");

// // memory storage (Cloudinary ke liye BEST)
// const storage = multer.memoryStorage();

// // file filter (sirf image allow)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// module.exports = upload;




// module.exports = upload;
const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;

