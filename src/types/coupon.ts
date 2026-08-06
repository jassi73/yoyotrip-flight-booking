export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount: number;
  minBookingValue: number;
  description: string;
  expiryDate?: string;
}
