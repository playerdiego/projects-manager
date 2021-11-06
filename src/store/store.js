import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { passwordsReducer } from "../reducers/passwordsReducer";
import { projectsReducer } from "../reducers/projectsReducer";
import { tasksReducer } from "../reducers/tasksReducer";
import { uiReducer } from "../reducers/uiReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    passwords: passwordsReducer
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);