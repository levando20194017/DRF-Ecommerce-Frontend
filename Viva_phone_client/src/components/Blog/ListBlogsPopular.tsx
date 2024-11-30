import React, { useEffect, useState } from 'react';
import { apiGetListHotBlogs } from '../../services/blog';
import { getImageUrl } from '../../helps/getImageUrl';
import { formatTime } from '../../utils/format';
import { truncateString } from '../../helps/truncateString';
import { Link } from 'react-router-dom';

const ListBlogsPopular: React.FC = () => {
    // const articles = [
    //     { title: "Nên sơn nhà vào mùa nào trong năm tốt nhất?", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
    //     { title: "Hướng dẫn sử dụng sơn chống thấm một cách hiệu quả", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
    //     { title: "Có nên sơn ngoại thất cho sơn nội thất được không?", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
    //     { title: "Tone màu sơn xu hướng, nổi bật trong năm 2024", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
    // ];
    const [listBlogs, setListBlogs] = useState<any[]>([]);

    const handleGetBlogDetail = async () => {
        try {
            const response = await apiGetListHotBlogs({ pageIndex: 1, pageSize: 10 })
            if (response.status === 200) {
                setListBlogs(response.data.blogs)
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        handleGetBlogDetail()
    }, [])


    return (
        <div className='list-blogs-popular'>
            <h5>Bài viết nổi bật</h5>
            <div>
                {listBlogs.map((article, index) => (
                    <Link to={`/news/${article.slug}`} style={{ color: "#fff" }}>
                        <div key={index} className="pb-4 mt-4 frame-blog-popular">
                            <div className='d-flex gap-3'>
                                <div className='frame-blog-image'>
                                    <img src={getImageUrl(article.image)} className='img-blog-popular' alt='image' />
                                </div>
                                <div>
                                    <div className='blog-popular-title'>{article.title}</div>
                                    <div className='blog-short-description'>{truncateString(article.short_description, 70)}</div>
                                    <div className="text-date">{formatTime(article.created_at)}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListBlogsPopular;
