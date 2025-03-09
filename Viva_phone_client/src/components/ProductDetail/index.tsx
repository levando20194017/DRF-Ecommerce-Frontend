import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../assets/images/banner.jpg";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./style.scss";
import { apiAddToCart } from "../../services/cart";
import { ToastFailed } from "../Common/Toast";
import { toastWrong } from "../../utils/ToastType";
import { formatPrice, roundToNearestHalf } from "../../utils/format";
import { checkPromotionValid } from "../../helps/checkPormotionValid";
import { promotionType } from "../../utils/promotionType";
import { message, Rate, Select } from "antd";
import { getUserData } from "../../helps/getItemLocal";
import { setOrderLocal } from "../../helps/setLocalStorage";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../screens/Routes";
import ModalProductDetail from "./ModalProductDetail";
import { ModalSelectProduct } from "./ModalSelectProduct";
import { useHandleGetTotalCart } from "../../hook/GetTotalCart";
import { useHandleGetTotalUnnotification } from "../../hook/GetTotalUnread";
import { useLoading } from "../../context/LoadingContext";

interface Image {
  original: string;
}
interface FlyingIconState {
  isAnimating: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface Cartitem {
  id: number,
  store_id: number,
  product_id: number,
  quantity: number,
  color: string
}

export const ProductDetail = ({ productDetail, storeDetail, stork, dataReviews, listRelateds, setProductDetail }: any) => {
  const [listImages, setListImages] = useState([{ original: img1 }]);

  const [images, setImages] = useState<Image[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [optionsColor, setOptionsColor] = useState([]);
  const userData = getUserData()
  const { handleGetTotalCart } = useHandleGetTotalCart();
  const { handleGetTotalUnnotification } = useHandleGetTotalUnnotification();

  const header2 = document.querySelector(".navbar_header2");
  const header3 = document.querySelector(".navbar_header3");
  const [input, setInput] = useState<any>(1);

  const [isModalSelectedOpen, setIsModalSelectedOpen] = useState(false);

  const [cartItem, setCartIem] = useState<Cartitem>({
    id: userData?.id,
    store_id: 0,
    product_id: 0,
    quantity: 1,
    color: ""
  })

  const [temporaryOrder, setTemporaryOrder] = useState([{
    quantity: 1,
    product: {},
    store: 0,
    color: "",
  }])

  useEffect(() => {
    if (productDetail?.image) {
      const newListImages = [{ original: (productDetail.image) }]
      const gallery = productDetail?.gallery.split(',')
      gallery.forEach((item: string) => {
        newListImages.push({ original: (item) })
      })
      setListImages(newListImages)
      setImages(newListImages.slice(0, 4))
    }

    if (productDetail?.color && storeDetail?.id) {
      const newOptionsColor = productDetail.color.split(",").map((item: string) => ({
        label: item.trim(),
        value: item.trim()
      }))
      setOptionsColor(newOptionsColor)

      const newTempOrder = { ...temporaryOrder[0] }
      newTempOrder.color = newOptionsColor[0].value
      newTempOrder.product = productDetail
      newTempOrder.store = storeDetail.id

      setTemporaryOrder([newTempOrder]);
      setCartIem({ ...cartItem, color: newOptionsColor[0].value, store_id: storeDetail.id, product_id: productDetail.id });
    }
  }, [productDetail, storeDetail])

  const handleCloseModal = () => {
    setShowModal(false);
    header2?.classList.remove("modal-header");
    header3?.classList.remove("modal-header");
  };

  const handleShowModal = () => {
    setShowModal(true);
    header2?.classList.add("modal-header");
    header3?.classList.add("modal-header");
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    handleShowModal();
  };

  const handleClickLeft = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.unshift(newImages.pop()!); // Di chuyển ảnh cuối cùng lên đầu
      return newImages;
    });

    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? 3 : prevIndex - 1));
  };

  const handleClickRight = () => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.push(newImages.shift()!); // Di chuyển ảnh đầu tiên xuống cuối
      return newImages;
    });

    setSelectedImageIndex((prevIndex) => (prevIndex === 3 ? 0 : prevIndex + 1));
  };

  const handleSelectedImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const [flyingIcon, setFlyingIcon] = useState<FlyingIconState | null>(null);

  const handleChangeOptionColor = (value: string) => {
    const newTempOrder = { ...temporaryOrder[0] }
    newTempOrder.color = value
    setTemporaryOrder([newTempOrder]);
    setCartIem({ ...cartItem, color: value });
  }

  const handleAddToCart = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = document.querySelector('.frame-cart-icon'); // Vị trí giỏ hàng

    const rect = event.currentTarget.getBoundingClientRect(); // Vị trí nút nhấn
    const targetRect = target?.getBoundingClientRect();

    if (userData?.id && productDetail?.id && storeDetail?.id) {
      try {
        const response = await apiAddToCart(cartItem)
        if (response.status === 201) {
          message.success("Đã thêm sản phẩm vào giỏ hàng")
          if (targetRect) {
            setFlyingIcon({
              isAnimating: true,
              startX: rect.left + rect.width / 2,
              startY: rect.top + rect.height / 2,
              endX: targetRect.left + targetRect.width / 2,
              endY: targetRect.top + targetRect.height / 2,
            });

            // Kết thúc animation sau 1 giây
            setTimeout(() => setFlyingIcon(null), 1000);
            handleGetTotalCart()
            handleGetTotalUnnotification()
          }
        }
      } catch (e) {
        console.log(e);
        message.error("Đã xảy ra lõi, vui lòng thử lại!")
      }
    } else {
      ToastFailed(toastWrong)
    }
  }

  const navigate = useNavigate();
  const { setLoading } = useLoading()
  const handleBuyNow = () => {
    setLoading(true)
    if (temporaryOrder.some(item => !item)) return;
    setOrderLocal(temporaryOrder);
    navigate(Routes.Payment.path)
  }

  const handleOnchangeQuantity = (e: any) => {
    let inputValue = e.target.value;

    // Kiểm tra nếu giá trị là rỗng, cập nhật giá trị tạm thời mà không chuyển đổi
    if (inputValue === "") {
      setInput("")
      return;
    }

    const parsedValue = parseInt(inputValue, 10);

    // Nếu không phải số hợp lệ hoặc nhỏ hơn 1, đặt về giá trị mặc định
    const validValue = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    setInput(validValue)
  };

  const handleBlur = () => {
    // Nếu giá trị rỗng, tự động điền giá trị là 1
    setInput(1)
  };

  useEffect(() => {
    if (input > 0) {
      const newTempOrder = { ...temporaryOrder[0] }
      newTempOrder.quantity = input
      setTemporaryOrder([newTempOrder]);
      setCartIem({ ...cartItem, quantity: input });
    }
  }, [input])

  const handleSetProductSelected = (product: any) => {
    setProductDetail(product)
  }

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModalDetail = () => {
    setIsModalVisible(true)
  }

  return (
    <div className="pro-form">
      <div className="pro-body mt-5">
        <div className="d-flex">
          <div className="col-5 images-of-pro">
            <div className="img-show">
              <img
                src={images[selectedImageIndex]?.original}
                onClick={() => handleImageClick(selectedImageIndex)}
                alt="Product"
              />
            </div>

            <div className="list-img-of-pro mt-3 d-flex">
              <div>
                <FaChevronLeft
                  onClick={handleClickLeft}
                  style={{ fontSize: "25px", cursor: "pointer" }}
                />
              </div>

              {/* Sử dụng motion.div để thêm hiệu ứng trượt */}
              <motion.div
                className="image-list"
                animate={{ x: 0 }} // Điều chỉnh trượt ngang
                transition={{ type: "spring", stiffness: 100 }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`image-item p-2 ${index === selectedImageIndex ? "active" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image.original}
                      height={120}
                      width={100}
                      onClick={() => handleSelectedImage(index)}
                      alt={`Thumbnail ${index}`}
                    />
                  </motion.div>
                ))}
              </motion.div>

              <div>
                <FaChevronRight
                  onClick={handleClickRight}
                  style={{ fontSize: "25px", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          <div className="col-7 pro-detai">
            <h2>{productDetail?.name}</h2>
            <hr />
            <div className="d-flex review-sale">
              <div className="d-flex gap-2 align-iems-end">
                <b>{dataReviews?.average_rating ? dataReviews?.average_rating?.toFixed(1) : 0}</b>
                <div><Rate allowHalf value={roundToNearestHalf(dataReviews?.average_rating)} disabled /></div>
              </div>
              <div className="d-flex gap-2">
                <b>{dataReviews?.total_items ? dataReviews?.total_items : 0}</b> <span style={{ color: "gray" }}>Đánh giá</span>
              </div>
              {/* <div>
                <b>249</b> <span style={{ color: "gray" }}>Đã bán</span>
              </div> */}
            </div>
            <div>
              <b>Số lượng còn:</b>{" "}
              <span style={{ color: "gray" }}>{stork}</span>
            </div>
            <div className="d-flex gap-2">
              <b>
                <span style={{ color: "red" }}>*</span>
                <span className="ms-2">Màu sắc:</span>{" "}
              </b>
              <Select
                onChange={handleChangeOptionColor}
                style={{ width: 150 }}
                options={optionsColor}
                value={cartItem.color}
              />
            </div>
            {listRelateds.length > 1 ?
              <div className="list-versions">
                <b>Lựa chọn phiên bản</b>
                <div className="row px-2">
                  {listRelateds.map((item: any, index: number) => (
                    <div className="col-4 p-1" key={index}>
                      <div className={`cursor-pointer version-item ${item.id === productDetail?.id ? "active" : ""}`}
                        onClick={() => { handleSetProductSelected(item) }}>
                        <div className="fw-bold">{item.name}</div>
                        <div className="price fw-bold">{formatPrice(item.price)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              :
              <div className="mt-3 d-flex gap-2">
                <b>Giá bán:</b>
                <span className="price fw-bold">{formatPrice(productDetail?.price)}</span>
              </div>
            }
            {productDetail?.id &&
              <>
                <div className="d-flex gap-2">
                  <span className="fw-bold">Ưu đãi:</span>
                  <span className="text-content">{checkPromotionValid(productDetail) ? productDetail.promotion_name : "Không"}</span>
                </div>
                {checkPromotionValid(productDetail) &&
                  <>
                    <div>Giảm giá: <span className="price fw-bold">
                      {productDetail.promotion_discount_type === promotionType.PERCENT ?
                        `${productDetail.promotion_discount_value}%` :
                        `${formatPrice(productDetail.promotion_discount_value)}`}
                    </span>
                    </div>
                    <div className="text-content">Chương trình khuyễn mãi áp dụng từ ngày {productDetail?.promotion_from_date} đến hết ngày {productDetail?.promotion_to_date}</div>
                  </>
                }
              </>
            }
            <div className="d-flex justify-content-between align-items-center">
              <button className="view-detail" onClick={showModalDetail}>
                Xem thông tin chi tiết sản phẩm <FaChevronDown className="ms-2" />
              </button>
              <button className="btn-compare" onClick={() => { setIsModalSelectedOpen(true) }}>
                So sánh sản phẩm khác
              </button>
            </div>
            <hr />
            <div className="d-flex mt-2 quantity">
              <span>
                <span style={{ color: "red" }}>*</span>
                <span>Số lượng: </span>
              </span>
              <input type="number"
                className="form-control"
                style={{ width: "70px" }}
                value={input}
                min={1}
                step={1}
                onKeyDown={(e) => {
                  const invalidKeys = ["-", "e", "E"];
                  if (invalidKeys.includes(e.key)) {
                    e.preventDefault(); // Ngăn chặn hành động mặc định
                  }
                }}
                onChange={handleOnchangeQuantity}
                onBlur={handleBlur} />
            </div>
            <div className="d-flex gap-4 mt-4">
              <div className="button-add">
                <button onClick={handleAddToCart}>
                  <i className="bi bi-cart4"></i> <span className="ms-2">Thêm vào giỏ hàng</span>
                </button>
                {flyingIcon && flyingIcon.isAnimating && (
                  <div
                    className="flying-icon"
                    style={{
                      position: 'fixed',
                      left: flyingIcon.startX,
                      top: flyingIcon.startY,
                      width: 30,
                      height: 30,
                      backgroundColor: '#ff652f',
                      borderRadius: '50%',
                      zIndex: 999,
                      transition: 'all 1s ease', // Đảm bảo transition được áp dụng
                      transform: `translate(${flyingIcon.endX - flyingIcon.startX}px, ${flyingIcon.endY - flyingIcon.startY
                        }px)`,
                    }}
                  />
                )}
              </div>
              <div className="buy-now">
                <button onClick={handleBuyNow}>
                  <i className="bi bi-bag-heart-fill"></i> <span className="ms-2">Mua ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalSelectProduct productDetail={productDetail} isModalVisible={isModalSelectedOpen} setIsModalVisible={setIsModalSelectedOpen} />
      <Modal isOpen={showModal} onRequestClose={() => handleCloseModal()}>
        <div style={{ backgroundColor: "black" }}>
          <ImageGallery
            items={listImages}
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            showBullets={true}
            startIndex={selectedImageIndex}
            onScreenChange={() => handleCloseModal()}
            showNav={true}
            showIndex={true}
          />
        </div>
      </Modal>
      <ModalProductDetail isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} productDetail={productDetail} />

    </div>
  );
};
