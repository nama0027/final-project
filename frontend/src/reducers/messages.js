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

export const getMessages = () => {
  return (dispatch, getState) => {
    console.log('in getMessages');
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('messages'), {
      method: 'Get',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if in getMessages');
          batch(() => {
            dispatch(messages.actions.setItems(data.response));
            dispatch(messages.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(messages.actions.setItems(null));
            dispatch(messages.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};

export const postMessage = (value) => {
  console.log('thunk', value);
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('message'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getState().user.accessToken,
      },
      body: JSON.stringify({ message: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if');
          batch(() => {
            dispatch(messages.actions.addMessage(data.response.message));
            dispatch(messages.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(messages.actions.addMessage(null));
            dispatch(messages.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
