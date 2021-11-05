import { types } from "../types/types";

const initialState = []

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadTasks: {
            return [
                ...action.payload
            ]
        }
        case types.addTask: {
            return [
                action.payload,
                ...state
            ]
        }
        case types.deleteTask: {
            return state.filter(task => task.id !== action.payload)
        }
        // eslint-disable-next-line
        case types.cleanTasks: {
            return []
        }
        default:
            return state;
    }
}