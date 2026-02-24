"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TrafficMap() {
  return (
    <MapContainer
      center={[18.5204, 73.8567]} // Pune example
      zoom={13}
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Sample Traffic Marker */}
      <Marker position={[18.5204, 73.8567]}>
        <Popup>
          Downtown Area <br /> Heavy Traffic 🚦
        </Popup>
      </Marker>

      <Marker position={[18.5314, 73.8446]}>
        <Popup>
          Industrial Zone <br /> Moderate Traffic 🚧
        </Popup>
      </Marker>
    </MapContainer>
  );
}