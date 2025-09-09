import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom colored icons
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|${color}`,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
    popupAnchor: [0, -50],
    shadowUrl: markerShadow,
    shadowSize: [50, 50],
    shadowAnchor: [15, 50],
  });

const statusIcons = {
  Pending: createIcon("yellow"),
  "In Progress": createIcon("blue"),
  Resolved: createIcon("green"),
  Rejected: createIcon("red"),
};

export default function IssuesMap({ markers = [] }) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl">
      <MapContainer
        center={[23.3441, 85.3096]} // default center (India)
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Safely render markers */}
        {markers.map((m, i) => (
          <Marker
            key={i}
            position={[m.lat, m.lon]}
            icon={statusIcons[m.status] || statusIcons["Pending"]}
          >
            <Popup>
              <strong>{m.title}</strong> <br />
              📍 {m.address || "Unknown Location"} <br />
              ⚡ Status: {m.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
