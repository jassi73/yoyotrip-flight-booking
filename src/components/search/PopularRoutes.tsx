import React from 'react';
import { POPULAR_ROUTES } from '../../constants';
import { formatCurrency } from '../../utils/currency';
import { useNavigate } from 'react-router-dom';
import { useFlightContext } from '../../context/FlightContext';
import { flightService } from '../../services/flightService';
import { ArrowRight, Plane } from 'lucide-react';

export const PopularRoutes: React.FC = () => {
  const navigate = useNavigate();
  const { updateSearchParams } = useFlightContext();
  const airports = flightService.getAirports();

  const handleSelectRoute = (originCode: string, destCode: string) => {
    const origin = airports.find((a) => a.code === originCode) || null;
    const destination = airports.find((a) => a.code === destCode) || null;
    updateSearchParams({ origin, destination });
    navigate('/results');
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Popular Flight Routes</h3>
          <p className="text-xs text-slate-500">Trending domestic flights with best fares guaranteed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {POPULAR_ROUTES.map((route) => (
          <div
            key={`${route.origin}-${route.destination}`}
            onClick={() => handleSelectRoute(route.origin, route.destination)}
            className="group bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-yovo-hover hover:border-pink-200 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span>{route.originCity}</span>
                <ArrowRight size={14} className="text-yovo-red group-hover:translate-x-1 transition-transform" />
                <span>{route.destCity}</span>
              </div>
              <Plane size={16} className="text-slate-400 group-hover:text-yovo-red transition-colors" />
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-400">{route.duration}</span>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Starting from</span>
                <span className="text-sm font-extrabold text-yovo-red">
                  {formatCurrency(route.startingPrice)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
