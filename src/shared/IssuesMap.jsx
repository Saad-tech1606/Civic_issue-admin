// src/shared/IssuesMap.jsx
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOn } from "react-icons/md";

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

// Demo markers (locations around Kolkata)
const demoMarkers = [
  { title: "Garbage Overflow", location: "Salt Lake", status: "Pending" },
  { title: "Streetlight Broken", location: "Park Street", status: "In Progress" },
  { title: "Water Leakage", location: "Howrah", status: "Resolved" },
  { title: "Road Damage", location: "Dum Dum", status: "Pending" },
  { title: "Illegal Dumping", location: "New Town", status: "Rejected" },
  { title: "Drain Blockage", location: "Sealdah", status: "Pending" },
  { title: "Traffic Signal Issue", location: "Esplanade", status: "In Progress" },
  { title: "Garbage Collection Delay", location: "Shobha Bazar", status: "Resolved" },
  { title: "Sewage Leak", location: "Kidderpore", status: "Pending" },
  { title: "Waterlogging", location: "Tangra", status: "In Progress" },
];

// Predefined Kolkata location coordinates
const kolkataLocations = {
  "Salt Lake": [22.5867, 88.4173],
  "Park Street": [22.5535, 88.3520],
  "Howrah": [22.5958, 88.2636],
  "Dum Dum": [22.6220, 88.3967],
  "New Town": [22.5953, 88.4790],
  "Sealdah": [22.5667, 88.3716],
  "Esplanade": [22.5668, 88.3516],
  "Shobha Bazar": [22.6038, 88.3639],
  "Kidderpore": [22.5366, 88.3221],
  "Tangra": [22.5521, 88.3843],
};

// Get coords from location name
const getCoords = (loc) => {
  if (!loc) return [22.5726, 88.3639]; // Kolkata center fallback
  const match = Object.keys(kolkataLocations).find((key) =>
    loc.toLowerCase().includes(key.toLowerCase())
  );
  return match ? kolkataLocations[match] : [22.5726, 88.3639];
};

export default function IssuesMap() {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-700">
      <MapContainer
        center={[22.5726, 88.3639]} // Kolkata center
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {demoMarkers.map((m, i) => {
          const coords = getCoords(m.location);

          return (
            <Marker
              key={i}
              position={coords}
              icon={statusIcons[m.status] || statusIcons["Pending"]}
            >
              {/* Popup (on click) */}
              <Popup>
                <strong>{m.title}</strong> <br />
                <MdLocationOn className="inline text-red-500" /> {m.location} <br />
                ⚡ Status: {m.status}
              </Popup>

              {/* Tooltip (always visible as tag) */}
              <Tooltip permanent direction="top" offset={[0, -20]}>
                <div className="flex items-center gap-1 text-xs font-semibold text-black">
                  <MdLocationOn className="text-red-600" />
                  {m.location}
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
