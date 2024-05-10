import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter((item) => item.id !== action.payload);
    }
  },
});

export const { setBooks, deleteBook } = bookSlice.actions;
export default bookSlice;
