from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

# TODO: replace with real model
class Model:
    @staticmethod
    def predict(song: SongRequest):
        return 10000

@app.post("/predict", response_model=SongResponse)
def predict(req: SongRequest):
    model = Model() # TODO: replace with real model
    return {"streams": model.predict(req)}

@app.get("/test")
def test():
    return "works"