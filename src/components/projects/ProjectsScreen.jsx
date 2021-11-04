import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { ProjectBox } from './ProjectBox';
import { AddProjectBox } from './AddProjectBox';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { useSelector } from 'react-redux';

export const ProjectsScreen = () => {

    const projects = useSelector(state => state.projects);
    const {loading} = useSelector(state => state.ui);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    return (
        <>
            <h1 className='shadow-text main__title'>Proyectos</h1>

            <h2 className='shadow-text main__subtitle'>En curso</h2>
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

            <h2 className='shadow-text main__subtitle'>Terminados</h2>
            {
                projects.length > 0
                ? (
                    <div className="project-boxes__container">
                        {
                            projects.map(project => project.closed && (
                                <ProjectBox key={project.id} {...project} />
                            ))
                        }
                    </div>
                )
                : loading ? (
                    <h4 className='shadow-text'>Cargando...</h4>
                )
                : (
                    <h4 className='shadow-text'>No tienes proyectos Terminados. ¡Crea uno! :(</h4>
                )
            }
        </>
    )
}
