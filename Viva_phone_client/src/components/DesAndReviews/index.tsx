import "./style.scss";
import { FC, useEffect, useRef, useState } from "react";
import logo4 from "../../assets/images/logo4.png";
export const DesAndReviews: FC<any> = ({ productDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSetActiveIndex = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = productDetail?.description; // Gán HTML vào phần tử thông qua innerHTML
    }
  }, [productDetail, activeIndex]);
  return (
    <div className="des-and-reviews mt-5">
      <div className="title">
        <ul className="nav justify-content-center">
          <li
            className={activeIndex === 0 ? "nav-item active" : "nav-item"}
            onClick={() => handleSetActiveIndex(0)}
          >
            Description
          </li>
          <li
            className={activeIndex === 1 ? "nav-item active" : "nav-item"}
            onClick={() => handleSetActiveIndex(1)}
          >
            Reviews (99)
          </li>
        </ul>
      </div>
      {activeIndex === 0 && (
        <div className="des">
          <div className="car-body p-3" ref={contentRef}>
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        <div className="reviews p-3">
          <div className="card-body">
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div>
                    <img
                      className="headerUser-right-avt rounded-circle"
                      src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
                      alt="avatar"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="px-2">
                    <div>
                      <b style={{ fontSize: "18px" }}>Lê Văn Do</b>
                    </div>
                    <div>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                </div>
                <div className="d-flex action-review">
                  <div className="dropdown option-review">
                    <a
                      href="#"
                      className="text-secondary btn btn-secondary-soft-hover px-2"
                      id="cardFeedAction"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="cardFeedAction"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <i className="bi bi-trash3 pe-2"></i>Delete review
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <i className="bi bi-flag fa-fw pe-2"></i>Report post
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-5 py-1">
                <div className="review-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  harum cum distinctio, at accusantium nam pariatur omnis quod
                  corporis temporibus fugit ab quas facilis tempora iste commodi
                  impedit odio ex?
                </div>
                <div className="mt-1">
                  <span className=" text-secondary">20/7/2023 10:30</span>
                  <span className=" reply">Reply</span>
                </div>
                <div>
                  <div className="d-flex justify-content-between mt-2">
                    <div className="d-flex admin">
                      <div>
                        <img
                          className="headerUser-right-avt rounded-circle"
                          src={logo4}
                          alt="avatar"
                          width={50}
                          height={50}
                          style={{ border: "1px solid #ff652f" }}
                        />
                      </div>
                      <div className="px-2 d-flex justify-content-center align-items-center">
                        <b>VIVA PHONE</b>
                      </div>
                    </div>
                  </div>
                  <div className="px-5">
                    <div className="review-content">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequatur ipsa facilis eius, soluta accusantium neque
                      modi aut veritatis dolore qui hic tempore voluptatem. Quos
                      quasi dolorem voluptatum at recusandae rerum.
                    </div>
                    <div className="mt-1">
                      <span className="text-secondary">20/7/2023 12:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div>
                    <img
                      className="headerUser-right-avt rounded-circle"
                      src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
                      alt="avatar"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="px-2">
                    <div>
                      <b style={{ fontSize: "18px" }}>Lê Văn Do</b>
                    </div>
                    <div>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i
                        className="bi bi-star-fill"
                        style={{ color: "orange" }}
                      ></i>
                      <i className="bi bi-star"></i>
                    </div>
                  </div>
                </div>
                <div className="d-flex action-review">
                  <div className="dropdown option-review">
                    <a
                      href="#"
                      className="text-secondary btn btn-secondary-soft-hover px-2"
                      id="cardFeedAction"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="cardFeedAction"
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <i className="bi bi-trash3 pe-2"></i>Delete review
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <i className="bi bi-flag fa-fw pe-2"></i>Report post
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-5 py-1">
                <div className="review-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  harum cum distinctio, at accusantium nam pariatur omnis quod
                  corporis temporibus fugit ab quas facilis tempora iste commodi
                  impedit odio ex?
                </div>
                <div className="mt-1">
                  <span className=" text-secondary">20/7/2023 10:30</span>
                  <span className="reply">Reply</span>
                </div>
                <div>
                  <div className="d-flex justify-content-between mt-2">
                    <div className="d-flex admin">
                      <div>
                        <img
                          className="headerUser-right-avt rounded-circle"
                          src={logo4}
                          alt="avatar"
                          width={50}
                          height={50}
                          style={{ border: "1px solid #ff652f" }}
                        />
                      </div>
                      <div className="px-2 d-flex justify-content-center align-items-center">
                        <b>VIVA PHONE</b>
                      </div>
                    </div>
                  </div>
                  <div className="px-5">
                    <div className="review-content">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consequatur ipsa facilis eius, soluta accusantium neque
                      modi aut veritatis dolore qui hic tempore voluptatem. Quos
                      quasi dolorem voluptatum at recusandae rerum.
                    </div>
                    <div className="mt-1">
                      <span className="text-secondary">20/7/2023 12:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
