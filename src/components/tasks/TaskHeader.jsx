import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';

export const TaskHeader = ({task, project, edit = false}) => {

    const [editTitle, setEditTitle] = useState(edit);
    
    const [{title}, handleInputChange] = useForm({
        ...task
    });

    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    const handleUploadTask = (e) => {
        e.preventDefault();

        setEditTitle(false);
    }

    return (
        <div className="task__header-container">
            <div className="task__breadcrumb">
                <button
                    className="btn btn-less-deep auth__button-back project__back"
                    to='/auth/login'
                    onClick={handleBack}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
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
                
                <button className={task.done ? 'task__status btn completed' : 'task__status btn'}>
                    { task.done ? 'Completado' : 'Por Completar' }
                </button>

            </div>
        </div>
    )
}
