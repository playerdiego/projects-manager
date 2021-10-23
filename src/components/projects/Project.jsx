import React from 'react'
import { tasks } from '../../data/tasks';
import { getProjectById } from '../../helpers/getProjectById'
import { TaskBox } from '../tasks/TaskBox';
import { ProjectHeader } from './ProjectHeader';

export const Project = ({match: {params: {projectID}}}) => {

    const project = getProjectById(projectID);

    return (
        <>
            <ProjectHeader project={project} />
            <hr />

            <div className="project__main">
                <h2 className='shadow-text main__subtitle'>Tareas</h2>

                <h5 className='shadow-text main__subtitle'>Por Completar</h5>
                <div className="tasks__container">
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
            </div>

        </>

    )
}
