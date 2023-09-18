import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import modalReducer from "../slice/modalSlice";
import loginReducer from "../slice/loginSlice";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice"
import apiReducer from "../slice/apiSlice"
import optionReducer from "../slice/optionSlice";
import myMissionReducer from "../slice/myMissionSlice";
import todayMissionReducer from "../slice/todayMissionSlice";


// configureStore를 사용하여 스토어를 설정
const store = configureStore({
    reducer: {                      // reducer 속성에는 reducer들을 포함
        modal: modalReducer,
        login: loginReducer,
        auth: authReducer,
        user: userReducer,
        api: apiReducer,
        option: optionReducer,
        myMissions: myMissionReducer,
        todayMissions: todayMissionReducer,

    },

});

// RootState라는 타입 정의 -> 스토어의 상태를 나타냄
// typeof store.getState() -> 스토어의 상태 타입을 가져오는 역할
export type RootState = ReturnType<typeof store.getState>;


// AppDispatch라는 타입 정의 -> dispatch 메서드의 타입 나타냄
export type AppDispatch = typeof store.dispatch;

// AppThunk 타입 정의
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;