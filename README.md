# House Price Prediction

A full-stack application for estimating Indian residential property prices. It cleans and models real housing listings in a Jupyter notebook, serves predictions through FastAPI, and provides a responsive React interface for entering property details and reviewing the estimated value.

> [!IMPORTANT]
> Model predictions are estimates for learning and demonstration purposes. They should support, not replace, professional valuation, market research, or financial advice.

## Interface Preview

### Property estimator

![House Price Prediction property estimator](docs/screenshots/ui-home.png)

## Features

- Cleans and transforms raw Indian housing-listing data
- Groups infrequent locations and societies to control feature cardinality
- Compares Linear Regression and Random Forest performance
- Exports preprocessing and prediction as one scikit-learn pipeline
- Validates prediction requests with typed Pydantic schemas
- Loads the trained model once during FastAPI startup
- Provides health and prediction API endpoints
- Includes a responsive React and TypeScript property form
- Shows friendly validation and backend-connection errors
- Keeps model, API, and frontend location values synchronized
- Includes backend tests, a production frontend build, and Docker support

## How It Works

```text
House-price CSV
      |
      v
Cleaning and feature engineering
      |
      v
Train/test split and model comparison
      |
      v
Exported scikit-learn pipeline
      |
      v
FastAPI validation and inference
      |
      v
React property estimator
```

The exported pipeline contains the fitted preprocessing steps and Random Forest estimator. The API therefore applies the same transformations used during training before it returns a price estimate.

## Technology

| Component | Purpose |
|---|---|
| Jupyter Notebook | Data exploration, cleaning, training, and evaluation |
| pandas | Dataset manipulation and feature preparation |
| scikit-learn | Preprocessing pipelines and regression models |
| joblib | Trained-pipeline serialization |
| FastAPI | Prediction API and interactive documentation |
| Pydantic | Request validation and environment settings |
| React | Property-estimation interface |
| TypeScript | Typed frontend models and API integration |
| Vite | Frontend development and production builds |
| pytest | Backend endpoint and inference tests |



## Project Structure

```text
.
|-- House Price Prediction.ipynb       # Cleaning, training, and evaluation
|-- locations.json                     # Exported supported locations
|-- backend/
|   |-- app/
|   |   |-- api/routes/                # Health and prediction endpoints
|   |   |-- core/                      # Application configuration
|   |   |-- schemas/                   # Pydantic request and response models
|   |   |-- services/                  # Preprocessing and inference services
|   |   `-- main.py                    # FastAPI application
|   |-- models/                        # Local generated model artifacts
|   |-- tests/                         # Backend tests
|   |-- .env.example                   # Backend environment template
|   |-- Dockerfile                     # Backend container image
|   `-- requirements.txt               # Python dependencies
|-- frontend/
|   |-- public/                        # Runtime location data
|   |-- src/
|   |   |-- api/                       # Prediction API client
|   |   |-- components/                # Property form
|   |   |-- pages/                     # Home, result, and not-found pages
|   |   `-- styles.css                 # Responsive visual system
|   |-- .env.example                   # Frontend environment template
|   `-- package.json                   # Scripts and dependencies
`-- docs/screenshots/                  # Real application screenshots
```

