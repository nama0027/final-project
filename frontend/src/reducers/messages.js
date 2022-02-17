import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const messages = createSlice({
  name: 'messages',

  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    addMessage: (store, action) => {
      const data = action.payload;
      store.items = [data, ...store.items];
    },
    deleteMessage: (store, action) => {
      store.items = store.items.filter((item) => item._id !== action.payload);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

//-------------------------------------------//
export const getMessages = () => {
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('messages'), {
      method: 'Get',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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
        if (data.success) {
          batch(() => {
            dispatch(messages.actions.addMessage(data.response));
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
