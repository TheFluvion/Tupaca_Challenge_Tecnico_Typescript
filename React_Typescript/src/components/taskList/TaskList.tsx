import { Dispatch, SetStateAction } from 'react';
import * as dayjs from 'dayjs'
import { Task, Status } from "../../types.d"
import useTask from "../../hooks/useTask";

interface Props {
    tasks: Task[],
    setShow: Dispatch<SetStateAction<boolean>>,
    setEdit: Dispatch<SetStateAction<string>>,
}

const statusColor = (status: number) => {
    if (status === 0) {
        return 'red'
    }
    if (status === 1) {
        return 'yellow'
    }
    if (status === 2) {
        return 'green'
    }
}

const TaskList = ({ tasks, setShow, setEdit }: Props) => {
    const { deleteTask } = useTask()

    function handleEdit(id: string) {
        setShow(true)
        setEdit(id)
    }

    function handleDelete(id: string) {
        deleteTask(id)
    }

    return (
        <table className='taskList'>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody >
                {tasks.map((task: Task) => {
                    const color = statusColor(task.statusTask)
                    return <tr key={task.id}>
                        <td>
                            <h3 className='date'>{dayjs(task.date).format('DD/MM/YYYY')}</h3>
                        </td>
                        <td>
                            <h1 className='name'>{task.name}</h1>
                        </td>
                        <td>
                            <p className='description'>
                                {task.description}
                            </p>
                        </td>
                        <td>
                            <strong style={{ color: color }} className='stateTask'>
                                {task.statusTask === Status.pending && "Por hacer"}
                                {task.statusTask === Status.inProgress && "En progreso"}
                                {task.statusTask === Status.finish && "Finalizado"}
                            </strong>
                        </td>
                        <td>
                            <button onClick={() => handleEdit(task.id)} className='editButton'>Editar</button>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(task.id)} className='deleteButton'>Eliminar</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    )
}

export default TaskList
