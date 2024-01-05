import './App.css'
import Header from './components/Header'
import { useAppDispatch, useAppSelector } from './store/hooks/redux'
import { useMemo, useState } from 'react'

import Board from './components/Board'

function App() {
  const { columns } = useAppSelector((state) => state.todoType)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const searchedColumns = useMemo(() => {
    return columns.filter((col) => col.text.includes(searchQuery))
  }, [searchQuery, columns])

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Board columns={searchedColumns} />
    </div>
  )
}

export default App
