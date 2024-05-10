import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setAdminOn: (state) => {
      state.isAdmin = true;
    },
    setAdminOff: (state) => {
      state.isAdmin = false;
    }
  },
});

export const { logIn, logOut, setAdminOff, setAdminOn } = authSlice.actions;
export default authSlice;
