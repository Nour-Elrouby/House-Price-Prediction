from fastapi import APIRouter, Request

from app.schemas.prediction import PredictionRequest, PredictionResponse


router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(
    payload: PredictionRequest,
    request: Request,
) -> PredictionResponse:
    predicted_price = request.app.state.model_service.predict(payload)
    return PredictionResponse(predicted_price=predicted_price)
