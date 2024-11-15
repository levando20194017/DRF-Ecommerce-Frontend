import { HomeBanner } from "../../components/Home/HomeBanner";
import { HomeContentDiscount } from "../../components/Home/HomeContentDiscount";
import { ProductCatgories } from "../../components/Home/ProductCatgories";
export const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <HomeContentDiscount />
      <ProductCatgories />
    </div>
  );
};
