import './App.css'
import MTodoItem from './components/TodoItem'
import Header from './components/Header'
import { useAppSelector } from './store/hooks/redux'
import { AnimatePresence, LayoutGroup, Variants, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

function App() {
  const { todos } = useAppSelector((state) => state.todos)
  const todoItemVariants: Variants = {
    visible: {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    hidden: {
      x: -100,
      scale: 0.5,
      opacity: 0,
    },
    exit: {
      y: 100,
      scale: 0.5,
      opacity: 0,
    },
  }
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const SearchedTodos = useMemo(() => {
    return todos
      .filter((todo) => todo.type?.includes(selectedType))
      .filter((todo) => todo.title.includes(searchQuery))
  }, [searchQuery, todos, selectedType])

  return (
    <div>
      <Header
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className='grid grid-cols-3 gap-10 mx-auto justify-items-center'>
        <AnimatePresence>
          <LayoutGroup>
            {SearchedTodos.map((todo) => (
              <MTodoItem
                todo={todo}
                layout
                key={todo.id}
                variants={todoItemVariants}
                exit='exit'
                initial='hidden'
                animate='visible'
              />
            ))}
          </LayoutGroup>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
