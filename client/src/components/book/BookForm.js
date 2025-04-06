// frontend/components/BookForm.jsx
import React, { useState, useEffect } from 'react';

const initialForm = { title: '', author: '', isbn: '', genre: '' };

const BookForm = ({ onSubmit, editingBook, clearEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingBook) setForm(editingBook);
    else setForm(initialForm);
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <div className='w-1/3 bg-white shadow-lg rounded-2xl p-6 overflow-auto'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200'
      >
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>
          {editingBook ? 'Edit Book' : 'Add Book'}
        </h2>

        {['title', 'author', 'isbn', 'genre'].map((field) => (
          <div
            key={field}
            className='mb-4'
          >
            <label
              htmlFor={field}
              className='block text-sm font-medium text-gray-600 mb-1 capitalize'
            >
              {field}
            </label>
            <input
              type='text'
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            />
          </div>
        ))}

        <div className='flex justify-end gap-4 mt-6'>
          {editingBook && (
            <button
              type='button'
              onClick={clearEdit}
              className='px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition'
            >
              Cancel
            </button>
          )}
          <button
            type='submit'
            className='px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition'
          >
            {editingBook ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
