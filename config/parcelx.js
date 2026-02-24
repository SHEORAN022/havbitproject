// const axios = require("axios");

// // Token ko trim karo (spaces hatao)
// const PARCELX_TOKEN = process.env.PARCELX_ACCESS_TOKEN?.trim();

// if (!PARCELX_TOKEN) {
//   console.error("❌ CRITICAL: PARCELX_ACCESS_TOKEN is missing in .env file");
//   console.error("⚠️  Please add your ParcelX token to .env file");
// } else {
//   console.log("✅ PARCELX_ACCESS_TOKEN loaded successfully");
//   console.log(`📏 Token length: ${PARCELX_TOKEN.length} characters`);
// }

// // Create axios instance
// const parcelx = axios.create({
//   baseURL: "https://app.parcelx.in/api/v3",
//   timeout: 30000,
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "access-token": PARCELX_TOKEN  // ✅ Token yaha bhi add karo
//   }
// });

// // Request Interceptor
// parcelx.interceptors.request.use(
//   (config) => {
//     // Ensure token is in headers
//     config.headers["access-token"] = PARCELX_TOKEN;
    
//     console.log(`\n📤 ParcelX Request:`);
//     console.log(`  Method: ${config.method.toUpperCase()}`);
//     console.log(`  URL: ${config.baseURL}${config.url}`);
    
//     if (config.data) {
//       console.log(`  Data:`, JSON.stringify(config.data, null, 2));
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// parcelx.interceptors.response.use(
//   (response) => {
//     console.log(`\n📥 ParcelX Response:`);
//     console.log(`  Status: ${response.status}`);
//     console.log(`  Data:`, JSON.stringify(response.data, null, 2));
//     return response;
//   },
//   (error) => {
//     console.log(`\n❌ ParcelX Error Response:`);
//     if (error.response) {
//       console.log(`  Status: ${error.response.status}`);
//       console.log(`  Data:`, JSON.stringify(error.response.data, null, 2));
//       console.log(`  URL: ${error.config?.url}`);
//     } else {
//       console.log(`  Message: ${error.message}`);
//     }
//     return Promise.reject(error);
//   }
// );

// module.exports = parcelx;
const axios = require("axios");

// ✅ ParcelX Basic Auth (ONLY CORRECT WAY)
const auth = Buffer.from(
  process.env.PARCELX_ACCESS_KEY + ":" + process.env.PARCELX_SECRET_KEY
).toString("base64");

const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  timeout: 20000,
  headers: {
    Authorization: "Basic " + auth,
    "Content-Type": "application/json",
  },
});

module.exports = parcelx;
