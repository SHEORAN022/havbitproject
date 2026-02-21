// // // // const axios = require("axios");

// // // // const parcelx = axios.create({
// // // //   baseURL: "https://app.parcelx.in/api/v3",
// // // //   headers: {
// // // //     "Content-Type": "application/json",
// // // //     "access-token": process.env.PARCELX_ACCESS_TOKEN,
// // // //   },
// // // //   timeout: 15000,
// // // // });

// // // // module.exports = parcelx;
// // // const axios = require("axios");

// // // if (!process.env.PARCELX_ACCESS_TOKEN) {
// // //   console.error("❌ PARCELX_ACCESS_TOKEN is missing in environment variables");
// // // }

// // // const parcelx = axios.create({
// // //   baseURL: "https://app.parcelx.in/api",   // 🔥 IMPORTANT CHANGE
// // //   timeout: 20000,
// // //   headers: {
// // //     "Content-Type": "application/json",
// // //   },
// // // });

// // // /* REQUEST INTERCEPTOR */
// // // parcelx.interceptors.request.use(
// // //   (config) => {
// // //     config.headers["access-token"] = process.env.PARCELX_ACCESS_TOKEN;
// // //     return config;
// // //   },
// // //   (error) => Promise.reject(error)
// // // );

// // // /* RESPONSE INTERCEPTOR */
// // // parcelx.interceptors.response.use(
// // //   (response) => response,
// // //   (error) => {
// // //     console.error("ParcelX API ERROR:", {
// // //       status: error.response?.status,
// // //       data: error.response?.data,
// // //     });
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // module.exports = parcelx;


// // const axios = require("axios");

// // const auth = Buffer.from(
// //   `${process.env.PARCELX_ACCESS_KEY}:${process.env.PARCELX_SECRET_KEY}`
// // ).toString("base64");

// // const parcelx = axios.create({
// //   baseURL: process.env.PARCELX_BASE_URL || "https://api.parcelx.in/v3",
// //   timeout: 20000,
// //   headers: {
// //     Authorization: `Basic ${auth}`,
// //     "Content-Type": "application/json"
// //   }
// // });

// // module.exports = parcelx;

// const axios = require("axios");

// console.log("🔑 PARCELX_ACCESS_TOKEN:", process.env.PARCELX_ACCESS_TOKEN ? "✅ Present" : "❌ Missing");

// const parcelx = axios.create({
//   baseURL: "https://app.parcelx.in/api/v3",
//   timeout: 30000, // 30 seconds
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json"
//   }
// });

// /* 🔥 REQUEST INTERCEPTOR */
// parcelx.interceptors.request.use(
//   (config) => {
//     // Token ko headers mein set karo
//     if (process.env.PARCELX_ACCESS_TOKEN) {
//       config.headers["access-token"] = process.env.PARCELX_ACCESS_TOKEN.trim();
//       console.log(`📤 ParcelX Request: ${config.method.toUpperCase()} ${config.url}`);
//     } else {
//       console.error("❌ PARCELX_ACCESS_TOKEN is missing!");
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /* 🔥 RESPONSE INTERCEPTOR */
// parcelx.interceptors.response.use(
//   (response) => {
//     console.log(`📥 ParcelX Response: ${response.status}`);
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       console.error("❌ ParcelX API Error:", {
//         status: error.response.status,
//         data: error.response.data,
//         url: error.config?.url
//       });
//     } else if (error.request) {
//       console.error("❌ ParcelX No Response:", error.message);
//     } else {
//       console.error("❌ ParcelX Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// module.exports = parcelx;
const axios = require("axios");

// Token ko trim karo (spaces hatao)
const PARCELX_TOKEN = process.env.PARCELX_ACCESS_TOKEN?.trim();

if (!PARCELX_TOKEN) {
  console.error("❌ CRITICAL: PARCELX_ACCESS_TOKEN is missing in .env file");
  console.error("⚠️  Please add your ParcelX token to .env file");
} else {
  console.log("✅ PARCELX_ACCESS_TOKEN loaded successfully");
  console.log(`📏 Token length: ${PARCELX_TOKEN.length} characters`);
}

// Create axios instance
const parcelx = axios.create({
  baseURL: "https://app.parcelx.in/api/v3",
  timeout: 30000, // 30 seconds timeout
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Request Interceptor - Har request se pehle token add karo
parcelx.interceptors.request.use(
  (config) => {
    // IMPORTANT: ParcelX API "access-token" header leti hai
    config.headers["access-token"] = PARCELX_TOKEN;
    
    // Debug logging
    console.log(`\n📤 ParcelX Request:`);
    console.log(`  Method: ${config.method.toUpperCase()}`);
    console.log(`  URL: ${config.baseURL}${config.url}`);
    console.log(`  Token: ${PARCELX_TOKEN.substring(0, 20)}...`);
    
    if (config.data) {
      console.log(`  Data:`, JSON.stringify(config.data, null, 2));
    }
    
    return config;
  },
  (error) => {
    console.error("❌ Request Interceptor Error:", error.message);
    return Promise.reject(error);
  }
);

// Response Interceptor - Response handle karo
parcelx.interceptors.response.use(
  (response) => {
    console.log(`\n📥 ParcelX Response:`);
    console.log(`  Status: ${response.status}`);
    console.log(`  Status Text: ${response.statusText}`);
    console.log(`  Data:`, JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    console.log(`\n❌ ParcelX Error Response:`);
    
    if (error.response) {
      // Server ne response diya but error status code ke saath
      console.log(`  Status: ${error.response.status}`);
      console.log(`  Status Text: ${error.response.statusText}`);
      console.log(`  Data:`, JSON.stringify(error.response.data, null, 2));
      console.log(`  URL: ${error.config?.url}`);
    } else if (error.request) {
      // Request bheji gayi but response nahi aaya
      console.log(`  No Response:`, error.message);
      console.log(`  URL: ${error.config?.url}`);
    } else {
      // Request setup mein hi error
      console.log(`  Setup Error:`, error.message);
    }
    
    return Promise.reject(error);
  }
);

module.exports = parcelx;
