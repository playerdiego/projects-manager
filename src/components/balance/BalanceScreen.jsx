import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { projects } from '../../data/projects';
import { getProjectsBudget, getProjectsPaid, getTasksLenght } from '../../helpers/getProjectsInfo';

export const BalanceScreen = ({history}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
    }, [dispatch]);

    const [{tasks, budget, paid}, setProjectsData] = useState({
        tasks: getTasksLenght(),
        budget: getProjectsBudget(),
        paid: getProjectsPaid(),
    });

    useEffect(() => {
        setProjectsData({
            tasks: getTasksLenght(),
            budget: getProjectsBudget(),
            paid: getProjectsPaid(),
        });
    }, []);

    const handleSelectProject = () => {
        history.push('/projects')
    } 

    return (
        <>
            <h1 className='shadow-text main__title'>Balance de Pagos</h1>

            <div className="balance__container">
                <table className='balance__table'>
                    <thead>
                        <tr>
                            <th className='balance__table-project'>Proyecto</th>
                            <th className='balance__table-tasks'>Tareas</th>
                            <th className='balance__table-paid'>Pagado</th>
                            <th className='balance__table-remaining'>Por Pagar</th>
                            <th className='balance__table-total'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            projects.map(project => (
                                <tr onClick={() => handleSelectProject(project)} key={project.id}>
                                    <td>{project.name}</td>
                                    <td>{project.tasks}</td>
                                    <td>{project.paid}% ({project.budget * (project.paid / 100)}$)</td>
                                    <td>{100 - project.paid}% ({project.budget * ((100 - project.paid) / 100)}$)</td>
                                    <td>{project.budget}$</td>
                                </tr>
                            ))
                        }
                        <tr className='balance__table-total-row'>
                            <td>TOTAL</td>
                            <td>{tasks}</td>
                            <td>{paid.toFixed(2)}% - {(budget * (paid / 100)).toFixed(2) }$</td>
                            <td>{(100 - paid).toFixed(2)}% - {(budget * ((100 - paid) / 100)).toFixed(2) }$</td>
                            <td>{budget}$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
