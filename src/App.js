import React from 'react';
import { useSelector } from 'react-redux';

import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookList from './components/BookList';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import Auth from './components/Auth'; // Import the Auth component
import  './index.css';
const App = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    return (
        <div>
            <Navbar />
            <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
<Route path="/books" element={<BookList />} />
<Route path="/admin-dashboard" element={<AdminDashboard />} />
<Route path="/cart" element={<Cart />} />
<Route path="/admin" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/" />} />


            </Routes>
        </div>
    );
};

export default App;
