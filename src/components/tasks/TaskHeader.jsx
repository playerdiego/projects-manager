import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useForm } from '../../hooks/useForm';

export const TaskHeader = ({task, project}) => {

    const [editTitle, setEditTitle] = useState(false);
    
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
                        <form
                            className='project__title-form'
                            onSubmit={handleUploadTask}
                        >
                            <input
                                className='auth__input project__input'
                                type="text"
                                name="title"
                                id="title"
                                onChange={handleInputChange}
                                value={title}
                            />
                            <button className="project__form-btn"><i className='fas fa-check'></i></button>
                        </form>
                    )
                }
                
                <button className={task.done ? 'task__status btn completed' : 'task__status btn'}>
                    { task.done ? 'Completado' : 'Por Completar' }
                </button>

            </div>
        </div>
    )
}
