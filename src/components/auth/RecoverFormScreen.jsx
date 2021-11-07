import { getAuth } from '@firebase/auth';
import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const RecoverFormScreen = () => {

    const [{password, passwordConfirm}, handleInputChange, reset] = useForm({
        password: '',
        passwordConfirm: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const auth = getAuth();
        auth.languageCode = 'es';

        reset();
    }

    return (
        <div className='auth__box'>
            <h1 className='auth__box-title'>Recupera tu Cuenta</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    className="auth__input"
                    name="password"
                    placeholder='Tu Nueva Contraseña'
                    onChange={handleInputChange}
                    value={password}
                />
                <input
                    type="password"
                    className="auth__input"
                    name="passwordConfirm"
                    placeholder='Repite Nueva Contraseña'
                    onChange={handleInputChange}
                    value={passwordConfirm}
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Recuperar Contraseña</button>
                <Link className='auth__link' to='/'> <i className='fas fa-caret-left'></i> Volver a la Aplicación</Link>
            </form>
        </div>
    )
}
