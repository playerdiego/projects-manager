import { types } from "../types/types";

const initialState = {
    open: false
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.openSidebar:
            return {
                ...state,
                open: true
            }
        case types.closeSidebar:
            return {
                ...state,
                open: false
            }
        default:
            return state;
    };
};