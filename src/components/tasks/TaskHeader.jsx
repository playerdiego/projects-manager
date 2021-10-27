import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import { DeadLine } from './DeadLine';
import { swalConfirm } from '../../helpers/swalConfirm';

export const TaskHeader = ({task, project, edit = false}) => {

    const [editTitle, setEditTitle] = useState(edit);
    
    const [{title}, handleInputChange] = useForm({
        ...task
    });

    const handleUploadTask = (e) => {
        e.preventDefault();

        setEditTitle(false);
    }

    const handleCompleteTask = () => {
        swalConfirm(
            task.done ? '¿Quieres marcar esta tarea como "Por completar"?' : '¿Quieres marcar esta tarea como "Completada"?',
            task.done ? 'El proyecto se ha marcado como "Completado"' : 'El proyecto se ha marcado como "Por completar"',
            () => {});
    };

    const handleAddDeadLine = () => {
        swalConfirm('¿Quieres añadir una Fecha Límite?', 'Se ha añadido la fecha límite, Ingresa una Fecha!', () => {});
    }

    return (
        <div className="task__header-container">
            <div className="task__breadcrumb">
                <Link
                    className="btn btn-less-deep auth__button-back project__back"
                    to={`/project/${project.id}`}
                >
                    <i className="fas fa-arrow-left"></i>
                </Link>
                <Link to={`/project/${project.id}`}>Proyecto: {project.name}</Link>
            </div>
            <div className="task__header project__header">

                {
                    !editTitle 
                    ? (
                        <h2 className='shadow-text main__title' onClick={() => setEditTitle(true)}>
                            {title}
                            <i
                                className={`fas fa-pencil project__edit ${editTitle ? 'hidden': ''}`}
                                onClick={() => setEditTitle(true)}
                            ></i>
                        </h2>
                    )
                    : (
                        <Form
                            className='project__title-form'
                            handleSubmit={handleUploadTask}
                            name="title"
                            setter={setEditTitle}
                            handleInputChange={handleInputChange}
                            value={title}/>
                    )
                }
                
                <button className={task.done ? 'task__status btn completed' : 'task__status btn'} onClick={handleCompleteTask}>
                    { task.done ? 'Completado' : 'Por Completar' }
                </button>

                {
                    !task.deadLine 
                    ? (
                        <button className='task__status btn' onClick={handleAddDeadLine}>
                            Añadir Fecha Límite <i className="fas fa-calendar"></i>
                        </button>
                    )
                    : (
                        <DeadLine {...task} />
                    )
                }


            </div>
        </div>
    )
}
