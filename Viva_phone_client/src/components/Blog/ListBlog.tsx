import { useEffect, useState } from "react";
import { BlogItem } from "./BlogItem";
import "./style.scss"
import { apiGetBlogs } from "../../services/blog";

export const ListBlog = () => {
    // const listBlogs = [
    //     {
    //         id: 1,
    //         name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
    //         description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 2,
    //         name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
    //         description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 3,
    //         name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
    //         description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    //     {
    //         id: 4,
    //         name: "Tại sao Iphone 16 lại được thu hút nhiều giới trẻ hiện nay",
    //         description: "Kể từ khi chiếc iPhone đầu tiên được giới thiệu vào năm 2007, nó đã không chỉ trở thành một thiết bị tiện ích,",
    //         image: "https://th.bing.com/th/id/OIP.NNV6upXq_hxGvx9xeVSQ_wHaEK?rs=1&pid=ImgDetMain",
    //     },
    // ]
    const [listBlogs, setListBlogs] = useState<any[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();

    const handleGetListBlogs = async () => {
        try {
            const res = await apiGetBlogs({
                pageIndex: 1,
                pageSize: 10,
            }) as any
            if (res.status == 200) {
                setListBlogs(res.data.blogs)
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        handleGetListBlogs()
    }, [])
    return (
        <div className="row">
            {listBlogs.map(blog => (
                <BlogItem blog={blog} />
            ))}
        </div>
    );
};
