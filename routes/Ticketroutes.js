const express = require("express");
const router  = express.Router();
const Ticket  = require("../models/Ticketmodel"); // apna path adjust karo

const vendorAuth = require("../middleware/vendorAuth"); // existing middleware
const adminAuth  = require("../middleware/adminAuth");  // existing middleware

/* ═══════════════════════════════════════════════════
   VENDOR ROUTES
═══════════════════════════════════════════════════ */

/* ── Create Ticket ── */
router.post("/vendor/create", vendorAuth, async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: "Subject aur message required hain" });
    }

    const ticket = await Ticket.create({
      vendor:  req.vendor._id,
      subject: subject.trim(),
      message: message.trim(),
      status:  "Open",
    });

    res.status(201).json({ success: true, message: "Ticket submit ho gaya!", ticket });
  } catch (err) {
    console.error("Create Ticket Error:", err);
    res.status(500).json({ success: false, message: "Ticket create nahi hua" });
  }
});

/* ── Vendor: Apni saari tickets dekho ── */
router.get("/vendor/my-tickets", vendorAuth, async (req, res) => {
  try {
    const tickets = await Ticket.find({ vendor: req.vendor._id })
      .sort({ updatedAt: -1 });

    res.json({ success: true, tickets });
  } catch (err) {
    console.error("Fetch Tickets Error:", err);
    res.status(500).json({ success: false, message: "Tickets fetch nahi hue" });
  }
});

/* ── Vendor: Single ticket detail with replies ── */
router.get("/vendor/ticket/:id", vendorAuth, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id:    req.params.id,
      vendor: req.vendor._id,
    });

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket nahi mila" });
    }

    res.json({ success: true, ticket });
  } catch (err) {
    console.error("Ticket Detail Error:", err);
    res.status(500).json({ success: false, message: "Ticket load nahi hua" });
  }
});

/* ═══════════════════════════════════════════════════
   ADMIN ROUTES
═══════════════════════════════════════════════════ */

/* ── Admin: Saare tickets dekho (filter by status) ── */
router.get("/admin/all", adminAuth, async (req, res) => {
  try {
    const { status } = req.query; // ?status=Open
    const filter = status ? { status } : {};

    const tickets = await Ticket.find(filter)
      .populate("vendor", "contactName email brandName phone")
      .sort({ updatedAt: -1 });

    res.json({ success: true, tickets });
  } catch (err) {
    console.error("Admin Fetch Tickets Error:", err);
    res.status(500).json({ success: false, message: "Tickets fetch nahi hue" });
  }
});

/* ── Admin: Single ticket detail ── */
router.get("/admin/ticket/:id", adminAuth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("vendor", "contactName email brandName phone");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket nahi mila" });
    }

    res.json({ success: true, ticket });
  } catch (err) {
    console.error("Admin Ticket Detail Error:", err);
    res.status(500).json({ success: false, message: "Ticket load nahi hua" });
  }
});

/* ── Admin: Status update karo ── */
router.put("/admin/ticket/:id/status", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Open", "In Progress", "Resolved"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("vendor", "contactName email brandName");

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket nahi mila" });
    }

    res.json({ success: true, message: "Status update ho gaya", ticket });
  } catch (err) {
    console.error("Status Update Error:", err);
    res.status(500).json({ success: false, message: "Status update nahi hua" });
  }
});

/* ── Admin: Reply bhejo ── */
router.post("/admin/ticket/:id/reply", adminAuth, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: "Reply message required hai" });
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: "Ticket nahi mila" });
    }

    ticket.replies.push({ message: message.trim(), sentBy: "admin" });

    // Reply aane par status In Progress kar do (agar Open ho)
    if (ticket.status === "Open") {
      ticket.status = "In Progress";
    }

    await ticket.save();

    res.json({ success: true, message: "Reply send ho gaya", ticket });
  } catch (err) {
    console.error("Admin Reply Error:", err);
    res.status(500).json({ success: false, message: "Reply send nahi hua" });
  }
});

module.exports = router;
