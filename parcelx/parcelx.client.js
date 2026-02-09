const axios = require("axios");

// IMPORTANT: ParcelX v3 authentication format
const authToken = Buffer.from(
  `${process.env.PARCELX_ACCESS_KEY}:${process.env.PARCELX_SECRET_KEY}`
).toString("base64");

console.log("🔐 ParcelX Auth Token generated (first 20 chars):", authToken.substring(0, 20) + "...");

const client = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  headers: {
    "access-token": authToken, // ✅ Correct header for v3
    "Content-Type": "application/json",
  },
  timeout: 30000, // Increased timeout for shipment creation
});

// Add request logging
client.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log("📤 Headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  }
);

// Add response logging
client.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

module.exports = client;
