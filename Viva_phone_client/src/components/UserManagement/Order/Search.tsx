import React from 'react';
import './Order.scss';
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchOrder: React.FC = () => {
    return (
        <div className="form-input">
            <Space.Compact size="large" className='w-100'>
                <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm các đơn hàng ở đây..." />
            </Space.Compact>
        </div>
    );
};

export default SearchOrder;
