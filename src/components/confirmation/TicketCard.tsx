import React from 'react';
import { Booking } from '../../types/booking';
import { QrCodeGraphic } from './QrCodeGraphic';
import { formatDateDisplay } from '../../utils/dateUtils';
import { formatCurrency } from '../../utils/currency';
import { Plane, User, Luggage, ShieldCheck, Ticket } from 'lucide-react';

interface TicketCardProps {
  booking: Booking;
}

export const TicketCard: React.FC<TicketCardProps> = ({ booking }) => {
  const { flight, selectedFare, passengers, priceBreakdown } = booking;

  return (
    <div id="printable-ticket" className="bg-white rounded-3xl border border-slate-200 shadow-yovo-card overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yovo-red flex items-center justify-center font-bold text-sm">
            Y
          </div>
          <div>
            <h3 className="text-sm font-extrabold tracking-wide">YovoTrip E-Ticket & Boarding Pass</h3>
            <p className="text-[10px] text-slate-400">Confirmed Flight Ticket • Non-Transferable</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Status
          </span>
          <span className="text-xs font-black text-emerald-400 uppercase">
            CONFIRMED
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Flight Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-100 pb-6">
          
          <div className="md:col-span-3 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-800 text-xs">
                {flight.airline.code}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {flight.airline.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {flight.flightNumber}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-yovo-red bg-pink-50 px-2 py-0.5 rounded-full inline-block mt-2">
              Cabin: {selectedFare.type}
            </span>
          </div>

          <div className="md:col-span-6 flex items-center justify-between text-center gap-2">
            <div className="text-left">
              <div className="text-xl font-black text-slate-900">{flight.departureTime}</div>
              <div className="text-xs font-bold text-slate-700">{flight.origin.code}</div>
              <div className="text-[11px] text-slate-400">{flight.origin.city}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{flight.terminalDeparture || 'Terminal 3'}</div>
            </div>

            <div className="flex-1 px-3">
              <div className="text-xs font-bold text-slate-500 mb-1">{flight.duration}</div>
              <div className="relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-slate-300" />
                <Plane size={16} className="absolute text-yovo-red bg-white px-0.5" />
              </div>
              <div className="text-[10px] text-emerald-600 font-bold mt-1">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xl font-black text-slate-900">{flight.arrivalTime}</div>
              <div className="text-xs font-bold text-slate-700">{flight.destination.code}</div>
              <div className="text-[11px] text-slate-400">{flight.destination.city}</div>
              <div className="text-[10px] text-slate-500 font-semibold">{flight.terminalArrival || 'Terminal 1'}</div>
            </div>
          </div>

          <div className="md:col-span-3 flex justify-center md:justify-end">
            <QrCodeGraphic value={booking.pnr} />
          </div>

        </div>

        {/* Passenger List Table */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <User size={14} className="text-yovo-red" />
            <span>Passenger Information</span>
          </h4>

          <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Passenger Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Seat</th>
                  <th className="p-3">Meal</th>
                  <th className="p-3">Baggage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-800 font-medium">
                {passengers.map((p, i) => (
                  <tr key={p.id || i}>
                    <td className="p-3 font-bold">
                      {p.salutation} {p.firstName} {p.lastName}
                    </td>
                    <td className="p-3">{p.type}</td>
                    <td className="p-3 font-semibold text-yovo-red">{p.seatPreference || `1${String.fromCharCode(65 + i)}`}</td>
                    <td className="p-3">{p.mealPreference || 'Standard'}</td>
                    <td className="p-3">{selectedFare.baggageCheckIn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Baggage & Fare Summary Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6 text-xs">
          
          <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 flex items-start gap-3">
            <Luggage size={20} className="text-yovo-red shrink-0" />
            <div>
              <h5 className="font-bold text-slate-900">Baggage Policy</h5>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Check-in: <strong>{selectedFare.baggageCheckIn}</strong> • Cabin: <strong>{selectedFare.baggageCabin}</strong>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Fare Paid
              </span>
              <span className="text-lg font-black text-yovo-red">
                {formatCurrency(priceBreakdown.totalAmount)}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Payment Successful
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
