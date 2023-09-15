import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    // accessToken:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNjk0Njk0NDM2MjI1IiwiZW1haWwiOiJ0ZXN0QG5hdmVyLmNvbSIsImlzVmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2OTQ2OTQ1MDEsImV4cCI6MTY5NDY5NjMwMX0.AJug9BYGkNS3m4ym-Nls8-IikQgE7OgQ7_3R5RCbQzM",
    username: 'user',
    // id: 1694694436225,
    id: 0,
    stamp: 0,
  },
  reducers: {
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setStamp: (state, action) => {
      state.stamp = action.payload;
    },
  },
});

export const { setToken, setUsername, setId, setStamp } = userSlice.actions;
export default userSlice.reducer;
