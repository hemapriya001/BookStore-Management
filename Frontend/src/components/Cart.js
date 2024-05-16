import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import './Cart.css'; // Import the CSS file

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="cart-container"> {/* Apply CSS class to the container */}
            <h2>Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items"> {/* Apply CSS class to the list of items */}
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item"> {/* Apply CSS class to each cart item */}
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Price: ${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleClearCart}>Clear Cart</button>
                </>
            )}
        </div>
    );
};

export default Cart;
