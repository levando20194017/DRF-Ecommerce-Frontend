import { ProductCatgories } from "../../components/Home/ProductCatgories";
import { RelatedProduct } from "../../components/RelatedProduct";
import './style.scss'
const StorePage = () => {

    return (
        <>
            <div className="div-empty"></div>
            <div className="container store-page">
                <ProductCatgories />
                <RelatedProduct />
            </div>
        </>
    );
};

export default StorePage;
