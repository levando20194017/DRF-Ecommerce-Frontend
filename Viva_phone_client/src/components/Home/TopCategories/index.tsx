import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../Home/style.scss"; // Đảm bảo bạn import file CSS
import { apiGetBestSelling } from "../../../services/product";
import { promotionType } from "../../../utils/promotionType";
import { formatPrice } from "../../../utils/format";
import { checkPromotionValid } from "../../../helps/checkPormotionValid";
import { Link } from "react-router-dom";
import { Routes } from "../../../screens/Routes";
const TopCategories = () => {
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
                        <Link to={Routes.AddToCart.getPath({ storeId: 1, productId: product.id, catalogId: product.catalog })}>
                            <div className="carousel-slide cursor-pointer">
                                <img src={(product.image)} alt={product.name} />
                                <div className="d-flex justify-content-start flex-column align-items-start gap-1">
                                    <h4>{product.name}</h4>
                                </div>
                                <div className="product-more-infor">
                                    <div className="fw-bold" style={{ color: "red", fontSize: "16px" }}>{formatPrice(product.price)}</div>
                                    <div className='another-info'>Ưu đãi: {checkPromotionValid(product) ? product.promotion_name : "Không"}</div>
                                    {checkPromotionValid(product) && <div className='another-info'>
                                        Giảm giá:
                                        <span className="price">
                                            {product.promotion_discount_type === promotionType.PERCENT ?
                                                `${product.promotion_discount_value}%` :
                                                `${formatPrice(product.promotion_discount_value)}`}
                                        </span>
                                    </div>}
                                    <div className="text-start">{product.short_description}</div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopCategories;
