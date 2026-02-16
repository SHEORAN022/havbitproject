const axios = require("axios");

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  headers: {
    "Content-Type": "application/json",
    "access-token": process.env.PARCELX_ACCESS_TOKEN,
  },
  timeout: 15000,
});

module.exports = parcelx;
