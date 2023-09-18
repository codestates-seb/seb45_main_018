import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/store";
import axios from "axios";


interface TodayMission {
    todayMissionId: number;
    content: string;
    completed: boolean;
}

interface TodayMissionState {
    todaymissions: TodayMission[];
}

const initialState: TodayMissionState = {
    todaymissions: [],
}

const todayMissionSlice = createSlice( {
    name: 'todayMissions',
    initialState,
    reducers: {
        toggleTodayMission: (state, action: PayloadAction<number>) => {
            const mission = state.todaymissions.find((mission) => mission.todayMissionId === action.payload);
            if (mission) {
                mission.completed = !mission.completed;
            }
        },
        setTodayMissions: (state, action: PayloadAction<TodayMission[]>) => {
            state.todaymissions = action.payload;
        }
    },
})


export const fetchTodayMissionsAsync = (): AppThunk => async (dispatch, getState) => {
    try {

        const state = getState();
        const option = state.option.option;


        const response = await axios.get(
            `http://ec2-54-180-124-160.ap-northeast-2.compute.amazonaws.com:8080/mission/today_mission?size=${option}`,
            {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
            },
            }
        );

        console.log(option)

      if (response.status === 200) {
        dispatch(setTodayMissions(response.data));
      } else {
        console.error("데이터를 불러오는 중 오류 발생:", response);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
}
export const { toggleTodayMission, setTodayMissions } = todayMissionSlice.actions;
export default todayMissionSlice.reducer;