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
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 6,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
    {
      id: 7,
      name: "Iphone 15 Plus 128GB",
      price: "22.990.000đ",
      promotion: "Phiếu giảm giá PK 150.000đ",
      description: "Trả góp 0%",
      image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    },
  ];

  return (
    <div className="top-categories_list row">
      {products.map(product => (
        <ProductItem product={product} handleModalQuickView={handleModalQuickView} />
      ))}
    </div>
  );
};
