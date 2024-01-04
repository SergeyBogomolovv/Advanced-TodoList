import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './reducers/todoSlice'
import modalSlice from './reducers/modalSlice'
import todoTypeSlice from './reducers/columnsSlice'

const rootReducer = combineReducers({
  todos: todoSlice,
  modal: modalSlice,
  todoType: todoTypeSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
