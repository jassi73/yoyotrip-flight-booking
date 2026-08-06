export type PassengerType = 'Adult' | 'Child' | 'Infant';
export type Salutation = 'Mr' | 'Mrs' | 'Ms' | 'Master';

export interface Passenger {
  id: string;
  type: PassengerType;
  salutation: Salutation;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  nationality: string;
  seatPreference?: string;
  mealPreference?: string;
}

export interface ContactDetails {
  email: string;
  phone: string;
  countryCode: string;
}

export interface PassengerFormErrors {
  passengers: Record<string, Record<string, string>>;
  contact: Record<string, string>;
}
