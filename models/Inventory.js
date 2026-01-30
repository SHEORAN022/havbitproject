// const mongoose = require("mongoose");

// const inventorySchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },

//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//       unique: true, // 🔥 one inventory per product
//     },

//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     lowStockAlert: {
//       type: Number,
//       default: 5,
//     },

//     status: {
//       type: String,
//       enum: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"],
//       default: "IN_STOCK",
//     },
//   },
//   { timestamps: true }
// );

// // 🔥 Auto status update
// inventorySchema.pre("save", function (next) {
//   if (this.stock === 0) this.status = "OUT_OF_STOCK";
//   else if (this.stock <= this.lowStockAlert)
//     this.status = "LOW_STOCK";
//   else this.status = "IN_STOCK";

//   next();
// });

// module.exports = mongoose.model("Inventory", inventorySchema);






const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    lowStockAlert: {
      type: Number,
      default: 5,
    },

    status: {
      type: String,
      enum: ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"],
      default: "IN_STOCK",
    },
  },
  { timestamps: true }
);

// 🔥 auto status logic
inventorySchema.pre("save", function (next) {
  if (this.stock === 0) this.status = "OUT_OF_STOCK";
  else if (this.stock <= this.lowStockAlert)
    this.status = "LOW_STOCK";
  else this.status = "IN_STOCK";

  next();
});

// 🔥 ek vendor ek product = ek inventory
inventorySchema.index({ vendor: 1, product: 1 }, { unique: true });

module.exports = mongoose.model("Inventory", inventorySchema);


