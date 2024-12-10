import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBoards,
  getBoard,
  deleteBoard,
  addBoard,
  editBoard,
} from './operations';
import { logOut } from '../auth/operations';

const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    item: {},
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBoards.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getBoard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteBoard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addBoard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editBoard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editBoard.fulfilled, (state, action) => {
        console.log(action.payload.board);
        const boardIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );
        // -1 ??????????? -------------------------------------------------
        if (boardIndex === -1) {
          return toast.error('Board not found.', { duration: 2000 });
        }
        state.items[boardIndex] = action.payload.board;
      })
      .addCase(editBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = false;
      }),
});

export const boardReducer = boardSlice.reducer;
