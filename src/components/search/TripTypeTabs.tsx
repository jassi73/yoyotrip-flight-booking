import React, { useState } from 'react';
import { TripType } from '../../types/search';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TripTypeTabsProps {
  activeType: TripType;
  onChange: (type: TripType) => void;
}

export const TripTypeTabs: React.FC<TripTypeTabsProps> = ({ activeType, onChange }) => {
  const [comingSoonType, setComingSoonType] = useState<TripType | null>(null);

  const handleTabClick = (type: TripType) => {
    if (type === 'round-trip' || type === 'multi-city') {
      setComingSoonType(type);
      setTimeout(() => {
        setComingSoonType(null);
      }, 3000);
      return;
    }
    onChange(type);
  };

  const options: { id: TripType; label: string }[] = [
    { id: 'one-way', label: 'One way' },
    { id: 'round-trip', label: 'Round Trip' },
    { id: 'multi-city', label: 'Multi City' },
  ];

  return (
    <div className="flex items-center gap-4 flex-wrap text-xs">
      <div className="flex items-center gap-4">
        {options.map((opt) => {
          const isSelected = activeType === opt.id;
          return (
            <div key={opt.id} className="relative">
              <button
                type="button"
                onClick={() => handleTabClick(opt.id)}
                className="flex items-center gap-1.5 cursor-pointer group outline-none"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-yovo-red bg-yovo-red' : 'border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                <span className={`font-semibold transition-colors ${isSelected ? 'text-slate-900 font-extrabold' : 'text-slate-600 group-hover:text-slate-900'}`}>
                  {opt.label}
                </span>
              </button>

              <AnimatePresence>
                {comingSoonType === opt.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-0 mb-2 px-3 py-1.5 bg-gradient-to-r from-[#D81B43] to-[#9F1239] text-white font-black text-xs rounded-xl shadow-xl border border-pink-300/40 flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <Sparkles size={13} className="text-amber-300 animate-bounce" />
                    <span>{opt.label} — Coming Soon!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-emerald-200/60">
        <ShieldCheck size={12} />
        <span>Best fares guaranteed</span>
      </div>
    </div>
  );
};
