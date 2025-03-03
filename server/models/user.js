// backend/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "admin"], default: "student" },
  issuedBooks: [{ bookId: mongoose.Schema.Types.ObjectId, issueDate: Date }],
});

module.exports = mongoose.model("User", UserSchema);
