import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import Trash from './svg/TrashIcon'
import { AnimatePresence, LayoutGroup, Reorder, motion } from 'framer-motion'
import { ITodoItem, Id, IColumn } from '../types'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { deleteColumn } from '../store/reducers/columnsSlice'
import MTodoItem from './TodoItem'
import { CSS } from '@dnd-kit/utilities'
import { todoAnimation } from '../animations'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import PlusIcon from './svg/PlusIcon'
import nextId from 'react-id-generator'
import { addTodo } from '../store/reducers/todoSlice'

interface Props {
  column: IColumn
  updateColumn: (id: Id, text: string) => void
  todos: ITodoItem[]
}

const Column = forwardRef(
  ({ column, updateColumn, todos }: Props, ref: any) => {
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
          className='bg-columnBgColor min-w-[350px] w-auto h-[500px] max-h-auto rounded-md flex flex-col p-2 opacity-45 border-2 border-rose-500'
        ></div>
      )
    }
    return (
      <div ref={ref}>
        <div
          className='bg-columnBgColor min-w-[350px] w-auto h-[500px] max-h-auto rounded-md flex flex-col p-2'
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
                    className='bg-black focus:border-rose-500 border rounded outline-none px-2'
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
              onClick={() => dispatch(deleteColumn(column.id))}
              className='stroke-gray-500 hover:stroke-white hover:bg-columnBgColor rounded px-1 py-2 transition-all duration-150'
            >
              <Trash />
            </button>
          </div>
          <div className='flex flex-grow flex-col gap-5 p-5 overflow-x-hidden overflow-y-auto'>
            <LayoutGroup>
              <SortableContext items={todoIds}>
                <AnimatePresence>
                  {todos.map((todo) => (
                    <MTodoItem
                      layout
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
            </LayoutGroup>
          </div>
          <button
            className='flex gap-2 items-center rounded-md p-4 hover:bg-mainBgColor hover:text-rose-500 active:bg-black transtition-all duration-100 justify-center'
            onClick={() => createTodo(column.text)}
          >
            <PlusIcon /> Добавить
          </button>
        </div>
      </div>
    )
    function createTodo(columnText: string) {
      const newTodo: ITodoItem = {
        id: nextId(),
        title: `Task ${todos.length + 1}`,
        completed: false,
        text: `text of task ${todos.length + 1}`,
        type: columnText,
      }
      dispatch(addTodo(newTodo))
    }
  }
)
const MColumn = motion(Column)
export default MColumn
