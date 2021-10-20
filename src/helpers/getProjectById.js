import { projects } from "../data/projects";

export const getProjectById = (id) => {
    return projects.find(project => project.id == id);
};