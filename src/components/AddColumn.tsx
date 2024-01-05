import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { AnimatePresence, Variants, motion } from 'framer-motion'
import { closeColumnModal } from '../store/reducers/modalSlice'
import { addColumn } from '../store/reducers/columnsSlice'
import nextId from 'react-id-generator'
import {
  addColumnModalAnimation,
  bgAnimate,
  modalItemsAnimation,
} from '../animations'
import PlusIcon from './svg/PlusIcon'

const AddColumnModal = () => {
  const [titleValue, setTitleValue] = useState<string>('')
  const { isColumnModalActive } = useAppSelector((state) => state.modal)
  const dispatch = useAppDispatch()
  const readyButtonHandler = () => {
    if (titleValue === '') {
      alert('Вы ввели пустой параметр!')
      return
    }
    dispatch(addColumn({ text: titleValue, id: nextId() }))
    dispatch(closeColumnModal())
    setTitleValue('')
  }

  return (
    <AnimatePresence>
      {isColumnModalActive && (
        <motion.div
          variants={bgAnimate}
          initial='hidden'
          animate='visible'
          exit='exit'
          className='fixed top-0 bottom-0 right-0 left-0 grid justify-items-center items-center todo'
          onClick={() => dispatch(closeColumnModal())}
        >
          <motion.div
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={addColumnModalAnimation}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className='shadow bg-mainBgColor p-8 rounded-xl flex gap-5 mb-[30%] ring-columnBgColor ring-4'
          >
            <motion.input
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={1}
              className='rounded-lg px-4 leading-tight ring-rose-500 ring-2 border-transparent outline-none bg-mainBgColor'
              type='text'
              placeholder='Название'
              value={titleValue}
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitleValue(e.target.value)
              }
            />
            <motion.button
              whileTap={{ scale: 0.8 }}
              variants={modalItemsAnimation}
              animate='visible'
              initial='hidden'
              custom={2}
              className='p-3 rounded-lg bg-columnBgColor stroke-gray-800  shadow'
              onClick={readyButtonHandler}
            >
              <PlusIcon />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddColumnModal
