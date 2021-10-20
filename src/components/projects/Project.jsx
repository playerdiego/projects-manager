import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { projects } from '../../data/projects'
import { getProjectById } from '../../helpers/getProjectById'
import { useForm } from '../../hooks/useForm';
import { Header } from './Header';

export const Project = ({match: {params: {projectID}}}) => {

    const project = getProjectById(projectID);

    return (
        <>
            <Header project={project} />

            <div className="project__main">
                <h2 className='shadow-text main__subtitle'>Tareas</h2>
            </div>

        </>

    )
}
