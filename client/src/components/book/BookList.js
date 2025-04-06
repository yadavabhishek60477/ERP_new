const BookList = ({ books }) => {
  return (
    <div className='w-2/3 bg-gray-50 shadow-lg rounded-2xl p-6 overflow-auto'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mt-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4 text-center'>Library Books</h2>
        <ul className='space-y-4'>
          {books.map((book) => (
            <li
              key={book._id}
              className='flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition'
            >
              <div>
                <p className='text-lg font-medium text-gray-800'>{book.title}</p>
                <p className='text-sm text-gray-600'>by {book.author}</p>
              </div>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  book.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {book.availability ? 'Available' : 'Issued'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookList;
