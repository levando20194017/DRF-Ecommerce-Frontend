import React from 'react';
import { Pagination } from 'antd';
const PaginationCommon = ({ totalRecord, pageSize, pageIndex, setPageSize, setPageIndex }) => {
    const handlePageChange = (page, pageSize) => {
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
        />
    );
}
export default PaginationCommon;