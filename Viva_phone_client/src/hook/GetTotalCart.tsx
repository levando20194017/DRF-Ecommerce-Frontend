import { useDispatch } from "react-redux";
import { getUserData } from "../helps/getItemLocal";
import { setTotalCart } from "../store/actions";
import { apiGetCart } from "../services/cart";

export const useHandleGetTotalCart = () => {
    const dispatch = useDispatch();
    const userData = getUserData();

    const handleGetTotalCart = async () => {
        try {
            const response = await apiGetCart(userData?.id) as any;

            if (response.status === 200) {
                dispatch(setTotalCart(response.total));
            }
        } catch (e) {
            console.log(e);
        }
    };

    return { handleGetTotalCart };
};
