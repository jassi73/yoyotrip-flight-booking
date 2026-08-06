import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Flight, FareOption } from '../types/flight';
import { SearchParams } from '../types/search';
import { FilterState, SortOption } from '../types/filter';
import { DEFAULT_SEARCH_PARAMS } from '../constants';
import { flightService } from '../services/flightService';
import { storageService } from '../services/storageService';

interface FlightContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  updateSearchParams: (params: Partial<SearchParams>) => void;
  selectedFlight: Flight | null;
  setSelectedFlight: (flight: Flight | null) => void;
  selectedFare: FareOption | null;
  setSelectedFare: (fare: FareOption | null) => void;
  allFlights: Flight[];
  filteredFlights: Flight[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: (key: keyof FilterState, value: any) => void;
  toggleYovoAiTag: (tag: string) => void;
  resetFilters: () => void;
  isLoading: boolean;
  selectFlightAndFare: (flight: Flight, fare: FareOption) => void;
}

const initialFilterState: FilterState = {
  maxPrice: 50000,
  minPrice: 0,
  selectedPrice: 50000,
  stops: [],
  airlines: [],
  departureTimeWindow: [],
  arrivalTimeWindow: [],
  sortBy: 'cheapest',
  yovoAiTags: [],
};

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const FlightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParamsState] = useState<SearchParams>(() =>
    storageService.getSearchParams(DEFAULT_SEARCH_PARAMS)
  );

  const [selectedFlight, setSelectedFlightState] = useState<Flight | null>(() =>
    storageService.getSelectedFlight(null)
  );

  const [selectedFare, setSelectedFareState] = useState<FareOption | null>(() =>
    storageService.getSelectedFare(null)
  );

  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync state to local storage
  const setSearchParams = useCallback((action: React.SetStateAction<SearchParams>) => {
    setSearchParamsState((prev) => {
      const next = typeof action === 'function' ? action(prev) : action;
      storageService.setSearchParams(next);
      return next;
    });
  }, []);

  const updateSearchParams = useCallback((params: Partial<SearchParams>) => {
    setSearchParamsState((prev) => {
      const next = { ...prev, ...params };
      storageService.setSearchParams(next);
      return next;
    });
  }, []);

  const setSelectedFlight = useCallback((flight: Flight | null) => {
    setSelectedFlightState(flight);
    storageService.setSelectedFlight(flight);
  }, []);

  const setSelectedFare = useCallback((fare: FareOption | null) => {
    setSelectedFareState(fare);
    storageService.setSelectedFare(fare);
  }, []);

  const selectFlightAndFare = useCallback((flight: Flight, fare: FareOption) => {
    setSelectedFlight(flight);
    setSelectedFare(fare);
  }, [setSelectedFlight, setSelectedFare]);

  // Load flights matching current search params
  const allFlights = useMemo(() => {
    return flightService.searchFlights(searchParams);
  }, [searchParams]);

  // Apply active filters and sorting
  const filteredFlights = useMemo(() => {
    return flightService.filterAndSortFlights(allFlights, filters);
  }, [allFlights, filters]);

  const updateFilter = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const toggleYovoAiTag = useCallback((tag: string) => {
    setFilters((prev) => {
      const exists = prev.yovoAiTags.includes(tag);
      const nextTags = exists
        ? prev.yovoAiTags.filter((t) => t !== tag)
        : [...prev.yovoAiTags, tag];
      return { ...prev, yovoAiTags: nextTags };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  return (
    <FlightContext.Provider
      value={{
        searchParams,
        setSearchParams,
        updateSearchParams,
        selectedFlight,
        setSelectedFlight,
        selectedFare,
        setSelectedFare,
        allFlights,
        filteredFlights,
        filters,
        setFilters,
        updateFilter,
        toggleYovoAiTag,
        resetFilters,
        isLoading,
        selectFlightAndFare,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = (): FlightContextType => {
  const context = useContext(FlightContext);
  if (!context) {
    throw new Error('useFlightContext must be used within a FlightProvider');
  }
  return context;
};
