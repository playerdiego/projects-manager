import React, { useEffect, useState } from 'react'
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';

export const PasswordBox = ({title, url, username, password}) => {

    const [showPass, setShowPass] = useState(false);
    
    const [hiddenPass, setHiddenPass] = useState('');


    const [editTitle, setEditTitle] = useState(false);
    const [editURL, setEditURL] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [editPass, setEditPass] = useState(false);

    const [passwordValues, handleInputChange] = useForm({title, url, username, password});

    useEffect(() => {
        
        let asterisk = '';
        for (let i = 0; i < passwordValues.password.length; i++) {
            asterisk += '*';
        }

        setHiddenPass(asterisk);

    }, [passwordValues.password])

    

    const toggleShow = () => {
        setShowPass(!showPass);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setEditTitle(false);
        setEditURL(false);
        setEditUser(false);
        setEditPass(false);
    }

    const handleDeletePassword = () => {

    }

    return (
        <div className='password__box'>
            <div className="password__box-main">

                {
                    !editTitle 
                    ? (
                        <h3>
                            {passwordValues.title}
                            <i className={!editTitle && !editURL && !editUser && !editPass ? `fas fa-pencil` : 'hidden'} onClick={() => setEditTitle(true)}></i>
                        </h3>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='title'
                            setter={setEditTitle}
                            value={passwordValues.title}/>
                    )
                }

                {
                    !editURL
                    ? (
                        <div className='password__url'>
                            <a href={url} target='_blank' rel="noreferrer">URL: {passwordValues.url} <i className='fas fa-share'></i></a>
                            <i
                                className={!editTitle && !editURL && !editUser && !editPass ? `fas fa-pencil` : 'hidden'}
                                onClick={() => setEditURL(true)}></i>
                        </div>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='url'
                            setter={setEditURL}
                            value={passwordValues.url}/>
                    )
                }
                

                {
                    !editUser
                    ? (
                        <div className="password__box-field">
                            <p><b>User/Email:</b> {passwordValues.username} <i className='fas fa-copy'></i></p>
                            <i
                                className={!editTitle && !editURL && !editUser && !editPass ? `fas fa-pencil` : 'hidden'}
                                onClick={() => setEditUser(true)}></i>
                        </div>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='username'
                            setter={setEditUser}
                            value={passwordValues.username}/>
                    )
                }

                {
                    !editPass 
                    ? (
                        <div className="password__box-field">
                            <p>
                                <b>Contraseña: </b>
                                {
                                    showPass ? passwordValues.password : hiddenPass

                                } <i className='fas fa-copy'></i>
                                <i
                                    className={!showPass ? 'fas fa-eye show-pass' : 'fas fa-eye-slash show-pass'}
                                    onClick={toggleShow}
                                >
                                </i>
                            </p>
                            <i
                                className={!editTitle && !editURL && !editUser && !editPass ? `fas fa-pencil` : 'hidden'}
                                onClick={() => setEditPass(true)}></i>
                        </div>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='password'
                            setter={setEditPass}
                            value={passwordValues.password}/>
                    )
                }

            </div>
            <div className="password__box-icon">
                <i className="fas fa-key"></i>
            </div>
            <i className='fas fa-times password__delete' onClick={handleDeletePassword}></i>
        </div>
    )
}
