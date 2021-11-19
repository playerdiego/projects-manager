import { getAuth } from '@firebase/auth'
import { collection, getDocs } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startDeleteProject } from '../../actions/projectsActions'
import { db } from '../../firesbase/firebase-config'
import { swalConfirm } from '../../helpers/swalConfirm'

export const ProjectBox = ({name, budget, paid, closed, id, passwordsPanel}) => {

    const dispatch = useDispatch();
    const auth = getAuth();
    auth.languageCode = 'es';

    const [tasksLength, setTasksLength] = useState(0);


    useEffect(() => {
        const getTasks = async () => {
            const tasksSnap = await getDocs(collection(db, auth.currentUser.uid, 'data', 'projects', id, 'tasks'));
    
            setTasksLength(tasksSnap.docs.length);
        }
        getTasks();

        // eslint-disable-next-line
    }, []);

    const handleDeleteProject = () => {
        swalConfirm('¿Seguro que quieres eliminar el Proyecto? Se borrarán todos los datos', 'Se ha eliminado el proyecto', () => {
            dispatch(startDeleteProject(id));
        });
    }

    return (
        <div className="project__box-container">
            <Link to={`/project/${id}`} className={closed ? 'dashboard__box project__box closed' : 'dashboard__box project__box'}>
                <div className="dashboard__box-main">
                    <h3>
                        {
                            name.length > 20
                            ? name.slice(0, 20) + '...'
                            : name
                        }
                    </h3>
            
                    <p className='color-blue'>Tareas: {tasksLength}</p>
                    <p className='color-green'>Presupuesto: {budget}$</p>
                    <p className='color-light-green'>Pagado: {paid}% ({budget * (paid / 100)}$)</p>
                    <p className='color-red'>Por Pagar: {100 - paid}% ({budget * ((100 - paid) / 100)}$)</p>
                </div>
                <span className="dashboard__box-footer">Ver proyecto <i className="fas fa-arrow-circle-right"></i></span>
                {
                    passwordsPanel &&
                    <i className='fas fa-key'></i>
                }
            </Link>
            <i className="fas fa-times" onClick={handleDeleteProject}></i>
        </div>
    )
}
