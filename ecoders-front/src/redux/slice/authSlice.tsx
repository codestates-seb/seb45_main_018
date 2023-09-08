import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null;
    isloading: boolean;
    error: string | null;
}

interface User {
    email: string;
    username: string;
}

const initialState: AuthState = {
    user: null,
    isloading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.isloading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.user = action.payload;
            state.isloading = false;
            state.error = null;
        },
        registerFail: (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        },
    },
});

export const { registerStart, registerSuccess, registerFail } = authSlice.actions;

export default authSlice.reducer;