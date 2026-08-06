import React from 'react';
import { Booking } from '../../types/booking';
import { CheckCircle2, Sparkles, Copy } from 'lucide-react';

interface BookingHeaderProps {
  booking: Booking;
}

export const BookingHeader: React.FC<BookingHeaderProps> = ({ booking }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyPNR = () => {
    navigator.clipboard.writeText(booking.pnr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-yovo-slate to-yovo-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
      
      {/* Background Glow Overlay */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yovo-red/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Status */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <CheckCircle2 size={15} />
            <span>Booking Confirmed</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Pack your bags! Your flight is booked.
          </h2>

          <p className="text-xs text-slate-300">
            A confirmation receipt and E-ticket have been sent to{' '}
            <strong className="text-white">{booking.contactDetails.email}</strong>.
          </p>
        </div>

        {/* Right PNR & Booking ID Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-6 shrink-0">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              PNR / Booking Reference
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-2xl font-black text-amber-400 tracking-wider">
                {booking.pnr}
              </span>
              <button
                type="button"
                onClick={handleCopyPNR}
                className="p-1 text-slate-300 hover:text-white transition-colors"
                title="Copy PNR"
              >
                <Copy size={15} />
              </button>
            </div>
            {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
          </div>

          <div className="h-8 w-px bg-white/20" />

          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              Booking ID
            </span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              {booking.bookingId}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
