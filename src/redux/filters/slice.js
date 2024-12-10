import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    filters: {
      priority: "",
    },
  },
  reducers: {
    changeFilter(state, action) {
      state.filters.priority = action.payload;
    },
  },
});

// export const selectValueFilter = (state) => state.filters.filters.priority;

export const { changeFilter } = slice.actions;
export const filtersReducer = slice.reducer;
