import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/authActions';
import { swalConfirm } from '../../helpers/swalConfirm';

export const Sidebar = () => {

    const dispatch = useDispatch();
    
    const {open} = useSelector(state => state.ui);

    const handleLogout = () => {
        swalConfirm('¿Seguro que quieres cerrar sesión?', '', () => dispatch(startLogout()))
    }

    return (
        <div className={open ? 'sidebar__container open': 'sidebar__container'} id="nav-bar">
            <nav className="sidebar__nav">
                <div>

                    <span className="sidebar__nav-logo">
                        <i className='fas fa-project-diagram'></i>
                        <span className="sidebar__nav-logo-name">Projects Manager</span>
                    </span>

                    <div className="sidebar__nav-menu">

                        <Link to="/" className="sidebar__nav-link">
                            <i className='fas fa-columns'></i>
                            <span className={!open ? 'hide' : ''}>Dashboard</span>
                        </Link>

                        <Link to="/projects" className="sidebar__nav-link">
                            <i className='fas fa-briefcase'></i>
                            <span className={!open ? 'hide' : ''}>Proyectos</span>
                        </Link>

                        <Link to="/payments-balance" className="sidebar__nav-link">
                            <i className='fas fa-piggy-bank'></i>
                            <span className={!open ? 'hide' : ''}>Balance de pagos</span>
                        </Link>

                    </div>
                </div>

                <div>
                    
                    <Link to='/account' className="sidebar__nav-link logout">
                        <i className='fas fa-user'></i>
                        <span className={!open ? 'hide' : ''}>Mi Cuenta</span>
                    </Link>
                    <button className="sidebar__nav-link logout" onClick={handleLogout}>
                        <i className='fas fa-sign-out-alt'></i>
                        <span className={!open ? 'hide' : ''}>Cerrar Sesión</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}
