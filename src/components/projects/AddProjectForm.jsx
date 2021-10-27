import React from 'react'
import { useForm } from '../../hooks/useForm'

export const AddProjectForm = ({setAddProject}) => {

    const handleAddProject = (e) => {

        e.preventDefault();
        reset();   
    };

    const [{title, budget, paid, passwords}, handleInputChange, reset] = useForm({
        title: '',
        budget: '',
        paid: '',
        passwords: false,
    });

    const togglePasswords = (e) => {
        handleInputChange({
            target: {
                name: e.target.name,
                value: !passwords
            }
        });
    };

    return (
        <div className='dashboard__box project__add-form'>
            <form onSubmit={handleAddProject}>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                    placeholder='Título del Proyecto'
                    required
                    />
                <input
                    type='text'
                    name='budget'
                    value={budget}
                    onChange={handleInputChange}
                    placeholder='Presupuesto: (Ej: 500)'
                    required
                    />
                <input
                    type='text'
                    name='paid'
                    value={paid}
                    onChange={handleInputChange}
                    placeholder='% Pagado'
                    required
                    />
                <label htmlFor="contraseñas" className='project__header-passwords'>
                    <input
                        type="checkbox"
                        id='contraseñas'
                        name='passwords'
                        checked={passwords}
                        onChange={togglePasswords} /> Panel de Contraseñas
                </label>
                <div className='password__buttons'>
                    <button
                        className='btn'
                        onClick={() => setAddProject(false)}>
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
    )
}
