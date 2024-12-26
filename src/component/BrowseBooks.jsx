import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/booksSlice';

const BrowseBooks = () => {
  const { category } = useParams(); 
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.items); 
  const status = useSelector((state) => state.books.status); 
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch books if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  // Filter books based on category
  useEffect(() => {
    const filtered =
      category === 'all'
        ? books
        : books.filter((book) =>
            book.category.toLowerCase() === category.toLowerCase()
          );
    setFilteredBooks(filtered);
  }, [category, books]);

  if (status === 'loading') return <p>Loading books...</p>;
  if (status === 'failed') return <p>Failed to load books. Try again later.</p>;

  return (
    <div className="browse-books">
      <h2>Books in Category: {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      {filteredBooks.length > 0 ? (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <Link to={`/books/details/${book.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books available in this category.</p>
      )}
    </div>
  );
};

export default BrowseBooks;
