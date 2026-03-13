const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);

