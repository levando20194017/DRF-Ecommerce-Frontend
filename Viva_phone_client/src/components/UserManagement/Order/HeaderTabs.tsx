import React from 'react';

const HeaderTabs: React.FC = () => {
    const tabs = ["Tất cả", "Chờ xác nhận", "Vận chuyển", "Hoàn thành", "Đã hủy"];

    return (
        <div className="header-tabs">
            {tabs.map((tab, index) => (
                <button key={index} className={`tab ${index === 0 ? 'active' : ''}`}>
                    {tab}
                </button>
            ))}
            <div className='div-header-tab-empty'></div>
        </div>
    );
};

export default HeaderTabs;
