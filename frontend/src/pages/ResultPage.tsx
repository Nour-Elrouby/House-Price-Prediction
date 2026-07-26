import { Link, useLocation } from "react-router-dom";

import type { PredictionResultState } from "../types/prediction";


function formatIndianPrice(price: number) {
  if (price >= 10000000) {
    return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  }

  if (price >= 100000) {
    return `₹ ${(price / 100000).toFixed(2)} Lac`;
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}


export default function ResultPage() {
  const location = useLocation();
  const result = location.state as PredictionResultState | null;

  if (!result) {
    return (
      <main className="centered-page">
        <div className="empty-card">
          <p className="eyebrow">No estimate found</p>
          <h1>Start with the property details.</h1>
          <Link className="text-link" to="/">
            Go to estimator →
          </Link>
        </div>
      </main>
    );
  }

  const { prediction, property } = result;

  return (
    <main className="result-page">
      <Link className="back-link" to="/">
        ← New estimate
      </Link>

      <section className="result-card">
        <div className="result-label">
          <span />
          Estimated market value
        </div>
        <h1>{formatIndianPrice(prediction)}</h1>
        <p className="exact-price">
          INR {Math.round(prediction).toLocaleString("en-IN")}
        </p>

        <div className="result-divider" />

        <div className="property-summary">
          <div>
            <span>Location</span>
            <strong>{property.location.replaceAll("-", " ")}</strong>
          </div>
          <div>
            <span>Carpet area</span>
            <strong>{property.carpet_area_sqft.toLocaleString()} sq ft</strong>
          </div>
          <div>
            <span>Configuration</span>
            <strong>
              {property.bathroom} bath · {property.balcony} balcony
            </strong>
          </div>
          <div>
            <span>Property</span>
            <strong>{property.furnishing}</strong>
          </div>
        </div>

        <p className="result-note">
          This is a machine-learning estimate based on historical listing
          patterns. It is not a formal property valuation.
        </p>
      </section>
    </main>
  );
}
