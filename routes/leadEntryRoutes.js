const express = require("express");
const router = express.Router();

const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadEntryController");

/* CRUD ROUTES */
router.post("/", createLead);          // CREATE
router.get("/", getLeads);             // READ
router.put("/:id", updateLead);        // UPDATE
router.delete("/:id", deleteLead);     // DELETE

module.exports = router;
