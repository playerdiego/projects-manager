import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom'
import { swalLoading } from '../../helpers/swalLoading';

export const ResetPassword = ({code}) => {

    const [error, setError] = useState(null);


    const [{password, passwordConfirm}, handleInputChange, reset] = useForm({
        password: '',
        passwordConfirm: '',
    });

    const navigate = useNavigate();
    const auth = getAuth();
    auth.languageCode = 'es';

    useEffect(() => {
        verifyPasswordResetCode(auth, code)
            .then(() => {
                setError(null);
            }).catch(err => {
                setError('Codigo de validación vencido o inválido');
            });
    }, [auth, code]);

    const handleSubmit = (e) => {
        e.preventDefault();

        auth.languageCode = 'es';

        if(checkForm()) {

            swalLoading('Se esta cambiando la contraseña', 'Por favor, espera');
            confirmPasswordReset(auth, code, password)
                .then(() => {
                    Swal.close();
                    Swal.fire('Se ha cambiado la contraseña', '', 'success');
                    navigate('/', {replace: true});
                })
                .catch(err => {
                    Swal.fire('Error', err, 'error');
                });

            reset();
        }

    }

    const checkForm = () => {

        if(password !== passwordConfirm) {
            Swal.fire('Las contraseñas deben coincidir', '', 'error');
            return false;
        } else if (password.length < 5) {
            Swal.fire('Tu contraseña debe tener mas de 5 carácteres', '', 'error');
            return false;
        }

        return true;
    }

    return (
        <div className="auth__container">
            <div className='auth__box actions__box'>
                {
                    error
                    ? (
                        <>
                        <h1 className='auth__box-title'>Hubo un error</h1>
                        <p className='shadow-text verified'>{error}</p>
                        <Link className='auth__link' to='/auth/recover'> <i className='fas fa-caret-left'></i> Solicitar un nuevo código</Link>
                        </>
                    ) : (
                        <>
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
                        </>
                    )
                }
                
            </div>
        </div>
    )
}
