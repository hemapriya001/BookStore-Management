import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../features/bookSlice';
import './AdminDashboard.css';
import './BookList.css';
import BookList from './BookList';

const AdminDashboard = () => {
    // State for book form data
    const [bookData, setBookData] = useState({
        name: '',
        author: '',
        price: '',
        quantity: '',
        image: '',
    });

    // State to track editing mode
    const [editMode, setEditMode] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    // State to determine if the current user is admin
    const isAdmin = useSelector((state) => state.auth.isAdmin) // Set true if user is admin

    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);

    // Fetch the books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    // Function to fetch books
    const fetchBooks = async () => {
        try {
            const response = await axios.get('/api/books');
            dispatch(setBooks(response.data));
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to handle adding a new book
    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                // Edit existing book
                await axios.put(`/api/books/${editBookId}`, bookData);
                // Exit edit mode and reset the form
                setEditMode(false);
                setEditBookId(null);
            } else {
                // Add a new book
                await axios.post('/api/books', bookData);
            }
            // Fetch updated list of books and update Redux store
            fetchBooks();
            // Reset form fields
            setBookData({
                name: '',
                author: '',
                price: '',
                quantity: '',
                image: '',
            });
        } catch (error) {
            console.error(editMode ? 'Failed to edit book:' : 'Failed to add book:', error);
        }
    };

    // Function to handle deleting a book
    const handleDeleteBook = async (id) => {
        try {
            // Send DELETE request to remove the book
            await axios.delete(`/api/books/${id}`);
            // Fetch updated list of books and update Redux store
            fetchBooks();
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };

    // Function to handle entering edit mode
    const handleEditBook = (book) => {
        setEditMode(true);
        setEditBookId(book.id);
        setBookData({
            name: book.name,
            author: book.author,
            price: book.price,
            quantity: book.quantity,
            image: book.image,
        });
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard">
                <h2>Admin Dashboard</h2>

                {/* Form for adding/editing a book */}
                <form onSubmit={handleAddBook}>
                    {/* Input fields for book data */}
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
                    <button type="submit">{editMode ? 'Save Changes' : 'Add Book'}</button>
                </form>
            </div>

            {/* BookList component in a separate container */}
            <div className="book-list-container">
                <h3>Existing Books</h3>
                <BookList
                    books={books}
                    onDelete={handleDeleteBook}
                    onEdit={handleEditBook}
                    isAdmin={isAdmin} // Pass isAdmin state to BookList
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
