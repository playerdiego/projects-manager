import { types } from "../types/types";

const initialState = [];

export const passwordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadPasswords: {
            return [
                ...action.payload
            ]
        }
        case types.addPassword: {
            return [
                action.payload,
                ...state
            ]
        }
        case types.updatePassword: {
            return state.map(password => password.id !== action.payload.passwordID ? password : {
                ...password,
                ...action.payload.password
            });
        }
        case types.deletePassword: {
            return state.filter(password => password.id !== action.payload)
        }
        // eslint-disable-next-line
        case types.cleanPasswords: {
            return []
        }
        default:
            return state;
    }
}