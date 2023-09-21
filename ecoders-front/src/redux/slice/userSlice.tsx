import { createSlice } from '@reduxjs/toolkit';
import profileImg from '../../assets/ProfileImage.svg';
import { AppThunk } from '../store/store';
import axios from 'axios';


export const fetchUsername = (): AppThunk => async (dispatch) => {
  try {
      const response = await axios.get(
          `http://ec2-54-180-107-29.ap-northeast-2.compute.amazonaws.com:8080/members/my-info}`,
          {
          headers: {
              Authorization: `${localStorage.getItem('accessToken')}`,
              'Refresh-Token': `${localStorage.getItem('refreshToken')}`,
          },
          }
      );

    if (response.status === 200) {
      dispatch(setUsername(response.data.username));
    } else {
      console.error("데이터를 불러오는 중 오류 발생:", response);
    }
  } catch (error) {
    console.error("데이터를 불러오는 중 오류 발생:", error);
  }
}


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: null,
    refreshToken: null,
    username: "",
    tempUsername: 'user',
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

    setTempUsername: (state, action) => {
      state.tempUsername = action.payload;
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

export const { setTempUsername, setAccessToken, setRefreshToken, setUsername, setId, setEmail, setProfileImg, setAuthType } =
  userSlice.actions;
export default userSlice.reducer;