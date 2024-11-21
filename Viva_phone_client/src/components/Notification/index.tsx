import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./notification.scss";

const Notification: React.FC = () => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State để quản lý trạng thái hiển thị popup thông báo
    const notificationRef = useRef<HTMLDivElement>(null);

    // Đóng popup khi nhấp ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setIsNotificationOpen(false);
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

    return (
        <div style={{ position: "relative" }}>
            {/* Nút bật/tắt thông báo */}
            <div
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                style={{
                    backgroundColor: `${isNotificationOpen ? "#FF6600" : "transparent"}`,
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
                <i className="bi bi-bell-fill icon-noti" style={{ fontSize: "24px" }}></i>
            </div>

            {isNotificationOpen && (
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
                        width: "320px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        overflow: "hidden",
                    }}
                >
                    <div style={{ padding: "10px", fontWeight: "bold", fontSize: "16px", borderBottom: "1px solid #ddd" }}>
                        Thông báo
                    </div>
                    <ul style={{ listStyle: "none", padding: "10px", margin: 0, maxHeight: "300px", overflowY: "auto" }}>
                        {/* Thông báo 1 */}
                        <li
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "15px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <img
                                src="https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain"
                                alt="product"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Đơn hàng đã xác nhận</div>
                                <div style={{ fontSize: "12px", color: "#666" }}>Sản phẩm: Tên sản phẩm ABC</div>
                            </div>
                        </li>
                        {/* Thông báo 2 */}
                        <li
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "15px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <img
                                src="https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain"
                                alt="delivery"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "5px",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>Đơn hàng đang giao</div>
                                <div style={{ fontSize: "12px", color: "#666" }}>Dự kiến giao: 22/11/2024</div>
                            </div>
                        </li>
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Notification;
