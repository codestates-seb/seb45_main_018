import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ModalState {
    modals: Record<string, boolean>; // 여러 모달 관리
}

const initialState: ModalState = {
    modals: {
        // 여기에 여러 모달을 추가, 초기 상태 설정
        stampStatusModal: false,
        settingModal: false,
        modifyModal: false,
        sendingMailModal: false,
        findPwModal: false,
        loginModal: false, //추가함
    }
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.modals[action.payload] = true;
        },
        closeModal: (state, action: PayloadAction<string>) => {
            state.modals[action.payload] = false;
        },
    },
});


export const { openModal, closeModal } = modalSlice.actions;


export default modalSlice.reducer;