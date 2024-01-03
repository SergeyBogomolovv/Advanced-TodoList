import { createSlice } from '@reduxjs/toolkit'

interface modalState {
  isTodoModalActive: boolean
  isQueryModalActive: boolean
}

const initialState: modalState = {
  isTodoModalActive: false,
  isQueryModalActive: false,
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
    openQueryModal: (state) => {
      state.isQueryModalActive = true
    },
    closeTodoQueryModal: (state) => {
      state.isQueryModalActive = false
    },
  },
})

export const {
  openTodoModal,
  closeTodoModal,
  openQueryModal,
  closeTodoQueryModal,
} = modalSlice.actions

export default modalSlice.reducer
