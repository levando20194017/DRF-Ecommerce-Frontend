import React, { useState } from 'react';
import { productData } from './ProductData'; // Import danh sách sản phẩm
import './CompareProducts.css';
import { CompareModal } from './ModalCompareProduct';

export const CompareProducts = () => {
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter((productId) => productId !== id));
        } else if (selectedProducts.length < 3) {
            setSelectedProducts([...selectedProducts, id]);
        } else {
            alert('Bạn chỉ có thể so sánh tối đa 3 sản phẩm.');
        }
    };

    const clearSelection = () => setSelectedProducts([]);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Danh sách sản phẩm</h3>
            <div className="row">
                {productData.map((product) => (
                    <div key={product.id} className="col-md-4 mb-3">
                        <div className="card p-3">
                            <h5>{product.name}</h5>
                            <button
                                className={`btn ${selectedProducts.includes(product.id) ? 'btn-danger' : 'btn-primary'} mt-3`}
                                onClick={() => handleSelect(product.id)}
                            >
                                {selectedProducts.includes(product.id) ? 'Bỏ chọn' : 'Chọn để so sánh'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedProducts.length > 0 && (
                <div className="mt-4">
                    <button className="btn btn-warning me-3" onClick={clearSelection}>
                        Xóa lựa chọn
                    </button>
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#compareModal">
                        So sánh ({selectedProducts.length})
                    </button>
                </div>
            )}

            {/* Modal so sánh sản phẩm */}
            <CompareModal selectedProducts={selectedProducts} />
        </div>
    );
};
