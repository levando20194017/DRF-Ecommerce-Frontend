import "../../style.scss";
interface Props {
    product: Product,
    handleModalQuickView: ()=> void
  }

  interface Product {
    name: string,
    image: string,
    description: string
}

export const ProductItem = (props: Props) => {
    const {product, handleModalQuickView} = props
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 top-categories_item mt-4">
    <div className="single-location mb-20">
        <div className="carousel-slide">
       <div className="location-img">
          <img src={product.image} alt={product.name} />
          <div className="item-actions">
            <div
              className="quick-view"
              onClick={() => {
                handleModalQuickView();
              }}
            >
              <i className="bi bi-eye-fill"></i>
            </div>
              <div className="add-to-cart">
                <i className="bi bi-cart4"></i>
              </div>
          </div>
       </div>
           <h4>{product.name}</h4>
           <p>{product.description}</p>
         </div>
    </div>
  </div>
  );
};
