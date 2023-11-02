export interface iServicesOptions {
  searchTerm?: string;
  day?: number;
  age?: number;
  minPrice?: number;
  maxPrice?: number;
  availabilityType?: "UPCOMING" | "AVAILABLE";
  location?: string;
  month?: string;
  category?: string;
}
