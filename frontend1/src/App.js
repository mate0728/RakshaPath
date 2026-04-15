import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import HeatmapLayer from "./components/HeatmapLayer";
import SafetyPanel from "./components/SafetyPanel";
import Legend from "./components/Legend";
import SOSButton from "./components/SOSButton";
import { getSafetyScore, getHeatmap } from "./services/api";

function App() {
  const [safety, setSafety] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [hour, setHour] = useState(new Date().getHours());
  const [userLocation, setUserLocation] = useState(null);

  const defaultLat = 28.61;
  const defaultLon = 77.20;

  /* 🔵 LIVE LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  /* 🔁 AUTO SAFETY UPDATE (LIVE LOCATION OR DEFAULT) */
  useEffect(() => {
    const lat = userLocation?.lat || defaultLat;
    const lon = userLocation?.lon || defaultLon;

    getSafetyScore(lat, lon, hour)
      .then((res) => setSafety(res.data))
      .catch(() => setSafety(null));

    getHeatmap(lat, lon, hour)
      .then((res) => setHeatmap(res.data.points || []))
      .catch(() => setHeatmap([]));
  }, [hour, userLocation]);

  /* 🚨 ALERT FOR UNSAFE AREAS */
  useEffect(() => {
    if (safety && safety.safety_score < 40) {
      alert("⚠️ Unsafe area detected. Please be cautious.");
    }
  }, [safety]);

  /* 🖱️ MAP CLICK HANDLER */
  const handleMapClick = (lat, lon) => {
    getSafetyScore(lat, lon, hour).then((res) => setSafety(res.data));
    getHeatmap(lat, lon, hour).then((res) => setHeatmap(res.data.points));
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ padding: 20 }}>
        RakshaPath – Predictive Safety Navigation
      </h2>

      <div style={{ flex: 1, display: "flex" }}>
        {/* LEFT PANEL */}
        <div
          style={{
            width: 320,
            padding: 15,
            background: "#f7f7f7",
            borderRight: "1px solid #ddd",
          }}
        >
          <label>
            Time:
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              style={{ marginLeft: 10 }}
            >
              <option value={10}>Day</option>
              <option value={22}>Night</option>
            </select>
          </label>

          <SafetyPanel data={safety} />
          <Legend />
        </div>

        {/* MAP */}
        <div style={{ flex: 1 }}>
          <MapView onMapClick={handleMapClick}>
            <HeatmapLayer
              points={heatmap}
              userLocation={userLocation}
            />
          </MapView>
        </div>
      </div>

      {/* 🚨 FLOATING SOS BUTTON */}
      <SOSButton userLocation={userLocation} />
    </div>
  );
}

export default App;