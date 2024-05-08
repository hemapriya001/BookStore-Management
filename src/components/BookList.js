import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../features/bookSlice';
import BookCard from './BookCard';
import './BookList.css';

const BookList = ({ book, onDelete, onEdit,isAdmin }) => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const [loading, setLoading] = useState(true);

    // Define the booksData array with 9 books and their respective details
    const booksData = [
        {
            id: 1,
            image: 'http://prodimage.images-bn.com/pimages/9781499369748_p0_v3_s1200x630.jpg',
            name: 'Pride and Prejudice',
            author: 'Jane Austen',
            price: 19.99,
            quantity: 1,
        },
        {
            id: 2,
            image: 'https://picfiles.alphacoders.com/140/thumb-1920-140052.jpg',
            name: 'To Kill a Mockingbird',
            author: 'Harper Lee',
            price: 14.99,
            quantity: 3,
        },
        {
            id: 3,
            image: 'https://up.yimg.com/ib/th?id=OIP.kpvLhYYPNFYxzkxdQxstFQHaLH&pid=Api&rs=1&c=1&qlt=95&w=83&h=124',
            name: 'Great Expectations',
            author: 'Charles Dickens',
            price: 12.99,
            quantity: 1,
        },
        {
            id: 4,
            image: 'https://4.bp.blogspot.com/-OuCSJFajTRw/VjfLF1y7KOI/AAAAAAAABIk/RibMkDUUJZU/s1600/1984-orwell-web.jpg',
            name: '1984',
            author: 'George Orwell',
            price: 17.99,
            quantity: 2,
        },
        {
            id: 5,
            image: 'https://up.yimg.com/ib/th?id=OIP.TXBrvNnVH1VLQ6yq6Rf2TAAAAA&pid=Api&rs=1&c=1&qlt=95&w=70&h=112',
            name: 'Moby Dick',
            author: 'Herman Melville',
            price: 15.99,
            quantity: 1,
        },
        {
            id: 6,
            image: 'https://up.yimg.com/ib/th?id=OIP.kIfx-8GhAWZxwSpLwjPb_AHaLH&pid=Api&rs=1&c=1&qlt=95&w=83&h=124https://example.com/lord_of_the_rings.jpg',
            name: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            price: 24.99,
            quantity: 3,
        },
        {
            id: 7,
            image: 'https://up.yimg.com/ib/th?id=OIP.EhOg_5HJS4hDMONihBcEoQAAAA&pid=Api&rs=1&c=1&qlt=95&w=69&h=114',
            name: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            price: 18.99,
            quantity: 9,
        },
        {
            id: 8,
            image: 'https://up.yimg.com/ib/th?id=OIP._dEPMjJRmrbh1LV-gqpw8wAAAA&pid=Api&rs=1&c=1&qlt=95&w=74&h=114',
            name: 'Brave New World',
            author: 'Aldous Huxley',
            price: 13.99,
            quantity: 4,
        },
        {
            id: 9,
            image: '	https://up.yimg.com/ib/th?id=OIP.oknwZcOISh0G2EPL3BKenQHaL3&pid=Api&rs=1&c=1&qlt=95&w=73&h=116',
            name: 'Wuthering Heights',
            author: 'Emily Brontë',
            price: 21.99,
            quantity: 5,
        },
    ];

    useEffect(() => {
        // Use setBooks action to set the books in the Redux store using the booksData array
        dispatch(setBooks(booksData));
        setLoading(false);
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="book-list">
            <h2>Available Books</h2>
            <div className="books-container">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} onDelete={isAdmin? onDelete: null} onEdit={isAdmin? onEdit: null} />
                ))}
            </div>
        </div>
    );
};

export default BookList