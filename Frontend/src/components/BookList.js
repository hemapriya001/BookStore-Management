import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../features/bookSlice';
import BookCard from './BookCard';
import './BookList.css';
import axios from 'axios';
import { api_base_url } from '../api';


const BookList = ({ book, onDelete, onEdit, isAdmin }) => {
    const dispatch = useDispatch();
    const [booksList, setBooksList] = useState(book)
    const [loading, setLoading] = useState(true);

    const getBooksFromDb = async () => {
        const response = await axios(api_base_url + '/api/books/all', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        });
        const response_data = await response.data;
        setBooks(response_data)
        dispatch(setBooks(response_data));
        setBooksList(response_data)
    }

    const fetchBooks = async () => {
        try {
            await getBooksFromDb();
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    useEffect(() => {
        fetchBooks()
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (<>
        {booksList &&
            <div className="book-list">
                <h2>Available Books</h2>
                <div className="books-container">
                    {booksList.map((book) => (
                        <BookCard key={book.id} book={book} onDelete={isAdmin ? onDelete : null} onEdit={isAdmin ? onEdit : null} />
                    ))}
                </div>
            </div>
        }
    </>
    );
};

export default BookList