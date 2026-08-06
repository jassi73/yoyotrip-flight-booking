import { Flight, FareOption } from './flight';
import { SearchParams } from './search';
import { Passenger, ContactDetails } from './passenger';
import { Coupon } from './coupon';

export interface PriceBreakdown {
  baseFare: number;
  taxesAndFees: number;
  convenienceFee: number;
  convenienceFeeDiscount: number;
  specialFareDiscount: number;
  couponDiscount: number;
  totalAmount: number;
}

export interface Booking {
  bookingId: string;
  pnr: string;
  createdAt: string; // ISO string
  flight: Flight;
  selectedFare: FareOption;
  searchParams: SearchParams;
  passengers: Passenger[];
  contactDetails: ContactDetails;
  appliedCoupon: Coupon | null;
  priceBreakdown: PriceBreakdown;
  paymentStatus: 'CONFIRMED';
}
