// frontend/pages/LibraryManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BookForm from './book/BookForm';
import BookList from './book/BookList';

const LibraryManager = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const { data } = await axios.get('/api/books');
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddOrUpdate = async (book) => {
    if (book._id) {
      await axios.put(`/api/books/${book._id}`, book);
    } else {
      await axios.post('/api/books', book);
    }
    setEditingBook(null);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  return (
    <div className='flex h-screen w-full p-4 gap-4'>
      <BookForm
        onSubmit={handleAddOrUpdate}
        editingBook={editingBook}
        clearEdit={() => setEditingBook(null)}
      />
      <BookList
        books={books}
        onDelete={handleDelete}
        onEdit={setEditingBook}
      />
    </div>
  );
};

export default LibraryManager;
