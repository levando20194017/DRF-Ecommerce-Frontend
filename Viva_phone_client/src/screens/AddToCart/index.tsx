import { ProductDetail } from "../../components/ProductDetail";
import { RelatedProduct } from "../../components/RelatedProduct";
import { DesAndReviews } from "../../components/DesAndReviews";
import { Routes } from "../Routes";
import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { apiGetListProductsByCatalog, apiGetProductDetailInStore, apiSearchProductsInStoreByCatalog } from "../../services/product";
import { apiGetListReviews } from "../../services/review";
import { useLoading } from "../../context/LoadingContext";
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
  const storeId = Number(urlParams.get('store_id')) || 0; // Chuyển thành number, mặc định 0 nếu null
  const productId = Number(urlParams.get('product_id')) || 0;
  const catalogId = Number(urlParams.get('catalog_id')) || 0;
  const [dataReviews, setDataReviews] = useState<any>({})
  const [listRelateds, setListRelateds] = useState([])
  const { setLoading } = useLoading()

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
      const response = await apiSearchProductsInStoreByCatalog({ storeId, catalogId, pageSize: 10, pageIndex: 1, textSearch: "" })
      if (response.status === 200) {
        setListRelateds(response.data.products.map((item: any) => item.product))
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
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
      setLoading(true)
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
