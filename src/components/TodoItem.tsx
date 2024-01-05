import React, { FC, forwardRef, useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import CloseBtn from './svg/CloseBtn'
import CheckButton from './svg/CheckButton'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { changeTodos, deleteTodo } from '../store/reducers/todoSlice'
import { ITodoItem, Id } from '../types'
import Trash from './svg/TrashIcon'
import { deleteButtonAnimation } from '../animations'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

interface ITodoItemProps {
  todo: ITodoItem
}

const TodoItem: FC<ITodoItemProps> = forwardRef(({ todo }, ref: any) => {
  const { todos } = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
  const [editMode, setEditMode] = useState<boolean>(false)
  const isMobile = window.screen.width <= 640
  const isTrash = mouseIsOver || isMobile
  const toggleEditMode = () => {
    setEditMode(!editMode)
    setMouseIsOver(false)
  }
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: todo.id,
    data: {
      type: 'Todo',
      todo,
    },
    disabled: editMode,
  })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  if (isDragging) {
    return (
      <motion.div
        layout
        ref={setNodeRef}
        style={style}
        className='flex-none bg-mainBgColor p-4 rounded-lg items-center flex justify-between border-rose-500 border-2 md:h-[80px] h-[68px] border-dashed opacity-55'
      ></motion.div>
    )
  }
  if (editMode) {
    return (
      <div style={style} {...attributes} {...listeners} ref={setNodeRef}>
        <div className='bg-mainBgColor flex-none p-4 rounded-lg transition-all duration-300 items-center flex justify-between cursor-grab hover:border-rose-500 border-2 border-mainBgColor md:min-h-[80px] min-h-[68px]'>
          <input
            className='w-full h-[90%] bg-transparent text-white focus:outline-none overflow-y-auto overflow-x-auto border-none rounded'
            value={todo.title}
            autoFocus
            onBlur={toggleEditMode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              updateTodos(todo.id, e.target.value)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div ref={ref}>
      <div
        style={style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        onClick={toggleEditMode}
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        className='bg-mainBgColor flex-none p-4  rounded-lg transition-border  items-center flex justify-between cursor-grab hover:border-rose-500 border-2 border-mainBgColor md:min-h-[80px] min-h-[68px] task'
      >
        <p className='my-auto w-10/12 overflow-y-auto overflow-x-auto'>
          {todo.title}
        </p>
        <AnimatePresence>
          {isTrash && (
            <motion.button
              variants={deleteButtonAnimation}
              animate='visible'
              initial='hidden'
              exit='exit'
              className='stroke-white opacity-60 hover:opacity-100 p-2 hover:bg-columnBgColor rounded-xl'
              onClick={(e: React.MouseEvent) => {
                dispatch(deleteTodo(todo.id))
                e.stopPropagation()
              }}
            >
              <Trash />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
  function updateTodos(id: Id, title: string) {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo
      return { ...todo, title }
    })
    dispatch(changeTodos(newTodos))
  }
})

const MTodoItem = motion(TodoItem)

export default MTodoItem
