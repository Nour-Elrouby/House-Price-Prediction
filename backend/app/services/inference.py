import json
from pathlib import Path

import joblib

from app.schemas.prediction import PredictionRequest
from app.services.preprocessing import prepare_input


class ModelService:
    def __init__(self, model_path: Path, locations_path: Path):
        self.model = joblib.load(model_path)

        with locations_path.open(encoding="utf-8") as file:
            self.allowed_locations = set(json.load(file))

    def predict(self, request: PredictionRequest) -> float:
        model_input = prepare_input(request, self.allowed_locations)
        prediction = self.model.predict(model_input)[0]
        return max(float(prediction), 0.0)
