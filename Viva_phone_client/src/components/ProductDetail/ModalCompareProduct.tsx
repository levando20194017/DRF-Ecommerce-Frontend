import React from 'react';
import { productData } from './ProductData';
import './CompareProducts.css';

interface CompareModalProps {
    selectedProducts: number[];
}

export const CompareModal: React.FC<CompareModalProps> = ({ selectedProducts }) => {
    const productsToCompare = productData.filter((product) => selectedProducts.includes(product.id));

    return (
        <div
            className="modal fade"
            id="compareModal"
            tabIndex={-1}
            aria-labelledby="compareModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="compareModalLabel">So sánh sản phẩm</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Thông số</th>
                                    {productsToCompare.map((product) => (
                                        <th key={product.id}>{product.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Độ phân giải</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.resolution}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Kích thước màn hình</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.screenSize}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Tần số quét</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.refreshRate}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Công nghệ màn hình</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.displayTechnology}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Độ sáng</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.brightness}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Camera sau</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.rearCamera}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Camera trước</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.frontCamera}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>Hệ điều hành</td>
                                    {productsToCompare.map((product) => (
                                        <td key={product.id}>{product.specs.os}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
