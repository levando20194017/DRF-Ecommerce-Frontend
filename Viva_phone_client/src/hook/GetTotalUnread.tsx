import { useDispatch } from "react-redux";
import { apiGetNotifications } from "../services/notification";
import { getUserData } from "../helps/getItemLocal";
import { setTotalUnNotification } from "../store/actions";

export const useHandleGetTotalUnnotification = () => {
    const dispatch = useDispatch();
    const userData = getUserData();

    const handleGetTotalUnnotification = async () => {
        try {
            const response = await apiGetNotifications({
                pageIndex: 1,
                pageSize: 1,
                id: userData?.id,
            }) as any;

            if (response.status === 200) {
                dispatch(setTotalUnNotification(response.data.unread_count));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return { handleGetTotalUnnotification };
};
