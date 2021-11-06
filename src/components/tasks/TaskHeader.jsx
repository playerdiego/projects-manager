import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import { DeadLine } from './DeadLine';
import { swalConfirm } from '../../helpers/swalConfirm';
import { useDispatch } from 'react-redux';
import { startUpdateTask } from '../../actions/tasksActions';
import { FormDate } from '../ui/FormDate';
import Swal from 'sweetalert2';

export const TaskHeader = ({task, project, desc}) => {

    const [editTitle, setEditTitle] = useState(false);
    const [addDeadLine, setAddDeadLine] = useState(false);
    const [date, setDate] = useState(new Date());

    const dispatch = useDispatch();
    const history = useHistory();
    
    const [{title}, handleInputChange] = useForm({
        ...task
    });

    const handleUploadTask = (e) => {
        e.preventDefault();
        dispatch(startUpdateTask(project.id, task.id, {
            title
        }));
        setEditTitle(false);
    }

    const handleCompleteTask = () => {
        swalConfirm(
            task.done ? '¿Quieres marcar esta tarea como "Por completar"?' : '¿Quieres marcar esta tarea como "Completada"?',
            task.done ? 'El proyecto se ha marcado como "Completado"' : 'El proyecto se ha marcado como "Por completar"',
            () => {
                dispatch(startUpdateTask(project.id, task.id, {
                    done: !task.done
                }));
            });
    };

    const handleAddDeadLine = () => {
        swalConfirm('¿Quieres añadir una Fecha Límite?', 'Se ha añadido la fecha límite, Ingresa una Fecha!', () => {
            setAddDeadLine(true);
        });
    }

    const handleSubmitDeadline = (e) => {
        e.preventDefault();

        dispatch(startUpdateTask(project.id, task.id, {
            deadLine: date.toJSON()
        }));

        setAddDeadLine(false);
    }

    const goBack = () => {
        if(task.desc !== desc) {
            Swal.fire({
                title: 'La descripción no se ha guardado',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Guardar y Salir',
                denyButtonText: `Salir sin Guardar`,
                cancelButtonText: 'Cancelar'
                }).then((result) => {
                if (result.isConfirmed) {
        
                    dispatch(startUpdateTask(project.id, task.id, {
                        desc
                    }));

                    history.goBack(`/project/${project.id}`);
                    
                } else if(result.isDenied) {
                    history.goBack(`/project/${project.id}`);
                } 

                
                })
        } else {
            history.goBack(`/project/${project.id}`);
        }
    }

    return (
        <div className="task__header-container">
            <div className="task__breadcrumb">
                <button
                    onClick={goBack}
                    className="btn btn-less-deep auth__button-back project__back"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <span onClick={goBack}>Proyecto: {project.name}</span>
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
                    addDeadLine
                    ? (
                        <FormDate handleSubmit={handleSubmitDeadline} date={date} setDate={setDate} setter={setAddDeadLine} />

                    ) : !task.deadLine && (
                        <button className='task__status btn' onClick={handleAddDeadLine}>
                            Añadir Fecha Límite <i className="fas fa-calendar"></i>
                        </button>
                    )
                }

                {
                    task.deadLine
                    && (<DeadLine {...task} projectID={project.id} />)
                }


            </div>
        </div>
    )
}
