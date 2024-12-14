import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { getUserData } from "../../../helps/getItemLocal";
import { getImageUrl } from "../../../helps/getImageUrl";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../../../screens/Routes";
import { removeData } from "../../../helps/setLocalStorage";
import { useDispatch } from "react-redux";
import { changeInformation } from "../../../store/actions";

const Profile: React.FC<any> = () => {
    const [isShowPopup, setIsShowPopup] = useState(false); // State để quản lý trạng thái hiển thị popup thông báo
    const notificationRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null); // Thêm ref cho icon để xử lý click vào icon
    const userData = getUserData()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Kiểm tra xem người dùng có nhấn vào ngoài popup và ngoài icon thông báo không
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                iconRef.current &&
                !iconRef.current.contains(event.target as Node)
            ) {
                setIsShowPopup(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Hiệu ứng của popup thông báo
    const variants = {
        hidden: { opacity: 0, y: -20, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    // Hàm để toggle mở/đóng popup khi click vào icon
    const handleToggleNotification = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện bọt (để không bị gây ảnh hưởng bởi các sự kiện khác)
        setIsShowPopup(prevState => !prevState); // Đảo trạng thái popup
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        removeData()
        navigate(Routes.Login.path)
        dispatch(changeInformation({}))
        setIsShowPopup(false)
    };

    const handleClickItem = (url: string) => {
        navigate(url)
        setIsShowPopup(false)
    }
    return (
        <div style={{ position: "relative" }}>
            <div
                ref={iconRef} // Thêm ref cho icon
                onClick={handleToggleNotification}
                style={{
                    border: "none",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                <img
                    className="headerUser-right-avt rounded-circle"
                    src={getImageUrl(userData.avatar)}
                    alt="user avatar"
                    width={40}
                    height={40}
                />
            </div>

            {isShowPopup && (
                <motion.div
                    ref={notificationRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={variants}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: "60px",
                        right: "0",
                        width: "150px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        overflow: "hidden",
                    }}
                    className="profile-popup"
                >
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: "400px", overflowY: "auto" }}>
                        <li className="profile-item" onClick={() => handleClickItem(Routes.UserInfor.path)}>
                            Trang cá nhân
                        </li>
                        <li className="profile-item" onClick={() => handleClickItem(Routes.AllOrder.path)}>Đơn hàng</li>
                        <li className="profile-item">Đổi mật khẩu</li>
                        <li className="profile-item" onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Profile;
