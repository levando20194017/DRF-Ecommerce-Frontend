import React, { useState } from 'react';
import './style.scss'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
export default ({ title, handleClick, imgLink, isDisable, BgColor, colorHover, fontColor, borderColor, width, icon, loading }) => {
    const [isHoverButton, setIsHoverButton] = useState(false);

    const handleMouseEnterButton = () => {
        setIsHoverButton(true);
    };
    const handleMouseLeaveButton = () => {
        setIsHoverButton(false);
    };

    return (
        <button className="btn-icon" onClick={handleClick}
            disabled={isDisable}
            onMouseEnter={handleMouseEnterButton}
            onMouseLeave={handleMouseLeaveButton}
            style={{
                opacity: isDisable ? 0.5 : 1,
                cursor: `${isDisable ? "default" : "pointer"}`,
                color: fontColor,
                width,
                backgroundColor: `${!isDisable
                    ? isHoverButton
                        ? colorHover || "#1a65f5"
                        : BgColor || "#1890FF"
                    : BgColor || "#1890FF"
                    }`,
                border: `${borderColor ? `1px solid ${borderColor}` : "1px solid #1890FF"}`
            }}>
            {loading ?
                <Spin style={{ color: "#fff" }} indicator={<LoadingOutlined spin />} />
                :
                <>
                    <div>{title}</div>
                    {imgLink && <div><img src={imgLink} alt='icon' width={20} height={20} /></div>}
                    {icon}
                </>
            }
        </button>
    )
}