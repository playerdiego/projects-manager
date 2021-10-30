import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisterWithEmail } from '../../actions/authActions'
import { useForm } from '../../hooks/useForm'
import { ErrorForm } from '../ui/ErrorForm'
import { SocialAuth } from './SocialAuth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [error, setError] = useState();

    const [{name, email, password, confirmPassword}, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startRegisterWithEmail(name, email, password));
            reset();
        }

    }

    const checkForm = () => {
        
        if(name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Todos los campos son obligatorios');
            return false;
        } else if(password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        } else if (password < 5) {
            setError('Tu contraseña debe tener mas de 5 carácteres');
        }

        setError(false);
        return true;

    };

    return (
        <div className='auth__box'>
            {
                error && 
                <ErrorForm msg={error} />
            }
            <h1 className='auth__box-title'>Crear Nueva Cuenta</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    className="auth__input"
                    name="name"
                    placeholder='Tu Nombre'
                    onChange={handleInputChange}
                    value={name}
                />
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
                <input
                    type="password"
                    className="auth__input"
                    name="confirmPassword"
                    placeholder='Repite tu Contraseña'
                    onChange={handleInputChange}
                    value={confirmPassword}
                />

                <button className='auth__login-button btn'><i className="far fa-user"></i> Crear Cuenta</button>

                <h3 className='auth__box-subtitle'>O Inicia Sesión con:</h3>

                <SocialAuth />

                <Link className='auth__link' to='/auth/login'>¿Ya tienes una cuenta? Inicia Sesión aquí <i className="far fa-user"></i></Link>
            </form>
        </div>
    )
}
