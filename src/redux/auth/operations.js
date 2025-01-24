import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// --------------------------------------------------
axios.defaults.baseURL = 'https://my-task-backend-6e7s.onrender.com/api/';
// --------------------------------------------------

const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = '';
};

// credentials - облікові дані отримані з форми
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/register', credentials);

      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      if (error.response.status === 409) {
        alert('Email in use');
      }
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const editUser = createAsyncThunk(
  'auth/edit',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.patch('users/edit', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const {
      auth: { token },
    } = thunkAPI.getState();
    setAuthHeader(token);
    const response = await axios.get('/users/current');
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const reduxState = getState();
      const savedToken = reduxState.auth.token;
      return savedToken !== null;
    },
  }
);

// ----------------------------
export const help = createAsyncThunk(
  'auth/support',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/help/', credentials);
      setAuthHeader(response.data.token);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
