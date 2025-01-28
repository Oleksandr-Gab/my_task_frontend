import { createSlice, current } from '@reduxjs/toolkit';
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
    boards: [],
    oneBoard: {},
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
        state.boards = action.payload;
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
        state.oneBoard = action.payload;
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
        state.boards = state.boards.filter(
          board => board.id !== action.payload.id
        );
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
        state.error = false;
        state.boards.push(action.payload);
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
        const boardIndex = current(state.boards).findIndex(
          item => item.id === action.payload.id
        );
        // -1 ??????????? -------------------------------------------------
        state.boards[boardIndex] = action.payload.board;
      })
      .addCase(editBoard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, state => {
        state.boards = [];
        state.loading = false;
        state.error = false;
      }),
});

export const boardReducer = boardSlice.reducer;
