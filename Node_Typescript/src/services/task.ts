import taskData from './tasks.json'
import { Task, NewTaskAssign } from '../types'
const fs = require('fs');

const tasks: Task[] = taskData as Task[]

export const getTask = (): Task[] => tasks

export const findTaskById = (id: string): Task | undefined => {
    return tasks.find(t => t.id === id)
}

export const newTask = (newTaskAssign: NewTaskAssign): Task => {
    const newTask = {
        id: Math.random().toString(36).substring(2) + Date.now().toString(36),
        ...newTaskAssign
    }

    tasks.push(newTask)
    return newTask
}

export const editTask = (newTaskAssign: Task) => {
    const newTaskList = tasks.map((t: Task) => {
        if (t.id === newTaskAssign.id) {
            return newTaskAssign
        } else {
            return t
        }
    })

    fs.writeFile('./tasks.json', JSON.stringify(newTaskList), 'utf8', (err: NodeJS.ErrnoException) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('editado')
    })
}

export const removeTask = (id: string) => {
    const newTaskList = tasks.filter((t: Task) => {
        return !t.id.includes(id)
    })

    fs.writeFile('./tasks.json', JSON.stringify(newTaskList), 'utf8', (err: NodeJS.ErrnoException) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('eliminado')
    })
}
