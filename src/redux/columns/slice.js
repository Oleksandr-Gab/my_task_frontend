import { createSlice } from "@reduxjs/toolkit";
import {
  fetchColumns,
  getColumn,
  createColumn,
  deleteColumn,
  editColumn,
} from "./operations";
import { logOut } from "../auth/operations";

const columnSlice = createSlice({
  name: "columns",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchColumns.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchColumns.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchColumns.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(getColumn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getColumn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(createColumn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.items.push(action.payload);
      })
      .addCase(createColumn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteColumn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteColumn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editColumn.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editColumn.fulfilled, (state, action) => {
        const columnIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (columnIndex !== -1) {
          state.items[columnIndex] = action.payload;
        }
      })
      .addCase(editColumn.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = false;
      }),
});

export const columnReducer = columnSlice.reducer;
export { createColumn, fetchColumns, getColumn, deleteColumn, editColumn };
