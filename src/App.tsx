import './App.css'
import MTodoItem from './components/TodoItem'
import Header from './components/Header'
import { useAppDispatch, useAppSelector } from './store/hooks/redux'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import { useMemo, useState } from 'react'
import MColumn from './components/Column'
import { columnAnimation } from './animations'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { IColumn, ITodoItem, Id } from './types'
import { createPortal } from 'react-dom'
import { changeColumns } from './store/reducers/columnsSlice'
import { changeTodos } from './store/reducers/todoSlice'

function App() {
  const { todos } = useAppSelector((state) => state.todos)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const SearchedTodos = useMemo(() => {
    return todos.filter((todo) => todo.title.includes(searchQuery))
  }, [searchQuery, todos])

  const { columns } = useAppSelector((state) => state.todoType)

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const dispatch = useAppDispatch()
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)
  const [activeTodo, setActiveTodo] = useState<ITodoItem | null>(null)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  )
  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className='flex gap-10 mx-20 justify-around flex-wrap'>
          <SortableContext items={columnsId}>
            <AnimatePresence>
              {columns.map((col) => (
                <MColumn
                  todos={todos.filter((todo) => todo.type === col.text)}
                  column={col}
                  key={col.id}
                  variants={columnAnimation}
                  exit='exit'
                  initial='hidden'
                  animate='visible'
                  updateColumn={updateColumn}
                />
              ))}
            </AnimatePresence>
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <MColumn
                todos={todos}
                column={activeColumn}
                updateColumn={updateColumn}
              />
            )}
            {activeTodo && <MTodoItem todo={activeTodo} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  )
  function onDragStart(e: DragStartEvent) {
    if (e.active.data.current?.type === 'Column') {
      setActiveColumn(e.active.data.current.column)
      return
    }
    if (e.active.data.current?.type === 'Todo') {
      setActiveTodo(e.active.data.current.todo)
      return
    }
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveColumn(null)
    setActiveTodo(null)
    const { active, over } = e
    if (!over) return
    if (active.id === over.id) return
    const activeColIndex = columns.findIndex((col) => col.id === active.id)
    const overColIndex = columns.findIndex((col) => col.id === over.id)
    dispatch(changeColumns(arrayMove(columns, activeColIndex, overColIndex)))
  }
  function updateColumn(id: Id, text: string) {
    const newCols = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, text }
    })
    dispatch(changeColumns(newCols))
  }
  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return
    if (active.id === over.id) return
    const isActiveATodo = active.data.current?.type === 'Todo'
    const isOverATodo = over.data.current?.type === 'Todo'
    if (!isActiveATodo) return

    if (isActiveATodo && isOverATodo) {
      const activeTodoIndex = todos.findIndex((todo) => todo.id === active.id)
      const overTodoIndex = todos.findIndex((todo) => todo.id === over.id)
      todos[activeTodoIndex].type = todos[overTodoIndex].type //Проблема, возможно решается через диспатч изменение этого состояния
      dispatch(changeTodos(arrayMove(todos, activeTodoIndex, overTodoIndex)))
    }
    const isOverAColumn = over.data.current?.type === 'Column'
    if (isActiveATodo && isOverAColumn) {
      const activeTodoIndex = todos.findIndex((todo) => todo.id === active.id)
      todos[activeTodoIndex].type = over.data.current?.type //Проблема, возможно решается через диспатч изменение этого состояния
      dispatch(changeTodos(arrayMove(todos, activeTodoIndex, activeTodoIndex)))
    }
  }
}

export default App
