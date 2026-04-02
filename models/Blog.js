// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: String,
    mediaType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
