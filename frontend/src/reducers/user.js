import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const user = createSlice({
  name: 'user',

  initialState: {
    userId: '',
    userName: null,
    accessToken: null,
    role: null,
    error: null,
  },
  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },

    setUserName: (store, action) => {
      store.userName = action.payload;
    },

    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setRole: (store, action) => {
      store.role = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const getUser = (values) => {
  console.log('thunk', values);
  return (dispatch) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if');
          batch(() => {
            console.log(data.response.userId);
            dispatch(user.actions.setUserId(data.response.userId));
            dispatch(user.actions.setUserName(data.response.username));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setRole(data.response.role.description));
            dispatch(user.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUserName(null));
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setRole(null));
            dispatch(user.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
