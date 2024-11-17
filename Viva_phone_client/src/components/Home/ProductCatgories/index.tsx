import "../style.scss";
import "animate.css";
import { useState } from "react";
import img1 from "../../../assets/images/content.jpg";
import { ModalQuickView } from "../ModalQuickView";
import { ListProduct } from "./ListProduct";
export const ProductCatgories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleQuickView = () => {
    setIsOpenModal(true);
  };
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

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
            <div className="top-categories">
              <div className="title justify-content-center mt-5">
                Các sản phẩm của chúng tôi
              </div>
              <div className="categories-list d-flex justify-content-between col-6 offset-3">
                <div
                  className={activeIndex === 0 ? "active" : ""}
                  onClick={() => handleClick(0)}
                >
                  Product Name
                </div>
                <div
                  className={activeIndex === 1 ? "active" : ""}
                  onClick={() => handleClick(1)}
                >
                  Product Name
                </div>
                <div
                  className={activeIndex === 2 ? "active" : ""}
                  onClick={() => handleClick(2)}
                >
                  Product Name
                </div>
                <div
                  className={activeIndex === 3 ? "active" : ""}
                  onClick={() => handleClick(3)}
                >
                  Product Name
                </div>
              </div>
              {activeIndex === 0 && (
                <ListProduct handleQuickView={handleQuickView} />
              )}
              {activeIndex === 1 && (
                <ListProduct handleQuickView={handleQuickView} />
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};
