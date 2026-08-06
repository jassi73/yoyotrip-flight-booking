const KEYS = {
  SEARCH_PARAMS: 'yovotrip_search_params',
  SELECTED_FLIGHT: 'yovotrip_selected_flight',
  SELECTED_FARE: 'yovotrip_selected_fare',
  CURRENT_BOOKING: 'yovotrip_current_booking',
};

export const storageService = {
  getSearchParams: <T>(fallback: T): T => {
    try {
      const data = localStorage.getItem(KEYS.SEARCH_PARAMS);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  setSearchParams: <T>(params: T): void => {
    try {
      localStorage.setItem(KEYS.SEARCH_PARAMS, JSON.stringify(params));
    } catch (e) {
      console.error('Failed to save search params to localStorage', e);
    }
  },

  getSelectedFlight: <T>(fallback: T | null = null): T | null => {
    try {
      const data = localStorage.getItem(KEYS.SELECTED_FLIGHT);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  setSelectedFlight: <T>(flight: T | null): void => {
    try {
      if (flight === null) {
        localStorage.removeItem(KEYS.SELECTED_FLIGHT);
      } else {
        localStorage.setItem(KEYS.SELECTED_FLIGHT, JSON.stringify(flight));
      }
    } catch (e) {
      console.error('Failed to save flight to localStorage', e);
    }
  },

  getSelectedFare: <T>(fallback: T | null = null): T | null => {
    try {
      const data = localStorage.getItem(KEYS.SELECTED_FARE);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  setSelectedFare: <T>(fare: T | null): void => {
    try {
      if (fare === null) {
        localStorage.removeItem(KEYS.SELECTED_FARE);
      } else {
        localStorage.setItem(KEYS.SELECTED_FARE, JSON.stringify(fare));
      }
    } catch (e) {
      console.error('Failed to save fare option to localStorage', e);
    }
  },

  getCurrentBooking: <T>(fallback: T | null = null): T | null => {
    try {
      const data = localStorage.getItem(KEYS.CURRENT_BOOKING);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  },

  setCurrentBooking: <T>(booking: T | null): void => {
    try {
      if (booking === null) {
        localStorage.removeItem(KEYS.CURRENT_BOOKING);
      } else {
        localStorage.setItem(KEYS.CURRENT_BOOKING, JSON.stringify(booking));
      }
    } catch (e) {
      console.error('Failed to save booking to localStorage', e);
    }
  },

  clearSession: (): void => {
    try {
      localStorage.removeItem(KEYS.SELECTED_FLIGHT);
      localStorage.removeItem(KEYS.SELECTED_FARE);
      localStorage.removeItem(KEYS.CURRENT_BOOKING);
    } catch (e) {
      console.error('Failed to clear session storage', e);
    }
  }
};
