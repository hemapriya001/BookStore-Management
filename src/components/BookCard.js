import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  return (
    <div>
      <img src={book.image} alt={book.name} />
      <h3>{book.name}</h3>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Quantity: {book.quantity}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default BookCard;
