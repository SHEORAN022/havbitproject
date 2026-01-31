// const router = require("express").Router();
// const { getPublicProducts } = require("../controllers/publicProductController");

// router.get("/products", getPublicProducts);

// module.exports = router;




// const router = require("express").Router();
// const { getPublicProducts } = require("../controllers/publicProductController");

// router.get("/products", getPublicProducts);

// module.exports = router;





const router = require("express").Router();
const { getPublicProducts } = require("../controllers/publicProductController");

router.get("/products", getPublicProducts);

module.exports = router;





// const router = require("express").Router();

// // Temporary function - badme isko proper controller se replace karna
// const getPublicProducts = async (req, res) => {
//   try {
//     return res.status(200).json({
//       success: true,
//       message: "Public products API is working",
//       data: []
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch public products",
//     });
//   }
// };

// router.get("/products", getPublicProducts);


// module.exports = router;

