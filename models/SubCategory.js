// const mongoose = require("mongoose");


// const SubCategorySchema = new mongoose.Schema({
//   subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },

//   name: {
//     type: String,
//     required: true
//   },
//   parent: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true
//   }
  
// }, { timestamps: true });

// module.exports = mongoose.model("SubCategory", SubCategorySchema);






// const mongoose = require("mongoose");

// const SubCategorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   parent: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//     required: true
//   },
//   image: { // New field
//     type: String,
//     default: ""
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("SubCategory", SubCategorySchema);











const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  image: {
    type: String, // store image URL/path
  }
}, { timestamps: true });

module.exports = mongoose.model("SubCategory", SubCategorySchema);
