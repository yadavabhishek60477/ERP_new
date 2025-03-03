// backend/models/Book.js
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  genre: String,
  availability: { type: Boolean, default: true },
});

module.exports = mongoose.model("Book", BookSchema);
