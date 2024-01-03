import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { closeTodoQueryModal } from '../store/reducers/modalSlice'
import { addType } from '../store/reducers/todoTypeSlice'

const AddTodoQuery = () => {
  const [titleValue, setTitleValue] = useState<string>('')
  const { isQueryModalActive } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const readyButtonHandler = () => {
    if (titleValue === '') {
      alert('Вы ввели пустой параметр!')
      return
    }
    dispatch(addType({ text: titleValue, sortQuery: titleValue }))
    dispatch(closeTodoQueryModal())
    setTitleValue('')
  }

  const bgAnimate: Variants = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
    exit: {
      opacity: 0,
    },
  }
  const modalVariants: Variants = {
    visible: {
      rotate: 0,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hidden: {
      y: -200,
      scale: 0,
      rotate: 60,
    },
    exit: {
      y: 200,
      scale: 0,
      rotate: 60,
    },
  }
  const modalItemVariants: Variants = {
    visible: (i: number) => ({
      scale: 1,
      x: 0,
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.2 },
    }),
    hidden: {
      scale: 0.3,
      x: 100,
      y: 50,
      opacity: 0,
    },
  }
  return (
    <AnimatePresence>
      {isQueryModalActive && (
        <motion.div
          variants={bgAnimate}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='absolute top-0 bottom-0 right-0 left-0 grid justify-items-center items-center todo'
          onClick={() => dispatch(closeTodoQueryModal())}
        >
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={modalVariants}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className='shadow bg-white p-8 rounded-xl flex gap-5 '
          >
            <motion.input
              variants={modalItemVariants}
              animate='visible'
              initial='hidden'
              custom={1}
              className='shadow appearance-none border rounded px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline '
              type='text'
              placeholder='Название параметра'
              value={titleValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitleValue(e.target.value)
              }
            />
            <motion.button
              whileTap={{ scale: 0.8 }}
              variants={modalItemVariants}
              animate='visible'
              initial='hidden'
              custom={2}
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

export default AddTodoQuery
