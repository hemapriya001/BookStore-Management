import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { deleteBook } from "../features/bookSlice";
import './BookCard.css';

const BookCard = ({ book, onDelete, onEdit }) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);


    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };

    return (
        <div className="book-card">
            <img src={book.image} alt={book.name} className="book-image" />
            <h3>{book.name}</h3>
            {/* <p>Author: {book.author}</p> */}
            {/* <p>Price: ${book.price}</p> */}
            <p>Quantity: {book.quantity}</p>
            {isAdmin &&
                <div className="book-card-actions">
                    <button onClick={() => onEdit(book)}>Edit</button>
                    <button onClick={() => onDelete(book.id)}>Delete</button>
                </div>
            }
            {!isAdmin && <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>}
        </div>
    );
};

export default BookCard;
