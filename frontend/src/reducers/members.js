import { createSlice } from '@reduxjs/toolkit';
import { loader } from './loader.js';
import { API_URL } from '../utils/constants.js';
import { batch } from 'react-redux';

export const members = createSlice({
  name: 'members',

  initialState: {
    members: [],
    memberId: '',
    userName: null,
    password: null,
    role: null,
    avatar: '',
    firstName: null,
    lastName: null,
    e_mail: null,
    phone: null,
    address: null,
    membershipType: null,
    error: null,
  },
  reducers: {
    setMemberId: (store, action) => {
      store.memberId = action.payload;
    },
    setUserName: (store, action) => {
      store.userName = action.payload;
    },
    setRole: (store, action) => {
      store.role = action.payload;
    },
    setAvatar: (store, action) => {
      store.avatar = action.payload;
    },
    setFirstName: (store, action) => {
      store.firstName = action.payload;
    },
    setLastName: (store, action) => {
      store.lastName = action.payload;
    },
    setEmail: (store, action) => {
      store.e_mail = action.payload;
    },
    setPhone: (store, action) => {
      store.phone = action.payload;
    },
    setAddress: (store, action) => {
      store.address = action.payload;
    },
    setMembershipType: (store, action) => {
      store.membershipType = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
  },
});

export const getRegistered = (values) => {
  return (dispatch) => {
    dispatch(loader.actions.setLoading(true));
    const formData = new FormData();
    if (values.avatar) {
      const uploadedAvatar = values.avatar;
      formData.append('fileName', uploadedAvatar[0].originFileObj);
      delete values.avatar;
    }
    formData.append('values', JSON.stringify(values));

    fetch(API_URL('register'), {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(members.actions.setError(null));
          dispatch(loader.actions.setLoading(false));
        } else {
          dispatch(members.actions.setError(data.response));
          dispatch(members.actions.setAvatar(null));
          dispatch(loader.actions.setLoading(false));
        }
      });
  };
};
