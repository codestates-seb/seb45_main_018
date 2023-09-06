import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Mission {
    id: number;
    text: string;
}

interface MissionState {
    myMissions: Mission[];      // 나만의 미션
    todayMissions: Mission[];   // 오늘의 미션
}

const initialState: MissionState = {
    myMissions: [],
    todayMissions: [],
}

const missionSlice = createSlice({
    name: 'missions',
    initialState,
    reducers: {
        addMyMission: (state, action: PayloadAction<Mission>) => {
            // 나만의 미션 목록에 새로운 미션 추가
            state.myMissions.push(action.payload);
        },
        setTodayMissions: (state, action: PayloadAction<Mission[]>) =>{
            // 오늘의 미션 목록 설정
            state.todayMissions = action.payload;
        },
    },
});

export const { addMyMission, setTodayMissions } = missionSlice.actions;

export default missionSlice.reducer;

// 오늘의 미션 가지고 오는 액션 생성자 함수
// 랜덤으로 5개 들고 오는 거 어떻게 들고 올지 생각해야 함
export const fetchTodayMissions = createAsyncThunk('missions/fetchTodayMissions', async () => {
    const response = await axios.get('api 주소');
    return response.data;
})