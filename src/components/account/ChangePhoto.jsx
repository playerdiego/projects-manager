import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startUpdatePhoto } from '../../actions/authActions';

export const ChangePhoto = ({setter}) => {

    const dispatch = useDispatch();

    const handleUploadPhoto = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        if(file.size > 2000000) {
            Swal.fire('El archivo debe ser menor a 2MB', '', 'error');
            return false;
        }

        if(file) {
            dispatch(startUpdatePhoto(file, setter));
        }
    }

    return (
        <div className='account__change-photo'>
            <h3 className='shadow-text'>Cambiar foto de Perfil (Max. 2MB)</h3>
            <input
                autoFocus
                type='file'
                name='photo'
                accept="image/png,image/jpeg"
                onChange={handleUploadPhoto}
            />
            <div className='form__buttons-container'>
                <button
                    className='form__btn'
                    onClick={() => setter(false)}>
                    <i className='fas fa-times'></i>
                </button>
            </div>
        </div>
    )
}
