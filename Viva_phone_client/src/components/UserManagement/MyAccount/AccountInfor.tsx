import React, { useState } from 'react';
import './account.scss';
import UploadAvatar from './UploadAvatar';
import { Button, Input, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const dateFormat = 'YYYY/MM/DD';

const AccountInfor: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "levando20194017@gamil.com",
        first_name: "Do",
        last_name: "Lê Văn",
        phone_number: "098565773",
        gender: 0,
        address: "46 ngõ 61 Định Công, Hoàng Mai, Hà Nội",
        date_of_birth: "",
        image: ""
    })

    const onChangeGender = (e: RadioChangeEvent) => {
        setFormData({ ...formData, gender: e.target.value })
    }
    const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: e.target.value })
    }

    const handleOnChange = (value: dayjs.Dayjs | null) => {
        setFormData({ ...formData, date_of_birth: value ? value.format('YYYY-MM-DD') : "" });
    };

    return (
        <div className="account-infor">
            <div className='account-infor_header'>
                <h5>Hồ sơ của tôi</h5>
                <div className='text-more'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className='account-infor_body'>
                <div className='form-infor col-xl-7'>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Email</div>
                        <div className='value'>
                            <Input className='w-100'
                                value={formData.email}
                                type='text'
                                disabled
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Họ</div>
                        <div className='value'>
                            <Input
                                value={formData.last_name}
                                type='text'
                                onChange={(e) => handleChangeInputData(e, "last_name")}
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Tên</div>
                        <div className='value'>
                            <Input
                                value={formData.first_name}
                                type='text'
                                onChange={(e) => handleChangeInputData(e, "first_name")}
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Số điện thoại</div>
                        <div className='value'>
                            <Input className='w-100'
                                value={formData.phone_number}
                                type='text'
                                onChange={(e) => handleChangeInputData(e, "phone_number")}
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Giới tính</div>
                        <div className='value'>
                            <Radio.Group onChange={onChangeGender} value={formData.gender}>
                                <Radio value={0}>Nam</Radio>
                                <Radio value={1}>Nữ</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Ngày sinh</div>
                        <div className='value'>
                            <DatePicker
                                onChange={handleOnChange}
                                value={formData.date_of_birth ? dayjs(formData.date_of_birth, dateFormat) : undefined}
                                format={dateFormat}
                            />
                        </div>
                    </div>
                    <div className='d-flex gap-4 align-items-center'>
                        <div className='label'>Địa chỉ</div>
                        <div className='value'>
                            <Input className='w-100'
                                value={formData.address}
                                type='text'
                                onChange={(e) => handleChangeInputData(e, "address")}
                            />
                        </div>
                    </div>
                    <div className='text-center mt-4'><Button className='btn-save'>Lưu</Button></div>
                </div>
                <div className='col-xl-5'>
                    <UploadAvatar formData={formData} />
                </div>
            </div>
        </div>
    );
};

export default AccountInfor;
