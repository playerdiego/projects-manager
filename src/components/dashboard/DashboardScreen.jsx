import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeSidebar } from '../../actions/uiActions';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { AddProjectBox } from '../projects/AddProjectBox';
import { ProjectBox } from '../projects/ProjectBox';
import Boxes from './Boxes';

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    
    const projects = useSelector(state => state.projects);
    const {loading} = useSelector(state => state.ui);


    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Dashboard</h1>
            <Boxes />

            <h2 className='shadow-text main__subtitle'>Proyectos</h2>
            <div className="project-boxes__container">

                <AddProjectBox />
                {
                    projects.length > 0
                    ? (
                        projects.map(project => !project.closed && (
                            <ProjectBox key={project.id} {...project} />
                        ))
                    )
                    : loading ? (
                        <h4 className='shadow-text'>Cargando...</h4>
                    )
                    : (
                        <h4 className='shadow-text'>No tienes proyectos. ¡Crea uno! :(</h4>
                    )
                }
            </div>
            <div className="projects__btn-container">
                <Link to='/projects' className='btn projects__btn'>
                    Ver todos los Proyectos <i className="fas fa-arrow-circle-right"></i>
                </Link>
            </div>
            
        </>
    )
}
