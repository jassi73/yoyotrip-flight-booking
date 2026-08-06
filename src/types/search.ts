import { Airport } from './flight';

export type TripType = 'one-way' | 'round-trip' | 'multi-city';
export type CabinClass = 'Economy' | 'Premium Economy' | 'Business';
export type SpecialFareType = 'regular' | 'student' | 'armed-forces' | 'senior-citizen';

export interface TravelerCount {
  adults: number;    // 12+ yrs
  children: number;  // 2-11 yrs
  infants: number;   // Under 2 yrs
}

export interface SearchParams {
  tripType: TripType;
  origin: Airport | null;
  destination: Airport | null;
  departureDate: string; // YYYY-MM-DD
  returnDate?: string;   // YYYY-MM-DD
  travelers: TravelerCount;
  cabinClass: CabinClass;
  specialFare: SpecialFareType;
}
