import client from "../axios/axiosClient"
interface GetBlogData {
    pageIndex: number;
    pageSize: number;
}

const apiGetBlogs = (data: GetBlogData) => {
    return client.get(`api/blog/search-blogs/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}`);
}

const apiGetDetailBlog = (slug: string) => {
    return client.get(`api/blog/get-detail-blog/?slug=${slug}`);
}

export {
    apiGetBlogs,
    apiGetDetailBlog
}; 