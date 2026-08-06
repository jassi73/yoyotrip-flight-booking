import React, { useState, useRef, useEffect } from 'react';
import { Airport } from '../../types/flight';
import { flightService } from '../../services/flightService';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AirportSelectDropdownProps {
  label: string;
  selectedAirport: Airport | null;
  onSelect: (airport: Airport) => void;
  icon: React.ReactNode;
}

export const AirportSelectDropdown: React.FC<AirportSelectDropdownProps> = ({
  label,
  selectedAirport,
  onSelect,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const airports = flightService.getAirports();

  const filteredAirports = airports.filter((apt) => {
    const q = searchQuery.toLowerCase();
    return (
      apt.city.toLowerCase().includes(q) ||
      apt.code.toLowerCase().includes(q) ||
      apt.name.toLowerCase().includes(q)
    );
  });

  const popularCodes = ['DEL', 'BOM', 'MAA', 'BLR', 'CCU', 'GOI'];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Card */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-slate-50 hover:bg-white border rounded-xl p-2.5 transition-all duration-200 shadow-2xs ${
          isOpen ? 'bg-white border-yovo-red ring-2 ring-yovo-red/20' : 'border-slate-200 hover:border-yovo-red'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="text-yovo-red shrink-0">{icon}</div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-0.5">
              {label}
            </span>
            <div className="text-xs font-black text-slate-900 truncate leading-snug flex items-center justify-between">
              <span>{selectedAirport ? `${selectedAirport.city} (${selectedAirport.code})` : 'Select City'}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate block leading-tight">
              {selectedAirport?.name || 'Search Airport'}
            </span>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Popover Custom Dropdown Starting below input card with z-[100] elevation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1.5 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-[100] text-slate-900 max-h-[260px] flex flex-col"
          >
            {/* Search Input Box */}
            <div className="relative mb-2 shrink-0">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search city, airport or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs outline-none focus:border-yovo-red focus:bg-white font-medium"
              />
            </div>

            {/* Popular Airports Chips */}
            <div className="mb-2 shrink-0">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Popular Cities
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                {popularCodes.map((code) => {
                  const apt = airports.find((a) => a.code === code);
                  if (!apt) return null;
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        onSelect(apt);
                        setIsOpen(false);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-pink-50 hover:text-yovo-red text-[10px] font-bold text-slate-700 transition-colors"
                    >
                      {apt.city} ({code})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compact Scrollable Airport List */}
            <div className="overflow-y-auto space-y-1 divide-y divide-slate-100 border-t border-slate-100 pt-1 flex-1 min-h-0">
              {filteredAirports.length > 0 ? (
                filteredAirports.map((apt) => (
                  <button
                    key={apt.code}
                    type="button"
                    onClick={() => {
                      onSelect(apt);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-1.5 rounded-xl transition-colors flex items-center justify-between gap-2 ${
                      selectedAirport?.code === apt.code
                        ? 'bg-yovo-red-50 text-yovo-red font-bold'
                        : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold truncate leading-tight">
                          {apt.city}, {apt.country}
                        </p>
                        <p className="text-[9px] text-slate-400 truncate leading-tight">
                          {apt.name}
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 uppercase shrink-0">
                      {apt.code}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-3">No airports found</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
