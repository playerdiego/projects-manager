const initialState = {
    uid: 123,
    username: 'PlayerDiego',
    email: 'diego@diego.com'
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {    
        default:
            return state;
    };
};