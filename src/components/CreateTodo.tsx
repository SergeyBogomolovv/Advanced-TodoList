import React, { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { addTodo } from '../store/reducers/todoSlice'
import { closeTodoModal } from '../store/reducers/modalSlice'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import nextId from 'react-id-generator'
import { bgAnimate, modalAnimation, modalItemsAnimation } from '../animations'

const CreateTodo: FC = () => {
  const [titleValue, setTitleValue] = useState<string>('')
  const [textValue, setTextValue] = useState<string>('')
  const [typeValue, setTypeValue] = useState<string>('')

  const { isTodoModalActive } = useAppSelector((state) => state.modal)
  const { columns } = useAppSelector((state) => state.todoType)
  const dispatch = useAppDispatch()

  const readyButtonHandler = () => {
    dispatch(
      addTodo({
        title: titleValue,
        text: textValue,
        type: typeValue,
        completed: false,
        id: nextId(),
      })
    )
    dispatch(closeTodoModal())
    setTextValue('')
    setTitleValue('')
    setTypeValue('')
  }

  return (
    <AnimatePresence>
      {isTodoModalActive && (
        <motion.div
          variants={bgAnimate}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='absolute top-0 bottom-0 right-0 left-0 grid justify-items-center items-center todo'
          onClick={() => dispatch(closeTodoModal())}
        >
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={modalAnimation}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className='shadow bg-white p-8 rounded-xl flex gap-5 '
          >
            <motion.input
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={1}
              className='shadow appearance-none border rounded px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Название'
              value={titleValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitleValue(e.target.value)
              }
            />
            <motion.input
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={2}
              className='shadow appearance-none border rounded px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type='text'
              placeholder='Описание'
              value={textValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTextValue(e.target.value)
              }
            />
            <motion.select
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={3}
              className='appearance-none border border-gray-200 text-gray-700 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 shadow'
              id='grid-state'
              value={typeValue}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setTypeValue(e.target.value)
              }
            >
              {columns.map((column) => (
                <option key={column.text}>{column.text}</option>
              ))}
            </motion.select>

            <motion.button
              whileTap={{ scale: 0.8 }}
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={4}
              className='p-3 rounded-lg bg-emerald-700 text-white hover:bg-emerald-950 shadow'
              onClick={readyButtonHandler}
            >
              Готово
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateTodo
