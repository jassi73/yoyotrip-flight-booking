import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Train, BedDouble, Search, User, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { flightService } from '../../services/flightService';
import { useFlightContext } from '../../context/FlightContext';
import { Airport } from '../../types/flight';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchDestination {
  id: string;
  title: string;
  subtitle: string;
  airportCode: string;
  image: string;
  airport: Airport;
}

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateSearchParams } = useFlightContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [comingSoonTarget, setComingSoonTarget] = useState<'yovo_ai' | 'login' | 'signup' | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const triggerComingSoon = (target: 'yovo_ai' | 'login' | 'signup') => {
    setComingSoonTarget(target);
    setTimeout(() => {
      setComingSoonTarget(null);
    }, 3000);
  };

  const airports = flightService.getAirports();

  // Enhanced destinations list for autocomplete matching reference screenshot
  const destinations: SearchDestination[] = [
    {
      id: 'jod-1',
      title: 'Mehrangarh Fort',
      subtitle: 'Jodhpur, Rajasthan, India',
      airportCode: 'JDH',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=120&q=80',
      airport: { code: 'JDH', city: 'Jodhpur', name: 'Jodhpur Airport', country: 'India' },
    },
    {
      id: 'jod-2',
      title: 'Umaid Bhawan Palace',
      subtitle: 'Jodhpur, Rajasthan, India',
      airportCode: 'JDH',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=120&q=80',
      airport: { code: 'JDH', city: 'Jodhpur', name: 'Jodhpur Airport', country: 'India' },
    },
    {
      id: 'jod-3',
      title: 'Jodhpur',
      subtitle: 'Rajasthan, India',
      airportCode: 'JDH',
      image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=120&q=80',
      airport: { code: 'JDH', city: 'Jodhpur', name: 'Jodhpur Airport', country: 'India' },
    },
    ...airports.map((apt) => ({
      id: apt.code,
      title: `${apt.city} (${apt.code})`,
      subtitle: `${apt.name}, ${apt.country}`,
      airportCode: apt.code,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80',
      airport: apt,
    })),
  ];

  const filteredDestinations = searchQuery.trim().length > 0
    ? destinations.filter((dest) => {
        const q = searchQuery.toLowerCase();
        return (
          dest.title.toLowerCase().includes(q) ||
          dest.subtitle.toLowerCase().includes(q) ||
          dest.airportCode.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectDestination = (dest: SearchDestination) => {
    updateSearchParams({ destination: dest.airport });
    setIsOpen(false);
    setSearchQuery('');
    navigate('/results');
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredDestinations.length > 0) {
      handleSelectDestination(filteredDestinations[0]);
    } else {
      navigate('/results');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-yovo-red flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              Y
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-yovo-red transition-colors">
              Yovo<span className="text-yovo-red">Trip</span>
            </span>
          </Link>

          {/* Navigation Links - Height h-10 matching search bar (Find Flight selected by default) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 h-10">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all h-8 bg-white text-yovo-red shadow-sm"
            >
              <Plane size={15} />
              <span>Find Flight</span>
            </Link>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 cursor-not-allowed opacity-75 h-8">
              <Train size={15} />
              <span>Find Trains</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 cursor-not-allowed opacity-75 h-8">
              <BedDouble size={15} />
              <span>Find Stays</span>
            </div>
          </nav>

          {/* Global Search Bar with Height h-10 + Input Typing Autocomplete Dropdown */}
          <div ref={searchRef} className="hidden lg:flex flex-1 max-w-md items-center relative">
            <form onSubmit={handleSubmitSearch} className="w-full relative flex items-center">
              <Search className="absolute left-3.5 text-slate-400 pointer-events-none" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsOpen(e.target.value.trim().length > 0);
                }}
                placeholder="Search Cities and Destinations..."
                className="w-full h-10 bg-slate-100/80 border border-slate-200/80 rounded-full pl-10 pr-10 text-xs font-medium outline-none focus:border-yovo-red focus:bg-white transition-all text-slate-900"
              />
              <button
                type="submit"
                className="absolute right-3 text-slate-400 hover:text-yovo-red transition-colors p-1"
                title="Search"
              >
                <ArrowRight size={15} />
              </button>
            </form>

            {/* Autocomplete Suggestions Popover Dropdown (Appears ONLY when typing input) */}
            <AnimatePresence>
              {isOpen && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-2.5 z-50 text-slate-900 max-h-[340px] overflow-y-auto"
                >
                  {filteredDestinations.length > 0 ? (
                    <div className="space-y-1">
                      {filteredDestinations.map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => handleSelectDestination(dest)}
                          className="w-full text-left p-2 rounded-2xl transition-colors hover:bg-slate-50 flex items-center gap-3 group"
                        >
                          {/* Destination Thumbnail Image */}
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-100 shadow-2xs">
                            <img
                              src={dest.image}
                              alt={dest.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-extrabold text-slate-900 group-hover:text-yovo-red truncate leading-tight transition-colors">
                              {dest.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                              {dest.subtitle}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs text-slate-400">No destinations found for "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions with Interactive Coming Soon Popovers */}
          <div className="flex items-center gap-3">
            
            {/* Yovo AI Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => triggerComingSoon('yovo_ai')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 text-yovo-red border border-pink-200 text-xs font-bold hover:bg-pink-100 transition-colors cursor-pointer"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>Yovo AI</span>
              </button>
              <AnimatePresence>
                {comingSoonTarget === 'yovo_ai' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gradient-to-r from-[#D81B43] to-[#9F1239] text-white font-black text-xs rounded-xl shadow-xl border border-pink-300/40 flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <Sparkles size={13} className="text-amber-300 animate-bounce" />
                    <span>Yovo AI — Coming Soon!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => triggerComingSoon('login')}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-yovo-red transition-colors cursor-pointer"
              >
                <User size={15} />
                <span>Login</span>
              </button>
              <AnimatePresence>
                {comingSoonTarget === 'login' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gradient-to-r from-[#D81B43] to-[#9F1239] text-white font-black text-xs rounded-xl shadow-xl border border-pink-300/40 flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <Sparkles size={13} className="text-amber-300 animate-bounce" />
                    <span>User Login — Coming Soon!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sign Up Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => triggerComingSoon('signup')}
                className="hidden sm:inline-flex px-4 py-2 bg-yovo-slate text-white text-xs font-extrabold rounded-xl hover:bg-yovo-navy transition-all shadow-sm cursor-pointer"
              >
                Sign up
              </button>
              <AnimatePresence>
                {comingSoonTarget === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 px-3 py-1.5 bg-gradient-to-r from-[#D81B43] to-[#9F1239] text-white font-black text-xs rounded-xl shadow-xl border border-pink-300/40 flex items-center gap-1.5 whitespace-nowrap z-50 pointer-events-none"
                  >
                    <Sparkles size={13} className="text-amber-300 animate-bounce" />
                    <span>Sign Up — Coming Soon!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
