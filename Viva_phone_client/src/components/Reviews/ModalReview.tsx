import React, { useEffect, useState, useRef } from "react";
import { Modal, Rate, Input, Checkbox, Button } from "antd";
import { apiGetListGallery, apiGuestReview } from "../../services/review";
import { getUserData } from "../../helps/getItemLocal";

const { TextArea } = Input;

interface ReviewModalProps {
    visible: boolean;
    onClose: () => void;
    productReview: any
}

const ModalReview: React.FC<ReviewModalProps> = ({ visible, onClose, productReview }) => {
    const [formReview, setFormReview] = useState({
        guest_id: 0,
        product_id: 0,
        store_id: 1,
        rating: 5,
        comment: "",
        gallery: ""
    })
    const userData = getUserData()
    const [listImages, setListImages] = useState<string[]>([]);
    const [listVideos, setListVideos] = useState<string[]>([]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setFormReview({ ...formReview, guest_id: userData?.id, product_id: productReview?.id })
    }, [productReview]);

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
                } else if (type === "video") {
                    const newList = [...listImages, ...response.image_urls]
                    setListVideos(newList);
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
        setListVideos([])
    }

    const handleCreateReview = async () => {
        if (!formReview.comment || !formReview.guest_id || !formReview.product_id || formReview.rating === 0) {
            return;
        }
        try {
            const response = await apiGuestReview(formReview);
            if (response.status === 201) {
                onClose();
                clearForm();
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

    const handleRemoveVideo = (index: number) => {
        const updatedVideos = listVideos.filter((_, i) => i !== index);
        setListVideos(updatedVideos);
        setFormReview({
            ...formReview,
            gallery: updatedVideos.join(","),
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
                            src={(productReview?.image)}
                            alt="Product"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-9">
                        <div className="fw-bold">{productReview?.name}</div>
                        <div>{productReview?.short_description}</div>
                    </div>
                </div>

                <div className="mb-3">
                    <h6>Chất lượng sản phẩm</h6>
                    <Rate defaultValue={5} onChange={handleRatingChange} /> <span>Tuyệt vời</span>
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
                    {/* Chọn ảnh */}
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
                                        src={(image)}
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

                    {/* Hiển thị video */}
                    {listVideos && listVideos.length > 0 && (
                        <div className="row">
                            {listVideos.map((video, index) => (
                                <div key={index} className="col-4 position-relative mb-3">
                                    <video controls className="img-fluid">
                                        <source src={video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {/* Nút x để loại bỏ video */}
                                    <button
                                        className="btn btn-danger position-absolute top-0 end-0"
                                        onClick={() => handleRemoveVideo(index)}
                                        style={{ zIndex: 10 }}
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
                    <Button type="primary" className="btn-rate" onClick={handleCreateReview}>Hoàn Thành</Button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalReview;
