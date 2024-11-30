import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../Home/style.scss"; // Đảm bảo bạn import file CSS
import { apiGetBestSelling } from "../../../services/product";
import { ProductType } from "../../../types";
import { promotionType } from "../../../utils/promotionType";
import { formatPrice } from "../../../utils/format";
import { Image } from "antd";
import { getImageUrl } from "../../../helps/getImageUrl";
const TopCategories = () => {
    // const products = [
    //     {
    //         id: 1,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 2,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 3,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 4,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 5,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 6,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 7,
    //         name: "Iphone 15 Plus 128GB",
    //         price: "22.990.000đ",
    //         promotion: "Phiếu giảm giá PK 150.000đ",
    //         description: "Trả góp 0%",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    // ];
    const [products, setProducts] = useState<any[]>([]);

    const handleGetBestSellProduct = async () => {
        try {
            const res = await apiGetBestSelling({
                pageIndex: 1,
                pageSize: 10,
                store_id: 1
            }) as any
            if (res.status == 200) {
                setProducts(res.data.products)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGetBestSellProduct()
    }, [])

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
                            <Image src={getImageUrl(product.image)} alt={product.name} />
                            <div className="d-flex justify-content-start flex-column align-items-start gap-1">
                                <h4>{product.name}</h4>
                            </div>
                            <div className="product-more-infor">
                                <div className="fw-bold" style={{ color: "red", fontSize: "16px" }}>{formatPrice(product.price)}</div>
                                <div>Ưu đãi: {product.promotion_name ?? "Không có"}</div>
                                {product.promotion_discount_type && <div>Giảm giá: <span className="price">{product.promotion_discount_type === promotionType.PERCENT ? `${product.promotion_discount_value}%` : `${formatPrice(product.promotion_discount_value)}`}</span></div>}
                                <div className="text-start">{product.description}</div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCategories;
