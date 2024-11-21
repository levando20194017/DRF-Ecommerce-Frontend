import Modal from "react-modal";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import img1 from "../../assets/images/banner.jpg";
import img2 from "../../assets/images/content.jpg";
import "./style.scss";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const ProductDetail = () => {
  const images = [
    { original: img1 },
    { original: img2 },
    { original: img2 },
    { original: img2 },
    { original: img2 },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const header2 = document.querySelector(".navbar_header2");
  const header3 = document.querySelector(".navbar_header3");

  const handleSelectImage = (selectedIndex: number) => {
    setSelectedImageIndex(selectedIndex);
  };

  const handleCloseModal = () => {
    setShowModal(false);

    header2?.classList.remove("modal-header");
    header3?.classList.remove("modal-header");
  };

  const handleShowModal = () => {
    setShowModal(true);

    header2?.classList.add("modal-header");
    header3?.classList.add("modal-header");
    console.log(header2, header3);
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    handleShowModal();
  };
  const handleClickLeft = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleClickRight = () => {
    if (selectedImageIndex < images.length - 4) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };
  return (
    <div className="pro-form">
      <div className="pro-body mt-5">
        <div className="d-flex">
          <div className="col-5 images-of-pro">
            <div className="img-show">
              <img
                src={images[selectedImageIndex].original}
                onClick={() => handleImageClick(selectedImageIndex)}
              />
            </div>

            <div className="list-img-of-pro mt-3 d-flex">
              <div>
                <FaChevronLeft onClick={handleClickLeft} style={{fontSize:"25px"}} className="cursor-pointer"/>
              </div>
              <ul>
                {images
                  .slice(selectedImageIndex, selectedImageIndex + 4)
                  .map((image, index) => (
                    <li key={index}>
                      <img
                        src={image.original}
                        height={120}
                        width={100}
                        onClick={() => handleImageClick(index)}
                      />
                    </li>
                  ))}
              </ul>
              <div>
                <FaChevronRight onClick={handleClickRight} style={{fontSize:"25px"}} className="cursor-pointer"/>
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
            {/* <div className="text-secondary" style={{ fontSize: "13px" }}>
              <b style={{ color: "black" }}>Note:</b> Customer have to pay
              shipping fees <b style={{ color: "black" }}>5.000đ</b> for{" "}
              <b style={{ color: "black" }}>1 km</b>.
            </div> */}
            <div
              className="d-flex justify-content-between col-9 mt-4"
            >
              <div className="d-flex quantity">
                <span>
                  <span style={{ color: "red" }}>*</span>
                  <span>Quantity</span>
                </span>
                <input type="number" className="form-control" style={{width: "70px"}}/>
              </div>
              <div className="button-add ">
                <button>
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
      <div className=""></div>
      <div>
        <Modal isOpen={showModal} onRequestClose={() => handleCloseModal()}>
          <div style={{ backgroundColor: "black" }}>
            <ImageGallery
              items={images}
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
    </div>
  );
};
