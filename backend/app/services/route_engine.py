from app.services.safety_engine import compute_safety_score

def get_safest_route(start, end, hour):
    """
    Hackathon version:
    Simulate 3 routes and pick safest
    """

    routes = [
        {"name": "Route A", "risk_modifier": 0.9},
        {"name": "Route B", "risk_modifier": 0.7},
        {"name": "Route C", "risk_modifier": 0.5},
    ]

    evaluated_routes = []

    for route in routes:
        score, level, _ = compute_safety_score(
            start["lat"], start["lon"], hour
        )
        adjusted_score = int(score * route["risk_modifier"])

        evaluated_routes.append({
            "route": route["name"],
            "safety_score": adjusted_score
        })

    safest = max(evaluated_routes, key=lambda x: x["safety_score"])

    return safest, evaluated_routes