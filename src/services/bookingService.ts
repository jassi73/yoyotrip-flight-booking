import { Booking, PriceBreakdown } from '../types/booking';
import { Flight, FareOption } from '../types/flight';
import { SearchParams } from '../types/search';
import { Passenger, ContactDetails } from '../types/passenger';
import { Coupon } from '../types/coupon';

export const bookingService = {
  generatePNR: (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'YV-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  generateBookingId: (): string => {
    return 'BOOK-' + Math.floor(100000 + Math.random() * 900000);
  },

  createBooking: (
    flight: Flight,
    selectedFare: FareOption,
    searchParams: SearchParams,
    passengers: Passenger[],
    contactDetails: ContactDetails,
    appliedCoupon: Coupon | null,
    priceBreakdown: PriceBreakdown
  ): Booking => {
    const pnr = bookingService.generatePNR();
    const bookingId = bookingService.generateBookingId();
    const createdAt = new Date().toISOString();

    return {
      bookingId,
      pnr,
      createdAt,
      flight,
      selectedFare,
      searchParams,
      passengers,
      contactDetails,
      appliedCoupon,
      priceBreakdown,
      paymentStatus: 'CONFIRMED',
    };
  }
};
