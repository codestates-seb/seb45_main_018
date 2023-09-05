// redux/slice/apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  APIURL: 'https://686c3178-ea4b-453f-a252-b2d06e0a9ebc.mock.pstmn.io/login'
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setAPIURL: (state, action) => {
      state.APIURL = action.payload;
    }
  }
});

export const { setAPIURL } = apiSlice.actions;

export default apiSlice.reducer;
