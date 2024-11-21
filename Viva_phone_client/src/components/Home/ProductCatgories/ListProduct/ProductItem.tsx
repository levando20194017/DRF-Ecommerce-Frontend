import { Link } from "react-router-dom";
import { Routes } from "../../../../screens/Routes";
import "../../style.scss";
interface Props {
  product: Product,
  handleModalQuickView: () => void
}

interface Product {
  name: string,
  image: string,
  price: string,
  promotion: string,
  description: string
}

export const ProductItem = (props: Props) => {
  const { product, handleModalQuickView } = props
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item mt-4">
      <div className="single-location mb-20">
        <div className="frame-product">
          <div className="location-img">
            <img src={product.image} alt={product.name} />
            <div className="item-actions">
              <Link to={Routes.AddToCart.path} style={{ color: "#fff" }}>
                <div
                  className="quick-view"
                >
                  <i className="bi bi-eye-fill"></i>
                </div>
              </Link>
              <div className="add-to-cart" onClick={() => {
                handleModalQuickView();
              }}>
                <i className="bi bi-cart4"></i>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-start flex-column align-items-start gap-1">
            <h4 className="product-name">{product.name}</h4>
            <div className="product-more-infor">
              <div className="fw-bold" style={{ color: "red", fontSize: "16px" }}>{product.price}</div>
              <div>Ưu đãi: {product.promotion}</div>
              <div>{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
