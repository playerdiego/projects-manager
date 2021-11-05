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
            const project = {
                name,
                budget: parseFloat(budget),
                paid: parseFloat(paid),
                passwords: !passwords ? false : [],
                closed: false,
                date: new Date()
            };

            dispatch(startAddProject(project))
            reset();
        }
          
    };

    const checkForm = () => {

        if(name === '' || budget === '') {
            Swal.fire('Todos los campos son obligatorios', '', 'error');
            return false;
        } else if(paid > 100) {
            Swal.fire('El Porcentaje pagado no puede ser mayor a 100', '', 'error');
            return false;
        } else if(paid === '') {
            Swal.fire('Debes Seleccionar un Porcentaje', '', 'error');
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
                    />
                <input
                    type='text'
                    name='budget'
                    value={budget}
                    placeholder='Presupuesto: (Ej: 500)'
                    onChange={(e) => onlyNumber(e, handleInputChange)}
                    />
                <select
                    name="paid"
                    id=""
                    className='project__percentage'
                    value={paid}
                    onChange={handleInputChange}
                    required
                >
                    <option defaultValue hidden>% Completado</option>
                    <option value="0">0%</option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    <option value="80">80%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                </select>
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
