import "../../style.scss";
import "animate.css";
import img1 from "../../../../assets/images/content.jpg";
import { ProductItem } from "./ProductItem";
export const ListProduct = (props: any) => {
  const handleModalQuickView = () => {
    props.handleQuickView();
  };

  const { listRelatedProducts } = props;

  return (
    <div className="top-categories_list row">
      {listRelatedProducts.map((product: any) => (
        <ProductItem product={product} handleModalQuickView={handleModalQuickView} />
      ))}
    </div>
  );
};
