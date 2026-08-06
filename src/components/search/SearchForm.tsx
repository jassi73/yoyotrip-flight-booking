import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFlightContext } from '../../context/FlightContext';
import { TripTypeTabs } from './TripTypeTabs';
import { SpecialFareSelector } from './SpecialFareSelector';
import { TravelerDropdown } from './TravelerDropdown';
import { AirportSelectDropdown } from './AirportSelectDropdown';
import { DatePickerDropdown } from './DatePickerDropdown';
import { ArrowLeftRight, PlaneTakeoff, PlaneLanding, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { flightService } from '../../services/flightService';
import { Airport } from '../../types/flight';
import { SpecialFareType } from '../../types/search';

interface SearchFormProps {
  onSearchSubmit?: () => void;
}

export const SearchForm = forwardRef<HTMLDivElement, SearchFormProps>(({ onSearchSubmit }, ref) => {
  const navigate = useNavigate();
  const { searchParams, updateSearchParams } = useFlightContext();
  const airports = flightService.getAirports();

  const handleSwapAirports = () => {
    if (searchParams.origin && searchParams.destination) {
      updateSearchParams({
        origin: searchParams.destination,
        destination: searchParams.origin,
      });
    }
  };

  const handleOriginSelect = (airport: Airport) => {
    updateSearchParams({ origin: airport });
  };

  const handleDestinationSelect = (airport: Airport) => {
    updateSearchParams({ destination: airport });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
    navigate('/results');
  };

  return (
    <div ref={ref} id="search-card-anchor" className="max-w-5xl mx-auto px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200/80 relative z-30 space-y-3 text-slate-900"
      >
        
        {/* Top Bar: Trip Type Tabs + AI Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <TripTypeTabs
            activeType={searchParams.tripType}
            onChange={(type) => updateSearchParams({ tripType: type })}
          />

          <div className="flex items-center gap-1.5 text-[10px] font-bold">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-50 text-yovo-red border border-pink-200">
              <Sparkles size={11} />
              <span>AI Fare Prediction</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Zap size={11} />
              <span>Lowest Fare Today</span>
            </span>
          </div>
        </div>

        {/* Horizontal Custom Input Dropdowns Grid */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
            
            {/* FROM Custom Popover Dropdown */}
            <div className="lg:col-span-3">
              <AirportSelectDropdown
                label="From"
                selectedAirport={searchParams.origin}
                onSelect={handleOriginSelect}
                icon={<PlaneTakeoff size={16} />}
              />
            </div>

            {/* SWAP BUTTON */}
            <div className="lg:col-span-1 flex justify-center py-0.5 lg:py-0">
              <motion.button
                type="button"
                whileHover={{ rotate: 180, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSwapAirports}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-yovo-red hover:border-yovo-red shadow-xs flex items-center justify-center transition-colors shrink-0"
                title="Swap Departure & Destination"
              >
                <ArrowLeftRight size={14} />
              </motion.button>
            </div>

            {/* TO Custom Popover Dropdown */}
            <div className="lg:col-span-3">
              <AirportSelectDropdown
                label="To"
                selectedAirport={searchParams.destination}
                onSelect={handleDestinationSelect}
                icon={<PlaneLanding size={16} />}
              />
            </div>

            {/* DEPARTURE Custom Calendar Popover */}
            <div className="lg:col-span-2">
              <DatePickerDropdown
                label="Departure"
                selectedDate={searchParams.departureDate}
                onSelectDate={(date) => updateSearchParams({ departureDate: date })}
              />
            </div>

            {/* TRAVELERS Custom Popover Dropdown */}
            <div className="lg:col-span-3">
              <TravelerDropdown
                travelers={searchParams.travelers}
                cabinClass={searchParams.cabinClass}
                onChange={(travelers, cabinClass) => updateSearchParams({ travelers, cabinClass })}
              />
            </div>

          </div>

          {/* Special Fares Cards */}
          <SpecialFareSelector
            selectedFare={searchParams.specialFare}
            onChange={(fare: SpecialFareType) => updateSearchParams({ specialFare: fare })}
          />

          {/* CTA Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-slate-100">
            
            <div className="flex items-center gap-2 bg-pink-50/70 px-3 py-1.5 rounded-xl border border-pink-100">
              <div className="w-6 h-6 rounded-full bg-yovo-red text-white flex items-center justify-center font-black text-[10px] shrink-0">
                ₹0
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-slate-900 leading-tight">Convenience Fee on all Domestic flights</p>
                <p className="text-[9px] text-slate-500 leading-none">Pay only the actual flight fare you see!</p>
              </div>
            </div>

            {/* Compact CTA Button */}
            <motion.button
              type="submit"
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 py-2.5 bg-gradient-to-r from-yovo-red to-yovo-red-hover text-white text-xs font-bold rounded-xl shadow-md hover:shadow-yovo-glow transition-all duration-200 flex items-center justify-center gap-2 shrink-0"
            >
              <span>Find Best Flights</span>
              <ArrowRight size={14} />
            </motion.button>

          </div>

        </form>

      </motion.div>
    </div>
  );
});

SearchForm.displayName = 'SearchForm';
