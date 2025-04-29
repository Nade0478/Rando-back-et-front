import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ latitude, longitude }) => {
  return (
    <MapContainer
      style={{ height: "300px", width: "100%" }}
      center={[parseFloat(latitude), parseFloat(longitude)]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[parseFloat(latitude), parseFloat(longitude)]}>
        <Popup>
          Position : {latitude}, {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
