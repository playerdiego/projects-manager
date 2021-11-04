import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';

export const RecoverScreen = () => {

    const [{email}, handleInputChange, reset] = useForm({
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        auth.languageCode = 'es';
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.fire('Se ha enviado el enlace de recuperación', `Revisa tu correo ${email}`, 'success');
                reset();
            })
            .catch((err) => {
                Swal.fire('Error', err.message, 'error');
            });
    }

    return (
        <div className='auth__box'>
            <Link className="btn btn-less-deep auth__button-back" to='/auth/login'><i className="fas fa-arrow-left"></i></Link>
            <h1 className='auth__box-title'>Recupera tu Cuenta</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Tu Email'
                    onChange={handleInputChange}
                    value={email}
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Recuperar Contraseña</button>
            </form>
        </div>
    )
}
