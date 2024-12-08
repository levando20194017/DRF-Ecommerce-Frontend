import { ProductDetail } from "../../components/ProductDetail";
import { RelatedProduct } from "../../components/RelatedProduct";
import { DesAndReviews } from "../../components/DesAndReviews";
import { Routes } from "../Routes";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { apiGetProductDetailInStore } from "../../services/product";
import { useLocation } from "react-router-dom";
const AddToCartPage = () => {
  const breadcrumbs = [
    { label: "Trang chủ", path: Routes.HomePage.path },
    { label: "Cửa hàng", path: Routes.Store.path },
    { label: "Viva phone" },
  ];
  const [productDetail, setProductDetail] = useState<any>()
  const [storeDetail, setStoreDetail] = useState<any>()
  const [stork, setStork] = useState<number>(0)
  const urlParams = new URLSearchParams(window.location.search);
  const location = useLocation();
  const storeId = Number(urlParams.get('store_id')) || 0; // Chuyển thành number, mặc định 0 nếu null
  const productId = Number(urlParams.get('product_id')) || 0;
  const catalogId = Number(urlParams.get('catalog_id')) || 0;

  const handleGetProductDetail = async () => {
    try {
      const response = await apiGetProductDetailInStore({ productId, storeId })
      if (response.status === 200) {
        if (response.data.product.length > 0) {
          setProductDetail(response.data.product[0].product)
          setStoreDetail(response.data.product[0].store)
          setStork(response.data.product[0].remaining_stock)
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleGetListProductByCatalog = async () => {

  }

  useEffect(() => {
    if (productId && storeId) {
      handleGetProductDetail()
    }
  }, [location.pathname])


  return (
    <div>
      <div className="div-empty"></div>
      <div className="container">
        <div className="mt-3">
          <Breadcrumb breadcrumbs={breadcrumbs} />
        </div>
        <ProductDetail
          productDetail={productDetail}
          storeDetail={storeDetail}
          stork={stork} />
        <DesAndReviews productDetail={productDetail} />
        <RelatedProduct />
      </div>
    </div>
  );
};

export default AddToCartPage;
