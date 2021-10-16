import React from 'react'
import { Link } from 'react-router-dom'

export const ProjectBox = ({title, tasks, budget, paid}) => {
    return (
        <Link to='/' className="dashboard__box project__box">
            <div className="dashboard__box-main">
                <h3>{title}</h3>

                <p>Tareas: {tasks}</p>
                <p>Presupuesto: {budget}$</p>
                <p>Pagado: {paid}% (50$)</p>
            </div>
            {/* <div className="dashboard__box-icon">
                <i className="fas fa-briefcase"></i>
            </div> */}
            <span className="dashboard__box-footer">Ver proyecto <i className="fas fa-arrow-circle-right"></i></span>
        </Link>
    )
}
