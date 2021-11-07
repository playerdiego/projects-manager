import { getAuth, sendEmailVerification } from '@firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startLogout } from '../../actions/authActions';
import { closeSidebar, openSiderbar } from '../../actions/uiActions';
import ProfilePic from '../../assets/profile-pic.png';
import { swalConfirm } from '../../helpers/swalConfirm';
import { swalLoading } from '../../helpers/swalLoading';

export const Header = () => {

    const {open} = useSelector(state => state.ui);
    const {email} = useSelector(state => state.auth);
    const {displayName, photoURL, emailVerified} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    
    const handleToggle = () => {
        open ? dispatch(closeSidebar()) : dispatch(openSiderbar());
    }

    const handleLogout = () => {
        swalConfirm('¿Seguro que quieres cerrar sesión?', '', () => dispatch(startLogout()))
    }

    const handleResendEmail = () => {
        swalConfirm('¿Seguro que quiere reenviar la verificación?', '', () => {
            const auth = getAuth();
            auth.languageCode = 'es';
            swalLoading('Enviado', 'Por favor, espere');
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire('Se ha enviado el enlace de verificación', `Revisa tu correo ${email}`, 'success');
                }).catch(err => {
                    Swal.fire('Error', err.message, 'error');
                })
        })
    }

    return (
        <header className={open ? 'dashboard__header open' : 'dashboard__header'} id="header">
            <div className="dashboard__header_toggle" onClick={handleToggle}> 
                <i className={open ? 'fas fa-times' : 'fas fa-bars'} id="header-toggle"></i>
            </div>
            
            <div className='dashboard__account'>
                {
                    !emailVerified &&
                    <span className='header__verify' onClick={handleResendEmail}>
                        Verifica tu correo <i className="fas fa-exclamation-circle"></i>
                    </span>
                }

                <Link to='/account' className='header__user'>
                    Hola! {displayName}
                    <div className="dashboard__header_img">
                        <img src={photoURL ? photoURL : ProfilePic} alt={displayName} />
                    </div>
                </Link>
                <span className='header__logout' onClick={handleLogout}><i className='fas fa-sign-out-alt'></i> <span>Cerrar Sesión</span></span>
            </div>

        </header>
    )
}
