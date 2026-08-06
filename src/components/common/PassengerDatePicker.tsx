import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PassengerDatePickerProps {
  label?: string;
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  error?: string;
}

export const PassengerDatePicker: React.FC<PassengerDatePickerProps> = ({
  label = 'Date of Birth *',
  value,
  onChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Default to 1995-05-15 if empty
  const initialDate = value ? new Date(value) : new Date(1995, 4, 15);
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const handleSelectDay = (day: number) => {
    const formatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const formattedDisplay = value
    ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : 'Select Date of Birth';

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
          <CalendarIcon size={15} className="text-slate-400 shrink-0" />
          <span className="truncate font-semibold text-slate-800">{formattedDisplay}</span>
        </div>
      </button>

      {error && <span className="text-[11px] text-red-500 font-medium">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3.5 z-[100] text-slate-900"
          >
            {/* Header Month & Year Navigation */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <span>{MONTH_NAMES[currentMonth]}</span>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(Number(e.target.value))}
                  className="bg-slate-100 rounded-md px-1.5 py-0.5 text-xs font-bold text-slate-800 outline-none"
                >
                  {Array.from({ length: 90 }, (_, i) => 2026 - i).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Weekdays Header */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-1">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: startDay }).map((_, idx) => (
                <div key={`empty-${idx}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const formatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSelected = value === formatted;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors mx-auto flex items-center justify-center ${
                      isSelected
                        ? 'bg-yovo-red text-white shadow-xs'
                        : 'hover:bg-pink-50 hover:text-yovo-red text-slate-800'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
