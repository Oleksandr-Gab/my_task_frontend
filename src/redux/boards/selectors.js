import { selectValueFilter } from '../filters/selectors';
import { createSelector } from '@reduxjs/toolkit';

export const selectBoards = state => state.boards.items;

export const selectOneBoard = state => state.boards.item;

// ---------------------------------------------------------
// board.priority - значення пріорітету задачі
// ---------------------------------------------------------
export const selectFilteredColumns = createSelector(
  [selectBoards, selectValueFilter],
  (boards, valueFilter) => {
    return boards.filter(board => board.priority === valueFilter);
  }
);
// ----------------------------------------------------------

export const selectLoading = state => state.boards.loading;

export const selectError = state => state.boards.error;
