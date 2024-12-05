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

const apiChangeUserInfor = (data: any) => {
    return client.put('/api/guests/change-information/', data);
}

const apiChangeAvatar = function (formData: any) {
    return client.put("api/guests/change-avatar/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export {
    apiLogin,
    apiRegister,
    apiChangeAvatar,
    apiChangeUserInfor
}; 