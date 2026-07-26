export type Furnishing =
  | "Furnished"
  | "Semi-Furnished"
  | "Unfurnished";

export type Transaction =
  | "New Property"
  | "Resale"
  | "Other"
  | "Rent/Lease";

export type Ownership =
  | "Freehold"
  | "Co-operative Society"
  | "Power Of Attorney"
  | "Leasehold";

export type Facing =
  | "East"
  | "West"
  | "North"
  | "South"
  | "North - East"
  | "North - West"
  | "South - East"
  | "South -West";

export interface PredictionRequest {
  location: string;
  carpet_area_sqft: number;
  floor_num: number;
  bathroom: number;
  balcony: number;
  car_parking: number;
  furnishing: Furnishing;
  transaction: Transaction;
  ownership: Ownership;
  facing: Facing;
}

export interface PredictionResponse {
  predicted_price: number;
}

export interface PredictionResultState {
  prediction: number;
  property: PredictionRequest;
}
