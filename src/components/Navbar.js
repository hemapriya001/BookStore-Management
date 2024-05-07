import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/admin">Admin Dashboard</Link>
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
