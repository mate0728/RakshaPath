from fastapi import APIRouter
from app.services.safety_engine import compute_safety_score

router = APIRouter()

@router.get("/score")
def safety_score(lat: float, lon: float, hour: int):
    score, level, explanation = compute_safety_score(lat, lon, hour)

    return {
        "location": {"lat": lat, "lon": lon},
        "safety_score": score,
        "risk_level": level,
        "factors": explanation
    }