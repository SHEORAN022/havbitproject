const express = require("express");
const axios = require("axios");

const router = express.Router();

/* ===============================
   🔑 Parcelx Token Setup
================================ */

const accessKey = process.env.PARCELX_ACCESS_KEY;
const secretKey = process.env.PARCELX_SECRET_KEY;

const token = Buffer.from(`${accessKey}:${secretKey}`).toString("base64");

/* ===============================
   🚀 Parcelx Axios Instance
================================ */

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  headers: {
    "Content-Type": "application/json",
    "access-token": token,
  },
});

/* ==================================================
   ✅ 1. Tracking API
   GET /api/parcelx/track/:awb
================================================== */
router.get("/track/:awb", async (req, res) => {
  try {
    const { awb } = req.params;
    const response = await parcelx.get(`/track_order?awb=${awb}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Tracking Error",
      error: err.message,
    });
  }
});

/* ==================================================
   ✅ 2. Cancel Order
   POST /api/parcelx/order/cancel
================================================== */
router.post("/order/cancel", async (req, res) => {
  try {
    const response = await parcelx.post(
      "/order/cancel_order",
      req.body
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Cancel Order Error",
      error: err.message,
    });
  }
});

/* ==================================================
   ✅ 3. Rate Calculator
   POST /api/parcelx/rate
================================================== */
router.post("/rate", async (req, res) => {
  try {
    const response = await parcelx.post("/rate_calculator", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Rate Calculator Error",
      error: err.message,
    });
  }
});

/* ==================================================
   ✅ 4. Label API
   GET /api/parcelx/label/:awb
================================================== */
router.get("/label/:awb", async (req, res) => {
  try {
    const { awb } = req.params;
    const response = await parcelx.get(
      `/label?awb=${awb}&label_type=label`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Label Error",
      error: err.message,
    });
  }
});

/* ==================================================
   ✅ 5. Courier List
   POST /api/parcelx/couriers
================================================== */
router.post("/couriers", async (req, res) => {
  try {
    const response = await parcelx.post("/courier-list", req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Courier List Error",
      error: err.message,
    });
  }
});

module.exports = router;
