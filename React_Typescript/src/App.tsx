import { useState, useMemo, useEffect } from 'react'
import './App.css'
import NewTask from './components/newTask/Task'
import TaskList from './components/taskList/TaskList'
import useTask from './hooks/useTask'
import { SortBy, Task } from './types.d'

function App() {
  const [show, setShow] = useState<boolean>(false)
  const [edit, setEdit] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [sort, setSort] = useState<SortBy>(SortBy.NONE)

  const { tasks, getTasks } = useTask()

  useEffect(() => {
    handleLoad()
  }, [])

  useEffect(() => {
    if (!show) {
      handleLoad()
    }
  }, [show])

  function handleOpen() {
    setFilter('')
    setShow(true)
  }

  async function handleLoad() {
    getTasks()
  }

  function sortedByName() {
    sort === SortBy.NAME ? setSort(SortBy.NONE) : setSort(SortBy.NAME)
  }

  function sortedByDate() {
    sort === SortBy.DATE ? setSort(SortBy.NONE) : setSort(SortBy.DATE)
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter(((singleTask: Task) => {
      return singleTask.name.toLowerCase().includes(filter.toLowerCase())
    }))
  }, [filter, tasks])

  const sortTasks = useMemo(() => {
    if (sort === SortBy.NAME) {
      return [...filteredTasks].sort((a: Task, b: Task) => {
        return b.name.localeCompare(a.name);
      })
    }
    if (sort === SortBy.DATE) {
      return [...filteredTasks].sort((a: Task, b: Task) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    }
    return filteredTasks
  }, [filteredTasks, sort])

  return (
    <>
      <h1 className='title'>Desafío Técnico: Tablero de Tareas</h1>
      <header className='header'>
        <button onClick={handleOpen}>Nueva tarea</button>
        <button onClick={sortedByName}>{sort === SortBy.NAME ? 'No ordenar por nombre' : 'Ordenar por nombre'}</button>
        <button onClick={sortedByDate}>{sort === SortBy.DATE ? 'No ordenar por fecha' : 'Ordenar por fecha'}</button>
        <input placeholder='Filtro Nombre' onChange={(e) => setFilter(e.target.value)} type="text" name="" className='filter' />
      </header>
      <main className='container'>
        <TaskList setEdit={setEdit} tasks={sortTasks} setShow={setShow} />
      </main>
      <NewTask edit={edit} setEdit={setEdit} show={show} setShow={setShow} />
    </>
  )
}

export default App
