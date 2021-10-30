import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../actions/authActions';
import { closeSidebar, openSiderbar } from '../../actions/uiActions';
import ProfilePic from '../../assets/profile-pic.png';
import { swalConfirm } from '../../helpers/swalConfirm';

export const Header = () => {

    const {open} = useSelector(state => state.ui);
    const {username, photo} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    
    const handleToggle = () => {
        open ? dispatch(closeSidebar()) : dispatch(openSiderbar());
    }

    const handleLogout = () => {
        swalConfirm('¿Seguro que quieres cerrar sesión?', '', () => dispatch(startLogout()))
    }

    return (
        <header className={open ? 'dashboard__header open' : 'dashboard__header'} id="header">
            <div className="dashboard__header_toggle" onClick={handleToggle}> 
                <i className={open ? 'fas fa-times' : 'fas fa-bars'} id="header-toggle"></i>
            </div>
            
            <div className='dashboard__account'>
                <Link to='/account'>
                    Hola! {username}
                    <div className="dashboard__header_img">
                        <img src={photo ? photo : ProfilePic} alt={username} />
                    </div>
                </Link>
                <span className='header__logout' onClick={handleLogout}><i className='fas fa-sign-out-alt'></i> Cerrar Sesión</span>
            </div>

        </header>
    )
}
