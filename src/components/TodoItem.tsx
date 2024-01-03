import React, { FC, forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CloseBtn from './svg/CloseBtn'
import CheckButton from './svg/CheckButton'
import { useAppDispatch } from '../store/hooks/redux'
import { deleteTodo, setTodoCompleted } from '../store/reducers/todoSlice'

export interface ITodoItem {
  title: string
  completed: boolean
  text: string
  type?: string
  id: string | number
}

interface ITodoItemProps {
  todo: ITodoItem
}

const TodoItem: FC<ITodoItemProps> = forwardRef(({ todo }, ref: any) => {
  const [isVisible, setVisible] = useState<boolean>(false)
  const visibilityHandler = () => setVisible(!isVisible)
  const dispatch = useAppDispatch()

  return (
    <div ref={ref} onClick={() => console.log(todo)}>
      <div
        onClick={visibilityHandler}
        className={[
          todo.completed ? 'bg-green-300' : 'bg-yellow-400',
          'p-5 w-96 rounded-lg transition-all duration-300 flex justify-between',
          isVisible && 'rounded-none',
        ].join(' ')}
      >
        <button
          onClick={(e: React.MouseEvent) => {
            dispatch(setTodoCompleted(todo.id))
            e.stopPropagation()
          }}
        >
          <CheckButton checked={todo.completed} />
        </button>

        <div>{todo.title}</div>
        <button
          onClick={(e: React.MouseEvent) => {
            dispatch(deleteTodo(todo.id))
            e.stopPropagation()
          }}
        >
          <CloseBtn />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div className='bg-neutral-200 p-3 w-96'>{todo.text}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

const MTodoItem = motion(TodoItem)

export default MTodoItem
