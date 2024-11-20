import "../../style.scss";
import "animate.css";
import img1 from "../../../../assets/images/content.jpg";
import { ProductItem } from "./ProductItem";
export const ListProduct = (props: any) => {
  const handleModalQuickView = () => {
    props.handleQuickView();
  };
  const products = [
    {
        id: 1,
        name: "Painticks U Primer",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
        id: 2,
        name: "Painticks Clear Primer",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
        id: 3,
        name: "Painticks 800",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
        id: 4,
        name: "Painticks Water Primer",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
        id: 5,
        name: "Painticks Water Primer",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
        id: 6,
        name: "Painticks Water Primer",
        description: "Dược thiết kế để làm lớp lót cho bê mặt bê tông...",
        image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
];

  return (
    <div className="top-categories_list row">
      {products.map(product => (
        <ProductItem product={product} handleModalQuickView={handleModalQuickView}/>
      ))}
    </div>
  );
};
