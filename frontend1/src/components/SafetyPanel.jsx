function SafetyPanel({ data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h3>Current Safety</h3>
      <h1 style={{ margin: "8px 0" }}>{data.safety_score}</h1>
      <p>Risk Level: <b>{data.risk_level}</b></p>
    </div>
  );
}

export default SafetyPanel;