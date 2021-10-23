import { tasks } from "../data/tasks";


export const getTaskById = (id) => {
    // eslint-disable-next-line
    return tasks.find(task => task.id == id);
};