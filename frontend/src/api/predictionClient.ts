import type {
  PredictionRequest,
  PredictionResponse,
} from "../types/prediction";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";


export async function predictPrice(
  property: PredictionRequest,
): Promise<PredictionResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(property),
    });
  } catch {
    throw new Error(
      "Cannot connect to the prediction server. Make sure the backend is running on port 8000.",
    );
  }

  if (!response.ok) {
    let message = "The prediction service could not process this request.";

    try {
      const data = await response.json();

      if (typeof data.detail === "string") {
        message = data.detail;
      }
    } catch {
      // Keep the friendly fallback message.
    }

    throw new Error(message);
  }

  return response.json();
}
