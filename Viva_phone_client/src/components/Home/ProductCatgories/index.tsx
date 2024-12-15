import "../style.scss";
import "animate.css";
import { useEffect, useState } from "react";
import { ModalQuickView } from "../ModalQuickView";
import { ListProduct } from "./ProductItem";
import { apiGetCatalog } from "../../../services/catalog";
import { apiGetListProductsByCatalog } from "../../../services/product";
import { ProductItem } from "./ProductItem/ProductItem";
export const ProductCatgories = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [listCatalogs, setListCatalogs] = useState<any[]>([])
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedCatalog, setSelectedCatalog] = useState(0);
  const [listProducts, setListProducts] = useState<any[]>([])
  const handleQuickView = () => {
    setIsOpenModal(true);
  };
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleClick = (id: number) => {
    setSelectedCatalog(id)
  };

  const handleGetCatalog = async () => {
    try {
      const res = await apiGetCatalog({
        pageIndex: 1, pageSize: 100, level: 1
      })
      if (res.status === 200) {
        setListCatalogs(res.data.catalogs)
        if (res.data.catalogs.length > 0) {
          setSelectedCatalog(res.data.catalogs[0].id)
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleGetCatalog();
  }, [])

  const handleGetListProductsOfCatalog = async (catalog: number) => {
    try {
      const response = await apiGetListProductsByCatalog({
        pageIndex, pageSize, catalog_id: catalog
      })
      if (response.status === 200) {
        setListProducts(response.data.products)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (selectedCatalog) {
      handleGetListProductsOfCatalog(selectedCatalog)
    }
  }, [selectedCatalog])

  return (
    <div className="container list-product mt-5">
      <ModalQuickView isOpen={isOpenModal} toggleFromParent={toggleModal} />
      {/* <div className="hstack gap-2 gap-xl-5 justify-content-center mt-3 list-service">
        <div className="d-flex">
          <div className="icon-service">
            <Icon path={mdiTruckDelivery} size={2} />
          </div>
          <div>
            <p className="service-name">Free Shipping</p>
            <p className="ab">Lorem ipsum is simply</p>
          </div>
        </div>
        <div className="vr"></div>
        <div className="d-flex">
          <div className="icon-service">
            <Icon path={mdiPhoneInTalk} size={2} />
          </div>
          <div>
            <p className="service-name">Online Support</p>
            <p className="ab">Lorem ipsum is simply</p>
          </div>
        </div>
        <div className="vr"></div>
        <div className="d-flex">
          <div className="icon-service">
            <Icon path={mdiReload} size={2} />
          </div>
          <div>
            <p className="service-name">Money Back</p>
            <p className="ab">Lorem ipsum is simply</p>
          </div>
        </div>
            <div className="vr"></div>
              <div className="d-flex">
              <div className="icon-service">
              <Icon path={mdiCog} size={2} />
                  </div>
                  <div>
                    <p className="service-name">Ours Services</p>
                    <p className="ab">Lorem ipsum is simply</p>
                  </div>
                </div>
              </div> */}

      <main>
        <section className="home-cl section-padding">
          <section className="popular-location section-padding">
            <div className="list-products">
              <div className="title justify-content-center mt-5">
                Các sản phẩm của chúng tôi
              </div>
              <div className="text-center description">
                <p>
                  Tìm hiểu thêm nhiều thông tin chi tiết hơn về các sản phẩm mà chúng tôi hiện nay đang có
                </p>
              </div>
              <div className="categories-list d-flex mt-4">
                {listCatalogs.map((item, index) => (
                  <div
                    className={selectedCatalog === item.id ? "active" : ""}
                    onClick={() => handleClick(item.id)}
                    key={index}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="top-categories_list row">
                  {listProducts.map(product => (
                    <ProductItem product={product} handleModalQuickView={handleQuickView} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};
