import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: null,
        refreshToken: null,
        username: 'user',
        id: '',
        stamp: 0
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

        setStamp: (state, action) => {
            state.stamp = action.payload;
        }
    },
});

export const { setAccessToken, setRefreshToken, setUsername, setId, setStamp} = userSlice.actions;
export default userSlice.reducer;