import { writeFile } from 'fs/promises'
import { Task } from '../types'

export const saveFile = (url: string, newTaskList: Task[]) => {
    writeFile(url, JSON.stringify(newTaskList))
        .then(() => {
            console.log('editado')
        })
        .catch((err: NodeJS.ErrnoException) => {
            console.error(err);
        })
}
