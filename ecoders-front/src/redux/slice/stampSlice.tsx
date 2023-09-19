import { createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../store/store"
import axios from "axios"

interface Stamp {

}

interface StampState {
    stamp: Stamp[]

}

const initialState: StampState = {
    stamp: [],
}

const stampSlice = createSlice({
    name: 'stamp',
    initialState,
    reducers: {

    }
})

export const fetchStampsAsync = (): AppThunk => async (dispatch) => {
    try {

        const response = await axios.get(`apiUrl`, {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
            }
        });

        if (response.status === 200) {
            dispatch;
        }
    } catch (error) {

    }
}

export const { } = stampSlice.actions;
export default stampSlice.reducer;