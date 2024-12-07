import React, { useState } from 'react';
import './account.scss';
import UploadAvatar from './UploadAvatar';
import { Button, Input, message, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { getUserData } from '../../../helps/getItemLocal';
import { apiChangeAvatar, apiChangeUserInfor } from '../../../services/userService';
import { setUserDataLocal } from '../../../helps/setLocalStorage';
import { TypeLocal } from '../../../helps/typeItem';
import { useDispatch } from 'react-redux';
import { changeInformation } from '../../../store/actions';
const dateFormat = 'YYYY/MM/DD';

const AccountInfor: React.FC = () => {
    const userData = getUserData()
    const [formData, setFormData] = useState({
        email: userData?.email,
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        phone_number: userData?.phone_number,
        gender: 0,
        address: userData?.address,
        date_of_birth: userData?.date_of_birth,
        avatar: userData?.avatar
    })

    const [errors, setErrors] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        address: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors: typeof errors = {
            first_name: '',
            last_name: '',
            phone_number: '',
            address: '',
        };

        if (!formData.first_name) {
            newErrors.first_name = 'Họ không được để trống';
            isValid = false;
        }
        if (!formData.last_name) {
            newErrors.last_name = 'Tên không được để trống';
            isValid = false;
        }
        if (!formData.phone_number || !/^[0-9]{10,11}$/.test(formData.phone_number)) {
            newErrors.phone_number = 'Số điện thoại không hợp lệ';
            isValid = false;
        }
        if (!formData.address) {
            newErrors.address = 'Địa chỉ không được để trống';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const onChangeGender = (e: RadioChangeEvent) => {
        setFormData({ ...formData, gender: e.target.value })
    }
    const handleChangeInputData = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: e.target.value })
        setErrors({ ...errors, [fieldName]: "" })
    }

    const handleOnChange = (value: dayjs.Dayjs | null) => {
        setFormData({ ...formData, date_of_birth: value ? value.format('YYYY-MM-DD') : "" });
    };

    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const handleChangeInformation = async () => {
        if (!validateForm()) return;

        if (userData?.id) {
            try {
                setLoading(true)
                const res = await apiChangeUserInfor({
                    user_id: userData.id,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone_number: formData.phone_number,
                    gender: formData.gender,
                    address: formData.address,
                    date_of_birth: formData.date_of_birth,
                })
                if (res.status === 200) {
                    const newUserData = JSON.parse(localStorage.getItem(TypeLocal.USER_DATA) || "")
                    newUserData.user_infor = res.data;
                    setUserDataLocal(newUserData)
                    dispatch(changeInformation(newUserData))
                    message.success("Thay đổi thông tin thành công!")
                } else {
                    message.error("Vui lòng kiểm tra lại thông tin!")
                }
            } catch (e) {
                console.log(e);
                message.error("Vui lòng kiểm tra lại thông tin!")
            } finally {
                setLoading(false)
            }
        }
    }

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
                            {errors.last_name && <div className="error-text">{errors.last_name}</div>}
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
                            {errors.first_name && <div className="error-text">{errors.first_name}</div>}
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
                            {errors.phone_number && <div className="error-text">{errors.phone_number}</div>}
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
                            {errors.address && <div className="error-text">{errors.address}</div>}
                        </div>
                    </div>
                    <div className='text-center mt-4'><Button className='btn-save' onClick={handleChangeInformation} loading={loading}>Lưu</Button></div>
                </div>
                <div className='col-xl-5'>
                    <UploadAvatar formData={formData} setFormData={setFormData} />
                </div>
            </div>
        </div>
    );
};

export default AccountInfor;
