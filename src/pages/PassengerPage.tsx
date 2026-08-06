import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useFlightContext } from '../context/FlightContext';
import { useBookingContext } from '../context/BookingContext';
import { PassengerForm } from '../components/passenger/PassengerForm';
import { ContactDetailsForm } from '../components/passenger/ContactDetailsForm';
import { CouponSection } from '../components/passenger/CouponSection';
import { PriceSummarySidebar } from '../components/passenger/PriceSummarySidebar';
import { SpecialFareAlert } from '../components/passenger/SpecialFareAlert';
import { PassengerPageSkeleton } from '../components/common/Skeleton';
import { ArrowLeft, ShieldCheck, UserCheck, Plus } from 'lucide-react';

export const PassengerPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedFlight, selectedFare, searchParams } = useFlightContext();
  const [isPageLoading, setIsPageLoading] = useState(true);

  const {
    passengers,
    contactDetails,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    formErrors,
    validateBookingForm,
    confirmBooking,
    updatePassenger,
    addPassenger,
    removePassenger,
    updateContactField,
  } = useBookingContext();

  // Always scroll to top when landing on Passenger details page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Instant Route Protection: If no flight or fare selected, redirect back to Search screen
  if (!selectedFlight || !selectedFare) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-yovo-bg pt-6">
        <PassengerPageSkeleton />
      </div>
    );
  }

  const handleConfirmAndProceed = () => {
    const isValid = validateBookingForm();
    if (isValid) {
      const booking = confirmBooking();
      if (booking) {
        navigate('/confirmation');
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-yovo-bg pb-12">
      
      {/* Top Sticky Navigation Bar - High z-40 elevation so cards slide UNDER on scroll */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sticky top-16 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/results')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-yovo-red transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Flight Results</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck size={14} />
            <span>Secure 256-Bit SSL Booking</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Passenger & Contact Forms */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Page Header */}
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <UserCheck className="text-yovo-red" size={22} />
                <span>Passenger & Contact Details</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Please enter traveler details matching government-issued photo ID cards.
              </p>
            </div>

            {/* Special Fare Notice */}
            <SpecialFareAlert specialFare={searchParams.specialFare} />

            {/* Passenger Forms */}
            {passengers.map((p, idx) => (
              <PassengerForm
                key={p.id || idx}
                passenger={p}
                index={idx}
                errors={formErrors.passengers[p.id]}
                onChange={updatePassenger}
                onRemove={removePassenger}
              />
            ))}

            {/* Add Traveler Action Buttons */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <button
                type="button"
                onClick={() => addPassenger('Adult')}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:border-yovo-red text-slate-800 hover:text-yovo-red text-xs font-extrabold rounded-2xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus size={15} className="text-yovo-red" />
                <span>Add Adult (+18 yrs)</span>
              </button>

              <button
                type="button"
                onClick={() => addPassenger('Child')}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:border-yovo-red text-slate-800 hover:text-yovo-red text-xs font-extrabold rounded-2xl flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Plus size={15} className="text-yovo-red" />
                <span>Add Child (2-12 yrs)</span>
              </button>
            </div>

            {/* Contact Details Form */}
            <ContactDetailsForm
              contact={contactDetails}
              errors={formErrors.contact}
              onChange={updateContactField}
            />

            {/* Coupon Code Section */}
            <CouponSection
              appliedCoupon={appliedCoupon}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
            />

          </div>

          {/* Right Column: Price Breakdown Sidebar (STICKY TOP-32 BELOW SUBHEADER z-30) */}
          <div className="lg:col-span-4 sticky top-32 z-30">
            <PriceSummarySidebar onProceedToBooking={handleConfirmAndProceed} />
          </div>

        </div>

      </div>

    </div>
  );
};
