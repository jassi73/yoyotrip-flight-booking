import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ content, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && content && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-0 mb-2 z-50 pointer-events-none whitespace-nowrap"
          >
            {/* YovoTrip Primary Crimson Brand Theme */}
            <div className="bg-gradient-to-r from-yovo-red to-yovo-red-hover text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-lg border border-pink-400/40 flex items-center gap-1.5 tracking-wide">
              <span className="text-amber-300 font-black">✦</span>
              <span>{content}</span>
            </div>
            {/* Caret triangle */}
            <div className="w-2.5 h-2.5 bg-yovo-red rotate-45 border-r border-b border-pink-400/40 absolute -bottom-1 left-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
