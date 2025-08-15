const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  shopName: String,
  safetyIssue: String,
  prodTarget: String,
  prodActual: String,
  affectedDnTime: String,
  grossDnTime: String,
  majorBreakdown: String,
  employeeId: String,
  employeeName: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: String
});

module.exports = mongoose.model("Ticket", ticketSchema);
