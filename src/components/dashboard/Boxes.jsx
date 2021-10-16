import React from 'react'
import { Link } from 'react-router-dom'

export default function Boxes() {
    return (
        <div className="dashboard__boxes">

            <Link to='/projects' className="dashboard__box projects">
                <div className="dashboard__box-main">
                    <h3>150</h3>

                    <p>Proyectos</p>
                </div>
                <div className="dashboard__box-icon">
                    <i className="fas fa-briefcase"></i>
                </div>
                <span className="dashboard__box-footer">Ver todos <i className="fas fa-arrow-circle-right"></i></span>
            </Link>

            <Link to='payments-balance' className="dashboard__box total">
                <div className="dashboard__box-main">
                    <h3>1000 $USD</h3>

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
                    <h3>50% - 500 $USD</h3>

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
                    <h3>50% - 500 $USD</h3>

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
