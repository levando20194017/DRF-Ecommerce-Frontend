import { BlogItem } from "./BlogItem";
import "./style.scss"

export const ListBlog = () => {
    const listBlogs = [
        {
            id: 1,
            name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
            description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 2,
            name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
            description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 3,
            name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
            description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
        {
            id: 4,
            name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
            description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
            image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
        },
    ]
  return (
    <div className="list-blogs container mt-5">
        <div className="title">Tin tức gần đây</div>
        <div className="text-center description">
            <p>
                Tìm hiểu thêm nhiều thông tin về các sản phẩm mới nhất được cập nhật dưới đây
            </p>
        </div>
        <div className="row">
            {listBlogs.map(blog => (
                <BlogItem blog={blog} />
            ))}
        </div>
    </div>
  );
};
