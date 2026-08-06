import React from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { formatCurrency } from '../../utils/currency';
import { RotateCcw, Filter } from 'lucide-react';

export const FilterSidebar: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useFlightContext();

  const stopsOptions = [
    { value: 0, label: 'Non Stop' },
    { value: 1, label: '1 Stop' },
    { value: 2, label: '2+ Stops' },
  ];

  const airlinesOptions = [
    { id: 'indigo', label: 'IndiGo' },
    { id: 'airindia', label: 'Air India' },
    { id: 'vistara', label: 'Vistara' },
    { id: 'akasa', label: 'Akasa Air' },
    { id: 'spicejet', label: 'SpiceJet' },
  ];

  const handleStopToggle = (stop: number) => {
    const current = filters.stops;
    const next = current.includes(stop)
      ? current.filter((s) => s !== stop)
      : [...current, stop];
    updateFilter('stops', next);
  };

  const handleAirlineToggle = (id: string) => {
    const current = filters.airlines;
    const next = current.includes(id)
      ? current.filter((a) => a !== id)
      : [...current, id];
    updateFilter('airlines', next);
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm sticky top-36 space-y-6">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <Filter size={18} className="text-yovo-red" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-bold text-yovo-red hover:underline flex items-center gap-1"
        >
          <RotateCcw size={12} />
          <span>Clear all</span>
        </button>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            One-Way Price
          </label>
          <span className="text-xs font-extrabold text-yovo-red">
            Up to {formatCurrency(filters.selectedPrice)}
          </span>
        </div>
        <input
          type="range"
          min={4000}
          max={50000}
          step={500}
          value={filters.selectedPrice}
          onChange={(e) => updateFilter('selectedPrice', Number(e.target.value))}
          className="w-full accent-yovo-red cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 mt-1">
          <span>₹4,000</span>
          <span>₹50,000</span>
        </div>
      </div>

      {/* Stops Filter */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Stops
        </h4>
        <div className="space-y-2">
          {stopsOptions.map((opt) => {
            const isChecked = filters.stops.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center justify-between text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleStopToggle(opt.value)}
                    className="w-4 h-4 rounded border-slate-300 text-yovo-red focus:ring-yovo-red cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Airlines Filter */}
      <div className="border-t border-slate-100 pt-4">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Airlines
        </h4>
        <div className="space-y-2">
          {airlinesOptions.map((air) => {
            const isChecked = filters.airlines.includes(air.id);
            return (
              <label
                key={air.id}
                className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-slate-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleAirlineToggle(air.id)}
                  className="w-4 h-4 rounded border-slate-300 text-yovo-red focus:ring-yovo-red cursor-pointer"
                />
                <span>{air.label}</span>
              </label>
            );
          })}
        </div>
      </div>

    </div>
  );
};
