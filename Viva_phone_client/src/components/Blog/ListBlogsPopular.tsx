import React from 'react';

const ListBlogsPopular: React.FC = () => {
    const articles = [
        { title: "Nên sơn nhà vào mùa nào trong năm tốt nhất?", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
        { title: "Hướng dẫn sử dụng sơn chống thấm một cách hiệu quả", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
        { title: "Có nên sơn ngoại thất cho sơn nội thất được không?", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
        { title: "Tone màu sơn xu hướng, nổi bật trong năm 2024", date: "16/01/2024 - 01:28", image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain", },
    ];

    return (
        <div className='list-blogs-popular'>
            <h5>Bài viết nổi bật</h5>
            <div>
                {articles.map((article, index) => (
                    <div key={index} className="pb-4 mt-4 frame-blog-popular">
                        <div className='d-flex gap-2'>
                            <div>
                                <img src={article.image} className='img-blog-popular' alt='image' />
                            </div>
                            <div>
                                <div className='blog-popular-title'>{article.title}</div>
                                <br />
                                <div className="text-date">{article.date}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListBlogsPopular;
