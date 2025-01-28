import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (currentColumn, thunkAPI) => {
    try {
      const response = await axios.get('/cards/', {
        params: {
          columnId: currentColumn,
        },
      });
      return response.data.cards;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addCard = createAsyncThunk(
  'cards/addCard',
  async (newCard, thunkAPI) => {
    try {
      const response = await axios.post('/cards/', newCard);

      return response.data.card;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCard = createAsyncThunk(
  'cards/updateCard',
  async ({ cardId, editCardData }, thunkAPI) => {
    try {
      const response = await axios.put(`/cards/${cardId}`, editCardData);
      console.log(response.data.card);

      return response.data.card;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'cards/deleteCard',
  async (cardId, thunkAPI) => {
    try {
      const response = await axios.delete(`/cards/${cardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
export const moveCard = createAsyncThunk(
  'cards/moveCard',
  async ({ cardId, newCard }, thunkAPI) => {
    try {
      const response = await axios.put(`/cards/${cardId}`, newCard);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
