import React, {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProjectsBudget, getProjectsPaid, getTasksLenght } from '../../helpers/getProjectsInfo';

export default function Boxes() {

    const projects = useSelector(state => state.projects);

    const [{tasks, budget, paid}, setProjectsData] = useState({
        tasks: 0,
        budget: 0,
        paid: 0,
    });

    useEffect(() => {
        setProjectsData({
            tasks: getTasksLenght(projects),
            budget: getProjectsBudget(projects),
            paid: getProjectsPaid(projects),
        });
    }, [projects]);

    return (
        <div className="dashboard__boxes">

            <Link to='/projects' className="dashboard__box projects">
                <div className="dashboard__box-main">
                    <h3>{projects.length} Proyectos</h3>

                    <p>{tasks} Tareas</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-briefcase"></i>
                </div>
                <span className="dashboard__box-footer">Ver todos <i className="fas fa-arrow-circle-right"></i></span>
            </Link>

            <Link to='payments-balance' className="dashboard__box total">
                <div className="dashboard__box-main">
                    <h3>{budget} $</h3>

                    <p>Total</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-piggy-bank"></i>
                </div>
                <span className="dashboard__box-footer">
                        Ver balance de pagos <i className="fas fa-arrow-circle-right"></i>
                </span>
            </Link>

            <Link to='payments-balance' className="dashboard__box paid">
                <div className="dashboard__box-main">
                    <h3>{ paid.toFixed(2) }% | {(budget * (paid / 100)).toFixed(2) }$</h3>
                    <p>Pagado</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-calendar-check"></i>
                </div>
                <span className="dashboard__box-footer">
                        Ver balance de pagos <i className="fas fa-arrow-circle-right"></i>
                </span>
            </Link>

            <Link to='payments-balance' className="dashboard__box remaining">
                <div className="dashboard__box-main">
                    <h3>{(100 - paid).toFixed(2)}% | {(budget * ((100 - paid) / 100)).toFixed(2) }$</h3>

                    <p>Por pagar</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-credit-card"></i>
                </div>
                <span className="dashboard__box-footer">
                        Ver balance de pagos <i className="fas fa-arrow-circle-right"></i>
                </span>
            </Link>

        </div>
    )
}
