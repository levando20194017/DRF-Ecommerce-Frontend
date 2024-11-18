import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./style.scss";
import { useEffect, useState, FC } from "react";
import logo4 from "../../../assets/images/logo4.png";
import { Routes } from "../../../screens/Routes";

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "TRANG CHỦ", link: Routes.HomePage.path },
    { name: "CỬA HÀNG", link: Routes.Store.path },
    { name: "TIN TỨC", link: Routes.News.path },
    { name: "LIÊN HỆ", link: Routes.Contact.path },
  ];

  const renderMenu = () =>
    menuItems.map((item, index) => (
      <Link to={item.link} key={index}>
        <li
          className={activeIndex === index ? "active" : ""}
          onClick={() => setActiveIndex(index)}
        >
          {item.name}
        </li>
      </Link>
    ));

  const renderHeaderContent = (isSticky = false) => (
    <Navbar className={`d-flex ${isSticky ? "navbar_header3" : "navbar_header2"}`}>
      <div className="header_left col-xl-3 col-lg-2">
        <div className="brand">
          <img
            className="headerUser-right-avt rounded-circle"
            src={logo4}
            alt="logo"
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
        <ul>{renderMenu()}</ul>
      </div>
      <div className="header_right col-xl-2 col-lg-2 d-flex justify-content-end gap-4">
        <i className="bi bi-bell-fill"></i>
        <i className="bi bi-cart4"></i>
        <img
          className="headerUser-right-avt rounded-circle"
          src="https://th.bing.com/th/id/OIP.rzU5tlNULSLFeXggfJ352QHaNK?w=187&h=333&c=7&r=0&o=5&pid=1.7"
          alt="user avatar"
          width={40}
          height={40}
        />
      </div>
    </Navbar>
  );

  return (
    <div className="headerContainer">
      <Navbar className="header1 bg-dark justify-content-end">
        <div className="location">
          <i className="bi bi-geo-alt-fill"></i> 46 Ngõ 61 Định Công, Hoàng Mai, Hà Nội
        </div>
        <div className="welcome">
          Xin chào{" "}
          <span style={{ color: "#ff652f", fontWeight: "600", marginLeft: "5px" }}>
            Lê Văn Do
          </span>
          !
        </div>
      </Navbar>
      <div className="header2">{renderHeaderContent()}</div>
      <header className={visible ? "header visible" : "header"}>
        {renderHeaderContent(true)}
      </header>
    </div>
  );
};

export default Header;
