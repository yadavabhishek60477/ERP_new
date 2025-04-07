import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LibraryManager = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '', genre: '' });

  const fetchBooks = async () => {
    const res = await axios.get('/api/books');
    setBooks(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/books', form);
    setForm({ title: '', author: '', isbn: '', genre: '' });
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/books/${id}`);
    fetchBooks();
  };

  const toggleAvailability = async (id, current) => {
    await axios.put(`/api/books/${id}`, { availability: !current });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className='p-8'>
      <form
        onSubmit={handleAdd}
        className='mb-6 grid grid-cols-2 gap-4 max-w-2xl mx-auto'
      >
        <input
          className='border p-2 rounded'
          placeholder='Title'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className='border p-2 rounded'
          placeholder='Author'
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          className='border p-2 rounded'
          placeholder='ISBN'
          value={form.isbn}
          onChange={(e) => setForm({ ...form, isbn: e.target.value })}
        />
        <input
          className='border p-2 rounded'
          placeholder='Genre'
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <button
          type='submit'
          className='col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700'
        >
          Add Book
        </button>
      </form>

      <div className='max-w-4xl mx-auto'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Library Books</h2>
        <ul className='space-y-4'>
          {books.map((book) => (
            <li
              key={book._id}
              className='flex justify-between items-center p-4 bg-gray-100 border rounded-lg'
            >
              <div>
                <p className='text-lg font-bold'>{book.title}</p>
                <p className='text-sm text-gray-600'>by {book.author}</p>
              </div>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => toggleAvailability(book._id, book.availability)}
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    book.availability ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}
                >
                  {book.availability ? 'Available' : 'Issued'}
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className='text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LibraryManager;
