import { useState } from "react"
import { Task, NewTaskAssign } from './../types.d'
import { INITIAL_STATE } from "../constants"

const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [singleTask, setSingleTask] = useState<NewTaskAssign>(INITIAL_STATE)

  const getTasks = () => {
    fetch('http://localhost:3000/api/taskRouter/')
      .then(res => res.json())
      .then((t: Task[]) => {
        setTasks(t)
      }).catch(error => {
        console.error('Error en la solicitud:', error)
      })
  }

  const getTaskForEdit = (id: string) => {
    fetch(`http://localhost:3000/api/taskRouter/${id}`)
      .then(res => res.json())
      .then((t: Task) => {
        setSingleTask(t)
      }).catch(error => {
        console.error('Error en la solicitud:', error)
      })
  }

  const postNewTask = () => {
    fetch('http://localhost:3000/api/taskRouter/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(singleTask)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error('Error en la solicitud:', error)
      })
  }

  const editTask = () => {
    fetch('http://localhost:3000/api/taskRouter/editTask', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(singleTask)
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error('Error en la solicitud:', error)
      })
  }

  const deleteTask = (id: string) => {
    fetch(`http://localhost:3000/api/taskRouter/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.error('Error en la solicitud:', error)
      })
  }

  const setInitialState = () => {
    setSingleTask(INITIAL_STATE)
  }

  return {
    tasks,
    setTasks,
    singleTask,
    setSingleTask,
    setInitialState,
    getTasks,
    getTaskForEdit,
    postNewTask,
    editTask,
    deleteTask
  }
}

export default useTask
