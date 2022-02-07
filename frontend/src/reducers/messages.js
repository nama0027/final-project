import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { user } from './user.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const messages = createSlice({
  name: 'messages',

  initialState: {
    items: [],
    message: '',
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    addMessage: (store, action) => {
      store.message = action.payload;
    },
    deleteMessage: (store, action) => {
      store.items = store.items.filter((item) => item._id !== action.payload);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});
