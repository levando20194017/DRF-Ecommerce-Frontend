import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { apiGetAllProducts } from '../../services/product';
import { getImageUrl } from '../../helps/getImageUrl';
import { CompareModal } from './ModalCompareProduct';

interface CompareModalProps {
    selectedProducts: number[];
}

export const ModalSelectProduct: React.FC<any> = ({ productDetail }) => {

    const [allProducts, setAllProducts] = useState<any>([])
    const [options, setOptions] = useState([])
    const [optionSelected, setOptionSelected] = useState<any>({})

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
        setOptionSelected(value)
    }
    return (
        <div
            className="modal fade"
            id="modalSelectedProduct"
            tabIndex={-1}
            aria-labelledby="modalSelectedProductLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold" id="modalSelectedProductLabel">So sánh sản phẩm</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">
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
                    <div className='text-center mb-4 mt-4'>
                        <button data-bs-toggle="modal" className='btn-compare' data-bs-target="#compareModal">So sánh</button>
                    </div>
                    {/* <CompareModal selectedProducts={selectedProducts} /> */}
                </div>
            </div>
        </div>
    );
};
