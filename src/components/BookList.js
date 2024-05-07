import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../features/bookSlice';
import BookCard from './BookCard';

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        dispatch(setBooks(response.data));
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Available Books</h2>
      <div>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
