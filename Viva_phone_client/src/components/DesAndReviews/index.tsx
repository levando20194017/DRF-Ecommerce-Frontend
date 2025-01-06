import "./style.scss";
import { FC, useEffect, useRef, useState } from "react";
import logo4 from "../../assets/images/logo4.png";
import { getImageUrl } from "../../helps/getImageUrl";
import { Button, Image, message, Rate } from "antd";
import { formatTime } from "../../utils/format";
import { getUserData } from "../../helps/getItemLocal";
import { apiAdminReplyReview, apiDeleteReview } from "../../services/review";
import ModalEditReview from "../Reviews/ModalEditReview";
import TextArea from "antd/es/input/TextArea";
import NoImage from "../../assets/images/no_avatar.jpg"

export const DesAndReviews: FC<any> = ({ productDetail, dataReviews, handleGetListReviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const userData = getUserData();
  const [selectedReview, setSelectedReview] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = productDetail?.description; // Gán HTML vào phần tử thông qua innerHTML
    }
  }, [productDetail, activeIndex]);

  const handleDeleteReview = async (id: number) => {
    try {
      const response = await apiDeleteReview(id)
      if (response.status === 200) {
        handleGetListReviews()
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleClickEditReview = (review: any) => {
    setSelectedReview(review)
    setModalVisible(true)
  }

  const onCloseModal = () => {
    setModalVisible(false)
  }

  const [showTextArea, setShowTextArea] = useState(false);
  const [replyId, setReplyId] = useState(0);
  const [formReply, setFormReply] = useState({
    admin_id: userData?.id,
    review_id: 0,
    comment: ""
  })
  const handleShowTextArea = (id: number) => {
    setReplyId(id)
    setShowTextArea(true)
    setFormReply({ ...formReply, review_id: id })
  }

  const handleOnchangeComment = (e: any) => {
    setFormReply({ ...formReply, comment: e.target.value })
  }

  const handleReplyReview = async () => {
    if (!formReply.comment || !formReply.admin_id || !formReply.review_id) {
      return
    }
    try {
      const response = await apiAdminReplyReview(formReply)
      if (response.status === 201) {
        message.success("Đã gửi phản hồi")
        handleGetListReviews();
        setFormReply({
          admin_id: userData?.id,
          review_id: 0,
          comment: ""
        })
        setShowTextArea(false)
      }
    } catch (e) {
      console.log(e);
      message.error("Đã xảy ra lỗi")
    }
  }

  return (
    <div className="des-and-reviews mt-5">
      <div className="title">
        <ul className="nav justify-content-center">
          <li
            className={activeIndex === 0 ? "nav-item active" : "nav-item"}
            onClick={() => handleSetActiveIndex(0)}
          >
            Bài viết
          </li>
          <li
            className={activeIndex === 1 ? "nav-item active" : "nav-item"}
            onClick={() => handleSetActiveIndex(1)}
          >
            Đánh giá (99)
          </li>
        </ul>
      </div>
      {activeIndex === 0 && (
        <div className="des">
          <div className="car-body p-4" ref={contentRef}>
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        <div className="reviews p-4">
          {selectedReview?.id &&
            <ModalEditReview visible={modalVisible} onClose={onCloseModal} review={selectedReview} handleGetListReviews={handleGetListReviews} />
          }
          <div className="card-body">
            {dataReviews.map((item: any, index: number) => (
              <div className="mt-3" key={index}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <div>
                      <img
                        className="headerUser-right-avt rounded-circle"
                        src={item.guest.avatar ? getImageUrl(item.guest.avatar) : NoImage}
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="px-2">
                      <div>
                        <b style={{ fontSize: "18px" }}>{item.guest.last_name + " " + item.guest.first_name}</b>
                      </div>
                      <div><Rate allowHalf value={item.rating} disabled /></div>
                    </div>
                  </div>
                  {item.guest.id === userData.id &&
                    <div className="d-flex action-review">
                      <div className="dropdown option-review">
                        <a
                          className="text-secondary btn btn-secondary-soft-hover px-2"
                          id="cardFeedAction"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-three-dots"></i>
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="cardFeedAction"
                        >
                          <li onClick={() => handleDeleteReview(item.id)}>
                            <a className="dropdown-item">
                              <i className="bi bi-trash3 pe-2"></i>Delete review
                            </a>
                          </li>
                          <li onClick={() => handleClickEditReview(item)}>
                            <a className="dropdown-item">
                              <i className="bi bi-pen-fill pe-2"></i>Edit review
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                </div>
                <div className="px-5 py-1">
                  <div className="review-content">
                    {item.comment}
                  </div>
                  <div>
                    {item.gallery && item.gallery.split(',').length > 0 && (
                      <div className="row">
                        {item.gallery.split(',').map((image: string, index: number) => (
                          <div key={index} className="col-2 position-relative mb-3 p-2">
                            <Image
                              src={getImageUrl(image)}
                              alt={`Image ${index}`}
                              className="img-fluid"
                              style={{ borderRadius: "4px", backgroundColor: "gray" }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="text-secondary" style={{ fontSize: "14px" }}>{formatTime(item.created_at)}</span>
                    {userData.role === "ADMIN" &&
                      <span className=" reply" onClick={() => handleShowTextArea(item.id)}>Reply</span>
                    }
                  </div>
                  {showTextArea && replyId === item.id &&
                    <div className="mt-2">
                      <TextArea rows={3} style={{ fontSize: "16px" }} onChange={(e: any) => handleOnchangeComment(e)} />
                      <Button type="primary" className="mt-2" style={{ borderRadius: "2px", fontSize: "16px" }} onClick={handleReplyReview}>Gửi</Button>
                    </div>
                  }
                  {item?.replies?.length > 0 &&
                    <div>
                      <div className="d-flex justify-content-between mt-2">
                        <div className="d-flex admin">
                          <div>
                            <img
                              className="headerUser-right-avt rounded-circle"
                              src={logo4}
                              alt="avatar"
                              width={50}
                              height={50}
                              style={{ border: "1px solid #ff652f" }}
                            />
                          </div>
                          <div className="px-2 d-flex justify-content-center align-items-center">
                            <b>VIVA PHONE</b>
                          </div>
                        </div>
                      </div>
                      <div className="px-5">
                        <div className="review-content">
                          {item.replies[0].reply}
                        </div>
                        <div className="mt-1">
                          <span className="text-secondary" style={{ fontSize: "14px" }}>{formatTime(item.replies[0].created_at)}</span>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>))}

          </div>
        </div>
      )}
    </div>
  );
};
