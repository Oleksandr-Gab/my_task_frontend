import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  editUser,
  logOut,
  refreshUser,
  help,
  // userThema,
} from './operations';
import { toast } from 'react-toastify';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      userName: null,
      email: null,
      avatarURL: null,
    },
    token: null,
    thema: 'light',
    isLoggedIn: false,
    isRefreshing: false,
    loading: false,
    error: false,
  },

  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(register.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logIn.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(logIn.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // ------------------------------------------------------------------------
      .addCase(editUser.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(editUser.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // --------------------------------------------------------------------------
      .addCase(logOut.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
          password: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        localStorage.removeItem('token');
      })
      .addCase(help.pending, state => {
        toast.loading('is pending...');
        state.loading = true;
        state.error = false;
      })
      .addCase(help.fulfilled, (state, action) => {
        toast.dismiss();
        toast.success(action.payload.message + '👌');
        state.loading = false;
      })
      .addCase(help.rejected, (state, action) => {
        toast.dismiss();
        toast.error(action.payload.response.data + '🤯 😣');
        state.loading = false;
        state.error = true;
      }),
});

export const authReducer = authSlice.reducer;
