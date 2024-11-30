import client from "../axios/axiosClient"
interface GetCataLog {
    pageIndex: number;
    pageSize: number;
    level: number;
}

const apiGetCatalog = (data: GetCataLog) => {
    return client.get(`api/catalog/search-catalogs/?pageIndex=${data.pageIndex}&pageSize=${data.pageSize}&level=${data.level}`);
}

export {
    apiGetCatalog
}; 