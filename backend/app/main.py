from fastapi import FastAPI
from app.routers import safety, routing, heatmap

app = FastAPI(title="SafePath AI")

app.include_router(safety.router, prefix="/safety")
app.include_router(routing.router, prefix="/route")
app.include_router(heatmap.router, prefix="/heatmap")

@app.get("/")
def health():
    return {"status": "Backend running"}