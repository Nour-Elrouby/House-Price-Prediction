import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { predictPrice } from "../api/predictionClient";
import PredictionForm from "../components/PredictionForm";
import type { PredictionRequest } from "../types/prediction";


export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePrediction(property: PredictionRequest) {
    setLoading(true);
    setError("");

    try {
      const result = await predictPrice(property);

      navigate("/result", {
        state: {
          prediction: result.predicted_price,
          property,
        },
      });
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="eyebrow">
          <span />
          AI-powered property valuation
        </div>
        <h1>
          Find the value
          <br />
          behind the address.
        </h1>
        <p>
          Enter a few property details to receive an instant price
          estimate trained on real Indian housing listings.
        </p>

        <div className="hero-stats">
          <div>
            <strong>174K+</strong>
            <span>clean listings</span>
          </div>
          <div>
            <strong>51</strong>
            <span>location groups</span>
          </div>
          <div>
            <strong>Instant</strong>
            <span>model response</span>
          </div>
        </div>
      </section>

      <section className="form-card">
        <div className="card-intro">
          <p>Property estimator</p>
          <span>All fields are required</span>
        </div>
        <PredictionForm
          loading={loading}
          apiError={error}
          onSubmit={handlePrediction}
        />
      </section>
    </main>
  );
}
