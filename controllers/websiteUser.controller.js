// // const WebsiteUser = require("../models/WebsiteUser");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // /* ===================== SIGNUP ===================== */
// // exports.signup = async (req, res) => {
// //   try {
// //     const { fullName, email, phone, password, confirmPassword } = req.body;

// //     if (!fullName || !email || !phone || !password || !confirmPassword) {
// //       return res.status(400).json({ success: false, message: "All fields required" });
// //     }

// //     if (password !== confirmPassword) {
// //       return res.status(400).json({ success: false, message: "Passwords do not match" });
// //     }

// //     const existingUser = await WebsiteUser.findOne({ email });
// //     if (existingUser) {
// //       return res.status(409).json({ success: false, message: "User already exists" });
// //     }

// //     const user = await WebsiteUser.create({
// //       fullName,
// //       email,
// //       phone,
// //       password,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Signup successful",
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Signup failed" });
// //   }
// // };

// // /* ===================== LOGIN (TOKEN FIXED) ===================== */
// // exports.login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await WebsiteUser.findOne({ email }).select("+password");
// //     if (!user) {
// //       return res.status(401).json({ success: false, message: "Invalid credentials" });
// //     }

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) {
// //       return res.status(401).json({ success: false, message: "Invalid credentials" });
// //     }

// //     // 🔑 JWT TOKEN
// //     const token = jwt.sign(
// //       {
// //         id: user._id,
// //         role: "user",
// //         email: user.email,
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.json({
// //       success: true,
// //       message: "Login successful",
// //       token, // 🔥🔥🔥 THIS WAS MISSING
// //       user: {
// //         id: user._id,
// //         fullName: user.fullName,
// //         email: user.email,
// //         phone: user.phone,
// //       },
// //     });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Login failed" });
// //   }
// // };

// // /* ===================== ADMIN ===================== */
// // exports.getAllWebsiteUsers = async (req, res) => {
// //   try {
// //     const users = await WebsiteUser.find().select("-password");
// //     res.json({ success: true, users });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Failed to fetch users" });
// //   }
// // };

// const WebsiteUser = require("../models/WebsiteUser");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// /* ===================== SIGNUP ===================== */
// exports.signup = async (req, res) => {
//   try {
//     const { fullName, email, phone, password, confirmPassword } = req.body;

//     if (!fullName || !email || !phone || !password || !confirmPassword) {
//       return res.status(400).json({ success: false, message: "All fields required" });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ success: false, message: "Passwords do not match" });
//     }

//     const existingUser = await WebsiteUser.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ success: false, message: "User already exists" });
//     }

//     const user = await WebsiteUser.create({
//       fullName,
//       email,
//       phone,
//       password,
//       authProvider: "local",
//     });

//     res.status(201).json({
//       success: true,
//       message: "Signup successful",
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ success: false, message: "Signup failed" });
//   }
// };

// /* ===================== LOGIN ===================== */
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await WebsiteUser.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     // Check if user signed up with Google
//     if (user.authProvider === "google") {
//       return res.status(401).json({ 
//         success: false, 
//         message: "Please login with Google" 
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: "user",
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         profilePicture: user.profilePicture,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Login failed" });
//   }
// };

// /* ===================== GOOGLE LOGIN ===================== */
// exports.googleLogin = async (req, res) => {
//   try {
//     const { googleId, email, fullName, profilePicture } = req.body;

//     if (!googleId || !email || !fullName) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Missing required fields" 
//       });
//     }

//     // Check if user exists
//     let user = await WebsiteUser.findOne({ 
//       $or: [{ email }, { googleId }] 
//     });

//     if (user) {
//       // Update existing user
//       if (!user.googleId) {
//         user.googleId = googleId;
//         user.authProvider = "google";
//       }
//       if (profilePicture) {
//         user.profilePicture = profilePicture;
//       }
//       await user.save();
//     } else {
//       // Create new user
//       user = await WebsiteUser.create({
//         googleId,
//         email,
//         fullName,
//         profilePicture,
//         authProvider: "google",
//       });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: "user",
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       message: "Google login successful",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         phone: user.phone,
//         profilePicture: user.profilePicture,
//       },
//     });
//   } catch (err) {
//     console.error("Google login error:", err);
//     res.status(500).json({ success: false, message: "Google login failed" });
//   }
// };

// /* ===================== ADMIN ===================== */
// exports.getAllWebsiteUsers = async (req, res) => {
//   try {
//     const users = await WebsiteUser.find().select("-password");
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Failed to fetch users" });
//   }
// };

const WebsiteUser = require("../models/WebsiteUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const admin = require("../config/firebaseAdmin");

/* ===================== SIGNUP ===================== */
exports.signup = async (req, res) => {
  try {
    const { fullName, email, phone, password, confirmPassword } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await WebsiteUser.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    await WebsiteUser.create({
      fullName,
      email,
      phone,
      password,
      authProvider: "local",
    });

    res.status(201).json({
      success: true,
      message: "Signup successful",
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

/* ===================== LOGIN ===================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await WebsiteUser.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (user.authProvider === "google") {
      return res.status(401).json({
        success: false,
        message: "Please login with Google",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: "user", email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

/* ===================== GOOGLE LOGIN (SECURE) ===================== */
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Firebase token missing",
      });
    }

    // 🔐 VERIFY FIREBASE TOKEN
    const decoded = await admin.auth().verifyIdToken(token);

    const { uid, email, name, picture } = decoded;

    let user = await WebsiteUser.findOne({ email });

    if (user) {
      if (user.authProvider !== "google") {
        user.authProvider = "google";
        user.googleId = uid;
      }
      if (picture) user.profilePicture = picture;
      await user.save();
    } else {
      user = await WebsiteUser.create({
        fullName: name || "Google User",
        email,
        googleId: uid,
        profilePicture: picture,
        authProvider: "google",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, role: "user", email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(401).json({
      success: false,
      message: "Invalid Google token",
    });
  }
};

/* ===================== ADMIN ===================== */
exports.getAllWebsiteUsers = async (req, res) => {
  try {
    const users = await WebsiteUser.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
