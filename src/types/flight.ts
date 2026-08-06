export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}

export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
}

export interface FlightSegment {
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string; // e.g. "2h 15m"
  flightNumber: string;
  aircraft: string;
}

export interface FareOption {
  type: 'Economy' | 'Premium Economy' | 'Business';
  basePrice: number;
  taxes: number;
  baggageCheckIn: string;
  baggageCabin: string;
  cancellationFee: number;
  dateChangeFee: number;
  refundable: boolean;
  seatsLeft: number;
}

export interface Flight {
  id: string;
  airline: Airline;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string; // ISO or HH:mm
  arrivalTime: string;   // ISO or HH:mm
  duration: string;      // e.g. "2h 40m"
  durationMinutes: number;
  stops: number;         // 0 for Non-stop, 1, 2
  stopDetails?: string[]; // e.g. ["15m layover in BOM"]
  price: number;         // Starting fare
  fareOptions: FareOption[];
  datesAvailable: string[]; // YYYY-MM-DD
  tags?: string[];       // e.g. ["Cheapest", "Fastest", "Yovo Pick", "Free Meal"]
  terminalDeparture?: string;
  terminalArrival?: string;
}
