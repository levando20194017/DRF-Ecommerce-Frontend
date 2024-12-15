import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Checkbox } from 'antd';
import { Routes } from '../Routes';
import Breadcrumb from '../../components/Breadcrumb';
import './cart.scss'
import { apiGetCart, apiRemoveCartItem } from '../../services/cart';
import { ToastFailed } from '../../components/Common/Toast';
import { toastWrong } from '../../utils/ToastType';
import { setOrderLocal } from '../../helps/setLocalStorage';
import { getUserData } from '../../helps/getItemLocal';
import { useNavigate } from 'react-router-dom';
import EmptyOrder from '../../components/UserManagement/Order/EmptyOrder';
import { useLoading } from '../../context/LoadingContext';

const Cart: React.FC = () => {
    const { setLoading } = useLoading()
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [cart, setCart] = useState<any>([])
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
    ];
    const userData = getUserData()
    const navigate = useNavigate();

    const handleQuantityChange = (id: number, quantity: number) => {
        setCart((prev: any) =>
            prev.map((product: any) =>
                product.id === id ? { ...product, quantity } : product
            )
        );
    };

    const handleSelect = (id: number, selected: boolean) => {
        setSelectedIds((prev) =>
            selected ? [...prev, id] : prev.filter((itemId) => itemId !== id)
        );
    };

    const handleSelectAll = (selected: boolean) => {
        setSelectedIds(selected ? cart.map((cartItem: any) => cartItem.id) : []);
    };

    const total = cart
        .filter((cartItem: any) => selectedIds.includes(cartItem.id))
        .reduce((sum: number, cartItem: any) => sum + cartItem.product.price * cartItem.quantity, 0);

    const handleCheckout = () => {
        setLoading(true)
        const order = cart.filter((item: any) => {
            if (selectedIds.includes(item.id)) return item
        })
        setOrderLocal(order)
        if (order.length > 0) {
            navigate(Routes.Payment.path)
        }
    };

    const handleGetCart = async () => {
        if (userData?.id) {
            try {
                setLoading(true)
                const response = await apiGetCart(userData?.id)
                if (response.status === 200) {
                    setCart(response.data.items)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        } else {
            ToastFailed(toastWrong)
        }
    }

    useEffect(() => {
        handleGetCart()
    }, [])

    const handleRemoveCartItem = async (cartId: number) => {
        try {
            const response = await apiRemoveCartItem({
                id: userData?.id,
                cart_item_id: cartId
            })
            if (response.status === 204) {
                handleGetCart()
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            <div className="div-empty"></div>
            <div className="container mt-4 cart-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {/* <h5 className='title mt-5'>Giỏ hàng của tôi</h5> */}
                {cart.length > 0 ?
                    <>
                        <div className='border-top mt-5'></div>
                        <div className="d-flex py-4 fw-bold cart-page_header">
                            <div className='col-5 d-flex'>
                                <div className="col-1 text-center">
                                    <Checkbox
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        checked={selectedIds.length === cart.length}
                                    />
                                </div>
                                <div className="col-11">Sản Phẩm</div>
                            </div>
                            <div className='col-7 d-flex'>
                                <div className="col-4 text-center">Đơn Giá</div>
                                <div className="col-3 text-center">Số Lượng</div>
                                <div className="col-3 text-center">Số Tiền</div>
                                <div className="col-2 text-center">Thao Tác</div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className='mt-1'>
                            {cart.map((cartItem: any) => (
                                <CartItem
                                    key={cartItem.id}
                                    cartItem={cartItem}
                                    selected={selectedIds.includes(cartItem.id)}
                                    onQuantityChange={handleQuantityChange}
                                    onSelect={handleSelect}
                                    handleRemoveCartItem={handleRemoveCartItem}
                                />
                            ))}
                        </div>

                        {/* Summary */}
                        <CartSummary total={total}
                            onCheckout={handleCheckout}
                            selectedIds={selectedIds}
                            handleSelectAll={handleSelectAll}
                            cart={cart} />
                    </>
                    :
                    <EmptyOrder />
                }
            </div>
        </>
    );
};

export default Cart;
