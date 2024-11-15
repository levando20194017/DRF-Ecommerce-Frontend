import "../style.scss";
import "animate.css";
import { useSpring, animated } from "@react-spring/web";
import React, { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiTruckDelivery } from "@mdi/js";
import { mdiPhoneInTalk } from "@mdi/js";
import { mdiReload } from "@mdi/js";
import { mdiCog } from "@mdi/js";
import img1 from "../../../assets/images/content.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { ModalQuickView } from "../ModalQuickView";
import { ListProduct } from "./ListProduct";
AOS.init({
  offset: 100,
  duration: 200,
  easing: "ease-in-sine",
  delay: 100,
});
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
      <div className="hstack gap-2 gap-xl-5 justify-content-center mt-3 list-service">
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
      </div>

      <main>
        <section className="home-cl section-padding">
          <section className="popular-location section-padding">
            <div className="container">
              <div className="top-categories">
                <div className="title justify-content-center mt-5">
                  Top Categories
                </div>
                <div className="top-categories_list row">
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 top-categories_item"
                    data-aos="zoom-out-up"
                  >
                    <div className="single-location mb-20">
                      <div className="location-img">
                        <img src={img1} alt="" />
                      </div>
                      <div className="item-actions">
                        <div className="quick-view">
                          <i className="bi bi-eye-fill"></i>
                        </div>
                        <div className="add-to-cart">
                          <i className="bi bi-cart4"></i>
                        </div>
                      </div>
                    </div>
                    <div className="top-categories_item_detail">
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          4.9
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <div>249 Đã bán</div>
                      </div>
                      <h6 className="mt-2" style={{ fontSize: "20px" }}>
                        Viva flower
                      </h6>
                      <h6 style={{ color: "red", fontWeight: "bold" }}>
                        299.000đ
                      </h6>
                    </div>
                  </div>
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 top-categories_item"
                    data-aos="zoom-out-up"
                  >
                    <div className="single-location mb-20">
                      <div className="location-img">
                        <img src={img1} alt="" />
                      </div>
                      <div className="item-actions">
                        <div className="quick-view">
                          <i className="bi bi-eye-fill"></i>
                        </div>
                        <div className="add-to-cart">
                          <i className="bi bi-cart4"></i>
                        </div>
                      </div>
                    </div>
                    <div className="top-categories_item_detail">
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          4.9
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <div>249 Đã bán</div>
                      </div>
                      <h6 className="mt-2" style={{ fontSize: "20px" }}>
                        Viva flower
                      </h6>
                      <h6 style={{ color: "red", fontWeight: "bold" }}>
                        299.000đ
                      </h6>
                    </div>
                  </div>
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 top-categories_item"
                    data-aos="zoom-out-up"
                  >
                    <div className="single-location mb-20">
                      <div className="location-img">
                        <img src={img1} alt="" />
                      </div>
                      <div className="item-actions">
                        <div className="quick-view">
                          <i className="bi bi-eye-fill"></i>
                        </div>
                        <div className="add-to-cart">
                          <i className="bi bi-cart4"></i>
                        </div>
                      </div>
                    </div>
                    <div className="top-categories_item_detail">
                      <div className="d-flex justify-content-between mt-3">
                        <div>
                          4.9
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <div>249 Đã bán</div>
                      </div>
                      <h6 className="mt-2" style={{ fontSize: "20px" }}>
                        Viva flower
                      </h6>
                      <h6 style={{ color: "red", fontWeight: "bold" }}>
                        299.000đ
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-categories">
                <div className="title justify-content-center mt-5">
                  Featured Products
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
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};
