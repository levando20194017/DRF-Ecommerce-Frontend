import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./notification.scss";
import { apiGetNotifications, apiReadNotification } from "../../services/notification";
import { getUserData } from "../../helps/getItemLocal";
import { useDispatch } from "react-redux";
import { setTotalUnNotification } from "../../store/actions";
import { Button, Image } from "antd";
import { formatPrice, formatTime } from "../../utils/format";
import { messageType, orderStatusCustom } from "../../utils/message";
import { NotiShow } from "../../utils/notiType";
import { getImageUrl } from "../../helps/getImageUrl";
import { useNavigate } from "react-router-dom";
import { useHandleGetTotalUnnotification } from "../../hook/GetTotalUnread";
import { truncateString } from "../../helps/truncateString";

const Notification: React.FC<any> = ({ total_unread }) => {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State để quản lý trạng thái hiển thị popup thông báo
    const notificationRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null); // Thêm ref cho icon để xử lý click vào icon
    const [listNotis, setListNotis] = useState([]);
    const { handleGetTotalUnnotification } = useHandleGetTotalUnnotification();
    // Đóng popup khi nhấp ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Kiểm tra xem người dùng có nhấn vào ngoài popup và ngoài icon thông báo không
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node) &&
                iconRef.current &&
                !iconRef.current.contains(event.target as Node)
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

    // Hàm để toggle mở/đóng popup khi click vào icon
    const handleToggleNotification = (e: React.MouseEvent) => {
        e.stopPropagation(); // Ngừng sự kiện bọt (để không bị gây ảnh hưởng bởi các sự kiện khác)
        setIsNotificationOpen(prevState => !prevState); // Đảo trạng thái popup
    };

    const userData = getUserData()
    const dispatch = useDispatch()

    const handleGetListNotifications = async () => {
        try {
            const response = await apiGetNotifications({ pageIndex: 1, pageSize: 1000, id: userData?.id }) as any;
            if (response.status === 200) {
                dispatch(setTotalUnNotification(response.data.unread_count))
                setListNotis(response.data.notifications)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (isNotificationOpen) {
            handleGetListNotifications()
        }
    }, [isNotificationOpen])

    const handleReadNotification = async (id: number) => {
        try {
            const response = await apiReadNotification({ noti_id: id })
            if (response.status === 200) {
                handleGetTotalUnnotification()
            }
        } catch (e) {
            console.log(e);
        }
    }
    const navigate = useNavigate()
    const handleClickViewNoti = (id: number, url: string) => {
        handleReadNotification(id)
        navigate(url)
        setIsNotificationOpen(false)
    }
    return (
        <div style={{ position: "relative" }}>
            <div
                ref={iconRef} // Thêm ref cho icon
                onClick={handleToggleNotification}
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
                {total_unread ?
                    <div className="total_item">{total_unread}</div> : ""
                }
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
                        width: "520px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        overflow: "hidden",
                    }}
                    className="notification-popup"
                >
                    <div style={{ padding: "16px 10px", fontWeight: "bold", fontSize: "16px", borderBottom: "1px solid #ddd" }}>
                        Thông báo
                    </div>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, maxHeight: "400px", overflowY: "auto" }}>
                        {listNotis.map((item: any, index: number) =>
                        (
                            <li
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px 10px 20px 10px",
                                    borderBottom: "1px solid #f0f0f0",
                                }}
                                className={`${item.is_read ? "" : "active"}`}
                            >
                                <div className='d-flex gap-3 justify-content-between w-100' key={index}>
                                    <div>
                                        <Image style={{ height: 100, width: 100, borderRadius: "4px" }} src={item.image ? getImageUrl(item.image) : "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain"} />
                                    </div>
                                    <div className='d-flex flex-column gap-1 w-100' style={{ flex: 1 }}>
                                        <div className='title fw-bold'>
                                            {item.notification_type === "order_update" ?
                                                orderStatusCustom(item)
                                                :
                                                NotiShow[item.notification_type]
                                            }
                                        </div>
                                        {item.notification_type === "review_reply" &&
                                            <div className='content'>{truncateString(item.message, 90)}</div>
                                        }
                                        {item.message.includes("You can rate the product quality.") &&
                                            <div className='content'>{messageType.delivery}</div>
                                        }
                                        {item.message.includes("has been pay successfully") &&
                                            <div className='content'>{messageType.pay_success}</div>
                                        }
                                        {item.message.includes("has been pay failed") &&
                                            <div className='content'>{messageType.pay_failed}</div>
                                        }
                                        {item.message.includes("has been placed successfully.") &&
                                            <div className='content'>{messageType.pending}</div>
                                        }
                                        {item.message.includes("has been confirmed.") &&
                                            <div className='content'>{messageType.confirmed}</div>
                                        }
                                        {item.message.includes("has been canceled.") &&
                                            <div className='content'>{messageType.canceled}</div>
                                        }
                                        {item.message.includes("has been delivered to the carrier.") &&
                                            <div className='content'>{messageType.shipped}</div>
                                        }
                                        {item.total_cost ? <div>
                                            <span className='content'>Tổng tiền: </span>
                                            <span className='price'>{formatPrice(item.total_cost)}</span>
                                        </div> : <></>}
                                        <div className='content' style={{ fontSize: "14px" }}>{formatTime(item.created_at)}</div>
                                    </div>
                                    {item.message.includes("You can rate the product quality.") ?
                                        <div className=''>
                                            <Button className='btn-rate'>Đánh giá sản phẩm</Button>
                                        </div>
                                        :
                                        <div className='' onClick={() => { handleClickViewNoti(item.id, item.url) }}>
                                            <Button className='btn-rate'>Xem chi tiết</Button>
                                        </div>
                                    }
                                </div>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default Notification;
