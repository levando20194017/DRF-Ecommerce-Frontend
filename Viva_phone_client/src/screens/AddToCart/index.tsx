import { ProductDetail } from "../../components/ProductDetail";
import { RelatedProduct } from "../../components/RelatedProduct";
import { DesAndReviews } from "../../components/DesAndReviews";
const AddToCartPage = () => {
  return (
    <div>
      <ProductDetail />
      <DesAndReviews />
      <RelatedProduct />
    </div>
  );
};

export default AddToCartPage;
