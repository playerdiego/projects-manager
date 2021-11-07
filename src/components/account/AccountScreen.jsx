import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { closeSidebar } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import ProfilePic from '../../assets/profile-pic.png';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { startDeleteAccount, startUpdateEmail, startUpdateProfile } from '../../actions/authActions';
import { getAuth } from '@firebase/auth';
import { Delete } from '../ui/Delete';
import { swalConfirm } from '../../helpers/swalConfirm';
import { ChangePassword } from './ChangePassword';
import { ChangePhoto } from './ChangePhoto';
import { ReAuth } from './ReAuth';

export const AccountScreen = () => {


    const dispatch = useDispatch();
    const history = useHistory();

    const auth = getAuth();
    auth.languageCode = 'es';
    
    const {displayName, email, photoURL} = useSelector(state => state.auth);

    const [userValues, handleInputChange] = useForm({displayName, email});

    const [editPhoto, setEditPhoto] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [reAuth, setReAuth] = useState({
        status: false,
        action: null
    });

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const handleUpdateUsername = (e) => {
        e.preventDefault();
        dispatch(startUpdateProfile({displayName: userValues.displayName}, setEditUser));
    };

    const handleUpdateEmail = (e) => {
        e.preventDefault();

        setReAuth({
            status: true,
            action: () => dispatch(startUpdateEmail(userValues.email, setEditEmail, setReAuth))
        });
    };

    const handleBack = () => {
        history.goBack();
    }

    const handleDeleteAccount = () => {
        swalConfirm('¿Quieres eliminar tu cuenta?', 'Todos los datos se eliminarán', () => {
            setReAuth({
                status: true,
                action: () => dispatch(startDeleteAccount())
            });
        });
    }

    return (
        <>
            <div className="account__header">
                <button
                    className="btn btn-less-deep auth__button-back project__back"
                    onClick={handleBack}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className='shadow-text main__title'>Mi Cuenta</h1>
            </div>

            <div className="account__main">
                {
                    reAuth.status ? <ReAuth action={reAuth.action} setter={setReAuth} /> :
                    editPassword ? <ChangePassword setter={setEditPassword} />
                    : (
                        <>
                        <div className="account__profile-img">
                            <img src={ photoURL ? photoURL :  ProfilePic} alt={userValues.displayName} />
                            <i
                                className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                                onClick={() => setEditPhoto(true)}
                                >
                            </i>
                        </div>
                        {
                            editPhoto && <ChangePhoto setter={setEditPhoto} />
                        }

                        

                        {
                            !editUser
                            ? (
                                <div className="account__field">
                                    <strong>Username:</strong> {userValues.displayName}
                                    <i
                                        className={!editUser && !editEmail && !editPhoto ? 'fas fa-pencil' : 'hidden'}
                                        onClick={() => setEditUser(true)}
                                        >
                                    </i>
                                </div>
                            )
                            : (
                                <Form
                                    className='password__form'
                                    handleSubmit={handleUpdateUsername}
                                    handleInputChange={handleInputChange}
                                    name='displayName'
                                    value={userValues.displayName}
                                    setter={setEditUser}
                                    />
                            )
                        }

                        {
                            !editEmail
                            ? (
                                <div className="account__field">
                                    <strong>Email:</strong> {email}
                                    {
                                        auth.currentUser.providerData[0].providerId === 'password' ?
                                        (
                                            <i
                                            className={!editUser && !editEmail && !editPhoto ? 'fas fa-pencil' : 'hidden'}
                                            onClick={() => setEditEmail(true)}
                                            ></i>
                                        ) : auth.currentUser.providerData[0].providerId === 'google.com' ? (
                                            <i className='fab fa-google'></i>
                                        ) : (
                                            <i className='fab fa-github'></i>
                                        )
                                    }
                                </div>
                            )
                            : (
                                <Form
                                    className='password__form'
                                    handleSubmit={handleUpdateEmail}
                                    handleInputChange={handleInputChange}
                                    name='email'
                                    value={userValues.email}
                                    setter={setEditEmail}
                                    />
                            )
                        }

                        {
                            auth.currentUser.providerData[0].providerId === 'password' &&
                            <button onClick={() => setEditPassword(true)}>Cambiar Contraseña <i className="fas fa-unlock-alt"></i></button>
                        }

                        <Delete action={() => handleDeleteAccount()} />
                        </>
                    )
                }

            </div>
        </>
    )
}
