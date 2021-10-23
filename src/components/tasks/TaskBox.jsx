import React from 'react'
import { Link } from 'react-router-dom'

export const TaskBox = ({title, id, projectID, done}) => {

    const handleToggleStatus = () => {
    }

    return (
        <div
            className={ done ? 'task__box dashboard__box completed' : 'task__box dashboard__box'}
        >
            {
                done
                ? <i className='far fa-check-square task__toggle' onClick={handleToggleStatus}></i>
                : <i className='far fa-square task__toggle' onClick={handleToggleStatus}></i>
            }

            <Link to={`/project/${projectID}/task/${id}`} className='task__box-main'>
                <h4>
                    {
                        title.length > 20
                        ? title.slice(0, 20) + '...'
                        : title
                    }
                </h4>
                <i className='fas fas fa-arrow-right'></i>
            </Link>
        </div>
    )
}