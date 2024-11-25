import React, { useEffect, useRef, useState } from 'react';
import './account.scss';
import { Button, Image } from 'antd';
import NoImage from "../../../assets/images/no_avatar.jpg"
import { ToastFailed } from '../../Common/Toast';
interface UploadAvatarProps {
    formData: {
        email: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        gender: number;
        address: string;
        date_of_birth: string;
        image: string;
    };
}

interface Avatar {
    name: string;
    url: string;
    file: File;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ formData }) => {
    const [errorCount, setErrorCount] = useState(0);
    const [avatar, setAvatar] = React.useState<Avatar | null>(null);
    const [errors, setErrors] = useState({
        image: ""
    })
    const inputRef = useRef<HTMLInputElement>(null);

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
        const newFormData = new FormData();
        // newFormData.append("file", avatar.file)
        try {
            // const response = await apiChangeAvatar()
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleChangeAvatar()
    }, [avatar])
    return (
        <div className="upload-avatar">
            <div className="avatar-profile">
                {formData.image ? (
                    <Image
                        src={`${process.env.REACT_APP_IMAGE_URL}${formData.image}`}
                    />
                ) : (
                    <Image src={formData.image ? "" : NoImage} />
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
