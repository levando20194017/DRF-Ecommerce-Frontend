import React, { useEffect, useRef, useState } from 'react';
import './account.scss';
import { Button, Image, message } from 'antd';
import NoImage from "../../../assets/images/no_avatar.jpg"
import { ToastFailed } from '../../Common/Toast';
import { getImageUrl } from '../../../helps/getImageUrl';
import { apiChangeAvatar } from '../../../services/userService';
import { setUserDataLocal } from '../../../helps/setLocalStorage';
import { TypeLocal } from '../../../helps/typeItem';
import { getUserData } from '../../../helps/getItemLocal';
import { useDispatch } from 'react-redux';
import { changeInformation } from '../../../store/actions';
interface UploadAvatarProps {
    formData: {
        email: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        gender: number;
        address: string;
        date_of_birth: string;
        avatar: string;
    };
    setFormData: (data: any) => void;
}

interface Avatar {
    name: string;
    url: string;
    file: File | null;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ formData, setFormData }) => {
    const [errorCount, setErrorCount] = useState(0);
    const [avatar, setAvatar] = React.useState<Avatar>({
        name: "",
        url: "",
        file: null,
    });
    const [errors, setErrors] = useState({
        image: ""
    })
    const inputRef = useRef<HTMLInputElement>(null);
    const userData = getUserData()
    const dispatch = useDispatch()

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Dấu ? để xử lý trường hợp files có thể là undefined.
        if (file) {
            const maxSize = 3 * 1024 * 1024; // 3MB
            if (file.size > maxSize) {
                // Kích thước vượt quá giới hạn
                ToastFailed("Please upload photos smaller than 3MB.");
                setErrorCount((prevCount) => prevCount + 1);
                return;
            }
            if (
                !(
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg" ||
                    file.type === "image/png" ||
                    file.type === "image/gif"
                )
            ) {
                ToastFailed("Please select PNG, GIF or JPG file.");
                setErrorCount((prevCount) => prevCount + 1);
                return;
            }

            setAvatar({
                name: file.name,
                url: URL.createObjectURL(file),
                file: file,
            });
            setErrorCount((prevCount) => prevCount + 1);
        }
    };

    const handleChangeAvatar = async () => {
        if (!userData?.id) {
            message.error("Lỗi, yêu cầm đăng nhập lại!")
            return;
        }
        if (!avatar.file) {
            message.error("Vui lòng kiểm tra lại!");
            return;
        }
        const newFormData = new FormData();
        newFormData.append("user_id", userData.id)
        newFormData.append("file", avatar.file);
        try {
            const response = await apiChangeAvatar(newFormData) as any;
            if (response.status === 200) {
                const newUserData = JSON.parse(localStorage.getItem(TypeLocal.USER_DATA) || "")
                newUserData.user_infor.avatar = response.img_url;
                setUserDataLocal(newUserData)
                message.success("Thay đổi avart thành công!")
                setFormData({ ...formData, avatar: response.img_url })
                dispatch(changeInformation(newUserData))
            } else {
                message.error("Vui lòng kiểm tra lại!")
            }
        } catch (e) {
            console.error("Error updating avatar:", e);
            message.error("Vui lòng kiểm tra lại!")
        }
    };

    useEffect(() => {
        if (avatar?.file) {
            handleChangeAvatar()
        }
    }, [avatar])
    return (
        <div className="upload-avatar">
            <div className="avatar-profile">
                {formData.avatar ? (
                    <Image
                        src={(formData.avatar)}
                    />
                ) : (
                    <Image src={formData.avatar ? "" : NoImage} />
                )}
            </div>
            {errors.image && <div className="text-danger">{errors.image}</div>}
            <div className="mt-4">
                <div className="d-flex flex-column w-100">
                    <input
                        type="file"
                        key={errorCount}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        ref={inputRef}
                    />
                    <div className="d-flex flex-column">
                        <div className='text-center'>
                            <Button className="fw-normal mb-3 fw-bold" onClick={() => inputRef.current?.click()}>
                                Chọn ảnh
                            </Button>
                        </div>
                        <div className="text-gray small">
                            <div className='text-center'>Dung lượng chỉ được tối đa 3Mb.</div>
                            <div className='text-center'>JPG, GIF or PNG.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadAvatar;
