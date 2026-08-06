import React from 'react';
import { Flight } from '../../types/flight';
import { Plane } from 'lucide-react';
import { CustomTooltip } from '../common/CustomTooltip';
import { LayoverTooltip } from './LayoverTooltip';

interface FlightTimelineProps {
  flight: Flight;
}

const getShortAirportName = (fullName: string): string => {
  if (!fullName) return '';
  return fullName
    .replace('International Airport', 'Intl')
    .replace('Chhatrapati Shivaji Maharaj', 'Chhatrapati Shivaji')
    .replace('Netaji Subhash Chandra Bose', 'Netaji Subhash')
    .replace('Rajiv Gandhi', 'Rajiv Gandhi')
    .replace('Airport', '');
};

const getCleanLayoverText = (flight: Flight): string => {
  if (flight.stops === 0) return 'Non-stop';
  const rawStop = flight.stopDetails?.[0] || 'BOM';
  // Strip duplicate "1h 20m layover in" if raw stop string already contains it
  const cleanCity = rawStop.replace(/.*layover in\s*/i, '').trim();
  return `${flight.stops} stop via 1h 20m layover in ${cleanCity}`;
};

export const FlightTimeline: React.FC<FlightTimelineProps> = ({ flight }) => {
  return (
    <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 w-full py-1">
      
      {/* Departure Block */}
      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
            {flight.departureTime}
          </span>
          <span className="text-[10px] sm:text-xs font-black text-slate-800 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200">
            {flight.origin.code}
          </span>
        </div>

        <div className="text-[11px] sm:text-xs font-bold text-slate-800 mt-1 truncate">
          {flight.origin.city} {flight.terminalDeparture ? `(${flight.terminalDeparture})` : ''}
        </div>

        <CustomTooltip content={flight.origin.name}>
          <div className="text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-yovo-red transition-colors truncate max-w-[120px] sm:max-w-[160px] mt-0.5">
            {getShortAirportName(flight.origin.name)}
          </div>
        </CustomTooltip>
      </div>

      {/* Timeline Graphic Section */}
      <div className="text-center px-1 sm:px-2 shrink-0 min-w-[110px] sm:min-w-[160px]">
        <div className="inline-block px-2 sm:px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-bold text-slate-600 mb-1">
          {flight.duration}
        </div>

        <div className="relative flex items-center justify-center my-1">
          <div className="w-full h-0.5 bg-slate-200" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            {flight.stops === 0 ? (
              <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-50 border border-pink-200 text-yovo-red shadow-2xs">
                <Plane size={11} className="rotate-90" />
              </div>
            ) : (
              <LayoverTooltip flight={flight}>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-extrabold text-amber-800 hover:bg-amber-100 transition-all shadow-xs cursor-pointer">
                  <span>{flight.stops} Stop</span>
                </div>
              </LayoverTooltip>
            )}
          </div>
        </div>

        <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 mt-1">
          {flight.stops === 0 ? (
            <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-100">
              Non-stop
            </span>
          ) : (
            <span className="text-amber-700 font-semibold truncate max-w-[140px] block">
              {getCleanLayoverText(flight)}
            </span>
          )}
        </div>
      </div>

      {/* Arrival Block */}
      <div className="text-left flex-1 min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
            {flight.arrivalTime}
          </span>
          <span className="text-[10px] sm:text-xs font-black text-slate-800 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200">
            {flight.destination.code}
          </span>
        </div>

        <div className="text-[11px] sm:text-xs font-bold text-slate-800 mt-1 truncate">
          {flight.destination.city} {flight.terminalArrival ? `(${flight.terminalArrival})` : ''}
        </div>

        <CustomTooltip content={flight.destination.name}>
          <div className="text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-yovo-red transition-colors truncate max-w-[120px] sm:max-w-[160px] mt-0.5">
            {getShortAirportName(flight.destination.name)}
          </div>
        </CustomTooltip>
      </div>

    </div>
  );
};
