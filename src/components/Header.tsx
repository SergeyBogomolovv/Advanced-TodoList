import React, { FC } from 'react'
import { motion } from 'framer-motion'
import CreateTodo from './CreateTodo'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { openTodoModal, openColumnModal } from '../store/reducers/modalSlice'
import AddColumnModal from './AddColumn'
import PlusIcon from './svg/PlusIcon'

interface IheaderProps {
  searchQuery: string
  setSearchQuery: (a: string) => void
}

const Header: FC<IheaderProps> = ({ searchQuery, setSearchQuery }) => {
  const dispatch = useAppDispatch()

  return (
    <>
      <div className='p-5 bg-neutral-400 flex gap-5 mb-10'>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className='p-3 rounded-lg bg-emerald-700 text-white hover:bg-emerald-950'
          onClick={() => dispatch(openTodoModal())}
        >
          Добавить задачу
        </motion.button>

        <input
          className='shadow appearance-none border rounded px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          type='text'
          placeholder='Поиск'
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(openColumnModal())}
          className='  cursor-pointer rounded-lg bg-mainBgColor border-2 border-columnBgColor p-4 ring-rose-500 hover:ring-2 flex gap-2'
        >
          <PlusIcon />
          Добавить колонку
        </motion.button>
      </div>
      <CreateTodo />
      <AddColumnModal />
    </>
  )
}

export default Header
