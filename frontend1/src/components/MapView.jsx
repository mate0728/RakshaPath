import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    }
  });
  return null;
}

function MapView({ children, onMapClick }) {
  return (
    <div style={{ height: "500px", marginTop: 10 }}>
      <MapContainer
        center={[28.61, 77.20]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onClick={onMapClick} />
        {children}
      </MapContainer>
    </div>
  );
}

export default MapView;