import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITodoItem, Id } from '../../types'

interface todoState {
  todos: ITodoItem[]
}

const initialState: todoState = {
  todos: [],
}

interface changePayload {
  id: Id
  text: string
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodoItem>) => {
      state.todos = [...state.todos, action.payload]
    },
    deleteTodo: (state, action: PayloadAction<Id>) => {
      state.todos = state.todos.filter(
        (todo: ITodoItem) => todo.id !== action.payload
      )
    },
    changeTodos: (state, acion: PayloadAction<ITodoItem[]>) => {
      state.todos = [...acion.payload]
    },
    setTodoCompleted: (state, action: PayloadAction<Id>) => {
      const toggleTodo = state.todos.find((todo) => todo.id === action.payload)
      if (toggleTodo) toggleTodo.completed = !toggleTodo?.completed
    },
    changeTodoText: (state, action: PayloadAction<changePayload>) => {
      const toggleTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      )
      if (toggleTodo) toggleTodo.text = action.payload.text
    },
    changeTodoTitle: (state, action: PayloadAction<changePayload>) => {
      const toggleTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      )
      if (toggleTodo) toggleTodo.title = action.payload.text
    },
  },
})

export const {
  addTodo,
  deleteTodo,
  setTodoCompleted,
  changeTodoText,
  changeTodoTitle,
  changeTodos,
} = todoSlice.actions

export default todoSlice.reducer
