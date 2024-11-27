import React, { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Product } from '../../types';
import { Checkbox } from 'antd';
import { Routes } from '../Routes';
import Breadcrumb from '../../components/Breadcrumb';
import './cart.scss'

const initialProducts: Product[] = [
    { id: 1, name: 'Quần Túi Hộp', price: 146000000, quantity: 2, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'Đen, XL', shop: 'HipHop69' },
    { id: 2, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 3, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 4, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 5, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 6, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 7, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
    { id: 8, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain', variant: 'M, Đen', shop: 'Tuấn Shop' },
];

const Cart: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Giỏ hàng", path: Routes.Cart.path },
    ];

    const handleQuantityChange = (id: number, quantity: number) => {
        setProducts((prev) =>
            prev.map((product) =>
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
        setSelectedIds(selected ? products.map((product) => product.id) : []);
    };

    const total = products
        .filter((product) => selectedIds.includes(product.id))
        .reduce((sum, product) => sum + product.price * product.quantity, 0);

    const handleCheckout = () => {
        console.log('Checked out items:', selectedIds);
    };

    return (
        <>
            <div className="div-empty"></div>
            <div className="container mt-4 cart-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                {/* <h5 className='title mt-5'>Giỏ hàng của tôi</h5> */}
                <div className="d-flex py-3 mt-5 fw-bold cart-page_header">
                    <div className='col-5 d-flex'>
                        <div className="col-1 text-center">
                            <Checkbox
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                checked={selectedIds.length === products.length}
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
                    {products.map((product) => (
                        <CartItem
                            key={product.id}
                            product={product}
                            selected={selectedIds.includes(product.id)}
                            onQuantityChange={handleQuantityChange}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                {/* Summary */}
                <CartSummary total={total} onCheckout={handleCheckout} selectedIds = {selectedIds} handleSelectAll = {handleSelectAll} products = {products}/>
            </div>
        </>
    );
};

export default Cart;
