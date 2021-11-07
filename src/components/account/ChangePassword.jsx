import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startUpdatePassword } from '../../actions/authActions';
import { swalLoading } from '../../helpers/swalLoading';
import { useForm } from '../../hooks/useForm';
import { firebase } from '../../firesbase/firebase-config';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, reauthenticateWithCredential } from '@firebase/auth';
import 'firebase/compat/auth';

export const ChangePassword = ({setter}) => {

    const dispatch = useDispatch();
    
    const auth = getAuth();

    const [{currentPassword, password, passwordConfirm}, handleInputChange, reset] = useForm({
        currentPassword: '',
        password: '',
        passwordConfirm: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        swalLoading('Se estan actualizando las credenciales', 'Por favor, espere');
        const credentials = firebase.auth.EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )

        reauthenticateWithCredential(auth.currentUser, credentials)
            .then(() => {
                
                if(checkForm()) {
                    dispatch(startUpdatePassword(password, setter));
                    reset();
                }   

            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
        

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
        <form onSubmit={handleSubmit}>
            <h3 className='auth__box-title'>Cambia tu Contraseña</h3>
            <input
                type="password"
                className="auth__input"
                name="currentPassword"
                placeholder='Tu Contraseña Actual'
                onChange={handleInputChange}
                value={currentPassword}
            />
            <hr />
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

            <button className='btn' type='submit'><i className="far fa-lock"></i> Cambiar Contraseña</button>
            <button className='btn' onClick={() => setter(false)}><i className="far fa-times"></i> Cancelar</button>
        </form>
    )
}
