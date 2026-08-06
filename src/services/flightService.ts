import flightsData from '../data/flights.json';
import airportsData from '../data/airports.json';
import couponsData from '../data/coupons.json';
import { Flight, Airport } from '../types/flight';
import { SearchParams } from '../types/search';
import { FilterState } from '../types/filter';
import { Coupon } from '../types/coupon';

const AIRLINES = [
  { id: 'indigo', name: 'IndiGo', code: '6E', logo: '' },
  { id: 'airindia', name: 'Air India', code: 'AI', logo: '' },
  { id: 'vistara', name: 'Vistara', code: 'UK', logo: '' },
  { id: 'akasa', name: 'Akasa Air', code: 'QP', logo: '' },
  { id: 'spicejet', name: 'SpiceJet', code: 'SG', logo: '' },
];

function generateDynamicFlights(origin: Airport, destination: Airport): Flight[] {
  const defaultOrigin: Airport = origin || (airportsData[0] as Airport);
  const defaultDest: Airport = (destination && destination.code !== defaultOrigin.code)
    ? destination
    : (airportsData[1] as Airport);

  const mockSchedules = [
    { dep: '06:15', arr: '09:00', dur: '2h 45m', min: 165, price: 8451, stops: 0, tags: ["Cheapest", "Non-stop", "Yovo's pick", "Cheap but sensible"] },
    { dep: '08:40', arr: '11:20', dur: '2h 40m', min: 160, price: 8920, stops: 0, tags: ["Fastest", "Free meals", "Non-stop"] },
    { dep: '11:10', arr: '16:45', dur: '5h 35m', min: 335, price: 7950, stops: 1, stopDetails: [`1h 20m layover in BOM`], tags: ["Cheap but sensible", "1 Stop"] },
    { dep: '14:15', arr: '17:05', dur: '2h 50m', min: 170, price: 9450, stops: 0, tags: ["Reach at a good time", "Free meals", "Non-stop"] },
    { dep: '17:30', arr: '20:20', dur: '2h 50m', min: 170, price: 8290, stops: 0, tags: ["Cheapest", "Easy trip"] },
    { dep: '21:00', arr: '23:45', dur: '2h 45m', min: 165, price: 7600, stops: 0, tags: ["Avoid overnight", "Non-stop"] },
  ];

  return mockSchedules.map((sched, idx) => {
    const airline = AIRLINES[idx % AIRLINES.length];
    const flightNum = `${airline.code} ${100 + idx * 11}`;

    return {
      id: `DYN-FL-${airline.code}-${idx}`,
      airline,
      flightNumber: flightNum,
      origin: defaultOrigin,
      destination: defaultDest,
      departureTime: sched.dep,
      arrivalTime: sched.arr,
      duration: sched.dur,
      durationMinutes: sched.min,
      stops: sched.stops,
      stopDetails: sched.stopDetails,
      price: sched.price,
      fareOptions: [
        {
          type: 'Economy',
          basePrice: sched.price,
          taxes: 1120,
          baggageCheckIn: '15 kg (1 piece)',
          baggageCabin: '7 kg (1 piece)',
          cancellationFee: 3000,
          dateChangeFee: 2500,
          refundable: true,
          seatsLeft: 6 + idx,
        },
        {
          type: 'Premium Economy',
          basePrice: Math.round(sched.price * 1.3),
          taxes: 1400,
          baggageCheckIn: '25 kg (2 pieces)',
          baggageCabin: '10 kg (1 piece)',
          cancellationFee: 1500,
          dateChangeFee: 1000,
          refundable: true,
          seatsLeft: 4,
        },
        {
          type: 'Business',
          basePrice: Math.round(sched.price * 2.5),
          taxes: 2500,
          baggageCheckIn: '35 kg (2 pieces)',
          baggageCabin: '12 kg (1 piece)',
          cancellationFee: 0,
          dateChangeFee: 0,
          refundable: true,
          seatsLeft: 2,
        },
      ],
      datesAvailable: ["2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07", "2026-08-08"],
      tags: sched.tags,
      terminalDeparture: 'T3',
      terminalArrival: 'T1',
    };
  });
}

export const flightService = {
  getAirports: (): Airport[] => {
    return airportsData as Airport[];
  },

  getCoupons: (): Coupon[] => {
    return couponsData as Coupon[];
  },

  searchFlights: (params: SearchParams): Flight[] => {
    const flights = flightsData as Flight[];
    
    // Attempt exact match in mock data
    const matched = flights.filter((flight) => {
      if (params.origin && flight.origin.code !== params.origin.code) {
        return false;
      }
      if (params.destination && flight.destination.code !== params.destination.code) {
        return false;
      }
      return true;
    });

    if (matched.length > 0) {
      return matched;
    }

    // Fallback: Generate dynamic realistic flights for any selected route!
    if (params.origin && params.destination) {
      return generateDynamicFlights(params.origin, params.destination);
    }

    return generateDynamicFlights(airportsData[0] as Airport, airportsData[1] as Airport);
  },

  filterAndSortFlights: (flights: Flight[], filters: FilterState): Flight[] => {
    let result = [...flights];

    // Filter by Price
    if (filters.selectedPrice > 0) {
      result = result.filter((f) => f.price <= filters.selectedPrice);
    }

    // Filter by Stops
    if (filters.stops.length > 0) {
      result = result.filter((f) => filters.stops.includes(f.stops));
    }

    // Filter by Airlines
    if (filters.airlines.length > 0) {
      result = result.filter((f) => filters.airlines.includes(f.airline.id));
    }

    // Filter by Yovo AI Prompt Tags
    if (filters.yovoAiTags.length > 0) {
      result = result.filter((f) => {
        if (!f.tags) return false;
        return filters.yovoAiTags.some((tag) => f.tags?.includes(tag));
      });
    }

    // Sorting
    switch (filters.sortBy) {
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        result.sort((a, b) => a.durationMinutes - b.durationMinutes);
        break;
      case 'departure-early':
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      case 'arrival-early':
        result.sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime));
        break;
      case 'relevance':
      default:
        result.sort((a, b) => {
          const aTagBonus = a.tags?.includes("Yovo's pick") ? -500 : 0;
          const bTagBonus = b.tags?.includes("Yovo's pick") ? -500 : 0;
          return (a.price + aTagBonus) - (b.price + bTagBonus);
        });
        break;
    }

    return result;
  }
};
