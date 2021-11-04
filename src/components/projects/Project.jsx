import React, { useEffect, useState } from 'react'
import { tasks } from '../../data/tasks';
import { getProjectById } from '../../helpers/getProjectById'
import { useForm } from '../../hooks/useForm';
import { TaskBox } from '../tasks/TaskBox';
import { Form } from '../ui/Form';
import { Passwords } from '../passwords/Passwords';
import { ProjectHeader } from './ProjectHeader';
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { Delete } from '../ui/Delete';
import { swalConfirm } from '../../helpers/swalConfirm';
import { useSelector } from 'react-redux';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { Loading } from '../ui/Loading';
import { startDeleteProject } from '../../actions/projectsActions';
import { useHistory } from 'react-router';

export const Project = ({match: {params: {projectID}}}) => {

    const [addTask, setAddTask] = useState(false);
    const [project, setProject] = useState(null);
    
    const history = useHistory()
    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(projects.length > 0) {
            setProject(getProjectById(projectID, projects))
        }
    }, [projects, projectID])


    const [{taskName}, handleInputChange, reset] = useForm({
        taskName: ''
    });

    const handleAddTask = (e) => {
        e.preventDefault();

        setAddTask(false);
        reset();
    }

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const handleDeleteProject = () => {
        swalConfirm('¿Seguro que quieres eliminar el Proyecto? Se borrarán todos los datos', 'Se ha eliminado el proyecto', () => {
            dispatch(startDeleteProject(project.id));
            history.replace('/projects')
        });

    }

    if(project === null) {
        return <Loading />
    }

    return (
        <>
            <ProjectHeader project={project} />
            <hr />

            <div className="project__main">
                <h2 className='shadow-text main__subtitle'>Tareas</h2>

                <h5 className='shadow-text main__subtitle'>Por Completar</h5>
                <div className="tasks__container">

                {
                    !addTask
                    ? (
                        <div
                            className='task__box dashboard__box task__add'
                            onClick={() => setAddTask(true)}
                        >
                            <h4>
                                Añadir una Tarea
                            </h4>
                            <i className='fas fas fa-plus'></i>
                        </div>
                    )
                    : (
                        <Form
                            className='task__add-form'
                            handleSubmit={handleAddTask}
                            handleInputChange={handleInputChange}
                            setter={setAddTask}
                            name='taskName'
                            placeholder='Conquistar el mundo'
                            value={taskName} />
                    )
                }

                    {
                        tasks.length > 0 ?
                        tasks.map(task => !task.done ? (
                            <TaskBox key={task.id} {...task} />
                        ): null)
                        : (
                            <h4 className='shadow-text'>No tienes Tareas. ¡Crea una! :(</h4>
                        )
                    }
                </div>

                <h5 className='shadow-text main__subtitle project__tasks-completed'>Completadas</h5>
                <div className="tasks__container">
                    {
                        tasks.map(task => task.done ? (
                            <TaskBox key={task.id} {...task} />
                        ): null)
                    }
                </div>


                {
                    project.passwords &&
                    <Passwords />
                }

                <Delete action={handleDeleteProject} />
            </div>

        </>

    )
}
