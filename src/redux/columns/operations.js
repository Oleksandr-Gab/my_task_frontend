import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const setBoardIdHeader = boardId => {
//   axios.defaults.headers.common['boardId'] = boardId;
// };

// --------------------------------------------------------
export const fetchColumns = createAsyncThunk(
  'columns/fetchAll',
  async (currentBoard, thunkAPI) => {
    try {
      const response = await axios.get('/api/columns/', {
        params: {
          boardId: currentBoard,
        },
      });
      // console.log(response.data.columns);
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
      const response = await axios.get(`api/columns/${columnId}`);
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
      const response = await axios.post('/api/columns/', newColumn);
      console.log(response.data);
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
      const response = await axios.delete(`/api/columns/${columnId}`);
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
      const response = await axios.put(`/api/columns/${columnId}`, editColumn);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);
