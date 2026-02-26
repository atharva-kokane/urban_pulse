"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Dynamic imports (fix SSR issue)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function WasteMapCard({ bins }) {
  const [isMounted, setIsMounted] = useState(false);
  const [markerIcon, setMarkerIcon] = useState(null);

  useEffect(() => {
    setIsMounted(true);

    // Import leaflet only in browser
    import("leaflet").then((L) => {
      const icon = new L.Icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      setMarkerIcon(icon);
    });
  }, []);

  if (!isMounted || !markerIcon) return null;

  return (
    <div className="bg-[#0B1C36] rounded-xl p-6 h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Smart Bin Locations
      </h2>

      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {bins?.map((bin) => (
          <Marker
            key={bin.id}
            position={[bin.latitude, bin.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <b>{bin.bin_id}</b>
              <br />
              {bin.location}
              <br />
              Fill Level: {bin.fill_level}%
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}