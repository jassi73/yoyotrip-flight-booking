import React from 'react';
import { Plane, ShieldCheck, Clock, Award, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-yovo-slate text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yovo-red/10 text-yovo-red shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Best Price Guaranteed</h4>
              <p className="text-xs text-slate-400">Zero hidden fees with clear pricing.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yovo-red/10 text-yovo-red shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">24/7 AI Assistance</h4>
              <p className="text-xs text-slate-400">Yovo AI ready to help anytime.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yovo-red/10 text-yovo-red shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Special Fares</h4>
              <p className="text-xs text-slate-400">Student, Defense & Senior citizen offers.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-yovo-red/10 text-yovo-red shrink-0">
              <Plane size={24} />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Instant Confirmation</h4>
              <p className="text-xs text-slate-400">Real-time ticketing & live updates.</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <div className="w-6 h-6 rounded-full bg-yovo-red flex items-center justify-center text-white font-bold text-xs shrink-0">
              Y
            </div>
            <span className="text-slate-200 font-semibold">YovoTrip © {new Date().getFullYear()}</span>
            <span className="hidden sm:inline text-slate-500">— Intelligent travel planning with optimized routes.</span>
          </div>

          <div className="text-center sm:text-right text-xs text-slate-400 font-medium">
            Crafted with <Heart size={13} className="inline text-yovo-red fill-yovo-red mx-0.5 -mt-0.5" /> for Frontend Developer Assessment by{' '}
            <a
              href="https://jassiportfolio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-extrabold hover:text-yovo-red underline decoration-yovo-red underline-offset-4 transition-colors cursor-pointer whitespace-nowrap"
            >
              Jassi Parihar
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
