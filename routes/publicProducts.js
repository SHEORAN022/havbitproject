const router = require("express").Router();
const { getPublicProducts } = require("../controllers/publicProductController");

router.get("/products", getPublicProducts);

module.exports = router;
