import React, { useState, useRef, useEffect } from 'react';
import { TravelerCount, CabinClass } from '../../types/search';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TravelerDropdownProps {
  travelers: TravelerCount;
  cabinClass: CabinClass;
  onChange: (travelers: TravelerCount, cabinClass: CabinClass) => void;
}

export const TravelerDropdown: React.FC<TravelerDropdownProps> = ({
  travelers,
  cabinClass,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCount = travelers.adults + travelers.children + travelers.infants;

  const updateTraveler = (type: keyof TravelerCount, delta: number) => {
    const current = travelers[type];
    const next = Math.max(0, current + delta);

    if (type === 'adults' && next < 1) return;
    if (type === 'infants' && next > travelers.adults) return;

    onChange({ ...travelers, [type]: next }, cabinClass);
  };

  const handleCabinChange = (cClass: CabinClass) => {
    onChange(travelers, cClass);
  };

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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-slate-50 hover:bg-white border rounded-xl p-2.5 transition-all duration-200 shadow-2xs ${
          isOpen ? 'bg-white border-yovo-red ring-2 ring-yovo-red/20' : 'border-slate-200 hover:border-yovo-red'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Users size={16} className="text-yovo-red shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-0.5">
              Travelers & Class
            </span>
            <div className="text-xs font-black text-slate-900 truncate leading-snug">
              {totalCount} Traveler{totalCount > 1 ? 's' : ''}
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate block leading-tight">
              {cabinClass}
            </span>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Popover Custom Dropdown with Fixed Pinned Bottom Done Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-[100] text-slate-900 flex flex-col max-h-[320px]"
          >
            {/* Scrollable Traveler Options Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-0.5">
              
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Adults</p>
                  <p className="text-[10px] text-slate-400">12+ years</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateTraveler('adults', -1)}
                    disabled={travelers.adults <= 1}
                    className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-4 text-center font-bold text-xs">{travelers.adults}</span>
                  <button
                    type="button"
                    onClick={() => updateTraveler('adults', 1)}
                    disabled={travelers.adults >= 9}
                    className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                <div>
                  <p className="text-xs font-bold text-slate-900">Children</p>
                  <p className="text-[10px] text-slate-400">2-11 years</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateTraveler('children', -1)}
                    disabled={travelers.children <= 0}
                    className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-4 text-center font-bold text-xs">{travelers.children}</span>
                  <button
                    type="button"
                    onClick={() => updateTraveler('children', 1)}
                    disabled={travelers.children >= 6}
                    className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50"
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>

              {/* Cabin Class Selection */}
              <div className="border-t border-slate-100 pt-2.5">
                <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Cabin Class
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {(['Economy', 'Premium Economy', 'Business'] as CabinClass[]).map((cClass) => (
                    <button
                      key={cClass}
                      type="button"
                      onClick={() => handleCabinChange(cClass)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        cabinClass === cClass
                          ? 'bg-yovo-red-50 text-yovo-red font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {cClass}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Pinned Bottom Footer Action */}
            <div className="shrink-0 border-t border-slate-100 pt-2 mt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-yovo-slate text-white text-xs font-bold rounded-xl hover:bg-yovo-navy transition-colors shadow-xs"
              >
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
