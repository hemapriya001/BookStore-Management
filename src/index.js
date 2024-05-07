import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import bookSlice from './features/bookSlice';
import cartSlice from './features/cartSlice';
import App from './App';
import authSlice from './features/authSlice';



const store = configureStore({
  reducer: {
    books: bookSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
    
  </Provider>,
);

