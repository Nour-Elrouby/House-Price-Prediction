import { FormEvent, useEffect, useState } from "react";

import type {
  Facing,
  Furnishing,
  Ownership,
  PredictionRequest,
  Transaction,
} from "../types/prediction";


interface PredictionFormProps {
  loading: boolean;
  apiError: string;
  onSubmit: (property: PredictionRequest) => void;
}

const initialForm: PredictionRequest = {
  location: "",
  carpet_area_sqft: 900,
  floor_num: 1,
  bathroom: 2,
  balcony: 1,
  car_parking: 1,
  furnishing: "Semi-Furnished",
  transaction: "Resale",
  ownership: "Freehold",
  facing: "East",
};


export default function PredictionForm({
  loading,
  apiError,
  onSubmit,
}: PredictionFormProps) {
  const [form, setForm] = useState<PredictionRequest>(initialForm);
  const [locations, setLocations] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/locations.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Locations could not be loaded.");
        }

        return response.json();
      })
      .then((data: string[]) => {
        setLocations(data);

        if (data.length > 0) {
          setForm((current) => ({
            ...current,
            location: data[0],
          }));
        }
      })
      .catch(() => {
        setFormError("The location list could not be loaded.");
      });
  }, []);

  function updateNumber(
    field: keyof PredictionRequest,
    value: string,
  ) {
    setForm({
      ...form,
      [field]: Number(value),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!form.location) {
      setFormError("Please choose a location.");
      return;
    }

    if (form.carpet_area_sqft <= 0) {
      setFormError("Carpet area must be greater than zero.");
      return;
    }

    if (form.bathroom < 0 || form.balcony < 0) {
      setFormError("Bathrooms and balconies cannot be negative.");
      return;
    }

    onSubmit(form);
  }

  return (
    <form className="prediction-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="section-heading">
          <span>01</span>
          <div>
            <h2>Property basics</h2>
            <p>Start with its location and usable area.</p>
          </div>
        </div>

        <div className="form-grid">
          <label className="field field-wide">
            <span>Location</span>
            <select
              value={form.location}
              onChange={(event) =>
                setForm({ ...form, location: event.target.value })
              }
              required
            >
              <option value="" disabled>
                Select a location
              </option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location.replaceAll("-", " ")}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Carpet area</span>
            <div className="input-with-unit">
              <input
                type="number"
                min="1"
                step="1"
                value={form.carpet_area_sqft}
                onChange={(event) =>
                  updateNumber("carpet_area_sqft", event.target.value)
                }
                required
              />
              <small>sq ft</small>
            </div>
          </label>

          <label className="field">
            <span>Floor number</span>
            <input
              type="number"
              min="-2"
              step="1"
              value={form.floor_num}
              onChange={(event) =>
                updateNumber("floor_num", event.target.value)
              }
              required
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <div className="section-heading">
          <span>02</span>
          <div>
            <h2>Space and comfort</h2>
            <p>Add the practical details that shape value.</p>
          </div>
        </div>

        <div className="form-grid form-grid-three">
          <label className="field">
            <span>Bathrooms</span>
            <input
              type="number"
              min="0"
              max="20"
              value={form.bathroom}
              onChange={(event) =>
                updateNumber("bathroom", event.target.value)
              }
              required
            />
          </label>

          <label className="field">
            <span>Balconies</span>
            <input
              type="number"
              min="0"
              max="20"
              value={form.balcony}
              onChange={(event) =>
                updateNumber("balcony", event.target.value)
              }
              required
            />
          </label>

          <label className="field">
            <span>Car parking</span>
            <input
              type="number"
              min="0"
              value={form.car_parking}
              onChange={(event) =>
                updateNumber("car_parking", event.target.value)
              }
              required
            />
          </label>
        </div>
      </div>

      <div className="form-section">
        <div className="section-heading">
          <span>03</span>
          <div>
            <h2>Property profile</h2>
            <p>Finish with ownership and orientation.</p>
          </div>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Furnishing</span>
            <select
              value={form.furnishing}
              onChange={(event) =>
                setForm({
                  ...form,
                  furnishing: event.target.value as Furnishing,
                })
              }
            >
              <option>Furnished</option>
              <option>Semi-Furnished</option>
              <option>Unfurnished</option>
            </select>
          </label>

          <label className="field">
            <span>Transaction</span>
            <select
              value={form.transaction}
              onChange={(event) =>
                setForm({
                  ...form,
                  transaction: event.target.value as Transaction,
                })
              }
            >
              <option>New Property</option>
              <option>Resale</option>
              <option>Other</option>
              <option>Rent/Lease</option>
            </select>
          </label>

          <label className="field">
            <span>Ownership</span>
            <select
              value={form.ownership}
              onChange={(event) =>
                setForm({
                  ...form,
                  ownership: event.target.value as Ownership,
                })
              }
            >
              <option>Freehold</option>
              <option>Co-operative Society</option>
              <option>Power Of Attorney</option>
              <option>Leasehold</option>
            </select>
          </label>

          <label className="field">
            <span>Facing</span>
            <select
              value={form.facing}
              onChange={(event) =>
                setForm({
                  ...form,
                  facing: event.target.value as Facing,
                })
              }
            >
              <option>East</option>
              <option>West</option>
              <option>North</option>
              <option>South</option>
              <option>North - East</option>
              <option>North - West</option>
              <option>South - East</option>
              <option>South -West</option>
            </select>
          </label>
        </div>
      </div>

      {(formError || apiError) && (
        <p className="error-message" role="alert">
          {formError || apiError}
        </p>
      )}

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" />
            Calculating estimate...
          </>
        ) : (
          <>
            Estimate property value
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
    </form>
  );
}
