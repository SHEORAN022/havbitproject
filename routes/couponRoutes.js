const express = require("express");
const router = express.Router();
const C = require("../controllers/couponController");

/* ADMIN */
router.post("/", C.createCoupon);
router.get("/", C.getAllCoupons);
router.delete("/:id", C.deleteCoupon);

/* USER */
router.post("/apply", C.applyCoupon);

module.exports = router;
