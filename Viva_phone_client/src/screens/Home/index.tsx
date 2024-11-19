import { ListBlog } from "../../components/Blog/ListBlog";
import { HomeBanner } from "../../components/Home/HomeBanner";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
import TopCategories from "../../components/Home/TopCategories";
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
    </div>
  );
};
