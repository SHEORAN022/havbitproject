const axios = require("axios");

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  timeout: 20000,
  headers: {
    "access-token": process.env.PARCELX_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

module.exports = parcelx;
