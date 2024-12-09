import React from 'react';
import { Modal, Form, Button } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
// const { Option } = Select;

// interface ModalProps {
//     formData: Order
//     isModalVisible: boolean;
//     setIsModalVisible: (visible: boolean) => void; // Nhận tham số là boolean
//     setFormData: (formData: Order) => void
// }

const ModalProductDetail: React.FC<any> = ({ isModalVisible, setIsModalVisible, productDetail }) => {

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showData = (data: string) => {
        return data ? data : "---"
    }

    return (
        <Modal
            title="Thông số kĩ thuật"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Trở Lại
                </Button>
            ]}
        >
            <Scrollbars style={{ height: 650 }}>
                <div className="modal-body">
                    <div className="container">
                        {/* Màn hình */}
                        <section className="mb-4">
                            <h6 className="section-title">Màn hình</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Độ phân giải:</td>
                                        <td>{showData(productDetail?.resolution)}</td>
                                    </tr>
                                    <tr>
                                        <td>Kích thước màn hình:</td>
                                        <td>{showData(productDetail?.screen_size)}</td>
                                    </tr>
                                    <tr>
                                        <td>Tần số quét (Hz):</td>
                                        <td>{showData(productDetail?.screen_features)}</td>
                                    </tr>
                                    <tr>
                                        <td>Công nghệ màn hình:</td>
                                        <td>{showData(productDetail?.screen_technology)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Camera sau */}
                        <section className="mb-4">
                            <h6 className="section-title">Camera sau</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Camera chính:</td>
                                        <td>{showData(productDetail?.main_camera)}</td>
                                    </tr>
                                    <tr>
                                        <td>Tính năng camera:</td>
                                        <td>{showData(productDetail?.camera_features)}</td>
                                    </tr>
                                    <tr>
                                        <td>Quay phim:</td>
                                        <td>
                                            {showData(productDetail?.video_recording)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Camera trước */}
                        <section className="mb-4">
                            <h6 className="section-title">Camera trước</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Độ phân giải camera:</td>
                                        <td>16MP f/2.4</td>
                                    </tr>
                                    <tr>
                                        <td>Quay phim:</td>
                                        <td>
                                            {showData(productDetail?.front_camera)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        {/* Hệ điều hành & CPU */}
                        <section className="mb-4">
                            <h6 className="section-title">Vi xử lý & đồ họa</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Chipset:</td>
                                        <td>{showData(productDetail?.chipset)}</td>
                                    </tr>
                                    <tr>
                                        <td>GPU:</td>
                                        <td>{showData(productDetail?.gpu)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">RAM & lưu trữ</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Dung lượng bộ nhớ:</td>
                                        <td>{showData(productDetail?.storage_capacity)}</td>
                                    </tr>
                                    <tr>
                                        <td>Kích thước:</td>
                                        <td>{showData(productDetail?.dimensions)}</td>
                                    </tr>
                                    <tr>
                                        <td>Trọng lượng:</td>
                                        <td>{showData(productDetail?.weight)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">Giao tiếp & kết nối</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Hỗ trợ mạng:</td>
                                        <td>{showData(productDetail?.network_support)}</td>
                                    </tr>
                                    <tr>
                                        <td>wifi:</td>
                                        <td>{showData(productDetail?.wifi)}</td>
                                    </tr>
                                    <tr>
                                        <td>bluetooth:</td>
                                        <td>{showData(productDetail?.bluetooth)}</td>
                                    </tr>
                                    <tr>
                                        <td>Thông tin khác:</td>
                                        <td>{showData(productDetail?.other_info)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="mb-4">
                            <h6 className="section-title">Công nghệ & tiện ích</h6>
                            <table className="custom-table">
                                <tbody>
                                    <tr>
                                        <td>Hệ điều hành:</td>
                                        <td>{showData(productDetail?.version)}</td>
                                    </tr>
                                    <tr>
                                        <td>Tính năng bảo mật:</td>
                                        <td>{showData(productDetail?.security_features)}</td>
                                    </tr>
                                    <tr>
                                        <td>Pin & công nghệ sạc:</td>
                                        <td>{showData(productDetail?.charging)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </Scrollbars>
        </Modal>
    );
};

export default ModalProductDetail;
