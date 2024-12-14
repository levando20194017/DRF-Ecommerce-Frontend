import { ProductDetail } from "../../components/ProductDetail";
import { RelatedProduct } from "../../components/RelatedProduct";
import { DesAndReviews } from "../../components/DesAndReviews";
import { Routes } from "../Routes";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { apiGetListProductsByCatalog, apiGetProductDetailInStore } from "../../services/product";
import { useLocation } from "react-router-dom";
import { apiGetListReviews } from "../../services/review";
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
  const [dataReviews, setDataReviews] = useState<any>({})
  const [listRelateds, setListRelateds] = useState([])

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
    try {
      const response = await apiGetListProductsByCatalog({ storeId, catalog_id: catalogId })
      if (response.status === 200) {
        setListRelateds(response.data.products)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleGetListReviews = async () => {
    try {
      const response = await apiGetListReviews({
        storeId,
        productId,
        pageIndex: 1,
        pageSize: 100
      })
      if (response.status === 200) {
        setDataReviews(response.data.reviews)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (productId && storeId) {
      handleGetProductDetail()
      handleGetListReviews()
      handleGetListProductByCatalog()
    }
  }, [productId, storeId, catalogId])

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
          dataReviews={dataReviews}
          listRelateds={listRelateds}
          stork={stork}
          setProductDetail={setProductDetail} />
        <DesAndReviews
          productDetail={productDetail}
          dataReviews={dataReviews}
          handleGetListReviews={handleGetListReviews} />
        <RelatedProduct />
      </div>
    </div>
  );
};

export default AddToCartPage;
