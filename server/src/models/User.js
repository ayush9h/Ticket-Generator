const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userMail: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", userSchema);
