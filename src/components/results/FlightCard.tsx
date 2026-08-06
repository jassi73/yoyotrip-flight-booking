import React, { useState } from 'react';
import { Flight, FareOption } from '../../types/flight';
import { FlightTimeline } from './FlightTimeline';
import { FareDetailsModal } from '../../components/results/FareDetailsModal';
import { formatCurrency } from '../../utils/currency';
import { useFlightContext } from '../../context/FlightContext';
import { useNavigate } from 'react-router-dom';
import { Briefcase, ShoppingBag, Utensils, RefreshCcw, Calendar, ArrowRight, Percent, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlightCardProps {
  flight: Flight;
  showPromoHeader?: boolean;
}

const AIRLINE_BOX_STYLES: Record<string, { bg: string; text: string }> = {
  '6E': { bg: 'bg-blue-900', text: 'text-white' },
  'AI': { bg: 'bg-orange-600', text: 'text-white' },
  'UK': { bg: 'bg-purple-800', text: 'text-white' },
  'QP': { bg: 'bg-orange-500', text: 'text-white' },
  'SG': { bg: 'bg-red-600', text: 'text-white' },
};

export const FlightCard: React.FC<FlightCardProps> = ({ flight, showPromoHeader = false }) => {
  const { selectFlightAndFare } = useFlightContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const defaultFare = flight.fareOptions[0];
  const style = AIRLINE_BOX_STYLES[flight.airline.code] || { bg: 'bg-slate-800', text: 'text-white' };

  const handleBookClick = () => {
    selectFlightAndFare(flight, defaultFare);
    navigate('/passenger');
  };

  const handleSelectSpecificFare = (fare: FareOption) => {
    selectFlightAndFare(flight, fare);
    navigate('/passenger');
  };

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className={`bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 text-slate-900 relative ${
        isCardHovered ? 'z-30' : 'z-10'
      }`}
    >
      
      {/* Top Promotional Banner */}
      {(showPromoHeader || flight.tags?.includes("Yovo's pick")) && (
        <div className="bg-emerald-700 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 sm:px-4 flex items-center justify-center gap-1.5 rounded-t-3xl overflow-hidden text-center">
          <Percent size={13} className="shrink-0" />
          <span>₹0 Convenience Fee on all Domestic flights</span>
        </div>
      )}

      <div className="p-4 sm:p-5 space-y-4">
        
        {/* Main Content Grid: Top Row (Airline + Price on mobile), Timeline, Desktop Price */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          {/* Airline Logo & Name + Mobile Price Header */}
          <div className="lg:col-span-3 flex items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center font-black text-sm shadow-xs shrink-0`}>
                <Plane size={18} className="rotate-45" />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight truncate">
                  {flight.airline.name}
                </h4>
                <span className="text-[11px] sm:text-xs text-slate-400 font-bold block mt-0.5">
                  {flight.flightNumber}
                </span>
              </div>
            </div>

            {/* Price Block (Visible ONLY on Mobile Screens) */}
            <div className="lg:hidden text-right shrink-0">
              <div className="text-xl font-black text-emerald-600 leading-none">
                {formatCurrency(flight.price)}
              </div>
              <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                per adult
              </span>
            </div>
          </div>

          {/* Departure, Duration Timeline, Arrival */}
          <div className="lg:col-span-7">
            <FlightTimeline flight={flight} />
          </div>

          {/* Right Price Block (Visible ONLY on Desktop Screens) */}
          <div className="hidden lg:block lg:col-span-2 text-right">
            <div className="text-2xl font-black text-emerald-600 leading-none">
              {formatCurrency(flight.price)}
            </div>
            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
              per adult
            </span>
            <div className="text-xs font-bold mt-1">
              <span className="line-through text-slate-400 mr-1">₹325</span>
              <span className="text-emerald-600">₹0 conv. fee</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-100" />

        {/* Bottom Amenities Pills + Full-Width Mobile Select CTA Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Amenities Pills */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 font-semibold">
              <Briefcase size={12} className="text-yovo-red shrink-0" />
              <span>{defaultFare.baggageCabin || '7Kg Cabin'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 font-semibold">
              <ShoppingBag size={12} className="text-yovo-red shrink-0" />
              <span>{defaultFare.baggageCheckIn || '15Kg Checkin'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 font-semibold">
              <Utensils size={12} className="text-yovo-red shrink-0" />
              <span>Chargeable Meals</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold">
              <RefreshCcw size={12} className="shrink-0" />
              <span>{defaultFare.refundable ? 'Refundable' : 'Non-refundable'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 font-semibold">
              <Calendar size={12} className="text-yovo-red shrink-0" />
              <span>Date Change Allowed</span>
            </span>
          </div>

          {/* Select CTA Button (Full width on mobile for easy tapping) */}
          <button
            type="button"
            onClick={handleBookClick}
            className="w-full sm:w-auto px-6 py-2.5 bg-yovo-slate hover:bg-yovo-navy text-white text-xs font-extrabold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <span>Select Flight</span>
            <ArrowRight size={14} />
          </button>

        </div>

      </div>

      {/* Modal for Fare options */}
      <FareDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        flight={flight}
        onSelectFare={handleSelectSpecificFare}
      />

    </motion.div>
  );
};
