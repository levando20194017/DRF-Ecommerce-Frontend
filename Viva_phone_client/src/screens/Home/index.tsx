import { HomeBanner } from "../../components/Home/HomeBanner";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
import TopCategories from "../../components/Home/TopCategories";
export const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <TopCategories />
      <ProductCatgories />
    </div>
  );
};
