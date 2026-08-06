import React from 'react';
import { useFlightContext } from '../../context/FlightContext';
import { Sparkles } from 'lucide-react';

export const AiSmartFilters: React.FC = () => {
  const { filters, toggleYovoAiTag } = useFlightContext();

  const chips = [
    "Yovo's pick",
    "Cheap but sensible",
    "Is fastest worth it?",
    "Avoid overnight",
    "Reach at a good time",
    "Easy trip",
    "Non-stop",
    "Free meals",
  ];

  return (
    <div className="bg-pink-50/60 border border-pink-100 rounded-2xl p-4 mb-6 shadow-xs">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-full bg-yovo-red text-white flex items-center justify-center">
          <Sparkles size={13} />
        </div>
        <span className="text-xs font-bold text-slate-900">Help me choose</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yovo-red text-white font-bold uppercase tracking-wider">
          Yovo AI
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-3">
        Tell Yovo what matters — timing, fare, stops, baggage, or refundability.
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        {chips.map((chip) => {
          const isActive = filters.yovoAiTags.includes(chip);
          return (
            <button
              key={chip}
              type="button"
              onClick={() => toggleYovoAiTag(chip)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                isActive
                  ? 'bg-yovo-red text-white border-yovo-red shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              + {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
};
