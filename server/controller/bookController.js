// backend/controllers/bookController.js
const book = require("../models/book");
// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new book (Admin only)
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, genre } = req.body;
    const newBook = new Book({ title, author, isbn, genre });
    await newBook.save();
    res.json({ message: "Book added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Could not add book" });
  }
};

// Delete a book (Admin only)
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Could not delete book" });
  }
};

// Update book details (Admin only)
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Could not update book" });
  }
};
