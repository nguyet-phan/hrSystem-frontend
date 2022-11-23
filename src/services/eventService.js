import axios from "../axios";

const getAllEvents = (inputId) => {
    return axios.get(`/api/get-all-events?id=${inputId}`)
}

const createNewEventService = (data) => {
    return axios.post('/api/create-new-event', data);
}

const deleteEventService = (eventId) => {
    return axios.delete('/api/delete-event', {
        data: {
            id: eventId
        }
    });
}

const editEventService = (inputData) => {
    return axios.put('/api/edit-event', inputData);
}

export {
    getAllEvents, createNewEventService,
    deleteEventService, editEventService,
}