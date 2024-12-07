import client from "../axios/axiosClient"
interface DataGetNotification {
    pageIndex: number;
    pageSize: number;
    id: number;
}

const apiGetNotifications = (data: DataGetNotification) => {
    return client.get(`api/notification/get-list-notifications/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&id=${data.id}`);
}

const apiReadNotification = (data: any) => {
    return client.put(`api/notification/read-notification/`, data);
}


export {
    apiGetNotifications,
    apiReadNotification
}; 