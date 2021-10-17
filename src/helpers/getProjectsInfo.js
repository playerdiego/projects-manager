import { projects } from "../data/projects";

export const getTasksLenght = () => {
    let tasks = 0;
    projects.forEach(project => {
        tasks += project.tasks
    });

    return tasks;
};

export const getProjectsBudget = () => {
    let budget = 0;
    
    projects.forEach(project => {
        budget += project.budget
    });

    return budget;
}

export const getProjectPercentage = (project) => {

    const total = getProjectsBudget();

    const percentage = (project.budget / total) * 100;

    return percentage;
}

export const getProjectsPaid = () => {

    let paid = [];
    let total = 0;

    // Obetenemos el procentaje que representa cada proyecto
    const percentages = projects.map(project => getProjectPercentage(project));
    
    // Obtenemos el porcentaje pagado de cada proyecto
    for (let i = 0; i < projects.length; i++) paid.push( percentages[i] * (projects[i].paid / 100));
    
    // Sumamos el total del porcentaje pagado
    for (let i = 0; i < paid.length; i++) total += paid[i];   

    return total;
    
}