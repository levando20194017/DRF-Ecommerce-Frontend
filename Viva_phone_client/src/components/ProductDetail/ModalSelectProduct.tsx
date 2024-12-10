import { Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { apiGetAllProducts } from '../../services/product';
import { getImageUrl } from '../../helps/getImageUrl';
import { CompareModal } from './ModalCompareProduct';

// interface CompareModalProps {
//     selectedProducts: number[];
// }

export const ModalSelectProduct: React.FC<any> = ({ productDetail, isModalVisible, setIsModalVisible }) => {

    const [allProducts, setAllProducts] = useState<any>([])
    const [options, setOptions] = useState([])
    const [optionSelected, setOptionSelected] = useState<any>({})
    const [isModalCompareOpen, setIsModalCompareOpen] = useState(false);
    const [productsToCompare, setProductToCompare] = useState<any>([]);

    const handleGetAllProducts = async () => {
        try {
            const response = await apiGetAllProducts({ pageIndex: 1, pageSize: 1000 })
            if (response.status === 200) {
                setAllProducts(response.data.products)
                setOptions(response.data.products.map((item: any) => ({
                    label: item.name,
                    value: item.id
                })))
                setOptionSelected(response.data.products[0])
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleGetAllProducts()
    }, [])

    const handleChangeOption = (value: any) => {
        setOptionSelected(allProducts.find((item: any) => item.id === value))
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        let newProductsCompare = [];
        if (productDetail?.id && optionSelected?.id) {
            newProductsCompare.push(productDetail)
            newProductsCompare.push(optionSelected)
        }
        setProductToCompare(newProductsCompare)
    }, [optionSelected])

    const handleClickButtonCompare = () => {
        setIsModalCompareOpen(true);
        // setIsModalVisible(false);
    }

    console.log(isModalCompareOpen);


    return (
        <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            maskClosable={false}
            footer={null}>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fw-bold" id="modalSelectedProductLabel">So sánh sản phẩm</h5>
                </div>
                <div className="modal-body text-center mt-5">
                    <div className='fw-bold'>Chọn sản phẩm để so sánh</div>
                    <Select
                        className='mt-4'
                        style={{ width: 150 }}
                        value={optionSelected?.id}
                        onChange={handleChangeOption}
                        options={options}
                    />
                    <div className='d-flex justify-content-between align-items-center mt-4'>
                        <div className='text-center' style={{ flexGrow: 1 }}>
                            <div>
                                <img src={getImageUrl(productDetail?.image)} width={120} height={120} />
                            </div>
                            <div className='fw-bold price mt-2'>{productDetail?.name}</div>
                        </div>
                        <div className='fw-bold price'>VS</div>
                        <div className='text-center' style={{ flexGrow: 1 }}>
                            <div>
                                <img src={getImageUrl(optionSelected?.image)} width={120} height={120} />
                            </div>
                            <div className='fw-bold price mt-2'>{optionSelected?.name}</div>
                        </div>
                    </div>
                </div>
                <div className='text-center mb-2 mt-5'>
                    <button className='btn-compare' onClick={handleClickButtonCompare}>So sánh</button>
                </div>
                <CompareModal productsToCompare={productsToCompare} isModalVisible={isModalCompareOpen} setIsModalVisible={setIsModalCompareOpen} />
            </div>
        </Modal>
    );
};
