"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then(m => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then(m => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then(m => m.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then(m => m.Popup),
  { ssr: false }
);

export default function TrafficMapCard({ zones = [] }) {

  const [markerIcon, setMarkerIcon] = useState({
  critical: null,
  medium: null,
 low: null,
});

useEffect(() => {

  let mounted = true;

  import("leaflet").then((L) => {

    if (!mounted) return;

    const shadow =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

    // 🟢 Green pin
    const greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      shadowUrl: shadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // 🟡 Yellow pin
    const yellowIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
      shadowUrl: shadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // 🔴 Blinking red location pin
    const redBlinkIcon = new L.DivIcon({
      html: `
        <div class="blink-pin">
          <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"/>
        </div>
      `,
      className: "",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    setMarkerIcon({
      critical: redBlinkIcon,
      medium: yellowIcon,
      low: greenIcon
    });

  });

  return () => mounted = false;

}, []);
if (!markerIcon.critical || !markerIcon.medium || !markerIcon.low)
  return (
    <div className="bg-[#0B1C36] rounded-xl p-6 h-[300px] flex items-center justify-center text-gray-400">
      Loading map...
    </div>
  );

  return (

    <div className="bg-[#0B1C36] rounded-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">

        <h2 className="text-white font-semibold text-lg">
          Live Traffic Map
        </h2>

        <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full">
          ● Live
        </span>

      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden">

        <MapContainer
          center={[18.5204, 73.8567]}
          zoom={13}
          style={{ height: "300px", width: "100%" }}
        >

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {zones.map(zone => (

  <Marker
    key={zone.id}
    position={[zone.latitude, zone.longitude]}
   icon={
  zone.congestion_level >= 80
    ? markerIcon.critical
    : zone.congestion_level >= 40
    ? markerIcon.medium
    : markerIcon.low
}
  >

    <Popup>
      {zone.zone_name}
      <br />
      Congestion: {zone.congestion_level}%
    </Popup>

  </Marker>

))}

        </MapContainer>

      </div>

    </div>

  );

}