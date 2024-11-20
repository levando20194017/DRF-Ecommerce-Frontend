import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Rate } from 'antd';

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Vị trí mặc định
const defaultLocation = {
  lat: 20.980705,
  lng: 105.844955,
};

const MapWithOverlay: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_MAPS_GEOAPIFY_API_KEY}`, // Thay bằng API key của bạn
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultLocation} zoom={15}>
        <Marker position={defaultLocation} />
      </GoogleMap>
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          zIndex: 1000, // Đảm bảo phần tử luôn ở trên bản đồ
          color: "black"
        }}
      >
        <h4 className='name-store'>Công Ty Cổ Phần Viva Phone</h4>
        <p className='address-store'>Địa chỉ: Ngõ 61 Định Công, Hoàng Mai, Hà Nội</p>
        <p className='rate-store'>4.8 <Rate allowHalf defaultValue={4.8} disabled /> <span style={{ color: "rgb(13, 110, 253)" }}>(999 đánh giá)</span></p>
      </div>
    </div>
  );
};

export default MapWithOverlay;
