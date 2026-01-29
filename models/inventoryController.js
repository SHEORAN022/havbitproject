const Inventory = require("../models/Inventory");

/* CREATE / INIT INVENTORY */
exports.createInventory = async (req, res) => {
  try {
    const { product, stock, lowStockAlert } = req.body;

    const inventory = await Inventory.create({
      vendor: req.vendor._id,
      product,
      stock,
      lowStockAlert,
    });

    res.status(201).json({ success: true, inventory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* GET ALL INVENTORY (VENDOR) */
exports.getMyInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      vendor: req.vendor._id,
    }).populate("product", "name price image");

    res.json({ success: true, inventory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE STOCK */
exports.updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const inventory = await Inventory.findOne({
      product: req.params.productId,
      vendor: req.vendor._id,
    });

    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });

    inventory.stock = stock;
    await inventory.save();

    res.json({ success: true, inventory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔥 DECREASE STOCK (ORDER TIME) */
exports.decreaseStock = async (productId, qty) => {
  const inventory = await Inventory.findOne({ product: productId });

  if (!inventory || inventory.stock < qty) {
    throw new Error("Insufficient stock");
  }

  inventory.stock -= qty;
  await inventory.save();
};
