import { projects } from "../data/projects";

export const getProjectById = (id) => {
    // eslint-disable-next-line
    return projects.find(project => project.id == id);
};