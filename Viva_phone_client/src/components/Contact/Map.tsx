import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 21.028511, // Thay tọa độ lat
  lng: 105.804817, // Thay tọa độ lng
};

const Map: React.FC = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "4c6d719d1a5c4cbba85c7b1ebf393744", // Thay bằng API key của bạn
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
