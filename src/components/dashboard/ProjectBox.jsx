import React from 'react'
import { Link } from 'react-router-dom'

export const ProjectBox = ({name, tasks, budget, paid, closed}) => {
    return (
        <Link to='/' className={closed ? 'dashboard__box project__box closed' : 'dashboard__box project__box'}>
            <div className="dashboard__box-main">
                <h3>{name}</h3>

                <p className='color-blue'>Tareas: {tasks}</p>
                <p className='color-green'>Presupuesto: {budget}$</p>
                <p className='color-light-green'>Pagado: {paid}% ({budget * (paid / 100)}$)</p>
                <p className='color-red'>Por Pagar: {100 - paid}% ({budget * ((100 - paid) / 100)}$)</p>
            </div>
            {/* <div className="dashboard__box-icon">
                <i className="fas fa-briefcase"></i>
            </div> */}
            <span className="dashboard__box-footer">Ver proyecto <i className="fas fa-arrow-circle-right"></i></span>
        </Link>
    )
}
