import React, { useState, useRef, useEffect } from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { SortOption } from '../../types/filter';
import { formatCurrency } from '../../utils/currency';
import { Zap, Tag, ArrowUpDown, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SortTabs: React.FC = () => {
  const { filters, updateFilter, filteredFlights } = useFlightContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const cheapestFlight = [...filteredFlights].sort((a, b) => a.price - b.price)[0];
  const fastestFlight = [...filteredFlights].sort((a, b) => a.durationMinutes - b.durationMinutes)[0];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance (Yovo AI)' },
    { value: 'cheapest', label: 'Price: Low to High' },
    { value: 'fastest', label: 'Duration: Shortest First' },
    { value: 'departure-early', label: 'Departure: Earliest' },
    { value: 'arrival-early', label: 'Arrival: Earliest' },
  ];

  const currentSortLabel = sortOptions.find((opt) => opt.value === filters.sortBy)?.label || 'Price: Low to High';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
      
      {/* Cheapest Tab Card */}
      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => updateFilter('sortBy', 'cheapest')}
        className={`p-2.5 px-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 shadow-2xs ${
          filters.sortBy === 'cheapest'
            ? 'bg-yovo-slate text-white border-yovo-slate ring-2 ring-yovo-red/30 shadow-md'
            : 'bg-white text-slate-800 border-slate-200 hover:border-yovo-red/40 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${filters.sortBy === 'cheapest' ? 'bg-white/10 text-amber-400' : 'bg-pink-50 text-yovo-red'}`}>
            <Tag size={14} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block leading-none mb-0.5 opacity-80">
              Cheapest
            </span>
            <span className="text-xs font-bold block leading-tight">
              Best Value
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-sm font-extrabold leading-none">
            {cheapestFlight ? formatCurrency(cheapestFlight.price) : 'N/A'}
          </div>
          <div className={`text-[10px] font-medium mt-0.5 ${filters.sortBy === 'cheapest' ? 'text-slate-300' : 'text-slate-500'}`}>
            {cheapestFlight ? cheapestFlight.duration : ''}
          </div>
        </div>
      </motion.button>

      {/* Fastest Tab Card */}
      <motion.button
        type="button"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => updateFilter('sortBy', 'fastest')}
        className={`p-2.5 px-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 shadow-2xs ${
          filters.sortBy === 'fastest'
            ? 'bg-yovo-slate text-white border-yovo-slate ring-2 ring-yovo-red/30 shadow-md'
            : 'bg-white text-slate-800 border-slate-200 hover:border-yovo-red/40 hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${filters.sortBy === 'fastest' ? 'bg-white/10 text-amber-400' : 'bg-pink-50 text-yovo-red'}`}>
            <Zap size={14} />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block leading-none mb-0.5 opacity-80">
              Fastest
            </span>
            <span className="text-xs font-bold block leading-tight">
              Shortest Time
            </span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-sm font-extrabold leading-none">
            {fastestFlight ? formatCurrency(fastestFlight.price) : 'N/A'}
          </div>
          <div className={`text-[10px] font-medium mt-0.5 ${filters.sortBy === 'fastest' ? 'text-slate-300' : 'text-slate-500'}`}>
            {fastestFlight ? fastestFlight.duration : ''}
          </div>
        </div>
      </motion.button>

      {/* Custom Animated Sort By Dropdown Card */}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2.5 px-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 shadow-2xs ${
            isOpen
              ? 'bg-white border-yovo-red ring-2 ring-pink-100'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-lg bg-pink-50 text-yovo-red shrink-0">
              <ArrowUpDown size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 block leading-none mb-0.5">
                Sort By
              </span>
              <span className="text-xs font-extrabold text-slate-900 block truncate leading-tight">
                {currentSortLabel}
              </span>
            </div>
          </div>
          <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-yovo-red' : ''}`} />
        </button>

        {/* Custom Animated Popover */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className="absolute top-full right-0 mt-1.5 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 p-1.5 z-50 text-slate-900"
            >
              {sortOptions.map((opt) => {
                const isSelected = opt.value === filters.sortBy;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      updateFilter('sortBy', opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-between gap-2 ${
                      isSelected ? 'bg-pink-50 text-yovo-red' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check size={14} className="text-yovo-red shrink-0" />}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
