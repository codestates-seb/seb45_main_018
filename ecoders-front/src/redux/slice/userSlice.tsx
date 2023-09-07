import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: null,
        username: 'user',
        id: 0,
        stamp: 0
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
        }
    },
});

export const { setToken, setUsername, setId, setStamp} = userSlice.actions;
export default userSlice.reducer;