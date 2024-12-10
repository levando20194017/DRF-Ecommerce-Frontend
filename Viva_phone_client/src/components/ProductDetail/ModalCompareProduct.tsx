import React from 'react';
import { productData } from './ProductData';
import './CompareProducts.css';
import { Button, Modal } from 'antd';
import Scrollbars from 'react-custom-scrollbars';

// interface CompareModalProps {
//     selectedProducts: number[];
// }

export const CompareModal: React.FC<any> = ({ productsToCompare, isModalVisible, setIsModalVisible }) => {
    // const productsToCompare = productData.filter((product) => selectedProducts.includes(product.id));
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showData = (data: string) => {
        return data ? data : "---"
    }

    return (
        <Modal
            visible={isModalVisible}
            onCancel={handleCancel}
            maskClosable={false}
            footer={null}
            className='modal-compare-product'>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="compareModalLabel">So sánh sản phẩm</h5>
                </div>
                <Scrollbars style={{ height: 650 }}>
                    <div className="modal-body">
                        <section className="mt-4 mb-4">
                            <h6 className="section-title">Màn hình</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Độ phân giải:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{product.resolution}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Kích thước màn hình:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.screen_size)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Tần số quét (Hz):</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.screen_features)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Công nghệ màn hình:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.screen_technology)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Camera sau */}
                        <section className="mb-4">
                            <h6 className="section-title">Camera sau</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Camera chính:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.main_camera)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Tính năng camera:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.camera_features)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Quay phim:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.video_recording)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Camera trước */}
                        <section className="mb-4">
                            <h6 className="section-title">Camera trước</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Quay phim:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.front_camera)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Hệ điều hành & CPU */}
                        <section className="mb-4">
                            <h6 className="section-title">Vi xử lý & đồ họa</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Chipset:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.chipset)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>GPU:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.gpu)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">RAM & lưu trữ</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Dung lượng bộ nhớ:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.storage_capacity)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Kích thước:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.dimensions)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Trọng lượng:</td>
                                        {productsToCompare?.map((product: any) => (
                                            <td key={product.id}>{showData(product?.weight)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">Giao tiếp & kết nối</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hỗ trợ mạng:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.network_support)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>wifi:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.wifi)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>bluetooth:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.bluetooth)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Thông tin khác:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.other_info)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">Công nghệ & tiện ích</h6>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Thông số</th>
                                        {productsToCompare?.map((product: any) => (
                                            <th key={product.id}>{product.name}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Hệ điều hành:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.version)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Tính năng bảo mật:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.security_features)}</td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td>Pin & công nghệ sạc:</td>
                                        {productsToCompare.map((product: any) => (
                                            <td key={product.id}>{showData(product?.charging)}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </Scrollbars>
                <div className="modal-footer">
                    <Button type="primary" onClick={handleCancel}>
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal >
    );
};
