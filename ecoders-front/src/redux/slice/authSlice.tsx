import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from '../store/store';
import axios from 'axios';

interface AuthState {
    user: null | { username: string; email: string; };
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ username: string; email: string; }>) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        registerFail: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { registerStart, registerSuccess, registerFail } = authSlice.actions;

export default authSlice.reducer;

export const registerUser = (formData: { username: string; email: string; password: string;}): AppThunk => async (dispatch) => {
    try {
        dispatch(registerStart());
        const response = await axios.post('/auth/signup', formData);
        dispatch(registerSuccess(response.data));
    } catch (error: any) {
        dispatch(registerFail(error.message));
    }
}