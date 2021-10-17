import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { projects, projectsClosed } from '../../data/projects';
import { ProjectBox } from '../dashboard/ProjectBox';

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

                        <div className="dashboard__box project__box add-project">
                            <div className="dashboard__box-main">
                                <h3 className='shadow-text'>Agregar Proyecto</h3>
                            </div>
                            <div className="dashboard__box-icon">
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>

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
