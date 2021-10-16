import React from 'react';
import { Link } from 'react-router-dom';
import Boxes from './Boxes';
import { ProjectBox } from './ProjectBox';

export const DashboardScreen = () => {

    const projects = [
        {
            title: 'Proyecto 1',
            tasks: 5,
            budget: 100,
            paid: 50,
            id: 1
        },
        {
            title: 'Proyecto 2',
            tasks: 5,
            budget: 100,
            paid: 50,
            id: 2
        },
        {
            title: 'Proyecto 3',
            tasks: 5,
            budget: 100,
            paid: 50,
            id: 3
        },
        {
            title: 'Proyecto 4',
            tasks: 5,
            budget: 100,
            paid: 50,
            id: 4
        },
        {
            title: 'Proyecto 5',
            tasks: 5,
            budget: 100,
            paid: 50,
            id: 5
        },
    ]

    return (
        <>
            <h1 className='shadow-text main__title'>Dashboard</h1>
            <Boxes />

            <h2 className='shadow-text main__subtitle'>Proyectos</h2>
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
            <div className="projects__btn-container">
                <Link to='/projects' className='btn projects__btn'>
                    Ver todos los Proyectos <i className="fas fa-arrow-circle-right"></i>
                </Link>
            </div>
            
        </>
    )
}
