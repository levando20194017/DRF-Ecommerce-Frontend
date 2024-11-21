import { ProductDetail } from "../../components/ProductDetail";
import { RelatedProduct } from "../../components/RelatedProduct";
import { DesAndReviews } from "../../components/DesAndReviews";
import { Routes } from "../Routes";
import Breadcrumb from "../../components/Breadcrumb";
const AddToCartPage = () => {
  const breadcrumbs = [
    { label: "Trang chủ", path: Routes.HomePage.path },
    { label: "Cửa hàng", path: Routes.Store.path },
    { label: "Viva phone" },
  ];
  return (
    <div>
      <div className="div-empty"></div>
      <div className="container">
        <div className="mt-3">
          <Breadcrumb breadcrumbs={breadcrumbs}/>
        </div>
        <ProductDetail />
        <DesAndReviews />
        <RelatedProduct />
      </div>
    </div>
  );
};

export default AddToCartPage;
