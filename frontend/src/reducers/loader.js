import { createSlice } from '@reduxjs/toolkit';

export const loader = createSlice({
  name: 'loader',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
