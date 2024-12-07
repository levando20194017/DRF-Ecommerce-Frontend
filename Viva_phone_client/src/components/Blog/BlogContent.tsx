import React, { useEffect, useRef, useState } from 'react';
import { apiGetDetailBlog } from '../../services/blog';
import { useParams } from 'react-router-dom';
import { formatTime } from '../../utils/format';
interface Blog {
    title: string,
    created_at: string,
    content: string,
}
const BlogContent: React.FC = () => {
    const [blogDetail, setBlogDetail] = useState<Blog>({
        title: "",
        created_at: "",
        content: "",
    })
    const contentRef = useRef<HTMLDivElement>(null);
    const { slug } = useParams<{ slug: string }>();

    const handleGetBlogDetail = async () => {
        if (!slug) {
            console.error("Slug is undefined");
            return;
        }
        try {
            const response = await apiGetDetailBlog(slug);
            if (response.status === 200) {
                setBlogDetail(response.data)
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        handleGetBlogDetail()
    }, [slug])

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerHTML = blogDetail.content; // Gán HTML vào phần tử thông qua innerHTML
        }
    }, [blogDetail]);

    return (
        <div className='blog-detail'>
            <h5 className='title'>{blogDetail.title}</h5>
            <div className='blog-detail_date'>{formatTime(blogDetail.created_at)}</div>
            <div className='mt-2'>
                <div ref={contentRef}></div>
            </div>
        </div>
    );
};

export default BlogContent;
