import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Input, AutoComplete } from "antd"; // Import các component cần thiết cho tìm kiếm
import "./style.scss";
import { useEffect, useState, FC, useRef } from "react";
import logo4 from "../../../assets/images/logo4.png";
import { Routes } from "../../../screens/Routes";
import Notification from "../../Notification";

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchResults, setSearchResults] = useState<any[]>([]); // Kết quả tìm kiếm
  const [searchInputVisible, setSearchInputVisible] = useState(false); // New state to control search input visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Điều khiển mở/đóng search
  const searchRef = useRef<HTMLDivElement | null>(null); // Thêm kiểu cho ref
  const location = useLocation(); // Lấy thông tin location hiện tại

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "TRANG CHỦ", link: Routes.HomePage.path },
    { name: "CỬA HÀNG", link: Routes.Store.path },
    { name: "TIN TỨC", link: Routes.News.path },
    { name: "LIÊN HỆ", link: Routes.Contact.path },
  ];

  // Cập nhật activeIndex dựa trên pathname
  useEffect(() => {
    const currentIndex = menuItems.findIndex(
      (item) => item.link === location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, menuItems]);

  const renderMenu = () =>
    menuItems.map((item, index) => (
      <Link to={item.link} key={index}>
        <li
          className={activeIndex === index ? "active" : ""}
          onClick={() => setActiveIndex(index)} // Không cần bắt buộc nếu `activeIndex` đã dựa trên `location.pathname`
        >
          {item.name}
        </li>
      </Link>
    ));

  const handleSearch = (value: string) => {
    // Giả sử bạn có một hàm fetch dữ liệu tìm kiếm sản phẩm từ API
    if (value) {
      setSearchResults([
        { id: 1, name: "Sản phẩm A", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", price: "22,200,000 VND" },
        { id: 2, name: "Sản phẩm B", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", price: "13,300,000 VND" },
        // Thêm các sản phẩm vào đây...
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible); // Toggle search input visibility
  };

  const renderHeaderContent = (isSticky = false) => (
    <Navbar className={`d-flex ${isSticky ? "navbar_header3" : "navbar_header2"}`}>
      <Link to={Routes.HomePage.path}>
        <div className="header_left col-xl-3 col-lg-2">
          <div className="brand">
            <img
              className="headerUser-right-avt rounded-circle"
              src={logo4}
              alt="logo"
              width={85}
              height={80}
              style={{ minWidth: "85px" }}
            />
          </div>
          <h2>
            <span>Viva</span>
            <span style={{ marginLeft: "15px" }}>Phone</span>
          </h2>
        </div>
      </Link>
      <div className="header_content col-xl-7 col-lg-8">
        <ul>{renderMenu()}</ul>
      </div>
      <div className="header_right col-xl-2 col-lg-2 d-flex justify-content-end gap-4 align-items-center">
        <div className="search-container" style={{ position: "relative" }} ref={searchRef}>
          <i
            className="bi bi-search"
            style={{ cursor: "pointer" }}
            onClick={toggleSearchInput} // Toggle search input visibility
          />
          <AutoComplete
            style={{ width: 300, position: "absolute", top: "40px", right: "0" }}
            onSearch={handleSearch}
            className={`${searchInputVisible ? "active form-search" : "form-search"}`}
            placeholder="Tìm kiếm sản phẩm"
          >
            {searchResults.map((result) => (
              <AutoComplete.Option key={result.id} value={result.name}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={result.image}
                    alt={result.name}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <div>
                    <strong>{result.name}</strong>
                    <div className="text-danger">{result.price}</div>
                  </div>
                </div>
              </AutoComplete.Option>
            ))}
          </AutoComplete>

        </div>
        <Notification />
        <Link to={Routes.Cart.path}>
          <div className={`${location.pathname === Routes.Cart.path ? "frame-cart-icon active" : "frame-cart-icon"}`}>
            <i className="bi bi-cart4"></i>
          </div>
        </Link>
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
      <header className={visible ? "header visible" : "header"}>{renderHeaderContent(true)}</header>
    </div>
  );
};

export default Header;
