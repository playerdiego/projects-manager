import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

export const ProjectHeader = ({project}) => {

    const [editTitle, setEditTitle] = useState(false);
    const [editBudget, setEditBudget] = useState(false);
    
    const [{name, budget, paid}, handleInputChange] = useForm({
        ...project
    });

    const handleUploadProject = (e) => {
        e.preventDefault();

        setEditTitle(false);
        setEditBudget(false);
    }


    return (
        <>
            <div className="project__header">
                <Link
                    className="btn btn-less-deep auth__button-back project__back"
                    to='/projects'
                >
                    <i className="fas fa-arrow-left"></i>
                </Link>

                

                {
                    !editTitle 
                    ? (
                        <h1 className='shadow-text main__title' onClick={() => setEditTitle(true)}>
                            {name}
                            <i
                                className={`fas fa-pencil project__edit ${editTitle || editBudget ? 'hidden': ''}`}
                                onClick={() => setEditTitle(true)}
                            ></i>
                        </h1>
                    )
                    : (
                        <form
                            className='project__title-form'
                            onSubmit={handleUploadProject}
                        >
                            <input
                                className='auth__input project__input'
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleInputChange}
                                value={name}
                            />
                            <button className="project__form-btn"><i className='fas fa-check'></i></button>
                        </form>
                    )
                }

                {
                    !editBudget
                    ? (
                        <>
                        <div className="project__budget" onClick={() => setEditBudget(true)}>
                            {budget}$
                            <i
                                className={`fas fa-pencil project__edit ${editTitle || editBudget ? 'hidden': ''}`}
                                onClick={() => setEditBudget(true)}
                            ></i>
                        </div>
                        </>
                    )
                    : (
                        <form
                            className='project__budget-form'
                            onSubmit={handleUploadProject}
                        >
                            <input
                                className='auth__input project__input project__input-budget'
                                type="text"
                                name="budget"
                                id="budget"
                                onChange={handleInputChange}
                                value={budget}
                            />
                            <button className="project__form-btn"><i className='fas fa-check'></i></button>
                        </form>
                    )
                }

                <select
                    name="paid"
                    id=""
                    className='project__percentage'
                    value={paid}
                    onChange={handleInputChange}
                >
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
                
            </div>
            <div className="project__header-description">
                <p className='color-blue'>Tareas: {project.tasks}</p>
                <p className='color-light-green'>Pagado: {paid}% ({budget * (paid / 100)}$)</p>
                <p className='color-red'>Por Pagar: {100 - paid}% ({budget * ((100 - paid) / 100)}$)</p>
            </div>

        </>
    )
}
