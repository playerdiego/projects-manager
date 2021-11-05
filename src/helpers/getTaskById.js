export const getTaskById = (id, tasks) => {
    // eslint-disable-next-line
    return tasks.find(task => task.id == id);
};