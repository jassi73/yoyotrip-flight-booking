import React, { useState, useEffect } from 'react';
import { useFlightContext } from '../context/FlightContext';
import { StickySearchHeader } from '../components/results/StickySearchHeader';
import { DateCarousel } from '../components/results/DateCarousel';
import { FilterSidebar } from '../components/results/FilterSidebar';
import { SortTabs } from '../components/results/SortTabs';
import { AiSmartFilters } from '../components/results/AiSmartFilters';
import { FlightCard } from '../components/results/FlightCard';
import { FlightSkeleton } from '../components/common/Skeleton';
import { Modal } from '../components/common/Modal';
import { Plane, Frown, Filter } from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { filteredFlights, isLoading, resetFilters, searchParams } = useFlightContext();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Scroll to top when landing on results page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-yovo-bg pb-12">
      
      {/* Sticky Search Modification Bar */}
      <StickySearchHeader />

      {/* Date Navigation Carousel */}
      <DateCarousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Sidebar Filters (Desktop Sticky) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-36 max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar pr-1">
            <FilterSidebar />
          </div>

          {/* Right Main Content (Scrollable Flight List) */}
          <div className="lg:col-span-9 space-y-4">
            
            {/* Yovo AI Prompt Chips */}
            <AiSmartFilters />

            {/* Mobile Filter Toggle Button */}
            <div className="flex lg:hidden justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-800">
                {filteredFlights.length} Flights Found
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="px-4 py-2 bg-yovo-red text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                <Filter size={14} />
                <span>Filters & Price</span>
              </button>
            </div>

            {/* Sort Tabs Bar */}
            <SortTabs />

            {/* Flight Results Header */}
            <div className="hidden sm:flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Plane size={18} className="text-yovo-red" />
                <h3 className="text-sm font-extrabold text-slate-900">
                  {filteredFlights.length} Flights available from {searchParams.origin?.city} to {searchParams.destination?.city}
                </h3>
              </div>
            </div>

            {/* Flights List / Flying Airplane Loader / Empty State */}
            {isLoading ? (
              <FlightSkeleton />
            ) : filteredFlights.length > 0 ? (
              <div className="space-y-4">
                {filteredFlights.map((flight, idx) => (
                  <FlightCard key={flight.id} flight={flight} showPromoHeader={idx === 0} />
                ))}
              </div>
            ) : (
              /* Empty Filter State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm space-y-4 my-6">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-yovo-red flex items-center justify-center mx-auto">
                  <Frown size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-900">No flights found matching your filters</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your price range, clearing stop limits, or searching for nearby dates.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-yovo-red text-white text-xs font-bold rounded-xl hover:bg-yovo-red-hover transition-colors shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filter Modal */}
      <Modal isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} title="Filter & Sort Flights" maxWidth="md">
        <FilterSidebar />
        <button
          onClick={() => setIsMobileFilterOpen(false)}
          className="w-full mt-4 py-3 bg-yovo-slate text-white text-xs font-bold rounded-xl"
        >
          Apply Filters
        </button>
      </Modal>

    </div>
  );
};
