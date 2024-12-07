import { Link } from "react-router-dom";
import "./style.scss"
import { apiGetListHotBlogs } from "../../services/blog";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../helps/getImageUrl";
import { formatTime } from "../../utils/format";

interface PopularBlog {
  slug: string,
  title: string,
  image: string,
  created_at: string,
  short_description: string
}
const PopularBlog = () => {
  const [popularBlog, setPopularBlog] = useState<PopularBlog>({
    slug: "",
    title: "",
    image: "",
    created_at: "",
    short_description: ""
  });

  const handleGetBlogDetail = async () => {
    try {
      const response = await apiGetListHotBlogs({ pageIndex: 1, pageSize: 1 })
      if (response.status === 200) {
        if (response.data.blogs.length > 0) {
          setPopularBlog(response.data.blogs[0])
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    handleGetBlogDetail()
  }, [])

  return (
    <Link to={`/news/${popularBlog.slug}`} style={{ color: "#fff" }}>
      <div className="news-card">
        <img
          className="news-image"
          src={getImageUrl(popularBlog.image)}
          alt={popularBlog.title}
        />
        <div className="news-content">
          <h2 className="news-title">
            {popularBlog.title}
          </h2>
          <p className="news-description">
            {popularBlog.short_description}
          </p>
          <div className="news-date">{formatTime(popularBlog.created_at)}</div>
        </div>
      </div>
    </Link>
  );
};

export default PopularBlog;
