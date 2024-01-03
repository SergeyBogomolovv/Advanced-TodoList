import React, { FC } from 'react'
import { motion } from 'framer-motion'
import CreateTodo from './CreateTodo'
import { useAppDispatch, useAppSelector } from '../store/hooks/redux'
import { openTodoModal, openQueryModal } from '../store/reducers/modalSlice'
import AddTodoQuery from './AddTodoQuery'

export interface IsortOptions {
  text: string
  completed: boolean
}

export interface ItypeOptions {
  text: string
  sortQuery: string
}

interface IheaderProps {
  selectedType: string
  setSelectedType: (a: string) => void
  searchQuery: string
  setSearchQuery: (a: string) => void
}

const Header: FC<IheaderProps> = ({
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
}) => {
  const dispatch = useAppDispatch()

  const { typeOptions } = useAppSelector((state) => state.todoType)

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

        <select
          className='appearance-none border border-gray-200 text-gray-700 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          id='grid-state'
          value={selectedType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedType(e.target.value)
          }
        >
          {typeOptions.map((option) => (
            <option key={option.text} value={option.sortQuery}>
              {option.text}
            </option>
          ))}
        </select>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className='p-3 rounded-lg text-white hover:bg-amber-950 bg-amber-700'
          onClick={() => dispatch(openQueryModal())}
        >
          Добавить параметр
        </motion.button>
      </div>
      <CreateTodo />
      <AddTodoQuery />
    </>
  )
}

export default Header
