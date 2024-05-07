import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth'; // Import the Auth component

const App = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return (
        <div>
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
<Route path="/books" element={<BookList />} />
<Route path="/cart" element={<Cart />} />
<Route path="/admin" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />
<Route path="/auth" element={<Auth />} />

            </Routes>
        </div>
    );
};

export default App;
