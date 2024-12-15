import React, { useEffect, useState } from 'react';
import { Order, Product } from '../../types';
import { Routes } from '../Routes';
import Breadcrumb from '../../components/Breadcrumb';
import './payment.scss'
import { FaLocationDot } from "react-icons/fa6";
import { Button, message } from 'antd';
import ProductItem from '../../components/Payment/ProductItem';
import AddressModal from '../../components/Payment/AddressModal';
import { getOrderLocal, getUserData } from '../../helps/getItemLocal';
import { PaymentMethod } from '../../utils/paymentType';
import { formatPrice } from '../../utils/format';
import { promotionType } from '../../utils/promotionType';
import { apiCreateNewOrder } from '../../services/order';
import { getTotalDiscountByCart } from '../../helps/getTotalDiscount';
import { useHandleGetTotalUnnotification } from '../../hook/GetTotalUnread';
import { useHandleGetTotalCart } from '../../hook/GetTotalCart';
import ModalSuccess from '../../components/Common/ModalSuccess';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const PaymentPage: React.FC = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
        { label: "Thanh toán" },
    ];
    const userData = getUserData();
    const listOrders = getOrderLocal();
    const totalPrice = listOrders.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0)
    const totalDiscount = getTotalDiscountByCart(listOrders)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const { handleGetTotalUnnotification } = useHandleGetTotalUnnotification();
    const { handleGetTotalCart } = useHandleGetTotalCart();
    const { setLoading } = useLoading();
    useEffect(() => {
        setLoading(false)
    }, [])

    const [formData, setFormData] = useState<Order>({
        order_id: listOrders[0]?.order ? listOrders[0].order : null,
        guest_id: userData.id,
        recipient_phone: userData.phone_number,
        shipping_address: userData.address,
        recipient_name: userData.last_name + " " + userData.first_name,
        payment_method: PaymentMethod.cashOnDelivery,
        shipping_cost: 0,
        gst_amount: 0,
        order_details: listOrders.map((item: any) => ({
            quantity: item.quantity,
            store_id: item.store,
            color: item.color,
            product_id: item.product.id
        }))
    })
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleChangePaymentMethod = (value: string) => {
        setPaymentMethod(value)
        setFormData({ ...formData, payment_method: value })
    }

    const [loadingData, setLoadingData] = useState<any>(false)
    const [errorLocation, setErrorLocation] = useState<string>("")
    const [isModalVisibleNoti, setIsModalVisibleNoti] = useState<any>(false);
    const navigate = useNavigate()
    const handleCreateNewOrder = async () => {
        if (!formData.recipient_name || !formData.shipping_address || !formData.recipient_phone) {
            setErrorLocation("Vui lòng nhập đầy đủ thông tin người nhận");
            return;
        }
        try {
            setLoadingData(true)
            const response = await apiCreateNewOrder(formData) as any
            if (response.status === 201) {
                handleGetTotalCart()
                handleGetTotalUnnotification()
                setIsModalVisibleNoti(true)
                if (formData.payment_method === PaymentMethod.creditCard) {
                    window.location.href = response.payment_url;
                } else {
                    navigate(Routes.HomePage.path)
                    message.success("Đặt hàng thành công")
                }
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingData(false)
        }
    }
    useEffect(() => {
        if (formData.recipient_name && formData.shipping_address && formData.recipient_phone) {
            setErrorLocation("")
        }
    }, [formData])
    // const handleCloseModal = () => {
    //     setIsModalVisible(false); // Đóng modal
    // };
    return (
        <>
            <div className="div-empty"></div>
            {/* {isModalVisibleNoti && <ModalSuccess onClose={handleCloseModal} />} */}
            <AddressModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} formData={formData} setFormData={setFormData} />
            <div className="container mt-4 payment-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {/* <h5 className='title mt-5'>Giỏ hàng của tôi</h5> */}
                <div className=''>
                    <div className='border-top mt-5'></div>
                    <div className='shipping-address'>
                        <div className='title price'><FaLocationDot className='mb-2' /> Địa chỉ nhận hàng</div>
                        <div className='d-flex'>
                            <span className='fw-bold d-flex gap-2'>
                                <span>{formData.recipient_name ? formData.recipient_name : "....."}</span>
                                <span>{formData.recipient_phone ? formData.recipient_phone : "....."}</span>
                            </span>
                            <span className='ms-2'>{formData.shipping_address ? formData.shipping_address : "....."}</span>
                            <span className='ms-3'><Button className="btn-change" onClick={showModal}>THAY ĐỔI</Button></span>
                        </div>
                        {errorLocation && <div className='text-danger'>{errorLocation}</div>}
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
                            {listOrders.map((item: any) => (
                                <ProductItem
                                    key={item.id}
                                    item={item}
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
                                        <span>{formData.payment_method === PaymentMethod.cashOnDelivery ? "Thanh toán khi nhận hàng" : "Thanh toán bằng VN Pay"}</span>
                                        <Button className="btn-change" onClick={() => { setPaymentMethod("") }}>THAY ĐỔI</Button>
                                    </>
                                    :
                                    <>
                                        <Button className='payment-option' onClick={() => { handleChangePaymentMethod(PaymentMethod.creditCard) }}>Thanh toán bằng VN Pay</Button>
                                        <Button className='payment-option' onClick={() => { handleChangePaymentMethod(PaymentMethod.cashOnDelivery) }}>Thanh toán khi nhận hàng</Button>
                                    </>}
                            </div>
                        </div>
                        <div className='d-flex justify-content-end actual-amount p-3'>
                            <div className='d-flex flex-column gap-2'>
                                <div className='d-flex gap-2'>
                                    <div className='label'>Tổng tiền hàng</div>
                                    <div className='value'>{formatPrice(totalPrice)}</div>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className='label'>Khuyễn mãi</div>
                                    {totalDiscount > 0 ?
                                        <div className='value'>{formatPrice(totalDiscount)}</div> :
                                        <div className='value' style={{ color: "gray" }}>Không có</div>}
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className='actual-total'>Tổng thanh toán</div>
                                    <div className='value fw-bold'>{formatPrice(totalPrice - totalDiscount)}</div>
                                </div>
                            </div>
                        </div>
                        <div className='payment-action'>
                            <div>Nhấn đặt hàng đồng nghĩa với việc bạn đồng ý điều khoản tuân theo <a style={{ color: "#0d6efd" }} className='cursor-pointer'>Điều khoản Viva Phone</a></div>
                            <div><Button className='btn-payment' loading={loadingData} onClick={handleCreateNewOrder}>Thanh toán</Button></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default PaymentPage;
