import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const getSafetyScore = (lat, lon, hour) =>
  axios.get(`${API_BASE}/safety/score`, {
    params: { lat, lon, hour }
  });

export const getHeatmap = (lat, lon, hour) =>
  axios.get(`${API_BASE}/heatmap/area`, {
    params: { lat, lon, hour }
  });