import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect, useState } from "react";
import logo4 from "../../assets/images/logo4.png";
export const Header = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 150) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="headerContainer">
      <Navbar className="header1 bg-dark justify-content-end">
        <div className="location">
          <i className="bi bi-geo-alt-fill"></i> 46 Ngõ 61 Định Công, Hoàng Mai,
          Hà Nội
        </div>
        <div className="welcome">
          Xin chào{" "}
          <span
            style={{ color: "#ff652f", fontWeight: "600", marginLeft: "5px" }}
          >
            Lê Văn Do
          </span>
          !
        </div>
      </Navbar>
      <div className="header2">
        <Navbar className="d-flex navbar_header2">
          <div className="header_left col-xl-3">
            <div className="brand">
              <img
                className="headerUser-right-avt rounded-circle"
                src={logo4}
                alt="avatar"
                width={85}
                height={80}
              />
            </div>
            <h2>
              <span>Viva</span>
              <span style={{ marginLeft: "15px" }}>Phone</span>
            </h2>
          </div>
          <div className="header_content col-xl-7">
            <ul>
              <Link to="/">
                <li
                  className={activeIndex === 0 ? "active" : ""}
                  onClick={() => handleClick(0)}
                >
                  TRANG CHỦ
                </li>
              </Link>
              <li
                className={activeIndex === 1 ? "active" : ""}
                onClick={() => handleClick(1)}
              >
                CỬA HÀNG
              </li>
              <li
                className={activeIndex === 2 ? "active" : ""}
                onClick={() => handleClick(2)}
              >
                BLOG
              </li>
              <li
                className={activeIndex === 3 ? "active" : ""}
                onClick={() => handleClick(3)}
              >
                LIÊN HỆ
              </li>
            </ul>
          </div>
          <div className="header_right col-xl-2 d-flex justify-content-end gap-4">
            <i className="bi bi-bell-fill"></i>
            <i className="bi bi-cart4"></i>
            <img
              className="headerUser-right-avt rounded-circle"
              src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div
            className="icon-navbar"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            {" "}
            <i className="fa fa-bars"></i>
          </div>
        </Navbar>
      </div>

      <header className={visible ? "header visible" : "header"}>
        <Navbar className="d-flex navbar_header3">
          <div className="header_left col-xl-3 col-lg-2">
            <div className="brand">
              <img
                className="headerUser-right-avt rounded-circle"
                src={logo4}
                alt="avatar"
                width={85}
                height={80}
              />
            </div>
            <h2>
              <span>Viva</span>
              <span style={{ marginLeft: "15px" }}>Phone</span>
            </h2>
          </div>
          <div className="header_content col-xl-7 col-lg-8">
            <ul>
              <Link to="/">
                <li
                  className={activeIndex === 0 ? "active" : ""}
                  onClick={() => handleClick(0)}
                >
                  TRANG CHỦ
                </li>
              </Link>
              <li
                className={activeIndex === 1 ? "active" : ""}
                onClick={() => handleClick(1)}
              >
                CỬA HÀNG
              </li>
              <li
                className={activeIndex === 2 ? "active" : ""}
                onClick={() => handleClick(2)}
              >
                BLOG
              </li>
              <li
                className={activeIndex === 3 ? "active" : ""}
                onClick={() => handleClick(3)}
              >
                LIÊN HỆ
              </li>
            </ul>
          </div>
          <div className="header_right col-xl-2 col-lg-2 d-flex justify-content-end gap-4">
            <i className="bi bi-bell-fill"></i>
            <i className="bi bi-cart4"></i>
            <img
              className="headerUser-right-avt rounded-circle"
              src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
        </Navbar>
      </header>

    </div>
  );
};
