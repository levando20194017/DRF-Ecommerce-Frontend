import { Link } from "react-router-dom";
import { Routes } from "../../screens/Routes";

interface Props {
    blog: Blog,
}

interface Blog {
    name: string,
    image: string,
    description: string
}

export const BlogItem = (props: Props) => {
const {blog} = props

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 top-categories_item mt-4">
        <Link to = "/news/:slug" style={{color:"#fff"}}>
        <div className="single-location mb-20">
            <div className="frame-blog-item">
                <div className="location-img">
                    <img src={blog.image} alt={blog.name} />
                </div>
                <div className="d-flex flex-column" style={{gap:"8px"}}>
                    <div className="blog-title">{blog.name}</div>
                    <div className="blog-description">{blog.description}</div>
                </div>
                <div className="blog-date">16/01/2024 . 01:28</div>
            </div>
        </div>
        </Link>
  </div>
  );
};
