// frontend/components/BookForm.jsx
import React, { useState, useEffect } from 'react';

const initialForm = { title: '', author: '', isbn: '', genre: '' };

const BookForm = ({ onSubmit, editingBook, clearEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingBook) setForm(editingBook);
    else setForm(initialForm);
  }, [editingBook]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? 'Edit Book' : 'Add Book'}</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <input name="author" value={form.author} onChange={handleChange} placeholder="Author" required /><br />
      <input name="isbn" value={form.isbn} onChange={handleChange} placeholder="ISBN" required /><br />
      <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" required /><br />
      <button type="submit">{editingBook ? 'Update' : 'Add'}</button>
      {editingBook && <button type="button" onClick={clearEdit} style={{marginLeft: '10px'}}>Cancel</button>}
    </form>
  );
};

export default BookForm;
