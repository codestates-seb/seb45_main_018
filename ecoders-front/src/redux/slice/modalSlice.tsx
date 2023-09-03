import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean;
    modalContent: string;
}

const initialState: ModalState = {
    isOpen: false,
    modalContent: "",
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setModalContent: (state, action: { payload: string }) => {
            state.modalContent = action.payload;
        }
    },
});

export const { openModal, closeModal, setModalContent } = modalSlice.actions;

export default modalSlice.reducer;