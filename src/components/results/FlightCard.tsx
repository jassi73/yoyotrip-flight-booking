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
      
      {/* Top Green Banner */}
      {(showPromoHeader || flight.tags?.includes("Yovo's pick")) && (
        <div className="bg-emerald-700 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-center gap-2 rounded-t-3xl overflow-hidden">
          <Percent size={14} />
          <span>₹0 Convenience Fee on all Domestic flights</span>
        </div>
      )}

      <div className="p-5 space-y-4">
        
        {/* Main Content Grid: Airline + Departure/Timeline/Arrival + Price */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Airline Logo & Name */}
          <div className="lg:col-span-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${style.bg} ${style.text} flex items-center justify-center font-black text-sm shadow-xs shrink-0`}>
              <Plane size={20} className="rotate-45" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                {flight.airline.name}
              </h4>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">
                {flight.flightNumber}
              </span>
            </div>
          </div>

          {/* Departure, Duration Timeline, Arrival (Generous Col Span for Full Airport Names) */}
          <div className="lg:col-span-7">
            <FlightTimeline flight={flight} />
          </div>

          {/* Right Price Block */}
          <div className="lg:col-span-2 text-right">
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

        {/* Bottom Amenities Pills + Select CTA Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Amenities Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 text-xs font-semibold">
              <Briefcase size={13} className="text-yovo-red" />
              <span>{defaultFare.baggageCabin || '7Kg Cabin'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 text-xs font-semibold">
              <ShoppingBag size={13} className="text-yovo-red" />
              <span>{defaultFare.baggageCheckIn || '15Kg Checkin'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 text-xs font-semibold">
              <Utensils size={13} className="text-yovo-red" />
              <span>Chargeable Meals</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold">
              <RefreshCcw size={13} />
              <span>{defaultFare.refundable ? 'Refundable' : 'Non-refundable'}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-50/70 border border-pink-100 text-slate-700 text-xs font-semibold">
              <Calendar size={13} className="text-yovo-red" />
              <span>Date Change Allowed</span>
            </span>
          </div>

          {/* Select CTA Button */}
          <button
            type="button"
            onClick={handleBookClick}
            className="px-6 py-2.5 bg-yovo-slate hover:bg-yovo-navy text-white text-xs font-extrabold rounded-xl transition-colors flex items-center gap-2 shadow-sm shrink-0"
          >
            <span>Select</span>
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
