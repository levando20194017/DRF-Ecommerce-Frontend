import { useEffect, useState } from "react";
import { BlogItem } from "./BlogItem";
import "./style.scss"
import { apiGetBlogs } from "../../services/blog";

export const ListBlog = () => {
    const [listBlogs, setListBlogs] = useState<any[]>([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRecords, setToalRecords] = useState();

    const handleGetListBlogs = async () => {
        try {
            const res = await apiGetBlogs({
                pageIndex: pageIndex,
                pageSize: pageSize,
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
