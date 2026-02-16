const axios = require("axios");

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.PARCELX_ACCESS_KEY}`,
  },
  timeout: 15000,
});

module.exports = parcelx;
