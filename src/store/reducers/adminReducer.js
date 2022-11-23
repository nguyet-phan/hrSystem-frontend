import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    allManagers: [],
    events: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copySate = { ...state };
            copySate.isLoadingGender = true;
            return {
                ...copySate
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILDED:
            state.genders = [];
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILDED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_MANAGERS_SUCCESS:
            state.managers = action.dataManagers;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_MANAGERS_FAILDED:
            state.managers = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_EVENTS_SUCCESS:
            state.events = action.events;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_EVENTS_FAILDED:
            state.events = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;