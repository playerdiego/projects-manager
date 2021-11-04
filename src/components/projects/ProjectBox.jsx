import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteProject } from '../../actions/projectsActions'
import { swalConfirm } from '../../helpers/swalConfirm'

export const ProjectBox = ({name, tasks, budget, paid, closed, id, type}) => {

    const dispatch = useDispatch();

    const handleDeleteProject = () => {
        swalConfirm('¿Seguro que quieres eliminar el Proyecto? Se borrarán todos los datos', 'Se ha eliminado el proyecto', () => {
            dispatch(startDeleteProject(id));
        });
    }

    return (
        <div className="project__box-container">
            <Link to={`/project/${id}`} className={closed ? 'dashboard__box project__box closed' : 'dashboard__box project__box'}>
                <div className="dashboard__box-main">
                    <h3>{name}</h3>
            
                    <p className='color-blue'>Tareas: {tasks}</p>
                    <p className='color-green'>Presupuesto: {budget}$</p>
                    <p className='color-light-green'>Pagado: {paid}% ({budget * (paid / 100)}$)</p>
                    <p className='color-red'>Por Pagar: {100 - paid}% ({budget * ((100 - paid) / 100)}$)</p>
                </div>
                <span className="dashboard__box-footer">Ver proyecto <i className="fas fa-arrow-circle-right"></i></span>
            </Link>
            <i className="fas fa-times" onClick={handleDeleteProject}></i>
        </div>
    )
}
