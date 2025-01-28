import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --------------------------------------------------------
export const fetchColumns = createAsyncThunk(
  'columns/fetchAll',
  async (currentBoard, thunkAPI) => {
    try {
      const response = await axios.get('/columns/', {
        params: {
          boardId: currentBoard,
        },
      });
      return response.data.columns;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

// ---------------------------------------------------------
export const getColumn = createAsyncThunk(
  'columns/getColumn',
  async (columnId, thunkAPI) => {
    try {
      const response = await axios.get(`/columns/${columnId}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

// ---------------------------------------------------------
export const createColumn = createAsyncThunk(
  'columns/createColumn',
  async (newColumn, thunkAPI) => {
    try {
      const response = await axios.post('/columns/', newColumn);
      return response.data.column;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

// ---------------------------------------------------------
export const deleteColumn = createAsyncThunk(
  'columns/deleteColumn',
  async (columnId, thunkAPI) => {
    try {
      const response = await axios.delete(`/columns/${columnId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

// ---------------------------------------------------------
export const editColumn = createAsyncThunk(
  'columns/updateColumn',
  async ({ columnId, editColumn }, thunkAPI) => {
    try {
      const response = await axios.put(`/columns/${columnId}`, editColumn);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);
