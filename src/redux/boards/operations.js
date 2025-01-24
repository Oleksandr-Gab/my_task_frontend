import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/boards/');
      return response.data.boards;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.get(`/boards/${boardId}`);
      return response.data.board;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, thunkAPI) => {
    try {
      const response = await axios.delete(`/boards/${boardId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (newBoard, thunkAPI) => {
    try {
      const response = await axios.post('/boards/', newBoard);
      return response.data.board;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId, editBoard }, thunkAPI) => {
    try {
      const response = await axios.put(`/boards/${boardId}`, editBoard);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
