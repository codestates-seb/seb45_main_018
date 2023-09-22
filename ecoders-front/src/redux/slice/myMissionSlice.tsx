import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store/store";
import axios from "axios";

interface MyMission {
    my_mission_id: number; // 백엔드에서 생성
    text: string;
    completed: boolean; // 백엔드에서 생성
}

interface MyMissionState {
    missions: MyMission[];
}

const initialState: MyMissionState = {
    missions: [],
}

const myMissionSlice = createSlice({
    name: 'myMissions',
    initialState,
    reducers: {
        toggleMission: (state, action: PayloadAction<number>) => {
            const mission = state.missions.find((mission) => mission.my_mission_id === action.payload);
            if (mission) {
                mission.completed = !mission.completed;
            }
        },
        deleteMission: (state, action: PayloadAction<number>) => {
            state.missions = state.missions.filter((mission) => mission.my_mission_id !== action.payload);
        },
        addMissionToState: (state, action: PayloadAction<{ my_mission_id: number; text: string; completed: boolean }>) => {
            const { my_mission_id, text, completed } = action.payload;
            state.missions.push({ my_mission_id, text, completed });
        },
        updateMissionText: (state, action: PayloadAction<{ my_mission_id: number; text: string }>) => {
            const { my_mission_id, text } = action.payload;
            const mission = state.missions.find((mission) => mission.my_mission_id === my_mission_id);
            if (mission) {
                mission.text = text;
            }
        },
        setMyMissions: (state, action: PayloadAction<MyMission[]>) => {
            state.missions = action.payload;
        },
    },
})

// addMission 액션 비동기 처리 함수
export const addMissionAsync = (text: string): AppThunk => async (dispatch) => {
    try {
        const response = await axios.post('http://ec2-54-180-107-29.ap-northeast-2.compute.amazonaws.com:8080/mission/my_mission', {
            text: text,
        }, {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
                'Refresh-Token': `${localStorage.getItem('refreshToken')}`,
            }
        });

        if (response.status === 201) {
            const { my_mission_id, completed } = response.data;
            dispatch(addMissionToState({ my_mission_id, text, completed }));
        }
    } catch (error) {
        console.error('등록 중 오류가 발생했습니다.:', error);
    }
}

// 수정 내용 업데이트 액션
export const updatedMissionText = (my_mission_id: number, text: string): AppThunk => async (dispatch) => {
    try {
        const response = await axios.patch(`http://ec2-54-180-107-29.ap-northeast-2.compute.amazonaws.com:8080/mission/my_mission/${my_mission_id}`, {
            text: text,
        },
        {
            headers: {
                Authorization: `${localStorage.getItem('accessToken')}`,
                'Refresh-Token': `${localStorage.getItem('refreshToken')}`,
            },
        });

        if (response.status === 200) {
            // 서버요청 성공 -> redux 상태 업데이트
            console.log(`미션 ${my_mission_id}를 업데이트했습니다.`);
            dispatch(updateMissionTextInState(my_mission_id, text));
        } else {
            console.error(`미션 ${my_mission_id}를 업데이트하는 중 오류가 발생했습니다.`);
        }
    } catch (error) {
        console.error(`오류가 발생했습니다.`, error);
    }
};

// redux 액션 추가
export const updateMissionTextInState = (my_mission_id: number, text: string) => ({
    type: 'myMissions/updateMissionText',
    payload: {
        my_mission_id,
        text,
    },
});

export const fetchMyMissionsAsync = (): AppThunk => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://ec2-54-180-107-29.ap-northeast-2.compute.amazonaws.com:8080/mission/my_missions/list",
        {
          headers: {
            Authorization: `${localStorage.getItem('accessToken')}`,
            'Refresh-Token': `${localStorage.getItem('refreshToken')}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(setMyMissions(response.data));
        console.log(response.data) // 받아온 데이터로 슬라이스 상태를 업데이트합니다.
      } else {
        console.error("데이터를 불러오는 중 오류 발생:", response);
      }
    } catch (error) {
      console.error("데이터를 불러오는 중 오류 발생:", error);
    }
  };


export const { toggleMission, deleteMission, addMissionToState, updateMissionText, setMyMissions } = myMissionSlice.actions;
export default myMissionSlice.reducer;