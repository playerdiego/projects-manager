import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startUpdatePassword } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm';

export const ChangePassword = ({setter}) => {

    const dispatch = useDispatch();

    const [{password, passwordConfirm}, handleInputChange, reset] = useForm({
        password: '',
        passwordConfirm: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startUpdatePassword(password, setter));
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

            <button className='btn' type='submit'><i className="far fa-lock"></i> Recuperar Contraseña</button>
            <button className='btn' onClick={() => setter(false)}><i className="far fa-times"></i> Cancelar</button>
        </form>
    )
}
