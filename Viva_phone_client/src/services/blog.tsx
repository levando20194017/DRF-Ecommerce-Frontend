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

const apiGetListHotBlogs = (data: GetBlogData) => {
    return client.get(`api/blog/search-blogs/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&order_by=views`);
}

export {
    apiGetBlogs,
    apiGetDetailBlog,
    apiGetListHotBlogs
}; 