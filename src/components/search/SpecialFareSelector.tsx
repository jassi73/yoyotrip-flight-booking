import React from 'react';
import { SpecialFareType } from '../../types/search';
import { Tag, GraduationCap, Shield, UserCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpecialFareSelectorProps {
  selectedFare: SpecialFareType;
  onChange: (fare: SpecialFareType) => void;
}

export const SpecialFareSelector: React.FC<SpecialFareSelectorProps> = ({ selectedFare, onChange }) => {
  const fareCards = [
    {
      id: 'regular' as SpecialFareType,
      title: 'Regular Fare',
      badge: 'Best Rates',
      icon: <Tag size={14} />,
    },
    {
      id: 'student' as SpecialFareType,
      title: 'Student',
      badge: 'Save ₹450',
      icon: <GraduationCap size={14} />,
    },
    {
      id: 'armed-forces' as SpecialFareType,
      title: 'Armed Forces',
      badge: 'Save ₹600',
      icon: <Shield size={14} />,
    },
    {
      id: 'senior-citizen' as SpecialFareType,
      title: 'Senior Citizen',
      badge: 'Save ₹550',
      icon: <UserCheck size={14} />,
    },
  ];

  return (
    <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
        Special Fares
      </span>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
        {fareCards.map((card) => {
          const isSelected = selectedFare === card.id;

          return (
            <motion.button
              key={card.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(card.id)}
              className={`px-2.5 py-1.5 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 ${
                isSelected
                  ? 'bg-yovo-red-50 border-yovo-red text-yovo-red font-bold ring-1 ring-yovo-red/30'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span className={isSelected ? 'text-yovo-red' : 'text-slate-400'}>{card.icon}</span>
                <span className="text-[11px] font-semibold truncate leading-tight">{card.title}</span>
              </div>

              <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded shrink-0 ${
                isSelected ? 'bg-yovo-red text-white' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {card.badge}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
