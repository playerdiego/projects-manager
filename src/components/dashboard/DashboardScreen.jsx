import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSidebar } from '../../actions/uiActions';
import { projects } from '../../data/projects';
import { AddProjectBox } from '../projects/AddProjectBox';
import { ProjectBox } from '../projects/ProjectBox';
import Boxes from './Boxes';

export const DashboardScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Dashboard</h1>
            <Boxes />

            <h2 className='shadow-text main__subtitle'>Proyectos</h2>
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
            <div className="projects__btn-container">
                <Link to='/projects' className='btn projects__btn'>
                    Ver todos los Proyectos <i className="fas fa-arrow-circle-right"></i>
                </Link>
            </div>
            
        </>
    )
}
