import React from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { useBookingContext } from '../../context/BookingContext';
import { formatCurrency } from '../../utils/currency';
import { Plane, ShieldCheck, Check } from 'lucide-react';
import { formatDateDisplay } from '../../utils/dateUtils';

interface PriceSummarySidebarProps {
  onProceedToBooking: () => void;
}

export const PriceSummarySidebar: React.FC<PriceSummarySidebarProps> = ({ onProceedToBooking }) => {
  const { selectedFlight, selectedFare, searchParams } = useFlightContext();
  const { priceBreakdown } = useBookingContext();

  if (!selectedFlight || !selectedFare || !priceBreakdown) {
    return null;
  }

  const travelerCount = searchParams.travelers.adults + searchParams.travelers.children;

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-md space-y-4 text-slate-900 max-h-[calc(100vh-140px)] overflow-y-auto no-scrollbar">
      
      {/* Selected Flight Summary */}
      <div className="pb-3 border-b border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Selected Flight
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-pink-50 text-yovo-red border border-pink-200">
            {selectedFare.type}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-0.5">
          <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
            {selectedFlight.airline.code}
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
              {selectedFlight.airline.name} ({selectedFlight.flightNumber})
            </h4>
            <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
              {selectedFlight.origin.code} → {selectedFlight.destination.code} ({selectedFlight.duration})
            </p>
          </div>
        </div>

        <div className="text-[11px] font-semibold text-slate-600 pt-1 flex items-center gap-1.5">
          <Plane size={13} className="text-yovo-red" />
          <span>{formatDateDisplay(searchParams.departureDate)} at {selectedFlight.departureTime}</span>
        </div>
      </div>

      {/* Fare Breakdown */}
      <div className="space-y-2 text-xs text-slate-700">
        <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[10px]">
          Fare Breakdown ({travelerCount} Traveler{travelerCount > 1 ? 's' : ''})
        </h4>

        <div className="flex justify-between font-medium">
          <span className="text-slate-500">Base Fare</span>
          <span className="font-bold text-slate-900">{formatCurrency(priceBreakdown.baseFare)}</span>
        </div>

        <div className="flex justify-between font-medium">
          <span className="text-slate-500">Taxes & Airline Fees</span>
          <span className="font-bold text-slate-900">{formatCurrency(priceBreakdown.taxesAndFees)}</span>
        </div>

        <div className="flex justify-between items-center text-emerald-600 font-medium">
          <span className="flex items-center gap-1">
            <span>Convenience Fee</span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
              PROMO
            </span>
          </span>
          <span className="font-extrabold">₹0 (Free)</span>
        </div>

        {priceBreakdown.specialFareDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Special Fare Discount</span>
            <span className="font-bold">- {formatCurrency(priceBreakdown.specialFareDiscount)}</span>
          </div>
        )}

        {priceBreakdown.couponDiscount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Promo Coupon Discount</span>
            <span className="font-bold">- {formatCurrency(priceBreakdown.couponDiscount)}</span>
          </div>
        )}
      </div>

      {/* Total Amount */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Amount
          </span>
          <span className="text-2xl font-black text-yovo-red">
            {formatCurrency(priceBreakdown.totalAmount)}
          </span>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-emerald-600 font-bold flex items-center justify-end gap-1">
            <Check size={12} />
            <span>Best Fare Guarantee</span>
          </span>
        </div>
      </div>

      {/* Primary Crimson CTA Button */}
      <button
        type="button"
        onClick={onProceedToBooking}
        className="w-full py-3 bg-yovo-red text-white text-xs font-extrabold rounded-2xl hover:bg-yovo-red-hover focus:ring-4 focus:ring-pink-200 transition-all shadow-md hover:shadow-yovo-glow active:scale-98 flex items-center justify-center gap-2"
      >
        <ShieldCheck size={16} />
        <span>Confirm Booking</span>
      </button>

      <p className="text-[9px] text-center text-slate-400 leading-snug">
        By clicking Confirm Booking, you agree to YovoTrip's terms, fare rules & cancellation policy.
      </p>

    </div>
  );
};
