import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ITodoItem, Id } from '../../types'
import { arrayMove } from '@dnd-kit/sortable'

interface todoState {
  todos: ITodoItem[]
}

const initialState: todoState = {
  todos: [],
}

interface changeTodoInColumnPayload {
  activeIndex: number
  overIndex: number
}
interface changeColumnPayload {
  activeIndex: number
  columnId: Id
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
    changeTodos: (state, action: PayloadAction<ITodoItem[]>) => {
      state.todos = [...action.payload]
    },
    setTodoCompleted: (state, action: PayloadAction<Id>) => {
      const toggleTodo = state.todos.find((todo) => todo.id === action.payload)
      if (toggleTodo) toggleTodo.completed = !toggleTodo?.completed
    },
    changeTodoInColumn: (
      state,
      action: PayloadAction<changeTodoInColumnPayload>
    ) => {
      state.todos[action.payload.activeIndex].inColumnId =
        state.todos[action.payload.overIndex].inColumnId
      changeTodos(
        arrayMove(
          state.todos,
          action.payload.activeIndex,
          action.payload.overIndex
        )
      )
    },
    changeColumn: (state, action: PayloadAction<changeColumnPayload>) => {
      state.todos[action.payload.activeIndex].inColumnId =
        action.payload.columnId
    },
  },
})

export const {
  addTodo,
  deleteTodo,
  setTodoCompleted,
  changeTodos,
  changeTodoInColumn,
  changeColumn,
} = todoSlice.actions

export default todoSlice.reducer
