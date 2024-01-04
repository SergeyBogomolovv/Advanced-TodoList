import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Id, IColumn } from '../../types'
import nextId from 'react-id-generator'

interface columnState {
  columns: IColumn[]
}

const initialState: columnState = {
  columns: [{ text: 'Не выбрано', id: nextId() }],
}

export const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<IColumn>) => {
      state.columns = [...state.columns, action.payload]
    },
    deleteColumn: (state, action: PayloadAction<Id>) => {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      )
    },
    changeColumns: (state, action: PayloadAction<IColumn[]>) => {
      state.columns = [...action.payload]
    },
  },
})

export const { addColumn, deleteColumn, changeColumns } = columnSlice.actions

export default columnSlice.reducer
