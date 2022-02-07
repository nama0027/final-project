import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { user } from './user.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const announcements = createSlice({
  name: 'announcements',

  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    deleteAnnouncement: (store, action) => {
      store.items = store.items.filter((item) => item._id !== action.payload);
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const getAnnouncements = () => {
  return (dispatch, getState) => {
    console.log('in getAnnouncments');
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('announcements'), {
      method: 'Get',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if in getannouncement');
          batch(() => {
            dispatch(announcements.actions.setItems(data.response));
            dispatch(announcements.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(announcements.actions.setItems(null));
            dispatch(announcements.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};

export const handelDeleteAnnouncement = (id) => {
  return (dispatch, getState) => {
    console.log('in deleteannouncment', id);
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL(`announcements/${id}`), {
      method: 'DELETE',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log('i am in if in deleteannouncment');
          batch(() => {
            dispatch(announcements.actions.deleteAnnouncement(id));
            dispatch(announcements.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(announcements.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
