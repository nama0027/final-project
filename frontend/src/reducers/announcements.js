import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
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
    addAnnouncement: (store, action) => {
      const data = action.payload;
      store.items = [data, ...store.items];
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const getAnnouncements = () => {
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL('announcements'), {
      method: 'GET',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response);
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
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL(`announcements/${id}`), {
      method: 'DELETE',
      headers: { Authorization: getState().user.accessToken },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
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

//---------------------------------------------//
export const createAnnouncement = (values) => {
  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    const formData = new FormData();
    if (values.file) {
      const uploadedFile = values.file;
      formData.append('fileName', uploadedFile[0].originFileObj);
      delete values.file;
    }
    formData.append('values', JSON.stringify(values));

    fetch(API_URL('announcement'), {
      method: 'POST',
      headers: {
        Authorization: getState().user.accessToken,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data.response);
          batch(() => {
            dispatch(announcements.actions.addAnnouncement(data.response));
            dispatch(announcements.actions.setError(null));
          });
          dispatch(loader.actions.setLoading(false));
        } else {
          batch(() => {
            dispatch(announcements.actions.addAnnouncement(null));
            dispatch(announcements.actions.setError(data.response));
          });
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
