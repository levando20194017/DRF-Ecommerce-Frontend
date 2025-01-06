import "./style.scss";
import { useEffect, useState } from 'react';
import { ListProduct } from "../Home/ProductCatgories/ProductItem";
import { ModalQuickView } from "../Home/ModalQuickView";
import { apiRecommendProducts } from "../../services/product";
import { getUserData } from "../../helps/getItemLocal";

export const RelatedProduct = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [listRelatedProducts, setListRelatedProduct] = useState([])

    const handleQuickView = () => {
        setIsOpenModal(true);
        console.log(2);

    }
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    const userData = getUserData()
    const handleGetListRelatedProduct = async () => {
        if (userData?.id) {
            try {
                const response = await apiRecommendProducts({ store_id: 1, guest_id: userData.id })
                if (response.status === 200) {
                    setListRelatedProduct(response.data)
                }

            } catch (e) {
                console.log(e);
            }
        }
    }
    useEffect(() => {
        handleGetListRelatedProduct()
    }, [])
    return (
        <div className="related-pro">
            <ModalQuickView
                isOpen={isOpenModal}
                toggleFromParent={toggleModal}
            />
            <div className="title justify-content-center">Các sản phẩm gợi ý</div>
            <div className="text-center description">
                <p>
                    Xem thêm nhiều sản phẩm khác có thể phù hợp với bạn
                </p>
            </div>
            <ListProduct handleQuickView={handleQuickView} listRelatedProducts={listRelatedProducts} />
        </div>
    );
};