import React, { useEffect, useRef } from "react";
import "./style.scss";
import L from "leaflet";
import {} from "mapbox-gl-leaflet";
const defaultLocation = {
  lat: 21.005704,
  lng: 105.843079,
};
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180; // convert to radians
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}
function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (mapContainer && !mapContainer.hasAttribute("data-map-initialized")) {
      const initialState = {
        lat: 21.005704,
        lng: 105.843079,
        zoom: 16,
      };

      const map = L.map(mapContainer).setView(
        [initialState.lat, initialState.lng],
        initialState.zoom
      );

      map.attributionControl
        .setPrefix("")
        .addAttribution(
          'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>'
        );

      var myAPIKey = process.env.REACT_APP_MAPS_GEOAPIFY_API_KEY;
      const mapStyle =
        "https://maps.geoapify.com/v1/styles/osm-carto/style.json";

      const gl = L.mapboxGL({
        style: `${mapStyle}?apiKey=${myAPIKey}`,
        accessToken: "no-token",
      }).addTo(map);

      map.on("click", (e) => {
        const distance = calculateDistance(
          defaultLocation.lat,
          defaultLocation.lng,
          e.latlng.lat,
          e.latlng.lng
        );
        alert(`Distance from default location: ${distance} meters`);
      });

      mapContainer.setAttribute("data-map-initialized", "true");
    } else if (mapContainer) {
      console.warn("Map container is already initialized");
    }
  }, []);

  function handleLocationSelect(lat: number, lng: number) {
    const distance = calculateDistance(
      defaultLocation.lat,
      defaultLocation.lng,
      lat,
      lng
    );
    console.log(`Distance from default location: ${distance} meters`);
  }

  return <div className="map-container" ref={mapContainerRef}></div>;
}

export default Map;
