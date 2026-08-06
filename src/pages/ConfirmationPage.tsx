import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBookingContext } from '../context/BookingContext';
import { BookingHeader } from '../components/confirmation/BookingHeader';
import { TicketCard } from '../components/confirmation/TicketCard';
import { ConfirmationActions } from '../components/confirmation/ConfirmationActions';

export const ConfirmationPage: React.FC = () => {
  const { currentBooking } = useBookingContext();

  // Instant Route Protection: Redirect if no active booking
  if (!currentBooking) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-yovo-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Success & PNR Header */}
        <BookingHeader booking={currentBooking} />

        {/* Printable Ticket Card */}
        <TicketCard booking={currentBooking} />

        {/* Action Buttons */}
        <ConfirmationActions />

      </div>
    </div>
  );
};
