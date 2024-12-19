import { createSlice } from '@reduxjs/toolkit';
import {
  addCard,
  editCard,
  deleteCard,
  fetchCards,
  moveCard,
} from './operations';
import { logOut } from '../auth/operations';

const cardSlice = createSlice({
  name: 'cards',
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: builder =>
    builder
      .addCase(addCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editCard.fulfilled, (state, action) => {
        const cardIndex = state.items.findIndex(
          item => item.id === action.payload.id
        );

        state.items[cardIndex] = action.payload;
      })
      .addCase(editCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // ----------????????????????????????????????????????
      .addCase(moveCard.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(moveCard.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(moveCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchCards.pending, state => {
        state.loading = true;
        state.error = false;
      })

      .addCase(fetchCards.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchCards.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      // ----------------------??????????????????????????????????
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = false;
      }),
});

export const cardReducer = cardSlice.reducer;
export { addCard, editCard, deleteCard };
