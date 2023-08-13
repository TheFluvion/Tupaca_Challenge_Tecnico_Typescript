import { useEffect, useState } from 'react'
import './index.css'
import { Dispatch, SetStateAction } from 'react';
import useTask from '../../hooks/useTask';

interface Props {
    edit?: string
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>
    setEdit: Dispatch<SetStateAction<string>>
}

const NewTask = ({ edit, setEdit, show, setShow }: Props) => {
    const { singleTask, setSingleTask, getTaskForEdit, setInitialState, postNewTask, editTask } = useTask()
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if (edit) {
            getTaskForEdit(edit)
        }
    }, [edit])

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target
        setSingleTask({ ...singleTask, [name]: value })
    }

    function handleSubmit() {
        if (Object.values(singleTask).includes('')) {
            setError('Debe completar todos los campos')
            return
        }
        if (edit) {
            editTask(singleTask)
        } else {
            postNewTask(singleTask)
        }
        handleClose()
        setError('')
    }

    function handleClose() {
        setShow(!show)
        setEdit('')
        setInitialState()
    }

    return (
        <>
            <div className={show ? 'newTaskOpen' : 'newTaskClose'}>
                <h1 className='titleTask'>Nueva Tarea</h1>
                <h5 className='date'>{edit ? `Fecha: ${singleTask.date}` : ''}</h5>
                <div>
                    <p>Nombre</p>
                    <input value={singleTask?.name} onChange={handleChange} type="text" name="name" id="" />
                </div>
                <div>
                    <p>Descripcion</p>
                    <textarea value={singleTask?.description} onChange={handleChange} name="description" id="" />
                </div>
                {
                    edit
                    && <div>
                        <select value={singleTask.statusTask} onChange={handleChange} name="statusTask" id="">
                            <option value="" disabled>-</option>
                            <option value={0}>Por hacer</option>
                            <option value={1}>En proceso</option>
                            <option value={2}>Finalizado</option>
                        </select>
                    </div>
                }
                <div className='buttons'>
                    <button className='buttonForm' onClick={handleSubmit}>{edit ? 'Actualizar' : 'Guardar'}</button>
                    <button className='buttonForm' onClick={handleClose}>Cancelar</button>
                </div>
                {error && <strong className='error'>{error}</strong>}
            </div>
        </>
    )
}

export default NewTask
