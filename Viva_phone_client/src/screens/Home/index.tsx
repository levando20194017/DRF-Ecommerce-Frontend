import { ListBlog } from "../../components/Blog/ListBlog";
import { HomeBanner } from "../../components/Home/HomeBanner";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
import TopCategories from "../../components/Home/TopCategories";
export const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <div data-aos="slide-up">
        <TopCategories />
      </div>
      <div data-aos="slide-up">
        <ProductCatgories />
      </div>
      <div data-aos="slide-up">
        <ListBlog />
      </div>
    </div>
  );
};
