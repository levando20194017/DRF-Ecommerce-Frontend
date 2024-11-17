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
            name: "Painticks U Primer",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 2,
            name: "Painticks Clear Primer",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 3,
            name: "Painticks 800",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 4,
            name: "Painticks Water Primer",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 5,
            name: "Painticks Water Primer",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 6,
            name: "Painticks Water Primer",
            description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
    ];

    return (
        <div className="carousel-container">
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
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCategories;
