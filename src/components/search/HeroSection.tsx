import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, ShieldCheck, Zap, Compass, Bell } from 'lucide-react';
import { SearchForm } from './SearchForm';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[62vh] lg:min-h-[68vh] flex flex-col justify-start bg-slate-950 text-white select-none pt-6 pb-12 overflow-visible">
      
      {/* Background Aircraft / Sky Image Container (Clipped to hero bounds) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-yovo-red-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-yovo-bg via-transparent to-slate-950/80" />

        {/* Ambient Lighting & Texture */}
        <div className="absolute top-10 left-1/3 w-[450px] h-[450px] bg-yovo-red/20 rounded-full blur-[130px]" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Content Container (Visible overflow so popover dropdowns float over cleanly) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center space-y-4 overflow-visible">
        
        {/* Top Minimal AI Badge & Trust Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 text-[11px] font-semibold text-slate-300 flex-wrap justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-pink-200">
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>AI-POWERED AVIATION PLATFORM</span>
          </span>

          <span className="hidden sm:inline-block text-white/30">•</span>

          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star size={13} className="fill-amber-400" />
            <span className="text-white">4.9★</span>
            <span className="text-slate-400 font-normal">(100K+ Travelers)</span>
          </div>

          <span className="hidden sm:inline-block text-white/30">•</span>

          <div className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck size={13} />
            <span>Lowest Fare Guarantee</span>
          </div>
        </motion.div>

        {/* Short 2-Line Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl"
        >
          Your Next Journey,{' '}
          <span className="bg-gradient-to-r from-white via-pink-100 to-amber-300 bg-clip-text text-transparent">
            Optimized by AI.
          </span>
        </motion.h1>

        {/* 1-Line Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal"
        >
          Smart AI route optimization, real-time fare predictions & zero domestic convenience fees.
        </motion.p>

        {/* 3 Small AI Feature Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 flex-wrap text-[11px]"
        >
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
            <Zap size={12} className="text-amber-400" />
            <span>AI Fare Intelligence</span>
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
            <Compass size={12} className="text-pink-400" />
            <span>Smart Route Optimizer</span>
          </span>
          <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
            <Bell size={12} className="text-emerald-400" />
            <span>Live Price Alerts</span>
          </span>
        </motion.div>

        {/* Floating Search Card */}
        <div className="w-full pt-2 relative z-30 overflow-visible">
          <SearchForm />
        </div>

      </div>
    </section>
  );
};
