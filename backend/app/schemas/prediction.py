from typing import Literal

from pydantic import BaseModel, Field


class PredictionRequest(BaseModel):
    location: str = Field(min_length=1)
    carpet_area_sqft: float = Field(gt=0)
    floor_num: int = Field(ge=-2)
    bathroom: int = Field(ge=0, le=20)
    balcony: int = Field(ge=0, le=20)
    car_parking: int = Field(default=0, ge=0)
    furnishing: Literal["Furnished", "Semi-Furnished", "Unfurnished"]
    transaction: Literal["New Property", "Resale", "Other", "Rent/Lease"]
    ownership: Literal[
        "Freehold",
        "Co-operative Society",
        "Power Of Attorney",
        "Leasehold",
    ]
    facing: Literal[
        "East",
        "West",
        "North",
        "South",
        "North - East",
        "North - West",
        "South - East",
        "South -West",
    ]


class PredictionResponse(BaseModel):
    predicted_price: float
