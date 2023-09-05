import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: null,
        username: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setToken, setUsername } = userSlice.actions;
export default userSlice.reducer;