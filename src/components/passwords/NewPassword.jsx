import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm';

export const NewPassword = () => {

    const [addPassword, setAddPassword] = useState(false);

    const [{title, url, username, password}, handleInputChange, reset] = useForm({
        title: '',
        url: '',
        username: '',
        password: '',
    });

    const handleAddPassword = (e) => {
        e.preventDefault();

        setAddPassword(false);
        reset();
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
                            required
                            />
                        <input
                            type='text'
                            name='url'
                            value={url}
                            onChange={handleInputChange}
                            placeholder='URL'
                            required
                            />
                        <input
                            type='text'
                            name='username'
                            value={username}
                            onChange={handleInputChange}
                            placeholder='Username/Email'
                            required
                            />
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={handleInputChange}
                            placeholder='Contraseña'
                            required
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
