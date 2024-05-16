import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut, setAdminOff } from '../features/authSlice';
import CartIndicator from './CartIndicator'; // Import the CartIndicator component
import './Navbar.css'; // Import CSS for styling

const Navbar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAdmin = useSelector((state) => state.auth.isAdmin);

    const handleLogout = () => {
        dispatch(logOut());
        dispatch(setAdminOff())
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isAdmin ? <li><Link to="/admin">Admin Dashboard</Link></li> : null}
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <span className="cart-link-wrapper">
                        <Link to="/cart" className="cart-link">Cart</Link>
                        <CartIndicator />
                    </span>
                </li>

                {isLoggedIn ?
                    <li>
                        <button style={{ fontSize: "medium" }} onClick={handleLogout}>Logout</button>
                    </li> :

                    <li>
                        <Link type='button' to="/auth">Login/Sign Up</Link>
                    </li>
                }

            </ul>
        </nav>
    );
};

export default Navbar;
