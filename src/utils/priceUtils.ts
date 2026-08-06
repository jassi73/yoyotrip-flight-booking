import { FareOption } from '../types/flight';
import { Coupon } from '../types/coupon';
import { SPECIAL_FARE_DISCOUNTS } from '../constants';
import { PriceBreakdown } from '../types/booking';

export const calculatePriceBreakdown = (
  fare: FareOption,
  passengerCount: number,
  specialFareType: string = 'regular',
  coupon: Coupon | null = null
): PriceBreakdown => {
  const baseFare = fare.basePrice * passengerCount;
  const taxesAndFees = fare.taxes * passengerCount;
  
  // Promotional ₹0 convenience fee
  const standardConvenienceFee = 350 * passengerCount;
  const convenienceFeeDiscount = standardConvenienceFee;
  const convenienceFee = 0;

  const perPassengerSpecialDiscount = SPECIAL_FARE_DISCOUNTS[specialFareType] || 0;
  const specialFareDiscount = perPassengerSpecialDiscount * passengerCount;

  let couponDiscount = 0;
  const subtotalBeforeCoupon = baseFare + taxesAndFees - specialFareDiscount;

  if (coupon && subtotalBeforeCoupon >= (coupon.minBookingValue || 0)) {
    if (coupon.discountType === 'percentage') {
      const calculated = (subtotalBeforeCoupon * coupon.discountValue) / 100;
      couponDiscount = Math.min(calculated, coupon.maxDiscount || calculated);
    } else {
      couponDiscount = Math.min(coupon.discountValue, coupon.maxDiscount || coupon.discountValue);
    }
  }

  const totalAmount = Math.max(0, subtotalBeforeCoupon - couponDiscount);

  return {
    baseFare,
    taxesAndFees,
    convenienceFee,
    convenienceFeeDiscount,
    specialFareDiscount,
    couponDiscount,
    totalAmount,
  };
};
