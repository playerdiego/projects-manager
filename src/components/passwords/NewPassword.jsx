import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddPassword } from '../../actions/passwordsActions';
import { useForm } from '../../hooks/useForm';
import CryptoJS from 'crypto-js';

export const NewPassword = ({projectID}) => {

    const key = 'cosmos';

    const dispatch = useDispatch();

    const [addPassword, setAddPassword] = useState(false);

    const [{title, url, username, password}, handleInputChange, reset] = useForm({
        title: '',
        url: '',
        username: '',
        password: '',
    });

    const handleAddPassword = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startAddPassword(projectID, {
                title,
                url,
                username,
                password: CryptoJS.AES.encrypt(password, key).toString(),
                date: new Date()
            }));
            setAddPassword(false);
            reset();
        }
        
    }

    const checkForm = () => {

        if(title === '' || url === '' || username === '' || password === '') {
            Swal.fire('Todos los campos son obligatorios', '', 'error');
            return false
        }

        return true;

    }

    return (
        !addPassword
        ? (
            <div className='password__box password__add' onClick={() => setAddPassword(true)}>
                <div className="password__box-main">
                    <h3 className='shadow-text'>Agregar Proyecto</h3>
                    <i className="fas fa-plus"></i>
                </div>
                <div className="password__box-icon">
                    <i className="fas fa-key"></i>
                </div>
            </div> )
        : (
            <div className='password__box password__add-form'>
                <div className="password__box-main">
                    <form onSubmit={handleAddPassword}>
                        <input
                            type='text'
                            name='title'
                            value={title}
                            onChange={handleInputChange}
                            placeholder='Título'
                            />
                        <input
                            type='text'
                            name='url'
                            value={url}
                            onChange={handleInputChange}
                            placeholder='URL'
                            />
                        <input
                            type='text'
                            name='username'
                            value={username}
                            onChange={handleInputChange}
                            placeholder='Username/Email'
                            />
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            placeholder='Contraseña'
                            />
                        <div className='password__buttons'>
                            <button
                                className='btn'
                                onClick={() => setAddPassword(false)}>
                                    Cancelar <i className='fas fa-times'></i>
                            </button>
                            <button
                                className='btn'
                                type='submit'>

                                Añadir <i className='fas fa-plus'></i>
                                
                            </button>
                        </div>
                    </form>
                </div>
                <div className="password__box-icon">
                    <i className="fas fa-key"></i>
                </div>
            </div>
        )
    )
}
