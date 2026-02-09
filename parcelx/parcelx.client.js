const axios = require("axios");

const authToken = Buffer.from(
  process.env.PARCELX_ACCESS_KEY + ":" + process.env.PARCELX_SECRET_KEY
).toString("base64");

const client = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",   // 🔥 VERY IMPORTANT
  headers: {
    "access-token": authToken,
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

module.exports = client;
