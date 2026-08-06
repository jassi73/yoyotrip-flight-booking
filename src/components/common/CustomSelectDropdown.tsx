import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface DropdownOption {
  value: string;
  label: string;
}

interface CustomSelectDropdownProps {
  label?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const CustomSelectDropdown: React.FC<CustomSelectDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  error,
  leftIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

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
    <div ref={containerRef} className="w-full flex flex-col gap-1 relative">
      {label && (
        <label className="text-xs font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 bg-white border ${
          error ? 'border-red-500' : isOpen ? 'border-yovo-red ring-2 ring-pink-100' : 'border-slate-200'
        } text-slate-900 text-xs font-medium rounded-xl px-3.5 py-2 outline-none transition-all flex items-center justify-between gap-2 shadow-2xs hover:border-slate-300`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {leftIcon && <span className="text-slate-400 shrink-0">{leftIcon}</span>}
          <span className="truncate font-semibold text-slate-800">{selectedOption?.label}</span>
        </div>
        <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-yovo-red' : ''}`} />
      </button>

      {error && <span className="text-[11px] text-red-500 font-medium">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 p-1.5 z-[100] text-slate-900 max-h-56 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
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
  );
};
