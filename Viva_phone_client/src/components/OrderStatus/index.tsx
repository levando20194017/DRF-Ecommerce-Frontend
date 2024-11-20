import React, { useState, useEffect } from "react";
import "./style.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import img1 from "../../assets/images/content.jpg";
export const OrderStatus = () => {
  const [visibleIcons, setVisibleIcons] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIcons((prevVisibleIcons) => {
        if (prevVisibleIcons < 3) {
          return prevVisibleIcons + 1;
        } else {
          return 0;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="order-status">
      <div className="div-empty"></div>
      <section className="vh-100" style={{ backgroundColor: "#fff" }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12">
              <div
                className="card card-stepper text-black mt-5"
                style={{ borderRadius: "16px" }}
              >
                <div className="card-body p-5">
                  <div className="d-flex">
                    <div className=" product-information col-5">
                      <div className="d-flex">
                        <div>
                          <img src={img1} width={200} />
                        </div>
                        <div className="info px-2">
                          <h6 className="d-flex justify-content-center aligns-item-center">
                            Viva flower
                          </h6>
                          <hr />
                          <div>
                            <b>Price:</b>{" "}
                            <b style={{ color: "red" }}>229.000đ</b>
                          </div>
                          <div>
                            <b>Shipping fee: </b>{" "}
                            <b style={{ color: "red" }}>30.000đ</b>
                          </div>
                          <div>
                            <b>Destination:</b>{" "}
                            <span style={{ color: "gray" }}>
                              46 ngõ 61 Định Công, Hoàng Mai, Hà Nội
                            </span>
                          </div>
                          <div>
                            <b>Recipient's phone number:</b>{" "}
                            <span style={{ color: "gray" }}> 0987654321</span>
                          </div>
                          <div className="d-flex">
                            <b>Pay status:</b>
                            <div className="paid d-flex justify-content-center aligns-item-center mx-2">
                              PAID
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="icon-next col-2">
                      <i
                        className={`bi bi-chevron-right ${
                          visibleIcons >= 1 ? "visible" : ""
                        }`}
                      ></i>
                      <i
                        className={`bi bi-chevron-right ${
                          visibleIcons >= 2 ? "visible" : ""
                        }`}
                      ></i>
                      <i
                        className={`bi bi-chevron-right ${
                          visibleIcons >= 3 ? "visible" : ""
                        }`}
                      ></i>
                    </div>
                    <div className="shipper d-flex">
                      <div className="col-4">
                        <img
                          className="headerUser-right-avt rounded-circle"
                          src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
                          alt="avatar"
                          width={180}
                          height={220}
                        />
                        <div
                          className="justify-content-center aligns-item-center d-flex mt-2"
                          style={{ fontWeight: "bold", fontSize: "20px" }}
                        >
                          Shipper
                        </div>
                      </div>
                      <div className="shiper_info mx-3 col-8">
                        <h5>Lê Văn Do</h5>
                        <div>
                          <b>4.9</b>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                          <i className="bi bi-star-fill"></i>
                        </div>
                        <div>
                          <b>Phone number: </b>{" "}
                          <span style={{ color: "gray" }}>0123456789</span>
                        </div>
                        <div>
                          <b>Note: </b>
                          <span style={{ color: "gray" }}>
                            {" "}
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Et neque distinctio voluptatem iusto eos!
                            Laborum tenetur, necessitatibus numquam perspiciatis
                            nisi enim voluptatum? Asperiores, omnis inventore
                            soluta ipsa ullam neque consectetur!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h6 className="d-flex justify-content-center aligns-item-center mt-5">
                    ORDER STATUS
                  </h6>
                  <ul
                    id="progressbar-2"
                    className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2 mt-5"
                  >
                    <li className="step0 active text-center" id="step1"></li>
                    <li className="step0 active text-center" id="step2"></li>
                    <li className="step0 active text-center" id="step3"></li>
                    <li className="step0 text-muted text-end" id="step4"></li>
                  </ul>

                  <div className="d-flex justify-content-between">
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-clipboard-list fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Processed</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-box-open fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Shipped</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-shipping-fast fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">En Route</p>
                      </div>
                    </div>
                    <div className="d-lg-flex align-items-center">
                      <i className="fas fa-home fa-3x me-lg-4 mb-3 mb-lg-0"></i>
                      <div>
                        <p className="fw-bold mb-1">Order</p>
                        <p className="fw-bold mb-0">Arrived</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
