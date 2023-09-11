import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface MyMission {
    my_mission_id: number;
    text: string;
    completed: boolean;
}

interface TodayMission {
    today_mission_id: number;
    text: string;
    completed: boolean;
    completedMissionCount: number;
}

interface MissionState {
    myMissions: MyMission[];      // 나만의 미션 목록
    todaysMissions: TodayMission[];   // 오늘의 미션 목록
    completedMissionsCount: number;
}

const initialState: MissionState = {
    myMissions: [],
    todaysMissions: [],
    completedMissionsCount: 0
}

const missionSlice = createSlice({
    name: 'missions',
    initialState,
    reducers: {
        addMyMission: (state, action: PayloadAction<MyMission>) => {
            // 나만의 미션 목록에 새로운 미션 추가
            state.myMissions.push(action.payload);
        },
        setTodayMissions: (state, action: PayloadAction<TodayMission[]>) =>{
            // 오늘의 미션 목록 설정
            state.todaysMissions = action.payload;
        },
        completeMyMission: (state, action: PayloadAction<number>) => {
            const mission = state.myMissions.find((m) => m.my_mission_id === action.payload);
            if (mission) {
                mission.completed = !mission.completed;
            }
        },
        setMyMissions: (state, action: PayloadAction<MyMission[]>) => {
            state.myMissions = action.payload;
        },
        completeTodayMission: (state, action: PayloadAction<number>) => {
            const mission = state.todaysMissions.find((m) => m.today_mission_id === action.payload);
            if (mission) {
                mission.completed = !mission.completed;

                state.completedMissionsCount = state.todaysMissions.filter((m) => m.completed).length;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodaysMissions.fulfilled, (state, action) => {
            // 오늘의 미션 데이터를 상태에 설정
            state.todaysMissions = action.payload;
        });
    }
});

export const { addMyMission, setTodayMissions, completeMyMission, setMyMissions, completeTodayMission } = missionSlice.actions;

export default missionSlice.reducer;

// 오늘의 미션 가지고 오는 액션 생성자 함수
// 랜덤으로 5개 들고 오는 거 어떻게 들고 올지 생각해야 함
// 유저가 설정한 갯수를 서버에 보내기 put이나 patch

export const fetchTodaysMissions = createAsyncThunk('missions/fetchTodaysMissions', async () => {
    const response = await axios.get('https://4345e16a-fdc3-4d6f-8760-0b3b56303a85.mock.pstmn.io/mission/today_mission');
    const allMissions = response.data;

    // 랜덤 5개
    const randomMissions: number[] = [];
    while (randomMissions.length < 5) {
        const randomIndex = Math.floor(Math.random() * allMissions.length);
        if (!randomMissions.includes(randomIndex)) {
            randomMissions.push(randomIndex);
        }
    }

    const todaysMissions: TodayMission[] = randomMissions.map((index) => allMissions[index]);

    return todaysMissions;
});

export const updateMyMissionText = createAsyncThunk(
    'missions/updateMyMissionText',
    async (payload: { missionId: number; newText: string }) => {
        const response = await axios.put(`/${payload.missionId}`, {
            text: payload.newText,
        });
        return response.data;
    }
);