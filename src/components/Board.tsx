import React, { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
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
import { IColumn, ITodoItem, Id } from '../types'
import {
  changeColumn,
  changeTodoInColumn,
  changeTodos,
} from '../store/reducers/todoSlice'
import { changeColumns } from '../store/reducers/columnsSlice'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { AnimatePresence, LayoutGroup, LayoutGroupContext } from 'framer-motion'
import MColumn from './Column'
import { columnAnimation } from '../animations'
import { createPortal } from 'react-dom'
import MTodoItem from './TodoItem'
interface Props {
  columns: IColumn[]
}
const Board = ({ columns }: Props) => {
  const { todos } = useAppSelector((state) => state.todos)
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns])
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)
  const [activeTodo, setActiveTodo] = useState<ITodoItem | null>(null)
  const dispatch = useAppDispatch()
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } })
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 justify-items-center xl:gap-20 xl:mx-16 sm:gap-10 sm:mx-10 sm:grid-cols-2 gap-8'>
        <SortableContext items={columnsId}>
          <AnimatePresence>
            {columns.map((col) => (
              <MColumn
                todos={todos.filter((todo) => todo.inColumnId === col.id)}
                column={col}
                key={col.id}
                variants={columnAnimation}
                exit='exit'
                initial='hidden'
                animate='visible'
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <MColumn
              todos={todos.filter(
                (todo) => todo.inColumnId === activeColumn.id
              )}
              column={activeColumn}
            />
          )}
          {activeTodo && (
            <MTodoItem whileDrag={{ scale: 1.1 }} todo={activeTodo} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
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

  function onDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return
    if (active.id === over.id) return

    const isActiveATodo = active.data.current?.type === 'Todo'
    const isOverATodo = over.data.current?.type === 'Todo'
    const isOverAColumn = over.data.current?.type === 'Column'
    //Если наводим на задачу
    if (isActiveATodo && isOverATodo) {
      const activeTodoIndex = todos.findIndex((todo) => todo.id === active.id)
      const overTodoIndex = todos.findIndex((todo) => todo.id === over.id)
      //Если задача в другой колонке. попробовать пофиксить то, что при добавлении в другую колонку, задача идет в конец
      if (
        todos[activeTodoIndex].inColumnId !== todos[overTodoIndex].inColumnId
      ) {
        dispatch(
          changeTodoInColumn({
            activeIndex: activeTodoIndex,
            overIndex: overTodoIndex,
          })
        )
      }
      //Если задача в текущей колонке
      if (
        todos[activeTodoIndex].inColumnId === todos[overTodoIndex].inColumnId
      ) {
        dispatch(changeTodos(arrayMove(todos, activeTodoIndex, overTodoIndex)))
      }
    }
    //Если наводим на колонку
    if (isActiveATodo && isOverAColumn) {
      const activeTodoIndex = todos.findIndex((todo) => todo.id === active.id)
      dispatch(
        changeColumn({
          activeIndex: activeTodoIndex,
          columnId: over.id,
        })
      )
    }
  }
}

export default Board
