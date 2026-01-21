

// const express = require("express");
// const router = express.Router();
// const adminCustomer = require("../controllers/adminCustomerController");

// // Admin Customer CRUD
// router.get("/", adminCustomer.getCustomers);
// router.post("/", adminCustomer.addCustomer);
// router.put("/:id", adminCustomer.updateCustomer);
// router.delete("/:id", adminCustomer.deleteCustomer);

// module.exports = router;







const express = require("express");
const router = express.Router();
const adminCustomer = require("../controllers/adminCustomerController");

// Admin Customer CRUD
router.get("/", adminCustomer.getCustomers);
router.post("/", adminCustomer.addCustomer);
router.put("/:id", adminCustomer.updateCustomer);
router.delete("/:id", adminCustomer.deleteCustomer);

module.exports = router;

