import pandas as pd

from app.schemas.prediction import PredictionRequest


MODEL_COLUMNS = [
    "carpet_area_sqft",
    "floor_num",
    "bathroom",
    "balcony",
    "car_parking",
    "location_grouped",
    "society_grouped",
    "Furnishing",
    "Transaction",
    "Ownership",
    "facing",
]


def prepare_input(
    request: PredictionRequest,
    allowed_locations: set[str],
) -> pd.DataFrame:
    location = (
        request.location
        if request.location in allowed_locations
        else "other"
    )

    row = {
        "carpet_area_sqft": request.carpet_area_sqft,
        "floor_num": request.floor_num,
        "bathroom": request.bathroom,
        "balcony": request.balcony,
        "car_parking": request.car_parking,
        "location_grouped": location,
        "society_grouped": "other",
        "Furnishing": request.furnishing,
        "Transaction": request.transaction,
        "Ownership": request.ownership,
        "facing": request.facing,
    }

    return pd.DataFrame([row], columns=MODEL_COLUMNS)
