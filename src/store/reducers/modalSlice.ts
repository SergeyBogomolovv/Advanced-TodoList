import { createSlice } from '@reduxjs/toolkit'
interface modalState {
  isTodoModalActive: boolean
  isColumnModalActive: boolean
}

const initialState: modalState = {
  isTodoModalActive: false,
  isColumnModalActive: false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openTodoModal: (state) => {
      state.isTodoModalActive = true
    },
    closeTodoModal: (state) => {
      state.isTodoModalActive = false
    },
    openColumnModal: (state) => {
      state.isColumnModalActive = true
    },
    closeColumnModal: (state) => {
      state.isColumnModalActive = false
    },
  },
})

export const {
  openTodoModal,
  closeTodoModal,
  openColumnModal,
  closeColumnModal,
} = modalSlice.actions

export default modalSlice.reducer
