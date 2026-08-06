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
    <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
      
      <div className="flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-yovo-slate text-white text-xs font-bold hover:bg-yovo-navy transition-all shadow-sm flex items-center gap-2"
        >
          <Printer size={16} />
          <span>Print Ticket</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Confirmation email resent to primary contact address.')}
          className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
        >
          <Mail size={16} />
          <span>Email Receipt</span>
        </button>
      </div>

      <button
        type="button"
        onClick={handleBookAnother}
        className="px-6 py-2.5 rounded-xl bg-yovo-red text-white text-xs font-bold hover:bg-yovo-red-hover transition-all shadow-md flex items-center gap-2 ml-auto"
      >
        <Plane size={16} />
        <span>Book Another Flight</span>
      </button>

    </div>
  );
};
