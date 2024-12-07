import { Link } from "react-router-dom";
import { Routes } from "../../screens/Routes";
import { formatTime } from "../../utils/format";
import { Image } from "antd";
import { getImageUrl } from "../../helps/getImageUrl";

interface Props {
    blog: Blog,
}

interface Blog {
    title: string,
    slug: string,
    image: string,
    short_description: string,
    created_at: string,
}

export const BlogItem = (props: Props) => {
    const { blog } = props

    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 top-categories_item mt-4">
            <Link to={`/news/${blog.slug}`} style={{ color: "#fff" }}>
                <div className="single-location-blog mb-20">
                    <div className="frame-blog-item">
                        <div className="location-img">
                            <img src={getImageUrl(blog.image)} alt={blog.title} />
                        </div>
                        <div className="d-flex flex-column" style={{ gap: "8px" }}>
                            <div className="blog-title">{blog.title}</div>
                            <div className="blog-description">{blog.short_description}</div>
                        </div>
                        <div className="blog-date">{formatTime(blog.created_at)}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
