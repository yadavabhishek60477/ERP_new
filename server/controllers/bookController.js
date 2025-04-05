// frontend/components/BookList.jsx
import React from 'react';

const BookList = ({ books, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Library Books</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>ISBN</th><th>Genre</th><th>Available</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td><td>{book.author}</td><td>{book.isbn}</td><td>{book.genre}</td>
              <td>{book.availability ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(book)}>Edit</button>
                <button onClick={() => onDelete(book._id)} style={{marginLeft: '10px'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
