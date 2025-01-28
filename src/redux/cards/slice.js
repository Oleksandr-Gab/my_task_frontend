import { createSlice, current } from '@reduxjs/toolkit';
import { addCard, editCard, deleteCard, fetchCards } from './operations';
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
      .addCase(fetchCards.pending, state => {
        state.loading = true;
        state.error = false;
      })

      .addCase(fetchCards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        let arr = [...state.items, ...action.payload];
        arr = [...new Map(arr.map(obj => [`${obj._id}`, obj])).values()];
        state.items = arr;
      })
      .addCase(fetchCards.rejected, state => {
        state.loading = false;
        state.error = true;
      })
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
        state.loading = false;
        const cardIndex = current(state.items).findIndex(
          item => item._id === action.payload._id
        );
        if (cardIndex !== -1) {
          state.items[cardIndex] = action.payload;
        }
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
        console.log(state.items);

        state.items = state.items.filter(item => item._id !== action.meta.arg);
      })
      .addCase(deleteCard.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.loading = false;
        state.error = false;
      }),
});

export const cardReducer = cardSlice.reducer;
