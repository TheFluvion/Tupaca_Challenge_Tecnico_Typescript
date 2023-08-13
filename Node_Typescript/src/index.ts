import express from 'express'
import taskRouter from './routes/routes'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get('/test', (_req, res) => {
    console.log('buenas')
    res.send('Hola')
})

app.listen(PORT, () => {
    console.log(`Server running in port:${PORT}`)
})

app.use('/api/taskRouter', taskRouter)
