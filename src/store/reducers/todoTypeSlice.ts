import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ItypeOptions } from '../../components/Header'

interface todoTypeState {
  typeOptions: ItypeOptions[]
}

const initialState: todoTypeState = {
  typeOptions: [{ text: 'Не выбрано', sortQuery: '' }],
}

export const todoTypeSlice = createSlice({
  name: 'todoType',
  initialState,
  reducers: {
    addType: (state, action: PayloadAction<ItypeOptions>) => {
      state.typeOptions = [...state.typeOptions, action.payload]
    },
    deleteType: (state, action: PayloadAction<string>) => {
      state.typeOptions = state.typeOptions.filter(
        (type) => type.sortQuery !== action.payload
      )
    },
  },
})

export const { addType, deleteType } = todoTypeSlice.actions

export default todoTypeSlice.reducer
