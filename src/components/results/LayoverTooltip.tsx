import React, { useState, useRef, useEffect } from 'react';
import { Flight } from '../../types/flight';
import { Plane, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoverTooltipProps {
  flight: Flight;
  children: React.ReactNode;
}

const AIRLINE_BG_MAP: Record<string, string> = {
  '6E': 'bg-blue-900',
  'AI': 'bg-red-600',
  'UK': 'bg-purple-800',
  'QP': 'bg-orange-500',
  'SG': 'bg-red-700',
  'IX': 'bg-orange-500',
};

const FlightSegment: React.FC<{
  flightNo: string;
  depTime: string;
  depCode: string;
  arrTime: string;
  arrCode: string;
  duration: string;
  airlineCode: string;
  airlineBg: string;
}> = ({ flightNo, depTime, depCode, arrTime, arrCode, duration, airlineCode, airlineBg }) => (
  <div className="px-4 sm:px-5 py-3 text-left">
    <div className="flex items-center gap-2.5 mb-2">
      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md ${airlineBg} flex items-center justify-center shrink-0 shadow-2xs`}>
        <span className="text-white font-normal text-[11px] sm:text-xs italic">{airlineCode}</span>
      </div>
      <span className="text-slate-500 text-xs font-bold">{flightNo}</span>
    </div>

    <div className="flex items-center justify-between">
      <div className="text-left">
        <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">{depTime}</div>
        <div className="text-xs font-bold text-slate-500 mt-0.5">{depCode}</div>
      </div>

      <div className="flex-1 flex flex-col items-center px-2 sm:px-3">
        <span className="text-[11px] sm:text-xs font-semibold text-slate-500 mb-1">{duration}</span>
        <div className="w-full flex items-center gap-1">
          <div className="h-px bg-slate-300 flex-1" />
          <Plane size={12} className="text-slate-400 rotate-90" fill="currentColor" />
          <div className="h-px bg-slate-300 flex-1" />
        </div>
      </div>

      <div className="text-right">
        <div className="text-base sm:text-lg font-black text-slate-900 leading-tight">{arrTime}</div>
        <div className="text-xs font-bold text-slate-500 mt-0.5">{arrCode}</div>
      </div>
    </div>
  </div>
);

const Layover: React.FC<{ duration: string; code: string }> = ({ duration, code }) => (
  <div className="px-4 sm:px-5 py-2 text-left">
    <div className="bg-slate-100 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600">
      LAYOVER <span className="font-extrabold text-slate-900">{duration}</span>
      <span className="text-slate-500 font-medium"> · {code}</span>
    </div>
  </div>
);

export const LayoverTooltip: React.FC<LayoverTooltipProps> = ({ flight, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const airlineCode = flight.airline.code || '6E';
  const airlineBg = AIRLINE_BG_MAP[airlineCode] || 'bg-blue-900';
  const layoverCity = flight.stopDetails?.[0]?.replace(/.*layover in\s*/i, '').trim() || 'BLR';

  const numPart = parseInt(flight.flightNumber.replace(/\D/g, '')) || 1074;
  const leg1FlightNo = `${airlineCode}-${numPart}`;
  const leg2FlightNo = `${airlineCode}-${numPart + 94}`;

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {isOpen && flight.stops > 0 && (
          <>
            {/* Mobile Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-2xs z-[90] sm:hidden"
            />

            {/* Popover Card (Centered on Mobile, Floats above badge on Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-sm mx-auto sm:absolute sm:inset-auto sm:top-auto sm:bottom-full sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-0 sm:mb-2 sm:w-96 rounded-3xl shadow-2xl border border-slate-200 z-[100] pointer-events-auto text-slate-900 bg-white overflow-hidden"
            >
              {/* Header with Close X on Mobile */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-100 sm:hidden">
                <span className="text-xs font-black text-slate-800">Flight Layover Details</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                <FlightSegment
                  flightNo={leg1FlightNo}
                  depTime={flight.departureTime}
                  depCode={flight.origin.code}
                  arrTime="12:30"
                  arrCode={layoverCity}
                  duration="2h 15m"
                  airlineCode={airlineCode}
                  airlineBg={airlineBg}
                />

                <Layover duration="1h 20m" code={layoverCity} />

                <FlightSegment
                  flightNo={leg2FlightNo}
                  depTime="13:50"
                  depCode={layoverCity}
                  arrTime={flight.arrivalTime}
                  arrCode={flight.destination.code}
                  duration="1h 25m"
                  airlineCode={airlineCode}
                  airlineBg={airlineBg}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
