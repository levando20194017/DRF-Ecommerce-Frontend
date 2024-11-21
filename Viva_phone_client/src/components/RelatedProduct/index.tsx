import "./style.scss";
import { useState } from 'react';
import { ListProduct } from "../Home/ProductCatgories/ListProduct";
import { ModalQuickView } from "../Home/ModalQuickView";

export const RelatedProduct = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleQuickView = () => {
        setIsOpenModal(true);
        console.log(2);

    }
    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    }
    return ( 
        <div className="related-pro">
            <ModalQuickView
                isOpen={isOpenModal}
                toggleFromParent={toggleModal}
            />
            <div className="title justify-content-center">Các sản phẩm gợi ý</div>
            <ListProduct handleQuickView={handleQuickView} />
        </div>
    );
};