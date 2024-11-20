import { Pagination } from 'antd';

interface Props{
    totalRecord: number;
    pageSize: number;
    pageIndex: number;
    setPageSize: (size: number) => void;
    setPageIndex: (index: number) => void;
}
const PaginationCommon = (props: Props) => {
    const { totalRecord, pageSize = 10, pageIndex, setPageSize, setPageIndex } = props
    const handlePageChange = (page: number, pageSize:number) => {
        setPageIndex(page); // Cập nhật pageIndex khi người dùng thay đổi trang
        setPageSize(pageSize); // Nếu muốn cập nhật cả pageSize
    };
    return (
        <Pagination
            total={totalRecord}
            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
            pageSize={pageSize}
            current={pageIndex}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={['10']}
        />
    );
}
export default PaginationCommon;