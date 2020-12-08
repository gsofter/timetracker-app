const initialState = {
    teamAddModalToggle: false,
};

export function teamAddReducer(state = initialState, action) {
    switch (action.type) {
        case 'TOGGLE_TEAM_ADD_MODAL':
            return { ...state, teamAddModalToggle: action.payload.toggle };
        case 'RESET_ALL':
            return initialState;
        default:
            return state;
    }
}
