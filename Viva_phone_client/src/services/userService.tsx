import axios from '../axios';

const handleLoginApi = (userEmail: string, userPassword: string) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId: string) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

interface UserData {
    name: string;
    email: string;
    password: string;
}

const createNewUserService = (data: UserData) => {
    return axios.post('/api/create-new-user', data);
}

const deleteUserService = (userId: string) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });
}

const editUserService = (data: UserData) => {
    return axios.put('/api/edit-user', data);
}

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService }; 