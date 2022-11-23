import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getAllManagersService,
    saveBasicSalaryService
} from '../../services/userService';
import {
    getAllEvents, createNewEventService,
    deleteEventService, editEventService,
} from '../../services/eventService';

import { toast } from 'react-toastify';
// redux: start-doing-end

/**------------------Gender------------ */

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                // console.log('fetchGenderStart check getState: ', getState);
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error: ', e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
})

/**------------------Position------------ */

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error: ', e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
})

/**------------------Role------------ */

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleStart error: ', e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

/**------------------Create an user------------ */

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error: ', e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

/**------------------All Users------------ */

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            // console.log('check get All Users: ', res);
            if (res && res.errCode === 0) {
                // dispatch(fetchAllUsersSuccess(res.users.reverse()));//dao nguoc thu tu
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                toast.error("fetchAllUsers Failed!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("fetchAllUsers Failed!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersStart error: ', e);
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
})

/**------------------Delete the user------------ */

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete the user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete the user failded!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete the user failded!");
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error: ', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

/**------------------Edit the user------------ */

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Edit the user failded!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("Edit the user failded!");
            dispatch(editUserFailed());
            console.log('editUserFailed error: ', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

/**------------------All Managers------------ */

export const fetchAllManagersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllManagersService();
            if (res && res.errCode === 0) {

                dispatch({
                    type: actionTypes.FETCH_ALL_MANAGERS_SUCCESS,
                    dataManagers: res.data
                });
            } else {
                toast.error("fetchAllManagers Failed!");
                dispatch({
                    type: actionTypes.FETCH_ALL_MANAGERS_FAILDED
                });
            }
        } catch (e) {
            toast.error("fetchAllManagers Failed!");
            dispatch({
                type: actionTypes.FETCH_ALL_MANAGERS_FAILDED
            });
            console.log('fetchAllManagersStart error: ', e);
        }
    }
}

/**------------------Save basic salaries------------ */

export const saveBasicSalaries = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveBasicSalaryService(data);
            if (res && res.errCode === 0) {
                toast.success("Save basic salaries succeed!");
                dispatch({
                    type: actionTypes.SAVE_BASIC_SALARY_SUCCESS,
                });
            } else {
                console.log('SAVE_BASIC_SALARY_FAILDED error: ', res);
                toast.error("SAVE_BASIC_SALARY_FAILDED Failed!");
                dispatch({
                    type: actionTypes.SAVE_BASIC_SALARY_FAILDED
                });
            }
        } catch (e) {
            toast.error("SAVE_BASIC_SALARY_FAILDED Failed!");
            dispatch({
                type: actionTypes.SAVE_BASIC_SALARY_FAILDED
            });
            console.log('SAVE_BASIC_SALARY_FAILDED error: ', e);
        }
    }
}

/**------------------Create a new event------------ */

export const createNewEvent = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewEventService(data);
            if (res && res.errCode === 0) {
                toast.success("createNewEvent succeed!");
                dispatch({
                    type: actionTypes.CREATE_EVENT_SUCCESS,
                });
                dispatch(fetchAllEventStart());
            } else {
                console.log('CREATE_EVENT_FAILDED error: ', res);
                toast.error("CREATE_EVENT_FAILDED Failed!");
                dispatch({
                    type: actionTypes.CREATE_EVENT_FAILDED
                });
            }
        } catch (e) {
            toast.error("CREATE_EVENT_FAILDED Failed!");
            dispatch({
                type: actionTypes.CREATE_EVENT_FAILDED
            });
            console.log('CREATE_EVENT_FAILDED error: ', e);
        }
    }
}

/**------------------Create a new event------------ */

export const fetchAllEventStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllEvents("ALL");
            console.log('check all events: ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllEventsSuccess(res.events));
            } else {
                toast.error("fetch All Events Failed!");
                dispatch(fetchAllEventsFailed());
            }
        } catch (e) {
            toast.error("fetchAllEvents Failed!");
            dispatch(fetchAllEventsFailed());
            console.log('fetchAllEventsStart error: ', e);
        }
    }
}

export const fetchAllEventsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_EVENTS_SUCCESS,
    events: data
})

export const fetchAllEventsFailed = () => ({
    type: actionTypes.FETCH_ALL_EVENTS_FAILDED
})

/**------------------Delete the event------------ */

export const deleteEvent = (eventId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteEventService(eventId);
            if (res && res.errCode === 0) {
                toast.success("Delete the event succeed!");
                dispatch(deleteEventSuccess());
                dispatch(fetchAllEventStart());
            } else {
                toast.error("Delete the event failded!");
                dispatch(deleteEventFailed());
            }
        } catch (e) {
            toast.error("Delete the event failded!");
            dispatch(deleteEventFailed());
            console.log('deleteEventFailed error: ', e);
        }
    }
}

export const deleteEventSuccess = () => ({
    type: actionTypes.DELETE_EVENT_SUCCESS,
})

export const deleteEventFailed = () => ({
    type: actionTypes.DELETE_EVENT_FAILDED
})

/**------------------Edit the event------------ */

export const editEvent = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editEventService(data);
            if (res && res.errCode === 0) {
                toast.success("Edit the event succeed!");
                dispatch(editEventSuccess());
                dispatch(fetchAllEventStart());
            } else {
                toast.error("Edit the event failded!");
                dispatch(editEventFailed());
            }
        } catch (e) {
            toast.error("Edit the event failded!");
            dispatch(editEventFailed());
            console.log('editEventFailed error: ', e);
        }
    }
}

export const editEventSuccess = () => ({
    type: actionTypes.EDIT_EVENT_SUCCESS,
})

export const editEventFailed = () => ({
    type: actionTypes.EDIT_EVENT_FAILDED
})