import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import Trash from './svg/TrashIcon'
import {
  AnimatePresence,
  LayoutGroup,
  Reorder,
  animate,
  motion,
} from 'framer-motion'
import { ITodoItem, Id, IColumn } from '../types'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { changeColumns, deleteColumn } from '../store/reducers/columnsSlice'
import MTodoItem from './TodoItem'
import { CSS } from '@dnd-kit/utilities'
import { todoAnimation } from '../animations'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import PlusIcon from './svg/PlusIcon'
import nextId from 'react-id-generator'
import { addTodo, changeTodos, deleteTodo } from '../store/reducers/todoSlice'

interface Props {
  column: IColumn
  todos: ITodoItem[]
}

const Column = forwardRef(({ column, todos }: Props, ref: any) => {
  const { columns } = useAppSelector((state) => state.todoType)
  const dispatch = useAppDispatch()
  const todoIds = useMemo(() => {
    return todos.map((todo) => todo.id)
  }, [todos])

  const [editMode, setEditMode] = useState<boolean>(false)
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className='bg-columnBgColor w-[80vw] h-[50vh] xl:w-[20vw] xl:h-[55vh] lg:w-[28vw] sm:w-[40vw] sm:h-[50vh] rounded-md flex flex-col opacity-65 border-2 border-rose-500 border-dashed'
      ></div>
    )
  }
  return (
    <div ref={ref}>
      <div
        className='bg-columnBgColor h-[40vh] w-[80vw] xl:w-[20vw] xl:h-[55vh] lg:w-[28vw] sm:w-[40vw] sssm:h-[50vh] rounded-md flex flex-col p-3'
        ref={setNodeRef}
        style={style}
      >
        <div
          {...attributes}
          {...listeners}
          className='bg-mainBgColor cursor-grab text-md rounded-lg  p-3 font-bold flex items-center justify-between'
        >
          <div className='flex gap-2'>
            <div className='flex justify-center items-center bg-columnBgColor px-2 py-1 text-sm rounded-full'>
              {columns.findIndex((col) => col === column) + 1}
            </div>
            <div className='cursor-pointer' onClick={() => setEditMode(true)}>
              {!editMode ? (
                column.text
              ) : (
                <input
                  className='bg-black focus:border-rose-500 border rounded outline-none px-2 w-28 sssm:w-48 ssm:w-full'
                  value={column.text}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateColumn(column.id, e.target.value)
                  }
                  autoFocus
                  onBlur={() => setEditMode(false)}
                />
              )}
            </div>
          </div>
          <button
            onClick={deleteThisColumn}
            className='stroke-gray-500 hover:stroke-white hover:bg-columnBgColor rounded px-1 py-2 transition-all duration-150'
          >
            <Trash />
          </button>
        </div>
        <div className='flex flex-col flex-grow gap-5 p-5 overflow-x-hidden overflow-y-auto'>
          <SortableContext items={todoIds}>
            <AnimatePresence>
              {todos.map((todo) => (
                <MTodoItem
                  key={todo.id}
                  todo={todo}
                  variants={todoAnimation}
                  animate='visible'
                  exit='exit'
                  initial='hidden'
                />
              ))}
            </AnimatePresence>
          </SortableContext>
        </div>
        <button
          className='flex gap-2 items-center rounded-md p-4 hover:bg-mainBgColor  active:bg-black transtition-all duration-100 justify-center'
          onClick={() => createTodo(column.id)}
        >
          <PlusIcon /> Добавить
        </button>
      </div>
    </div>
  )
  function createTodo(id: Id) {
    const newTodo: ITodoItem = {
      id: nextId(),
      title: `Задача ${todos.length + 1}`,
      completed: false,
      inColumnId: id,
    }
    dispatch(addTodo(newTodo))
  }
  function updateColumn(id: Id, text: string) {
    const newCols = columns.map((col) => {
      if (col.id !== id) return col
      return { ...col, text }
    })
    dispatch(changeColumns(newCols))
  }
  function deleteThisColumn() {
    const thisColTodos = todos.filter((t) => t.inColumnId === column.id)
    thisColTodos.forEach((todo) => dispatch(deleteTodo(todo.id)))
    dispatch(deleteColumn(column.id))
  }
})
const MColumn = motion(Column)
export default MColumn
