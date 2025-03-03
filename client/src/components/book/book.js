// src/components/BookList.js
import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div>
      <h2>Library Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.title} by {book.author} ({book.availability ? "Available" : "Issued"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
