import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../features/bookSlice';

const AdminDashboard = () => {
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    price: '',
    quantity: '',
    image: '',
  });

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', bookData);
      const response = await axios.get('/api/books');
      dispatch(setBooks(response.data));
      setBookData({
        name: '',
        author: '',
        price: '',
        quantity: '',
        image: '',
      });
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`/api/books/${id}`);
      const response = await axios.get('/api/books');
      dispatch(setBooks(response.data));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={bookData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bookData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={bookData.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={bookData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <h3>Existing Books</h3>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <h4>{book.name}</h4>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <p>Quantity: {book.quantity}</p>
              <button onClick={() => handleDeleteBook(book.id)}>Delete Book</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
