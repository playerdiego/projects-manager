import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startAddProject } from '../../actions/projectsActions';
import { onlyNumber } from '../../helpers/onlyNumber';
import { useForm } from '../../hooks/useForm'

export const AddProjectForm = ({setAddProject}) => {

    const dispatch = useDispatch();

    const [{name, budget, paid, passwords}, handleInputChange, reset] = useForm({
        name: '',
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


    const handleAddProject = (e) => {
        e.preventDefault();

        if(checkForm()) {
            const project = {name, budget: parseFloat(budget), paid: parseFloat(paid), passwords, tasks: [], closed: false};

            dispatch(startAddProject(project))
            reset();
        }
          
    };

    const checkForm = () => {

        if(paid > 100) {
            Swal.fire('El Porcentaje pagado no puede ser mayor a 100', '', 'error');
            return false;
        }

        return true;

    }

    return (
        <div className='dashboard__box project__add-form'>
            <form onSubmit={handleAddProject}>
                <input
                    type='text'
                    name='name'
                    value={name}
                    onChange={handleInputChange}
                    placeholder='Nombre del Proyecto'
                    required
                    />
                <input
                    type='text'
                    name='budget'
                    value={budget}
                    placeholder='Presupuesto: (Ej: 500)'
                    onChange={(e) => onlyNumber(e, handleInputChange)}
                    required
                    />
                <input
                    type='text'
                    name='paid'
                    value={paid}
                    onChange={(e) => onlyNumber(e, handleInputChange)}
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
