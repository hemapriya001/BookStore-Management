import React from 'react';
import { useSelector } from 'react-redux';
import './CartIndicator.css'; // Create and import your CSS file

const CartIndicator = () => {
    // Get the number of items in the cart from the Redux store
    const cartItemsCount = useSelector((state) => state.cart.items.length);

    return (
        <div className="cart-indicator">
            <span className="cart-icon">🛒</span> {/* Cart icon */}
            {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span> /* Badge showing count */
            )}
        </div>
    );
};

export default CartIndicator;
