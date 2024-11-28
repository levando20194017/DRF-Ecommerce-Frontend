import axios from '../axios/axios';
import client from "../axios/axiosClient"
interface UserLogin {
    email: string;
    password: string;
}

const apiLogin = (data: UserLogin) => {
    return client.post('/api/guest/login/', data);
}

interface UserRegister {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
}

const apiRegister = (data: UserRegister) => {
    return client.post('/api/guests/register/', data);
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

export { apiLogin, apiRegister, getAllUsers, createNewUserService, deleteUserService, editUserService }; 