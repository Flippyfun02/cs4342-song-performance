from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalcRequest(BaseModel):
    a: float
    b: float
    operation: str  # "add", "subtract", "multiply", "divide"

class CalcResponse(BaseModel):
    result: float

@app.post("/calculate", response_model=CalcResponse)
def calculate(req: CalcRequest):
    if req.operation == "add":
        return CalcResponse(result=req.a + req.b)
    elif req.operation == "subtract":
        return CalcResponse(result=req.a - req.b)
    elif req.operation == "multiply":
        return CalcResponse(result=req.a * req.b)
    elif req.operation == "divide":
        return CalcResponse(result=req.a / req.b)