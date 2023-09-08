// redux/slice/apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  APIURL: 'http://ec2-13-209-89-195.ap-northeast-2.compute.amazonaws.com:8080',
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setAPIURL: (state, action) => {
      state.APIURL = action.payload;
    },
  },
});

export const { setAPIURL } = apiSlice.actions;

export default apiSlice.reducer;
