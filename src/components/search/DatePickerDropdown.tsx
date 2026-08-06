import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { formatDateDisplay } from '../../utils/dateUtils';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerDropdownProps {
  label: string;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({
  label,
  selectedDate,
  onSelectDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentDateObj = new Date(selectedDate || '2026-08-05');
  const [viewYear, setViewYear] = useState(currentDateObj.getFullYear() || 2026);
  const [viewMonth, setViewMonth] = useState(currentDateObj.getMonth() || 7);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const totalDays = getDaysInMonth(viewMonth, viewYear);
  const firstDayIndex = getFirstDayOfMonth(viewMonth, viewYear);

  const handleQuickShortcut = (daysToAdd: number) => {
    const today = new Date('2026-08-05');
    today.setDate(today.getDate() + daysToAdd);
    const dateStr = today.toISOString().split('T')[0];
    onSelectDate(dateStr);
    setIsOpen(false);
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
      {/* Trigger Card */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left bg-slate-50 hover:bg-white border rounded-xl p-2.5 transition-all duration-200 shadow-2xs ${
          isOpen ? 'bg-white border-yovo-red ring-2 ring-yovo-red/20' : 'border-slate-200 hover:border-yovo-red'
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-yovo-red shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block leading-none mb-0.5">
              {label}
            </span>
            <div className="text-xs font-black text-slate-900 truncate leading-snug">
              {formatDateDisplay(selectedDate)}
            </div>
            <span className="text-[10px] text-slate-400 font-medium truncate block leading-tight">
              Best price guaranteed
            </span>
          </div>
          <ChevronDown size={14} className={`text-slate-400 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Popover Custom Calendar Positioned Below Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1.5 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-[100] text-slate-900 max-h-[260px] overflow-y-auto"
          >
            {/* Quick Date Shortcuts */}
            <div className="flex items-center gap-1.5 mb-2.5 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickShortcut(0)}
                className="px-2 py-0.5 rounded-lg bg-pink-50 hover:bg-yovo-red hover:text-white text-yovo-red text-[10px] font-bold transition-colors shrink-0"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickShortcut(1)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors shrink-0"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickShortcut(3)}
                className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors shrink-0"
              >
                In 3 Days
              </button>
            </div>

            {/* Calendar Month Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-xs font-black text-slate-800">
                {months[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-slate-400 mb-1">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[...Array(firstDayIndex)].map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

              {[...Array(totalDays)].map((_, i) => {
                const dayNum = i + 1;
                const mStr = String(viewMonth + 1).padStart(2, '0');
                const dStr = String(dayNum).padStart(2, '0');
                const fullDateStr = `${viewYear}-${mStr}-${dStr}`;
                const isSelected = selectedDate === fullDateStr;

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => {
                      onSelectDate(fullDateStr);
                      setIsOpen(false);
                    }}
                    className={`h-6 w-6 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center mx-auto ${
                      isSelected
                        ? 'bg-yovo-red text-white shadow-xs'
                        : 'hover:bg-pink-50 hover:text-yovo-red text-slate-800'
                    }`}
                  >
                    {dayNum}
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
