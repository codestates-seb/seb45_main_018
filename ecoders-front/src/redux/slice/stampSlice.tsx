import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../store/store"
import axios from "axios"

interface Complete {
    date: string;
    count: number;
}

interface CompleteState {
    completes: Complete[]
}

const initialState: CompleteState = {
    completes: [],
}

const stampSlice = createSlice({
    name: 'stamps',
    initialState,
    reducers: {
        setCompletes: (state, action: PayloadAction<Complete[]>) => {
            state.completes = action.payload;
        },
    }
})

export const fetchStampsAsync = (): AppThunk => async (dispatch) => {
    try {
        const response = await axios.get(`apiUrl/today_mission/count`, {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
            }
        });

        if (response.status === 200) {
            dispatch(setCompletes(response.data));
        }
    } catch (error) {

    }
};


export const { setCompletes } = stampSlice.actions;
export default stampSlice.reducer;