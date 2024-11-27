import React, { useState } from 'react';
import { Product } from '../../types';
import { Routes } from '../Routes';
import Breadcrumb from '../../components/Breadcrumb';
import './payment.scss'
import { FaLocationDot } from "react-icons/fa6";
import { Button } from 'antd';
import ProductItem from '../../components/Payment/ProductItem';
import AddressModal from '../../components/Payment/AddressModal';

const initialProducts: Product[] = [
    { id: 1, name: 'Quần Túi Hộp', price: 146000000, quantity: 2, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'Đen, XL', shop: 'HipHop69' },
    { id: 2, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
];

const PaymentPage: React.FC = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
        { label: "Thanh toán" },
    ];
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash")

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChangePaymentMethod = (value: string) => {
        setPaymentMethod(value)
    }

    return (
        <>
            <div className="div-empty"></div>
            <AddressModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <div className="container mt-4 payment-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {/* <h5 className='title mt-5'>Giỏ hàng của tôi</h5> */}
                <div className=''>
                    <div className='border-top mt-5'></div>
                    <div className='shipping-address'>
                        <div className='title price'><FaLocationDot className='mb-2' /> Địa chỉ nhận hàng</div>
                        <div>
                            <span className='fw-bold'>Lê Văn Do 0987565773</span>
                            <span className='ms-2'>46 ngõ 61 Định Công, Hoàng Mai, Hà Nội</span>
                            <span className='ms-3'><Button className="btn-change" onClick={showModal}>THAY ĐỔI</Button></span>
                        </div>
                    </div>
                    <div className='sum-product'>
                        <div className="d-flex py-3 mt-1">
                            <div className='col-6 fw-bold'>
                                Sản Phẩm
                            </div>
                            <div className='col-6 d-flex'>
                                <div className="col-4 text-center">Đơn Giá</div>
                                <div className="col-4 text-center">Số Lượng</div>
                                <div className="col-4 text-center">Thành tiền</div>
                            </div>
                        </div>
                        <div className='mt-1'>
                            {products.map((product) => (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='total-cost mt-1'>
                        <div className='payment-method'>
                            <div className='d-flex gap-3 align-items-center'>
                                <div>Phương thức thanh toán</div>
                            </div>
                            <div className='d-flex gap-4 justify-content-center align-items-center'>
                                {paymentMethod ?
                                    <>
                                        <span>Thanh toán khi nhận hàng</span>
                                        <Button className="btn-change" onClick={() => { setPaymentMethod("") }}>THAY ĐỔI</Button>
                                    </>
                                    :
                                    <>
                                        <Button className='payment-option' onClick={() => { handleChangePaymentMethod("online") }}>Thanh toán bằng VN Pay</Button>
                                        <Button className='payment-option' onClick={() => { handleChangePaymentMethod("cash_on_delivery") }}>Thanh toán khi nhận hàng</Button>
                                    </>}
                            </div>
                        </div>
                        <div className='d-flex justify-content-end actual-amount p-3'>
                            <div>
                                <div className='d-flex gap-2'>
                                    <div className='label'>Tổng tiền hàng</div>
                                    <div className='value'>30000000₫</div>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className='label'>Khuyễn mãi</div>
                                    <div className='value'>300000₫</div>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className='label'>Tổng thanh toán</div>
                                    <div className='value'>300000₫</div>
                                </div>
                            </div>
                        </div>
                        <div className='payment-action'>
                            <div>Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý điều khoản tuân theo <a style={{ color: "#0d6efd" }} className='cursor-pointer'>Điều khoản Viva Phone</a></div>
                            <div><Button className='btn-payment'>Thanh toán</Button></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PaymentPage;
