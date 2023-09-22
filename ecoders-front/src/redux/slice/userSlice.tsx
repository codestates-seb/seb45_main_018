import { createSlice } from '@reduxjs/toolkit';
import profileImg from '../../assets/ProfileImage.svg';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    refreshToken: null,
    username: "",
    id: '',
    email: '',
    profileImg: profileImg,
    authType: 'default',
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },

    setId: (state, action) => {
      state.id = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setProfileImg: (state, action) => {
      state.profileImg = action.payload;
    },

    setAuthType: (state, action) => {
      state.authType = action.payload;
    },
  },
});

export const { setAccessToken, setRefreshToken, setUsername, setId, setEmail, setProfileImg, setAuthType } =
  userSlice.actions;
export default userSlice.reducer;