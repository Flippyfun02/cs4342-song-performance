from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import joblib
import numpy as np
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SongRequest(BaseModel):
    duration_ms: int
    explicit: bool
    af_danceability: float
    af_energy: float
    af_key: int
    af_loudness: float
    af_mode: int
    af_speechiness: float
    af_acousticness: float
    af_instrumentalness: float
    af_liveness: float
    af_valence: float
    af_tempo: float
    af_time_signature: int

class SongResponse(BaseModel):
    streams: float

FEATURES = [
    "duration_ms", "explicit", "af_danceability", "af_energy", "af_key",
    "af_loudness", "af_mode", "af_speechiness", "af_acousticness",
    "af_instrumentalness", "af_liveness", "af_valence", "af_tempo",
    "af_time_signature",
]

MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "song_model.joblib"
model = joblib.load(MODEL_PATH)

@app.post("/predict", response_model=SongResponse)
def predict(req: SongRequest):
    row = req.model_dump()
    row["explicit"] = int(row["explicit"])
    X = pd.DataFrame([row], columns=FEATURES)
    log_streams = model.predict(X)[0]
    streams = float(np.expm1(log_streams))
    return {"streams": round(streams)}