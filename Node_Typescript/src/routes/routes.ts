import express from 'express'
import { getTask, findTaskById, newTask, removeTask, editTask } from '../services/task'

const router = express.Router()

router.get('/', (__req, res) => {
    try {
        res.json(getTask())
    } catch (error) {
        res.sendStatus(400)
    }
})

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id
        const task = findTaskById(id)

        res.json(task)
    } catch (error) {
        res.sendStatus(400)
    }
})

router.post('/', (req, res) => {
    try {
        const { name, date, description, statusTask } = req.body
        const addedTask = newTask({
            name,
            date,
            description,
            statusTask
        })
        res.json(`Se guardo la tarea, ${addedTask.id}`)
    } catch (error) {
        console.log(error)
        res.json('Error al guardar tarea')
    }
})

router.post('/editTask', (req, res) => {
    try {
        const { id, name, date, description, statusTask } = req.body
        editTask({
            id,
            name,
            date,
            description,
            statusTask
        })
        res.json(`Se edito la tarea, ${id}`)
    } catch (error) {
        console.log(error)
        res.json('Error al guardar tarea')
    }
})

router.put('/:id', (req, res) => {
    try {
        const id = req.params.id
        removeTask(id)

        res.json(`Se elimino la tarea ${id}`)
    } catch (error) {
        res.sendStatus(400)
    }
})

export default router
