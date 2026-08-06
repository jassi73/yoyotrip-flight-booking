import React, { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AiTravelGuide: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [showComingSoon, setShowComingSoon] = useState(false);

  const samplePrompts = [
    'Cheapest flight to Chennai this weekend',
    'Morning non-stop flight under ₹9,000',
    'Flight with free meals & baggage allowance',
  ];

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerComingSoon();
  };

  const triggerComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => {
      setShowComingSoon(false);
    }, 3200);
  };

  const handleChipClick = (text: string) => {
    setPrompt(text);
    triggerComingSoon();
  };

  return (
    <div className="max-w-4xl mx-auto my-12 text-center px-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-yovo-red text-xs font-bold mb-3 animate-pulse">
        <Sparkles size={15} />
        <span>Powered by Yovo AI</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        ✨ Hey, It's Yovo, your AI travel guide. How can I help you today?
      </h3>

      <form onSubmit={handleAiSubmit} className="mt-5 max-w-2xl mx-auto relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="If you could teleport right now... where's your dream stop?"
            className="w-full bg-white border-2 border-purple-200 rounded-full py-4 pl-6 pr-16 text-sm outline-none focus:border-yovo-red focus:ring-4 focus:ring-purple-100 shadow-md transition-all text-slate-900 placeholder:text-slate-400"
          />

          <div className="absolute right-2.5 flex items-center">
            <button
              type="submit"
              className="p-3 bg-slate-900 text-white rounded-full hover:bg-yovo-red transition-all shadow-md active:scale-95 group relative"
              title="Yovo AI Assistant"
            >
              <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Yovo Crimson Theme Coming Soon Popover Badge */}
            <AnimatePresence>
              {showComingSoon && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 bottom-full mb-3 px-4 py-2 bg-gradient-to-r from-[#D81B43] to-[#9F1239] text-white font-black text-xs rounded-2xl shadow-2xl border border-pink-400/40 flex items-center gap-2 whitespace-nowrap z-50 pointer-events-none"
                >
                  <Sparkles size={15} className="text-amber-300 animate-bounce" />
                  <span>Yovo AI Travel Guide — Coming Soon!</span>
                  <div className="w-2.5 h-2.5 bg-[#9F1239] rotate-45 absolute -bottom-1 right-4 border-r border-b border-pink-400/40" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>

      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        {samplePrompts.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleChipClick(p)}
            className="px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 text-xs font-medium text-slate-600 hover:text-yovo-red hover:border-yovo-red transition-all shadow-sm"
          >
            "{p}"
          </button>
        ))}
      </div>
    </div>
  );
};
