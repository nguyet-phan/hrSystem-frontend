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

const getBasicSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-basic-salary-by-id?staffId=${staffId}&month=${month}`);
}

const getBonusSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-bonus-salary-by-id?staffId=${staffId}&month=${month}`);
}

const getProjectSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-project-salary-by-id?staffId=${staffId}&month=${month}`);
}

const getOvertimeSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-overtime-salary-by-id?staffId=${staffId}&month=${month}`);
}

const getOnsiteSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-onsite-salary-by-id?staffId=${staffId}&month=${month}`);
}

const getDeductionSalaryByIdService = (staffId, month) => {
    return axios.get(`/api/get-deduction-salary-by-id?staffId=${staffId}&month=${month}`);
}

export {
    handleLoginApi, getAllUsers,
    createNewUserService, deleteUserService, editUserService,
    getAllCodeService, getAllManagersService,
    saveBasicSalaryService, getBasicSalaryByIdService,
    getBonusSalaryByIdService, getProjectSalaryByIdService,
    getOvertimeSalaryByIdService, getOnsiteSalaryByIdService,
    getDeductionSalaryByIdService,

}