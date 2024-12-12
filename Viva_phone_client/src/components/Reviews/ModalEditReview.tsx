import React, { useEffect, useState, useRef } from "react";
import { Modal, Rate, Input, Checkbox, Button } from "antd";
import { apiGetListGallery, apiGuestReview, apiUpdateReview } from "../../services/review";
import { getImageUrl } from "../../helps/getImageUrl";
import { getUserData } from "../../helps/getItemLocal";

const { TextArea } = Input;

interface ReviewModalProps {
    visible: boolean;
    onClose: () => void;
    review: any;
    handleGetListReviews: any
}

const ModalEditReview: React.FC<ReviewModalProps> = ({ visible, onClose, review, handleGetListReviews }) => {
    const [formReview, setFormReview] = useState({ ...review })
    const [listImages, setListImages] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setFormReview({ ...review })
        if (review.gallery) {
            setListImages(review.gallery.split(','))
        }
    }, [review]);

    // Hàm upload file (ảnh/video)
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const files = event.target.files;
        if (!files) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await apiGetListGallery(formData) as any;
            if (response.status === 200) {
                if (type === "image") {
                    const newList = [...listImages, ...response.image_urls]
                    setListImages(newList);
                    setFormReview({
                        ...formReview,
                        gallery: newList.join(","),
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    const clearForm = () => {
        setFormReview({ ...formReview, comment: "", gallery: "" })
        setListImages([])
    }

    const handleCreateReview = async () => {
        if (!formReview.comment || !formReview.guest.id || !formReview.product.id || formReview.rating === 0) {
            return;
        }
        try {
            const response = await apiUpdateReview({
                guest_id: formReview.guest.id,
                product_id: formReview.product.id,
                store_id: 1,
                rating: formReview.rating,
                comment: formReview.comment,
                gallery: formReview.gallery
            });
            if (response.status === 200) {
                onClose();
                clearForm();
                handleGetListReviews();
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Hàm để mở file input khi click nút
    const handleChooseFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = listImages.filter((_, i) => i !== index);
        setListImages(updatedImages);
        setFormReview({
            ...formReview,
            gallery: updatedImages.join(","),
        });
    };

    const handleRatingChange = (value: number) => {
        setFormReview({
            ...formReview,
            rating: value // Cập nhật giá trị rating
        });
    };

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            className="review-modal"
        >
            <div className="container">
                <h5 className="text-center">Đánh Giá Sản Phẩm</h5>
                <p className="text-center text-warning">
                    <i className="fa fa-info-circle" aria-hidden="true"></i> Xem Hướng dẫn đánh giá chuẩn
                </p>
                <div className="row align-items-center mb-3">
                    <div className="col-3">
                        <img
                            src={getImageUrl(review?.product?.image)}
                            alt="Product"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-9">
                        <div className="fw-bold">{review?.product?.name}</div>
                        <div>{review?.product?.short_description}</div>
                    </div>
                </div>

                <div className="mb-3">
                    <h6>Chất lượng sản phẩm</h6>
                    <Rate value={formReview?.rating} onChange={handleRatingChange} /> <span>Tuyệt vời</span>
                </div>

                <div className="mb-3">
                    <h6>Nội dung:</h6>
                    <TextArea
                        placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này với những người mua khác nhé."
                        rows={4}
                        value={formReview.comment}
                        onChange={(e) => setFormReview({ ...formReview, comment: e.target.value })}
                    />
                </div>

                <div className="mb-3 d-flex gap-2">
                    <Button icon={<i className="fa fa-camera" />} className="me-2" onClick={handleChooseFile}>
                        Thêm Hình ảnh
                    </Button>
                    {/* Chọn video */}
                    <Button icon={<i className="fa fa-video-camera" />} onClick={handleChooseFile}>
                        Thêm Video
                    </Button>
                </div>

                {/* File input ẩn */}
                <input
                    type="file"
                    accept="image/*, video/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, "image")}
                />

                <div className="mb-3">
                    {/* Hiển thị ảnh */}
                    {listImages && listImages.length > 0 && (
                        <div className="row">
                            {listImages.map((image, index) => (
                                <div key={index} className="col-3 position-relative mb-3">
                                    <img
                                        src={getImageUrl(image)}
                                        alt={`Image ${index}`}
                                        className="img-fluid"
                                    />
                                    <button
                                        className="btn position-absolute top-0 end-0 d-flex align-items-center justify-content-center"
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            zIndex: 10,
                                            backgroundColor: "#d1d5d8",
                                            borderRadius: "50%",
                                            fontSize: "14px",
                                            width: 24,
                                            height: 30     // Giảm kích thước font chữ (biểu tượng)
                                        }}
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className="mb-3">
                    <Checkbox defaultChecked>
                        Hiển thị tên đăng nhập trên đánh giá này
                    </Checkbox>
                    <p className="text-muted">Tên tài khoản sẽ được hiển thị như levando0708</p>
                </div>

                <div className="text-end">
                    <Button onClick={onClose} className="me-2">
                        Trở Lại
                    </Button>
                    <Button type="primary" className="btn-rate" onClick={handleCreateReview}>Chỉnh sửa</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEditReview;
