// const mongoose = require("mongoose");

// const faqSchema = new mongoose.Schema(
//   {
//     productId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//     },

//     faqs: [
//       {
//         question: { type: String, required: true },
//         answer: { type: String, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("ProductFAQ", faqSchema);



const mongoose = require("mongoose");
 
const faqSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorProduct",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    faqs: [
      {
        question: { type: String, required: true, trim: true },
        answer:   { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);
 
module.exports = mongoose.model("ProductFAQ", faqSchema);
 
