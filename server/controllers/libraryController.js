// controllers/libraryController.js
import Book from '../models/book.js';
import User from '../models/user.js';

// Issue a book
export const issueBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const book = await Book.findById(req.params.id);
    const user = await User.findById(userId);

    if (!book || !user) return res.status(404).json({ error: 'Book or User not found' });
    if (!book.availability) return res.status(400).json({ error: 'Book not available' });

    book.availability = false;
    user.issuedBooks.push({ bookId: book._id, issueDate: new Date() });

    await book.save();
    await user.save();

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Book issue failed' });
  }
};

// Return a book
export const returnBook = async (req, res) => {
  try {
    const { userId } = req.body;
    const book = await Book.findById(req.params.id);
    const user = await User.findById(userId);

    if (!book || !user) return res.status(404).json({ error: 'Book or User not found' });

    book.availability = true;
    user.issuedBooks = user.issuedBooks.filter((b) => b.bookId.toString() !== book._id.toString());

    await book.save();
    await user.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Book return failed' });
  }
};
