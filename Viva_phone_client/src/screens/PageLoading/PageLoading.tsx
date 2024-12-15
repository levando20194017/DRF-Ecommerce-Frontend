import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';
import './style.scss';
interface PageLoaderProps {
    loading: boolean;
    size?: number;
    color?: string;
}

const PageLoader: React.FC<any> = ({ size = 70, color = '#ff652f' }) => {
    return (
        <div className='loading-overlay'>
            <BounceLoader color={color} size={size} />
        </div>
    );
};

// const styles: React.CSSProperties = {
//   loaderContainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100vh', // Full page height
//     backgroundColor: '#f8f9fa', // Optional background
//   },
// };

export default PageLoader;
