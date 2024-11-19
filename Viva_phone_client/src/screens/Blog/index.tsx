import PopularBlog from "../../components/Blog/PopularBlog";

const BlogPage = () => {

    return (
        <>
            <div className="div-empty"></div>
            <div className="blog-page container">
                <div className="title">Tin tức nổi bật</div>
                <div>
                    <PopularBlog />
                </div>
            </div>
        </>
    );
};

export default BlogPage;
