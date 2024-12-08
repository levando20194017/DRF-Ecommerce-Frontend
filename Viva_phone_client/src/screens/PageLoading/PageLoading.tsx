import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader';

interface PageLoaderProps {
    loading: boolean;
    size?: number;
    color?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({ loading, size = 60, color = '#36d7b7' }) => {
    return (
        <div>
            <BounceLoader color={color} loading={loading} size={size} />
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
