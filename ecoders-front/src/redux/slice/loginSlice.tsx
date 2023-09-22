import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  isLoggedIn: boolean;
  clientId: string;
}

const initialState: LoginState = {
  isLoggedIn: false,
  clientId: '211432756424-hka0r8dm9mut090doogffcuovlghe99a',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
      localStorage.getItem('accessToken');
      localStorage.getItem('refreshToken');
    },
    logout: state => {
      state.isLoggedIn = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('id');
      localStorage.removeItem('profileImg');
      localStorage.removeItem('option');
    },
    clientId: (state, action) => {
      state.clientId = action.payload;
    },
  },
});

export const { login, logout, clientId } = loginSlice.actions;

export default loginSlice.reducer;
