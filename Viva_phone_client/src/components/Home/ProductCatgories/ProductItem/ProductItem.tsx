import { Link } from "react-router-dom";
import { Routes } from "../../../../screens/Routes";
import "../../style.scss";
import { getImageUrl } from "../../../../helps/getImageUrl";
import { formatPrice } from "../../../../utils/format";
import { promotionType } from "../../../../utils/promotionType";
import { checkPromotionValid } from "../../../../helps/checkPormotionValid";

export const ProductItem = (props: any) => {
  const { product, handleModalQuickView } = props
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item mt-4">
      <div className="single-location mb-20">
        <div className="frame-product">
          <div className="location-img">
            <img src={getImageUrl(product.image)} alt={product.name} />
            <div className="item-actions">
              <Link to={Routes.AddToCart.getPath({ storeId: 1, productId: product.id, catalogId: product.catalog })} style={{ color: "#fff" }}>
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
              <div className="fw-bold" style={{ color: "red", fontSize: "16px" }}>{formatPrice(product.price)}</div>
              <div className='another-info'>Ưu đãi: {checkPromotionValid(product) ? product.promotion_name : "Không"}</div>
              {checkPromotionValid(product) && <div className='another-info'>
                Giảm giá:
                <span className="price">
                  {product.promotion_discount_type === promotionType.PERCENT ?
                    `${product.promotion_discount_value}%` :
                    `${formatPrice(product.promotion_discount_value)}`}
                </span>
              </div>}
              <div className="text-start">{product.short_description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
