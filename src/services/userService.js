import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    // template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId });
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getAllManagersService = () => {
    return axios.get('/api/get-all-managers');
}

const saveBasicSalaryService = (data) => {
    return axios.post('/api/save-basic-salary', data);
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService, editUserService,
    getAllCodeService, getAllManagersService,
    saveBasicSalaryService
}