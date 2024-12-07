import { useParams } from "react-router-dom";
import BlogContent from "../../../components/Blog/BlogContent";
import { ListBlog } from "../../../components/Blog/ListBlog";
import ListBlogsPopular from "../../../components/Blog/ListBlogsPopular";
import Breadcrumb from "../../../components/Breadcrumb";
import { Routes } from "../../Routes";

const BlogDetail = () => {
    const { slug } = useParams<string>()
    const breadcrumbs = [
        { label: "Trang chủ", path: Routes.HomePage.path },
        { label: "Tin tức", path: Routes.News.path },
        { label: `${slug}` },
    ];

    return (
        <>
            <div className="div-empty"></div>
            <div className="blog-page container mt-3">
                <Breadcrumb breadcrumbs={breadcrumbs} />
                <div className="row mt-5">
                    <div className="col-md-8">
                        <BlogContent />
                    </div>
                    <div className="col-md-4">
                        <ListBlogsPopular />
                    </div>
                </div>

                <div className="title mt-5">Tin tức khác</div>
                <div className="mt-4">
                </div>
                <div className="list-blogs mt-4">
                    <ListBlog />
                </div>
            </div>
        </>
    );
};

export default BlogDetail;
