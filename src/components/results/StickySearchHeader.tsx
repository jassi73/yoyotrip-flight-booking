import React, { useState } from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { formatDateDisplay } from '../../utils/dateUtils';
import { Edit2, PlaneTakeoff, PlaneLanding, Calendar, Users, ArrowRight } from 'lucide-react';
import { AirportSelectDropdown } from '../search/AirportSelectDropdown';
import { DatePickerDropdown } from '../search/DatePickerDropdown';
import { TravelerDropdown } from '../search/TravelerDropdown';
import { Airport } from '../../types/flight';
import { motion } from 'framer-motion';

export const StickySearchHeader: React.FC = () => {
  const { searchParams, updateSearchParams } = useFlightContext();
  const [isEditing, setIsEditing] = useState(false);

  const totalTravelers = searchParams.travelers.adults + searchParams.travelers.children + searchParams.travelers.infants;

  return (
    <div className="bg-gradient-to-r from-yovo-red via-yovo-red to-yovo-red-dark text-white shadow-md sticky top-16 z-30 border-b border-pink-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        {!isEditing ? (
          <div className="flex items-center justify-between gap-3 w-full">
            
            {/* Left Search Info Summary Bar */}
            <div className="flex items-center gap-3 text-xs font-semibold flex-wrap min-w-0">
              
              {/* Trip Type Badge */}
              <span className="bg-white/15 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shrink-0">
                {searchParams.tripType}
              </span>

              {/* Origin -> Destination */}
              <div className="flex items-center gap-1.5 text-sm font-extrabold truncate">
                <span>{searchParams.origin?.city} ({searchParams.origin?.code})</span>
                <ArrowRight size={14} className="shrink-0 text-white/80" />
                <span>{searchParams.destination?.city} ({searchParams.destination?.code})</span>
              </div>

              <span className="hidden sm:inline-block text-white/30">•</span>

              {/* Date */}
              <div className="hidden sm:flex items-center gap-1 text-slate-100">
                <Calendar size={13} className="text-white/80" />
                <span>{formatDateDisplay(searchParams.departureDate)}</span>
              </div>

              <span className="hidden md:inline-block text-white/30">•</span>

              {/* Travelers & Class */}
              <div className="hidden md:flex items-center gap-1 text-slate-100">
                <Users size={13} className="text-white/80" />
                <span>{totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}</span>
                <span className="bg-white/15 px-2 py-0.5 rounded text-[10px] font-bold ml-1">
                  {searchParams.cabinClass}
                </span>
              </div>

            </div>

            {/* Right Action: Modify Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-yovo-red text-xs font-extrabold hover:bg-slate-50 transition-all shadow-xs shrink-0"
            >
              <Edit2 size={13} />
              <span>Modify Search</span>
            </motion.button>

          </div>
        ) : (
          /* Inline Custom Popover Search Bar (Same flow as Home Page) */
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-white text-slate-900 rounded-2xl shadow-xl flex flex-wrap items-center gap-2.5"
          >
            
            {/* FROM Custom Airport Popover */}
            <div className="flex-1 min-w-[180px]">
              <AirportSelectDropdown
                label="From"
                selectedAirport={searchParams.origin}
                onSelect={(apt: Airport) => updateSearchParams({ origin: apt })}
                icon={<PlaneTakeoff size={14} />}
              />
            </div>

            {/* TO Custom Airport Popover */}
            <div className="flex-1 min-w-[180px]">
              <AirportSelectDropdown
                label="To"
                selectedAirport={searchParams.destination}
                onSelect={(apt: Airport) => updateSearchParams({ destination: apt })}
                icon={<PlaneLanding size={14} />}
              />
            </div>

            {/* DEPARTURE Custom Calendar Popover */}
            <div className="w-44">
              <DatePickerDropdown
                label="Departure"
                selectedDate={searchParams.departureDate}
                onSelectDate={(date) => updateSearchParams({ departureDate: date })}
              />
            </div>

            {/* TRAVELERS & CLASS Custom Popover */}
            <div className="w-52">
              <TravelerDropdown
                travelers={searchParams.travelers}
                cabinClass={searchParams.cabinClass}
                onChange={(travelers, cabinClass) => updateSearchParams({ travelers, cabinClass })}
              />
            </div>

            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 rounded-xl bg-yovo-red text-white text-xs font-extrabold hover:bg-yovo-red-hover transition-colors shadow-xs ml-auto shrink-0"
            >
              Apply Changes
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
