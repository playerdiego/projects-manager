import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteTask } from '../../actions/tasksActions'
import { swalConfirm } from '../../helpers/swalConfirm'

export const TaskBox = ({title, id, projectID, done}) => {

    const dispatch = useDispatch();

    const handleToggleStatus = () => {
        swalConfirm(
            done ? '¿Seguro que quieres marcar esta tarea como "Por Completar"?' : '¿Seguro que quieres marcar esta tarea como "Completada"?',
            done ? 'La Tarea se ha marcado como "Completada"' : 'La Tarea se ha marcado como "Por Completar"',
            () => {}
            )
    }

    const handleDeleteTask = () => {
        swalConfirm('¿Seguro que quieres eliminar la Tarea? Se borrarán todos los datos', 'Se ha eliminado la Tarea', () => {
            dispatch(startDeleteTask(projectID, id));
        });
    }

    return (
        <div
            className={ done ? 'task__box dashboard__box completed' : 'task__box dashboard__box'}
        >
            {
                done
                ? <i className='far fa-check-square task__toggle' onClick={handleToggleStatus}></i>
                : <i className='far fa-square task__toggle' onClick={handleToggleStatus}></i>
            }

            <Link to={`/project/${projectID}/task/${id}`} className='task__box-main'>
                <h4>
                    {
                        title.length > 20
                        ? title.slice(0, 20) + '...'
                        : title
                    }
                </h4>
                <i className='fas fas fa-arrow-right'></i>
            </Link>
            <i className="fas fa-times" onClick={handleDeleteTask}></i>
        </div>
    )
}
