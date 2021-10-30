import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { closeSidebar } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import ProfilePic from '../../assets/profile-pic.png';

export const AccountScreen = () => {

    const {username, email, photo} = useSelector(state => state.auth);

    const [userValues, handleInputChange] = useForm({username, email});

    const [editUser, setEditUser] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        setEditUser(false);
        setEditEmail(false);
    };

    const handleBack = () => {
        history.goBack();
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
        document.querySelector("body").scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [dispatch]);

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
                <div className="account__profile-img">
                    <img src={ photo ? photo :  ProfilePic} alt={userValues.username} />
                    <i
                        className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                        >
                    </i>
                </div>

                {
                    !editUser
                    ? (
                        <div className="account__field">
                            <strong>Username:</strong> {userValues.username}
                            <i
                                className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                                onClick={() => setEditUser(true)}
                                >
                            </i>
                        </div>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='username'
                            value={userValues.username}
                            setter={setEditUser}
                            />
                    )
                }

                {
                    !editEmail
                    ? (
                        <div className="account__field">
                            <strong>Email:</strong> {userValues.email}
                            <i
                                className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                                onClick={() => setEditEmail(true)}
                                ></i>
                        </div>
                    )
                    : (
                        <Form
                            className='password__form'
                            handleSubmit={handleSubmit}
                            handleInputChange={handleInputChange}
                            name='email'
                            value={userValues.email}
                            setter={setEditEmail}
                            />
                    )
                }
                <Link to='/auth/recover'>Cambiar Contraseña <i className="fas fa-unlock-alt"></i></Link>
            </div>
        </>
    )
}
