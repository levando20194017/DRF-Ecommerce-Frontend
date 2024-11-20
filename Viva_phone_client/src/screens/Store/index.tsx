import Breadcrumb from "../../components/Breadcrumb";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
import { RelatedProduct } from "../../components/RelatedProduct";
import './style.scss'
const StorePage = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: "/" },
        { label: "Cửa hàng", path: "/store" },
      ];
    return (
        <>
            <div className="div-empty"></div>
            <div className="container store-page">
                <div className="mt-3">
                    <Breadcrumb breadcrumbs = {breadcrumbs} />
                </div>
                <ProductCatgories />
                <RelatedProduct />
            </div>
        </>
    );
};

export default StorePage;
