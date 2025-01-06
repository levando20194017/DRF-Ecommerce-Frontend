import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import { AutoComplete } from "antd"; // Import các component cần thiết cho tìm kiếm
import "./style.scss";
import { useEffect, useState, FC, useRef } from "react";
import logo4 from "../../../assets/images/logo4.png";
import { Routes } from "../../../screens/Routes";
import Notification from "../../Notification";
import { apiSearchProductsInStore } from "../../../services/product";
import { getImageUrl } from "../../../helps/getImageUrl";
import { formatPrice } from "../../../utils/format";
import { checkPromotionValid } from "../../../helps/checkPormotionValid";
import { promotionType } from "../../../utils/promotionType";
import { useSelector } from "react-redux";
import { useHandleGetTotalUnnotification } from "../../../hook/GetTotalUnread";
import { useHandleGetTotalCart } from "../../../hook/GetTotalCart";
import Profile from "./Profile";
import { getUserData } from "../../../helps/getItemLocal";
import { useLoading } from "../../../context/LoadingContext";

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [textSearch, setTextSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); // Kết quả tìm kiếm
  const [searchInputVisible, setSearchInputVisible] = useState(false); // New state to control search input visibility
  const searchRef = useRef<HTMLDivElement | null>(null); // Thêm kiểu cho ref
  const location = useLocation(); // Lấy thông tin location hiện tại
  const total_unread = useSelector((state: any) => state.auth.total_unread);
  const total_cart = useSelector((state: any) => state.auth.total_cart);
  const { handleGetTotalUnnotification } = useHandleGetTotalUnnotification();
  const { handleGetTotalCart } = useHandleGetTotalCart();
  const userData = getUserData()
  const { setLoading } = useLoading();

  useEffect(() => {
    const handleScroll = () => setVisible(window.pageYOffset > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng form search khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchInputVisible(false); // Đóng search khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    handleGetTotalUnnotification();
    handleGetTotalCart();
  }, [])

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

  const handleSearch = async (value: string) => {
    setTextSearch(value)
  };

  const handleGetListProduct = async (name: string) => {
    try {
      const response = await apiSearchProductsInStore({
        pageIndex: 1, pageSize: 20, textSearch: name, storeId: 1
      }) as any
      if (response.status === 200) {
        setSearchResults(response.data.products)
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (searchInputVisible) {
      handleGetListProduct(textSearch)
    }
  }, [textSearch, searchInputVisible])

  const toggleSearchInput = () => {
    setSearchInputVisible(!searchInputVisible); // Toggle search input visibility
  };
  const navigate = useNavigate()
  const handleClickItemProduct = (product: any) => {
    setTextSearch("");
    if (product?.id) {
      navigate(Routes.AddToCart.getPath({ storeId: 1, productId: product.id, catalogId: product.catalog }))
    }
  }
  const handleLinkCart = () => {
    if (userData?.id) {
      setLoading(true)
    }
    navigate(Routes.Cart.path)
  }

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
            style={{ width: 500, position: "absolute", top: "40px", right: "0", zIndex: 9999 }}
            onSearch={handleSearch}
            onSelect={() => { }}
            value={textSearch}
            className={`${searchInputVisible ? "active form-search" : "form-search"}`}
            placeholder="Tìm kiếm sản phẩm"
            autoFocus
          >
            {searchResults.map((result) => (
              <AutoComplete.Option key={result.id}>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="justity-content-between"
                  onClick={() => { handleClickItemProduct(result.product) }}>
                  <div className="d-flex">
                    <img
                      src={getImageUrl(result.product.image)}
                      alt={result.product.name}
                      style={{ width: 50, height: 50, marginRight: 10 }}
                    />
                    <div>
                      <strong>{result.product.name}</strong>
                      <div><span>Ưu đãi:</span> <span className="price">{checkPromotionValid(result.product) ?
                        result.product.promotion_discount_type === promotionType.PERCENT ?
                          `${result.product.promotion_discount_value}%` :
                          `${formatPrice(result.product.promotion_discount_value)}` : <span style={{ color: "gray" }}>Không</span>}</span></div>
                      <div className="price">{formatPrice(result.product.price)}</div>
                    </div>
                  </div>
                  <div className="price">
                    {!result.remaining_stock && "Hết hàng"}
                  </div>
                </div>
              </AutoComplete.Option>
            ))}
          </AutoComplete>
        </div>
        <Notification total_unread={total_unread} />
        <div onClick={handleLinkCart} className={`${location.pathname === Routes.Cart.path ? "frame-cart-icon active" : "frame-cart-icon"}`}>
          <i className="bi bi-cart4"></i>
          {total_cart > 0 ?
            <div className="total_item">{total_cart}</div>
            :
            ""}
        </div>
        <Profile />
      </div>
    </Navbar>
  );

  return (
    <div className="headerContainer">
      <Navbar className="header1 bg-dark justify-content-end">
        <div className="location">
          <i className="bi bi-geo-alt-fill"></i> 46 Ngõ 61 Định Công, Hoàng Mai, Hà Nội
        </div>
        {userData?.id &&
          <div className="welcome">
            Xin chào{" "}
            <span style={{ color: "#ff652f", fontWeight: "600", marginLeft: "5px" }}>
              {userData?.last_name + " " + userData?.first_name}
            </span>
            !
          </div>
        }
      </Navbar>
      <div className="header2">{renderHeaderContent()}</div>
      <header className={visible ? "header visible" : "header"}>{renderHeaderContent(true)}</header>
    </div>
  );
};

export default Header;
