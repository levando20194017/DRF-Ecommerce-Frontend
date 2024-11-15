import "../../style.scss";
import "animate.css";
import { useSpring, animated } from "@react-spring/web";
import React, { useState, useEffect } from "react";
import img1 from "../../../../assets/images/content.jpg";
export const ListProduct = (props: any) => {
  const handleModalQuickView = () => {
    props.handleQuickView();
  };
  return (
    <div className="top-categories_list row">
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
        data-aos="zoom-out-up">
        <div className="single-location mb-20">
          <div className="location-img">
            <img src={img1} alt="" />
          </div>
          <div className="item-actions">
            <div
              className="quick-view"
              onClick={() => {
                handleModalQuickView();
              }}
            >
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
      <div
        className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item"
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
          <h6 style={{ color: "red", fontWeight: "bold" }}>299.000đ</h6>
        </div>
      </div>
    </div>
  );
};
