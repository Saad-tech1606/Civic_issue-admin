import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker icons (works with Vite/React)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function IssuesMap({ issues }) {
  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-xl mb-6">
      <MapContainer
        center={[23.3441, 85.3096]}
        zoom={12}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {issues.map((issue) => (
          <Marker key={issue.id} position={[issue.latitude, issue.longitude]}>
            <Popup>
              <strong>{issue.title}</strong> <br />
              Status: {issue.status} <br />
              Location: {issue.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
