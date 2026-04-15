import { useEffect, useState } from "react";
import MapView from "./components/MapView";
import HeatmapLayer from "./components/HeatmapLayer";
import SafetyPanel from "./components/SafetyPanel";
import { getSafetyScore, getHeatmap } from "./services/api";

function App() {
  const [safety, setSafety] = useState(null);
  const [heatmap, setHeatmap] = useState([]);

  const lat = 28.61;
  const lon = 77.20;
  const hour = new Date().getHours();

  useEffect(() => {
    getSafetyScore(lat, lon, hour).then(res => setSafety(res.data));
    getHeatmap(lat, lon, hour).then(res => setHeatmap(res.data.points));
  }, []);

  return (
    <div>
      <h2>RakshaPath – Predictive Safety Navigation</h2>

      <SafetyPanel data={safety} />

      <MapView>
        <HeatmapLayer points={heatmap} />
      </MapView>
    </div>
  );
}

export default App;