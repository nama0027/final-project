import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';

export const files = createSlice({
  name: 'files',
  initialState: {
    fileId: null,
    error: null,
  },
  reducers: {
    setFileId: (store, action) => {
      store.fileId = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

//-------------------------------------------//

export const postFile = (avatar, mode) => {
  const formData = new FormData();

  formData.append('fileName', avatar[0].originFileObj);

  return (dispatch, getState) => {
    dispatch(loader.actions.setLoading(true));
    fetch(API_URL(`upload/${mode}`), {
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
          dispatch(files.actions.setFileId(data.response._id));
          dispatch(files.actions.setError(null));
          dispatch(loader.actions.setLoading(false));
        } else {
          dispatch(files.actions.setFileId(null));
          dispatch(files.actions.setError(data.response));
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
