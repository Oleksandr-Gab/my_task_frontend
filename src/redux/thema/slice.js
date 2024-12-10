import { createSlice } from "@reduxjs/toolkit";
import { editThema } from "./operations";

const themaSlice = createSlice({
  name: "thema",
  initialState: {
    thema: null,
    token: null,
    loading: false,
    error: false,
  },

  extraReducers: (builder) =>
    builder
  .addCase(editThema.pending, (state) => {
    state.loading = true;
    state.error = false;
  })
  .addCase(editThema.fulfilled, (state, action) => {
    state.thema = action.payload.thema;
    state.token = action.payload.token;
    state.loading = false;
  })
  .addCase(editThema.rejected, (state) => {
    state.loading = false;
    state.error = true;
  }),
});

export const themaReducer = themaSlice.reducer;
