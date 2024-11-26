import React, { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Product } from '../../types';
import { Checkbox } from 'antd';
import { Routes } from '../Routes';
import Breadcrumb from '../../components/Breadcrumb';

const initialProducts: Product[] = [
    { id: 1, name: 'Quần Túi Hộp', price: 146000, quantity: 2, imageUrl: 'https://via.placeholder.com/80', variant: 'Đen, XL', shop: 'HipHop69' },
    { id: 2, name: 'Áo Khoác Blazer', price: 342000, quantity: 1, imageUrl: 'https://via.placeholder.com/80', variant: 'M, Đen', shop: 'Tuấn Shop' },
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
            <div className="container mt-4">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs={breadcrumbs} />
                </div>
                <div className="d-flex py-2 fw-bold">
                    <div className="col-1 text-center">
                        <Checkbox
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            checked={selectedIds.length === products.length}
                        />
                    </div>
                    <div className="col-5">Sản Phẩm</div>
                    <div className="col-2 text-center">Đơn Giá</div>
                    <div className="col-2 text-center">Số Lượng</div>
                    <div className="col-2 text-center">Số Tiền</div>
                    <div className="col-2 text-center">Thao Tác</div>
                </div>

                {/* Items */}
                {products.map((product) => (
                    <CartItem
                        key={product.id}
                        product={product}
                        selected={selectedIds.includes(product.id)}
                        onQuantityChange={handleQuantityChange}
                        onSelect={handleSelect}
                    />
                ))}

                {/* Summary */}
                <CartSummary total={total} onCheckout={handleCheckout} />
            </div>
        </>
    );
};

export default Cart;
