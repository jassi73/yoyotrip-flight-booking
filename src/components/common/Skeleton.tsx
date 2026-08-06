import React from 'react';
import { Plane, Sparkles, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

// 1. Full Screen Exclusive Flying Airplane Sky Animation (Used for All Loading & Route Transitions)
export const HomeSearchSkeleton: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden p-6">
      {/* Dynamic Animated Passing Clouds Background */}
      <motion.div
        animate={{ x: [-100, 500] }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute top-16 left-0 text-slate-800/40 pointer-events-none"
      >
        <Cloud size={130} />
      </motion.div>

      <motion.div
        animate={{ x: [500, -100] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        className="absolute bottom-20 right-0 text-slate-800/30 pointer-events-none"
      >
        <Cloud size={160} />
      </motion.div>

      {/* Glowing Star Particles */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Flying Airplane Container (Ascending UPWARDS into Sky) */}
      <div className="relative w-72 h-48 flex items-center justify-center mb-8">
        {/* Thrust Jet Trail Behind Airplane */}
        <motion.div
          animate={{
            scaleX: [0.7, 1.4, 0.9],
            opacity: [0.5, 1, 0.6],
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="absolute w-44 h-2.5 bg-gradient-to-r from-transparent via-pink-500 to-yovo-red blur-xs rounded-full -rotate-45 -translate-x-14 translate-y-10"
        />

        {/* Flying Airplane Badge (Pointing UP & Flying Skyward) */}
        <motion.div
          animate={{
            x: [-35, 35, -35],
            y: [25, -25, 25],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.4,
            ease: 'easeInOut',
          }}
          className="relative text-white drop-shadow-[0_0_30px_rgba(216,27,67,0.9)]"
        >
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yovo-red to-pink-600 flex items-center justify-center shadow-2xl border border-pink-300/50">
            <Plane size={42} className="-rotate-45 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Text & Progress Bar */}
      <div className="text-center space-y-3.5 z-10 max-w-md">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/80 text-pink-300 border border-pink-500/30 text-xs font-bold shadow-lg">
          <Sparkles size={14} className="text-amber-300 animate-pulse" />
          <span>YovoTrip AI Flight Engine</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
          Flying you to your dream destination...
        </h3>

        <p className="text-xs text-slate-400 font-medium">
          Loading live flights, zero-fee promotional fares, and instant AI search.
        </p>

        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-slate-700/60 mt-4">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-yovo-red via-pink-500 to-amber-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

// Alias FlightSkeleton to HomeSearchSkeleton for 100% unified full-screen sky airplane loader
export const FlightSkeleton: React.FC = () => {
  return <HomeSearchSkeleton />;
};

// 3. Passenger / Booking Details Page Skeleton
export const PassengerPageSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Forms Skeleton */}
        <div className="lg:col-span-8 space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-60 bg-slate-200 rounded-xl" />
            <div className="h-3 w-80 bg-slate-200 rounded-lg" />
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4">
            <div className="h-5 w-36 bg-slate-200 rounded-lg" />
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-3 h-10 bg-slate-200 rounded-xl" />
              <div className="col-span-4 h-10 bg-slate-200 rounded-xl" />
              <div className="col-span-5 h-10 bg-slate-200 rounded-xl" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-10 bg-slate-200 rounded-xl" />
              <div className="h-10 bg-slate-200 rounded-xl" />
              <div className="h-10 bg-slate-200 rounded-xl" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4">
            <div className="h-5 w-36 bg-slate-200 rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-10 bg-slate-200 rounded-xl" />
              <div className="h-10 bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Fare Summary Sidebar Skeleton */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 space-y-4">
          <div className="h-5 w-32 bg-slate-200 rounded-lg" />
          <div className="h-16 bg-slate-200 rounded-2xl" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
          </div>
          <div className="h-12 w-full bg-slate-200 rounded-2xl pt-2" />
        </div>
      </div>
    </div>
  );
};
