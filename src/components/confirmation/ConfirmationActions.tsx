import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Download, Mail, Plane } from 'lucide-react';
import { useFlightContext } from '../../context/FlightContext';
import { useBookingContext } from '../../context/BookingContext';

export const ConfirmationActions: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedFlight, setSelectedFare } = useFlightContext();
  const { clearBooking } = useBookingContext();

  const handlePrint = () => {
    window.print();
  };

  const handleBookAnother = () => {
    setSelectedFlight(null);
    setSelectedFare(null);
    clearBooking();
    navigate('/');
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-200">
      
      {/* Responsive Actions Grid on Mobile, Flex Row on Desktop */}
      <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-2.5 sm:gap-3">
        
        {/* Print Ticket */}
        <button
          type="button"
          onClick={handlePrint}
          className="col-span-1 px-4 sm:px-5 py-2.5 rounded-2xl bg-yovo-slate text-white text-xs font-extrabold hover:bg-yovo-navy transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer size={15} />
          <span>Print Ticket</span>
        </button>

        {/* Download PDF */}
        <button
          type="button"
          onClick={handlePrint}
          className="col-span-1 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-extrabold hover:bg-slate-50 transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download size={15} />
          <span>Download PDF</span>
        </button>

        {/* Email Receipt */}
        <button
          type="button"
          onClick={() => alert('Confirmation email resent to primary contact address.')}
          className="col-span-2 sm:col-span-1 px-4 sm:px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-800 text-xs font-extrabold hover:bg-slate-50 transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <Mail size={15} />
          <span>Email Receipt</span>
        </button>

        {/* Book Another Flight (Primary CTA) */}
        <button
          type="button"
          onClick={handleBookAnother}
          className="col-span-2 sm:col-span-1 sm:ml-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-yovo-red to-yovo-red-hover text-white text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plane size={15} />
          <span>Book Another Flight</span>
        </button>

      </div>

    </div>
  );
};
