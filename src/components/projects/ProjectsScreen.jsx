import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { projects, projectsClosed } from '../../data/projects';
import { ProjectBox } from './ProjectBox';
import { AddProjectBox } from './AddProjectBox';

export const ProjectsScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Proyectos</h1>

            <h2 className='shadow-text main__subtitle'>En curso</h2>
            {
                projects.length > 0
                ? (
                    <div className="project-boxes__container">

                    <AddProjectBox />

                        {
                            projects.map(project => (
                                <ProjectBox key={project.id} {...project} />
                            ))
                        }
                    </div>
                )
                : <h4 className='shadow-text'>No tienes proyectos. ¡Crea uno! :(</h4>
            }

            <h2 className='shadow-text main__subtitle'>Terminados</h2>
            {
                projects.length > 0
                ? (
                    <div className="project-boxes__container">
                        {
                            projectsClosed.map(project => (
                                <ProjectBox key={project.id} {...project} />
                            ))
                        }
                    </div>
                )
                : <h4 className='shadow-text'>No tienes proyectos. ¡Crea uno! :(</h4>
            }
        </>
    )
}
