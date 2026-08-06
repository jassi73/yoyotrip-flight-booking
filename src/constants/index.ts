export const SPECIAL_FARES = [
  { id: 'regular', label: 'Regular', subtitle: 'Standard Fares' },
  { id: 'student', label: 'Student', subtitle: 'Extra discounts & baggage' },
  { id: 'armed-forces', label: 'Armed Forces', subtitle: 'Defence personnel' },
  { id: 'senior-citizen', label: 'Senior Citizen', subtitle: 'Up to ₹600 off' },
] as const;

export const POPULAR_ROUTES = [
  { origin: 'DEL', destination: 'MAA', originCity: 'New Delhi', destCity: 'Chennai', startingPrice: 7950, duration: '2h 40m' },
  { origin: 'DEL', destination: 'BOM', originCity: 'New Delhi', destCity: 'Mumbai', startingPrice: 5400, duration: '2h 10m' },
  { origin: 'BOM', destination: 'BLR', originCity: 'Mumbai', destCity: 'Bengaluru', startingPrice: 4890, duration: '1h 45m' },
  { origin: 'DEL', destination: 'CCU', originCity: 'New Delhi', destCity: 'Kolkata', startingPrice: 6200, duration: '2h 15m' },
];

export const SPECIAL_FARE_DISCOUNTS: Record<string, number> = {
  regular: 0,
  student: 450,
  'armed-forces': 600,
  'senior-citizen': 550,
};

export const DEFAULT_SEARCH_PARAMS = {
  tripType: 'one-way' as const,
  origin: {
    code: 'DEL',
    city: 'New Delhi',
    name: 'Indira Gandhi International Airport',
    country: 'India',
  },
  destination: {
    code: 'MAA',
    city: 'Chennai',
    name: 'Chennai International Airport',
    country: 'India',
  },
  departureDate: '2026-08-05',
  travelers: { adults: 1, children: 0, infants: 0 },
  cabinClass: 'Economy' as const,
  specialFare: 'regular' as const,
};
