import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Radio } from 'antd';
const { Option } = Select;

interface ModalProps {
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void; // Nhận tham số là boolean
}

const AddressModal: React.FC<ModalProps> = ({ isModalVisible, setIsModalVisible }) => {
    const [form] = Form.useForm();

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                const formData = {
                    fullName: values.fullName,
                    phoneNumber: values.phoneNumber,
                    location: values.location,
                    detailAddress: values.detailAddress,
                    addressType: values.addressType,
                };
                console.log('Form Data:', formData);
                // Call API with formData here
                setIsModalVisible(false);
            })
            .catch((info) => {
                console.error('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title="Địa chỉ mới"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Trở Lại
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Hoàn thành
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                        { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ' },
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    label="Địa chỉ cụ thể"
                    name="detailAddress"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}
                >
                    <Input placeholder="Nhập địa chỉ cụ thể" />
                </Form.Item>

                <Form.Item
                    label="Loại địa chỉ"
                    name="addressType"
                    rules={[{ required: true, message: 'Vui lòng chọn loại địa chỉ' }]}
                >
                    <Radio.Group style={{ color: "black" }}>
                        <Radio value="home">Nhà Riêng</Radio>
                        <Radio value="office">Văn Phòng</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddressModal;
