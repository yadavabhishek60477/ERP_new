// backend/models/Book.js
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  genre: String,
  availability: { type: Boolean, default: true },
});

const Book = mongoose.model('Book', BookSchema);

export default Book;
