import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLoginWithEmail } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm'
import { ErrorForm } from '../ui/ErrorForm';
import { SocialAuth } from './SocialAuth';

export const LoginScreen = () => {

    const [error, setError] = useState(false);

    const [{email, password}, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startLoginWithEmail(email, password));
            reset();
        }
    }

    const checkForm = () => {

        if(email === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return false;
        }

        return true;

    }

    return (
        <div className='auth__box'>
            {
                error &&
                <ErrorForm msg={error} />
            }
            <h1 className='auth__box-title'>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Tu Email'
                    onChange={handleInputChange}
                    value={email}
                />
                <input
                    type="password"
                    className="auth__input"
                    name="password"
                    placeholder='Tu Contraseña'
                    onChange={handleInputChange}
                    value={password}
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Iniciar Sesión</button>

                <h3 className='auth__box-subtitle'>O Inicia Sesión con:</h3>

                <SocialAuth />

                <Link className='auth__link' to='/auth/register'>¿No tienes una cuenta? Crea una aquí <i className="far fa-user"></i></Link>
                <Link className='auth__link' to='/auth/recover'>¿No recuerdas tu contraseña? Reestablécela aquí <i className="far fa-undo"></i></Link>
            </form>
        </div>
    )
}
