import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { closeSidebar } from '../../actions/uiActions';
import { getProjectsBudget, getProjectsPaid, getTasksLenght } from '../../helpers/getProjectsInfo';
import { scrolltoTop } from '../../helpers/scrollToTop';

export const BalanceScreen = ({history}) => {

    const projects = useSelector(state => state.projects);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const [{tasks, budget, paid}, setProjectsData] = useState({
        tasks: 0,
        budget: 0,
        paid: 0,
    });

    useEffect(() => {
        setProjectsData({
            tasks: getTasksLenght(projects),
            budget: getProjectsBudget(projects),
            paid: getProjectsPaid(projects),
        });
    }, [projects]);

    const handleSelectProject = (project) => {
        history.push(`/project/${project.id}`)
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
                                    <td>{project.tasks.length}</td>
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
