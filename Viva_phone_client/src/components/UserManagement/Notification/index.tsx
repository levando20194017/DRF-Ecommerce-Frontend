import React, { useEffect, useState } from 'react';
import './notification.scss';
import { Button, Image } from 'antd';
import EmptyNoti from './EmptyNotification';
import { apiGetNotifications, apiReadNotification } from '../../../services/notification';
import { getUserData } from '../../../helps/getItemLocal';
import { getImageUrl } from '../../../helps/getImageUrl';
import { formatPrice, formatTime } from '../../../utils/format';
import { NotiShow } from '../../../utils/notiType';
import { messageType } from '../../../utils/message';
import { useNavigate } from 'react-router-dom';

const Notification: React.FC = () => {
    const userData = getUserData()
    const [listNoti, setListNoti] = useState<any[]>([])

    const handleGetListNotification = async () => {
        try {
            const response = await apiGetNotifications({
                pageIndex: 1, pageSize: 1000, id: userData?.id
            })
            if (response.status === 200) {
                setListNoti(response.data.notifications)
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        handleGetListNotification()
    }, [])
    const handleReadNotification = async (id: number) => {
        try {
            const response = await apiReadNotification({ noti_id: id })
        } catch (e) {
            console.log(e);
        }
    }
    const navigate = useNavigate()
    const handleClickViewNoti = (id: number, url: string) => {
        handleReadNotification(id)
        navigate(url)
    }
    return (
        listNoti.length > 0 ?
            <div className="notification-page">
                <div className='account-infor_header'>
                    <h5>Thông báo</h5>
                    <div className='text-more'>Xem lại các hoạt động gần đây của bạn</div>
                </div>
                {listNoti.map((item, index) => (
                    <div className='d-flex gap-3 justify-content-between' key={index}>
                        <div>
                            <Image src={item.image ? getImageUrl(item.image) : "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain"} />
                        </div>
                        <div className='d-flex flex-column gap-1' style={{ flex: 1 }}>
                            <div className='title'>{NotiShow[item.notification_type]}</div>
                            {item.message.includes("You can rate the product quality.") &&
                                <div className='content'>{messageType.delivery}</div>
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
                            <div className=''>
                                <Button className='btn-rate' onClick={() => { handleClickViewNoti(item.id, item.url) }}>Xem chi tiết</Button>
                            </div>
                        }
                    </div>
                ))}
            </div>
            :
            <EmptyNoti />
    );
};

export default Notification;
