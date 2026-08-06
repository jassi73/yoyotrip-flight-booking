import React from 'react';
import { Flight, FareOption } from '../../types/flight';
import { Modal } from '../common/Modal';
import { formatCurrency } from '../../utils/currency';
import { Check, Shield, Briefcase, RefreshCw, XCircle } from 'lucide-react';

interface FareDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight;
  onSelectFare: (fare: FareOption) => void;
}

export const FareDetailsModal: React.FC<FareDetailsModalProps> = ({
  isOpen,
  onClose,
  flight,
  onSelectFare,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Select Fare Tier - ${flight.airline.name} (${flight.flightNumber})`} maxWidth="xl">
      <div className="space-y-4">
        <p className="text-xs text-slate-500">
          Choose the fare option that best fits your travel needs. Prices are per traveler.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {flight.fareOptions.map((fare) => (
            <div
              key={fare.type}
              className="bg-white rounded-2xl border-2 border-slate-100 hover:border-yovo-red p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {fare.type}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {fare.seatsLeft} seats left
                  </span>
                </div>

                <div className="text-xl font-extrabold text-yovo-red mb-3">
                  {formatCurrency(fare.basePrice)}
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Briefcase size={14} className="text-slate-400 shrink-0" />
                    <span>Check-in: <strong>{fare.baggageCheckIn}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-slate-400 shrink-0" />
                    <span>Cabin: <strong>{fare.baggageCabin}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <RefreshCw size={14} className="text-slate-400 shrink-0" />
                    <span>Date change fee: <strong>{formatCurrency(fare.dateChangeFee)}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {fare.refundable ? (
                      <>
                        <Check size={14} className="text-emerald-500 shrink-0" />
                        <span className="text-emerald-700 font-semibold">Refundable</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={14} className="text-red-400 shrink-0" />
                        <span className="text-red-500">Non-refundable</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectFare(fare);
                  onClose();
                }}
                className="w-full mt-5 py-2.5 rounded-xl bg-yovo-red text-white text-xs font-bold hover:bg-yovo-red-hover transition-colors shadow-sm"
              >
                Select {fare.type}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
