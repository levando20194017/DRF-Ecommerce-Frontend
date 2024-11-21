import { ListBlog } from "../../components/Blog/ListBlog";
import { HomeBanner } from "../../components/Home/HomeBanner";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
import TopCategories from "../../components/Home/TopCategories";
import { FaHandPointRight } from "react-icons/fa";
import './home.scss'
import { Link } from "react-router-dom";
import { Routes } from "../Routes";
export const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <TopCategories />
      <ProductCatgories />
      <div className="list-blogs container mt-5">
            <div className="title">Tin tức gần đây</div>
            <div className="text-center description">
                <p>
                    Tìm hiểu thêm nhiều thông tin về các sản phẩm mới nhất được cập nhật dưới đây
                </p>
            </div>
            <ListBlog />
      </div>
      <div className="contact-us container mt-4">
          <div className="frame-blur"></div>
          <div className="contact-title">
              Liên hệ với đội ngũ của chúng tôi
          </div>
          <Link to={Routes.Contact.path}>
            <div className="icon-arrow-right">
              <FaHandPointRight style={{fontSize:"64px"}}/>
            </div>
          </Link>
        </div>
    </div>
  );
};
