import React, { useRef } from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { generateDateRange, formatCarouselDate } from '../../utils/dateUtils';
import { formatShortPrice } from '../../utils/currency';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DateCarousel: React.FC = () => {
  const { searchParams, updateSearchParams } = useFlightContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const dates = generateDateRange(searchParams.departureDate, 12);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mock prices for adjacent dates
  const getMockPriceForDate = (dateStr: string) => {
    const day = new Date(dateStr).getDate();
    const prices = [8451, 7950, 8920, 8600, 8900, 7900, 7600, 8400, 8620, 8900];
    return prices[day % prices.length];
  };

  return (
    <div className="bg-white border-b border-slate-200/80 py-2.5 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Scroll Chevron */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all shadow-xs shrink-0 active:scale-95"
          title="Scroll Left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Centered Date Cards Scrollable Area */}
        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1 justify-start lg:justify-center"
        >
          {dates.map((dateStr) => {
            const isSelected = searchParams.departureDate === dateStr;
            const { dayName, dayNum, monthName } = formatCarouselDate(dateStr);
            const price = getMockPriceForDate(dateStr);

            return (
              <button
                key={dateStr}
                type="button"
                onClick={() => updateSearchParams({ departureDate: dateStr })}
                className={`min-w-[115px] sm:min-w-[130px] p-2 rounded-2xl border text-center transition-all shrink-0 ${
                  isSelected
                    ? 'border-yovo-red bg-pink-50/80 text-yovo-red font-bold shadow-xs ring-1 ring-yovo-red/20 scale-[1.02]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-pink-200 hover:bg-slate-50'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-500 leading-tight">
                  {dayName}, {dayNum}th {monthName}
                </div>
                <div className={`text-xs font-black mt-0.5 ${isSelected ? 'text-yovo-red' : 'text-emerald-600'}`}>
                  {formatShortPrice(price)}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Scroll Chevron */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="p-2 rounded-full hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all shadow-xs shrink-0 active:scale-95"
          title="Scroll Right"
        >
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
};
