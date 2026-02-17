// const axios = require("axios");

// const parcelx = axios.create({
//   baseURL: "https://app.parcelx.in/api/v3",
//   headers: {
//     "Content-Type": "application/json",
//     "access-token": process.env.PARCELX_ACCESS_TOKEN,
//   },
//   timeout: 15000,
// });

// module.exports = parcelx;

const axios = require("axios");

if (!process.env.PARCELX_ACCESS_TOKEN) {
  console.error("❌ PARCELX_ACCESS_TOKEN is missing in environment variables");
}

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔥 REQUEST INTERCEPTOR */
parcelx.interceptors.request.use(
  (config) => {
    config.headers["access-token"] = process.env.PARCELX_ACCESS_TOKEN;
    return config;
  },
  (error) => Promise.reject(error)
);

/* 🔥 RESPONSE INTERCEPTOR (DEBUG) */
parcelx.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("ParcelX API ERROR:", {
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

module.exports = parcelx;
