import { types } from "../types/types";

const initialState = [];

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadProjects: {
            return [
                ...action.payload,
                ...state,
            ]
        }
        case types.addProject: {
            return [
                action.payload,
                ...state,
            ]
        }
        case types.deleteProject: {
            return state.filter(project => project.id !== action.payload);
        }
        default:
            return state;
    }
}