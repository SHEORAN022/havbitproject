const LeadEntry = require("../models/LeadEntry");

/* ================= CREATE ================= */
exports.createLead = async (req, res) => {
  try {
    const { fullName, phoneNumber } = req.body;

    if (!fullName || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Full name and phone number required",
      });
    }

    const lead = await LeadEntry.create({ fullName, phoneNumber });

    res.status(201).json({
      success: true,
      data: lead,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= READ (GET ALL) ================= */
exports.getLeads = async (req, res) => {
  try {
    const leads = await LeadEntry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= UPDATE ================= */
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phoneNumber } = req.body;

    const updated = await LeadEntry.findByIdAndUpdate(
      id,
      { fullName, phoneNumber },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ================= DELETE ================= */
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await LeadEntry.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
