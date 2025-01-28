import { createSelector } from '@reduxjs/toolkit';
import { selectValueFilter } from '../filters/selectors';

export const selectCards = state => state.cards.items;

export const selectLoading = state => state.cards.loading;

export const selectError = state => state.cards.error;

export const selectFilteredCards = createSelector(
  [selectCards, selectValueFilter],
  (cards, filter) => {
    return cards.filter(card => card.priority.includes(filter));
  }
);
