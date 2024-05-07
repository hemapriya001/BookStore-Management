import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';

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
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                </div>
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
