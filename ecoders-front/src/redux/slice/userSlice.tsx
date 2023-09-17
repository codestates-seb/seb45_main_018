import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: null,
        refreshToken: null,
        username: 'user',
        id: '',
        email: 'user@gmail.com'

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
        }
    },
});

export const { setAccessToken, setRefreshToken, setUsername, setId, setEmail} = userSlice.actions;
export default userSlice.reducer;