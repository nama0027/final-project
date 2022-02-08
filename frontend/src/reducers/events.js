import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const events = createSlice({
  name: 'events',
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },

    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const getEvents = () => {
  return (dispatch, getState) => {
    console.log('in getEvents');
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('events'), {
      method: 'Get',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if in getevents');
          batch(() => {
            dispatch(events.actions.setItems(data.response));
            dispatch(events.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(events.actions.setItems(null));
            dispatch(events.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
