import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../assets/images/banner.jpg";
import img2 from "../../assets/images/content.jpg";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion"; // Import motion from framer-motion
import "./style.scss";
import { apiAddToCart } from "../../services/cart";
import { ToastFailed } from "../Common/Toast";
import { toastWrong } from "../../utils/ToastType";

interface Image {
  original: string;
}

export const ProductDetail = ({ productDetail, storeDetail }: any) => {
  const userData = JSON.parse(localStorage.getItem("vivaphone_userData") || "{}").user_infor;
  const listImages = [
    { original: img1 },
    { original: "https://th.bing.com/th/id/OIP.uUcKbkk6gr_sD6iBOZWX6AHaIR?w=156&h=180&c=7&r=0&o=5&pid=1.7" },
    { original: "https://th.bing.com/th/id/OIP.OKsfBcRCUQUV_VYfj1MozwHaEK?w=310&h=180&c=7&r=0&o=5&pid=1.7" },
    { original: "https://th.bing.com/th/id/OIP.Yr-TVgQ1AOF3p1nw-j1bywHaE8?w=235&h=180&c=7&r=0&o=5&pid=1.7" },
    { original: img2 },
    { original: "https://th.bing.com/th/id/OIP.LhG7XVTSgYz420P_723mjgHaE8?w=236&h=180&c=7&r=0&o=5&pid=1.7" }
  ];

  const [images, setImages] = useState<Image[]>(listImages.slice(0, 4)); // Hiển thị tối đa 4 ảnh
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const header2 = document.querySelector(".navbar_header2");
  const header3 = document.querySelector(".navbar_header3");

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

  const handleAddToCart = async () => {
    if (userData?.id && productDetail?.id && storeDetail?.id) {
      try {
        const response = await apiAddToCart({
          id: userData.id,
          product_id: productDetail.id,
          quantity: 1,
          color: "Đen",
          store_id: storeDetail?.id
        })
      } catch (e) {
        console.log(e);
      }
    } else {
      ToastFailed(toastWrong)
    }
  }
  return (
    <div className="pro-form">
      <div className="pro-body mt-5">
        <div className="d-flex">
          <div className="col-5 images-of-pro">
            <div className="img-show">
              <img
                src={images[selectedImageIndex].original}
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
            <h2>Viva Phone</h2>
            <hr />
            <div className="d-flex review-sale">
              <div>
                <b>4.9</b>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>
              <div>
                <b>99</b> <span style={{ color: "gray" }}>Đánh giá</span>
              </div>
              <div>
                <b>249</b> <span style={{ color: "gray" }}>Đã bán</span>
              </div>
            </div>
            <div>
              <b>Số lượng còn:</b>{" "}
              <span style={{ color: "gray" }}>225</span>
            </div>
            <div className="d-flex">
              <b>
                <span style={{ color: "red" }}>*</span>
                <span className="ms-2">Màu sắc:</span>{" "}
              </b>
              <select
                className="form-select"
                aria-label="Default select example"
                style={{
                  width: "200px",
                  marginLeft: "10px",
                  color: "gray",
                  height: "35px",
                }}
              >
                <option selected>--Chọn màu sắc--</option>
                <option value="1">Blue</option>
                <option value="2">Orange</option>
                <option value="3">Purple</option>
              </select>
            </div>
            <div className="mt-3">
              <b>Giá bán:</b>{" "}
              <span style={{ color: "red", fontWeight: "bold" }}>229.000đ</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between col-9 mt-4">
              <div className="d-flex quantity">
                <span>
                  <span style={{ color: "red" }}>*</span>
                  <span>Quantity</span>
                </span>
                <input type="number" className="form-control" style={{ width: "70px" }} />
              </div>
              <div className="button-add ">
                <button onClick={handleAddToCart}>
                  {" "}
                  <i className="bi bi-cart4"></i> <span className="ms-2">Thêm vào giỏ hàng</span>
                </button>
              </div>
              <div className="buy-now">
                <button>
                  <i className="bi bi-bag-heart-fill"></i> <span className="ms-2">Mua ngay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  );
};
