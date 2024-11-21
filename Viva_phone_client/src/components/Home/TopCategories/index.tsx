import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../Home/style.scss"; // Đảm bảo bạn import file CSS

const TopCategories = () => {
    const products = [
        {
            id: 1,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 2,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 3,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 4,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 5,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 6,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 7,
            name: "Iphone 15 Plus 128GB",
            price: "22.990.000đ",
            promotion: "Phiếu giảm giá PK 150.000đ",
            description: "Trả góp 0%",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
    ];

    return (
        <div className="carousel-container container">
            <h2 className="carousel-title">Các sản phẩm bán chạy nhất</h2>
            <Swiper
                className="product-swiper mt-5"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={4}
                loop={true}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="carousel-slide">
                            <img src={product.image} alt={product.name} />
                            <div className="d-flex justify-content-start flex-column align-items-start gap-1">
                                <h4>{product.name}</h4>
                            </div>
                            <div className="product-more-infor">
                                <div className="fw-bold" style={{ color: "red", fontSize: "16px" }}>{product.price}</div>
                                <div>Ưu đãi: {product.promotion}</div>
                                <div>{product.description}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCategories;
