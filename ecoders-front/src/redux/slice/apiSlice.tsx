// redux/slice/apiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  APIURL: "https://d920b6e3-f965-44a1-82fd-b19047e52a79.mock.pstmn.io"
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
