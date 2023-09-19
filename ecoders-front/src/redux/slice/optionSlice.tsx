import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface OptionState {
    option: number;
}

const initialState: OptionState = {
    option: 5,
}

const optionSlice = createSlice({
    name: 'option',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<number>) => {
            state.option = action.payload;
        }
    }
    }
);

export const { setOption } = optionSlice.actions;

export default optionSlice.reducer;