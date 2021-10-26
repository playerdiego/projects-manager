import React, { useState } from 'react'
import { tasks } from '../../data/tasks';
import { getProjectById } from '../../helpers/getProjectById'
import { useForm } from '../../hooks/useForm';
import { TaskBox } from '../tasks/TaskBox';
import { Form } from '../ui/Form';
import { Passwords } from '../passwords/Passwords';
import { ProjectHeader } from './ProjectHeader';

export const Project = ({match: {params: {projectID}}}) => {

    const [addTask, setAddTask] = useState(false);
    const project = getProjectById(projectID);

    const [{taskName}, handleInputChange, reset] = useForm({
        taskName: ''
    });

    const handleAddTask = (e) => {
        e.preventDefault();

        setAddTask(false);
        reset();
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
                        tasks.map(task => !task.done ? (
                            <TaskBox key={task.id} {...task} />
                        ): null)
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
            </div>

        </>

    )
}
