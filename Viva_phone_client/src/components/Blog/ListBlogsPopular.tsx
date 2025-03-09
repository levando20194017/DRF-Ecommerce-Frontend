import React, { useEffect, useState } from 'react';
import { apiGetListHotBlogs } from '../../services/blog';
import { getImageUrl } from '../../helps/getImageUrl';
import { formatTime } from '../../utils/format';
import { truncateString } from '../../helps/truncateString';
import { Link } from 'react-router-dom';

const ListBlogsPopular: React.FC = () => {
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
                                    <img src={(article.image)} className='img-blog-popular' alt='image' />
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
