import React, { FC } from 'react'
import { motion } from 'framer-motion'
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
      <div className='p-5 bg-[#191c23] flex gap-5 mb-10 justify-center sm:justify-start flex-col ssm:flex-row'>
        <input
          className='bg-mainBgColor rounded-lg px-4 leading-tight ring-rose-500 focus:ring-2 border-transparent outline-none p-4 '
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
      <AddColumnModal />
    </>
  )
}

export default Header
