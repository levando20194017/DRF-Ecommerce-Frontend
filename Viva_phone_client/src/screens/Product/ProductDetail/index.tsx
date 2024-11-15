import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>Product detail - item No. {id}</h1>
    </div>
  );
};

export default ProductDetail;
