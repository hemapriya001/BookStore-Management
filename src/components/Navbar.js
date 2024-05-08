import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';
import CartIndicator from './CartIndicator'; // Import the CartIndicator component
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
    <span className="cart-link-wrapper">
        <Link to="/cart" className="cart-link">Cart</Link>
        <CartIndicator />
    </span>
</li>

                {isLoggedIn && (
                    <>
                        <li>
                            <Link to="/admin">Admin</Link>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
                {!isLoggedIn && (
                    <li>
                        <Link to="/auth">Login/Sign Up</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
