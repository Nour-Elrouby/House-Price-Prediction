from fastapi.testclient import TestClient

from app.main import app


VALID_PAYLOAD = {
    "location": "mumbai",
    "carpet_area_sqft": 900,
    "floor_num": 5,
    "bathroom": 2,
    "balcony": 1,
    "car_parking": 1,
    "furnishing": "Semi-Furnished",
    "transaction": "Resale",
    "ownership": "Freehold",
    "facing": "East",
}


def test_health():
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_happy_path():
    with TestClient(app) as client:
        response = client.post("/predict", json=VALID_PAYLOAD)

    assert response.status_code == 200
    assert response.json()["predicted_price"] > 0


def test_predict_invalid_area():
    payload = {**VALID_PAYLOAD, "carpet_area_sqft": 0}

    with TestClient(app) as client:
        response = client.post("/predict", json=payload)

    assert response.status_code == 422
