import { randomUUID } from 'crypto'
import taskData from '../DATA/tasks.json'
import { Task, NewTaskAssign } from '../types'
import { saveFile } from '../herpers/task'

const tasks: Task[] = taskData as Task[]

export const getTask = (): Task[] => tasks

export const findTaskById = (id: string): Task | undefined => {
    return tasks.find(t => t.id === id)
}

export const newTask = (newTaskAssign: NewTaskAssign): Task => {
    const newTask = {
        id: randomUUID(),
        ...newTaskAssign
    }

    tasks.push(newTask)
    return newTask
}

export const editTask = (newTaskAssign: Task) => {
    const url = './src/DATA/tasks.json'
    const newTaskList = tasks.map((t: Task) => {
        if (t.id === newTaskAssign.id) {
            return newTaskAssign
        } else {
            return t
        }
    })

    saveFile(url, newTaskList)
}

export const removeTask = (id: string) => {
    const url = './src/DATA/tasks.json'
    const newTaskList = tasks.filter((t: Task) => {
        return !t.id.includes(id)
    })

    saveFile(url, newTaskList)
}
