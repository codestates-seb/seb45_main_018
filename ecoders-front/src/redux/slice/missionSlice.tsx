import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Mission {
    id: number;
    text: string;
    completed: boolean;
}

interface MissionState {
    myMissions: Mission[];      // 나만의 미션 목록
    todaysMissions: Mission[];   // 오늘의 미션 목록
}

const initialState: MissionState = {
    myMissions: [],
    todaysMissions: [],
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
            state.todaysMissions = action.payload;
        },
        completeMyMission: (state, action: PayloadAction<number>) => {
            const mission = state.myMissions.find((m) => m.id === action.payload);
            if (mission) {
                mission.completed = !mission.completed;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodaysMissions.fulfilled, (state, action) => {
            // 오늘의 미션 데이터를 상태에 설정
            state.todaysMissions = action.payload;
        });
    }
});

export const { addMyMission, setTodayMissions, completeMyMission } = missionSlice.actions;

export default missionSlice.reducer;

// 오늘의 미션 가지고 오는 액션 생성자 함수
// 랜덤으로 5개 들고 오는 거 어떻게 들고 올지 생각해야 함
export const fetchTodaysMissions = createAsyncThunk('missions/fetchTodaysMissions', async () => {
    const response = await axios.get('api 주소');
    return response.data;
})