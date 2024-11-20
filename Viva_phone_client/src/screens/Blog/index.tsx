import { ListBlog } from "../../components/Blog/ListBlog";
import PopularBlog from "../../components/Blog/PopularBlog";
import Breadcrumb from "../../components/Breadcrumb";
import "./blog.scss"
const BlogPage = () => {
    const breadcrumbs = [
        { label: "Trang chủ", path: "/" },
        { label: "Tin tức", path: "/news" },
      ];

    return (
        <>
            <div className="div-empty"></div>
            <div className="blog-page container mt-3">
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <div className="title mt-5">Tin tức nổi bật</div>
                <div className="mt-4">
                    <PopularBlog />
                </div>
                <div className="list-blogs mt-4">
                    <ListBlog />
                </div>
            </div>
        </>
    );
};

export default BlogPage;
