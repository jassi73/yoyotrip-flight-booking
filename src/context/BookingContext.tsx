import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { Booking, PriceBreakdown } from '../types/booking';
import { Passenger, ContactDetails, PassengerFormErrors } from '../types/passenger';
import { Coupon } from '../types/coupon';
import { storageService } from '../services/storageService';
import { bookingService } from '../services/bookingService';
import { calculatePriceBreakdown } from '../utils/priceUtils';
import { useFlightContext } from './FlightContext';
import { validateEmail, validatePhone, validateName, validateDOB } from '../utils/validation';

interface BookingContextType {
  currentBooking: Booking | null;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  contactDetails: ContactDetails;
  setContactDetails: React.Dispatch<React.SetStateAction<ContactDetails>>;
  appliedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  priceBreakdown: PriceBreakdown | null;
  formErrors: PassengerFormErrors;
  validateBookingForm: () => boolean;
  confirmBooking: () => Booking | null;
  clearBooking: () => void;
  updatePassenger: (index: number, field: keyof Passenger, value: string) => void;
  addPassenger: (type?: 'Adult' | 'Child' | 'Infant') => void;
  removePassenger: (index: number) => void;
  updateContactField: (field: keyof ContactDetails, value: string) => void;
  validateSingleField: (category: 'passenger' | 'contact', indexOrField: number | keyof ContactDetails, fieldName?: keyof Passenger) => void;
}

const initialContact: ContactDetails = {
  email: '',
  phone: '',
  countryCode: '+91',
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedFlight, selectedFare, searchParams, updateSearchParams } = useFlightContext();

  const [currentBooking, setCurrentBookingState] = useState<Booking | null>(() =>
    storageService.getCurrentBooking(null)
  );

  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      id: 'adult-1',
      type: 'Adult',
      salutation: 'Mr',
      firstName: '',
      lastName: '',
      dateOfBirth: '1995-05-15',
      nationality: 'Indian',
      seatPreference: 'Window',
      mealPreference: 'Standard',
    },
  ]);

  const [contactDetails, setContactDetails] = useState<ContactDetails>(initialContact);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [formErrors, setFormErrors] = useState<PassengerFormErrors>({
    passengers: {},
    contact: {},
  });

  // Sync passengers array with searchParams.travelers (Adults, Children, Infants)
  useEffect(() => {
    const totalAdults = searchParams.travelers.adults || 1;
    const totalChildren = searchParams.travelers.children || 0;
    const totalInfants = searchParams.travelers.infants || 0;

    const newPassengers: Passenger[] = [];

    for (let i = 0; i < totalAdults; i++) {
      newPassengers.push({
        id: `adult-${i + 1}`,
        type: 'Adult',
        salutation: 'Mr',
        firstName: '',
        lastName: '',
        dateOfBirth: '1995-05-15',
        nationality: 'Indian',
        seatPreference: 'Window',
        mealPreference: 'Standard',
      });
    }

    for (let i = 0; i < totalChildren; i++) {
      newPassengers.push({
        id: `child-${i + 1}`,
        type: 'Child',
        salutation: 'Master',
        firstName: '',
        lastName: '',
        dateOfBirth: '2016-08-10',
        nationality: 'Indian',
        seatPreference: 'Window',
        mealPreference: 'Standard',
      });
    }

    for (let i = 0; i < totalInfants; i++) {
      newPassengers.push({
        id: `infant-${i + 1}`,
        type: 'Infant',
        salutation: 'Master',
        firstName: '',
        lastName: '',
        dateOfBirth: '2025-01-01',
        nationality: 'Indian',
        seatPreference: 'Window',
        mealPreference: 'Standard',
      });
    }

    setPassengers(newPassengers);
  }, []);

  const addPassenger = useCallback((type: 'Adult' | 'Child' | 'Infant' = 'Adult') => {
    setPassengers((prev) => [
      ...prev,
      {
        id: `${type.toLowerCase()}-${prev.length + 1}-${Date.now()}`,
        type,
        salutation: type === 'Adult' ? 'Mr' : 'Master',
        firstName: '',
        lastName: '',
        dateOfBirth: type === 'Adult' ? '1995-05-15' : type === 'Child' ? '2016-08-10' : '2025-01-01',
        nationality: 'Indian',
        seatPreference: 'Window',
        mealPreference: 'Standard',
      },
    ]);

    updateSearchParams({
      travelers: {
        ...searchParams.travelers,
        adults: type === 'Adult' ? searchParams.travelers.adults + 1 : searchParams.travelers.adults,
        children: type === 'Child' ? searchParams.travelers.children + 1 : searchParams.travelers.children,
        infants: type === 'Infant' ? searchParams.travelers.infants + 1 : searchParams.travelers.infants,
      },
    });
  }, [searchParams.travelers, updateSearchParams]);

  const removePassenger = useCallback((index: number) => {
    setPassengers((prev) => {
      if (prev.length <= 1) return prev;
      const target = prev[index];
      const next = prev.filter((_, idx) => idx !== index);

      updateSearchParams({
        travelers: {
          ...searchParams.travelers,
          adults: target.type === 'Adult' ? Math.max(1, searchParams.travelers.adults - 1) : searchParams.travelers.adults,
          children: target.type === 'Child' ? Math.max(0, searchParams.travelers.children - 1) : searchParams.travelers.children,
          infants: target.type === 'Infant' ? Math.max(0, searchParams.travelers.infants - 1) : searchParams.travelers.infants,
        },
      });

      return next;
    });
  }, [searchParams.travelers, updateSearchParams]);

  const priceBreakdown = useMemo(() => {
    if (!selectedFare) return null;
    return calculatePriceBreakdown(
      selectedFare,
      passengers.filter((p) => p.type !== 'Infant').length,
      searchParams.specialFare,
      appliedCoupon
    );
  }, [selectedFare, passengers, searchParams.specialFare, appliedCoupon]);

  // Real-time revalidation & automatic error clearance on value change
  const updatePassenger = useCallback((index: number, field: keyof Passenger, value: string) => {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      const pId = copy[index].id;

      setFormErrors((prevErrors) => {
        const pErrors = { ...prevErrors.passengers };
        if (pErrors[pId]) {
          const currentPErrors = { ...pErrors[pId] };
          let err: string | null = null;
          if (field === 'firstName') err = validateName(value, 'First name');
          else if (field === 'lastName') err = validateName(value, 'Last name');
          else if (field === 'dateOfBirth') err = validateDOB(value);

          if (!err) {
            delete currentPErrors[field];
          } else {
            currentPErrors[field] = err;
          }

          if (Object.keys(currentPErrors).length === 0) {
            delete pErrors[pId];
          } else {
            pErrors[pId] = currentPErrors;
          }
        }
        return { ...prevErrors, passengers: pErrors };
      });

      return copy;
    });
  }, []);

  const updateContactField = useCallback((field: keyof ContactDetails, value: string) => {
    setContactDetails((prev) => {
      const next = { ...prev, [field]: value };

      setFormErrors((prevErrors) => {
        const cErrors = { ...prevErrors.contact };
        let err: string | null = null;
        if (field === 'email') err = validateEmail(value);
        else if (field === 'phone') err = validatePhone(value);

        if (!err) {
          delete cErrors[field];
        } else {
          cErrors[field] = err;
        }
        return { ...prevErrors, contact: cErrors };
      });

      return next;
    });
  }, []);

  // Validate single field on blur out of focus
  const validateSingleField = useCallback((
    category: 'passenger' | 'contact',
    indexOrField: number | keyof ContactDetails,
    fieldName?: keyof Passenger
  ) => {
    setFormErrors((prevErrors) => {
      if (category === 'passenger' && typeof indexOrField === 'number' && fieldName) {
        const targetP = passengers[indexOrField];
        if (!targetP) return prevErrors;

        const val = targetP[fieldName] as string;
        let err: string | null = null;
        if (fieldName === 'firstName') err = validateName(val, 'First name');
        else if (fieldName === 'lastName') err = validateName(val, 'Last name');
        else if (fieldName === 'dateOfBirth') err = validateDOB(val);

        const pErrors = { ...prevErrors.passengers };
        const currentPErrors = pErrors[targetP.id] ? { ...pErrors[targetP.id] } : {};

        if (!err) {
          delete currentPErrors[fieldName];
        } else {
          currentPErrors[fieldName] = err;
        }

        if (Object.keys(currentPErrors).length === 0) {
          delete pErrors[targetP.id];
        } else {
          pErrors[targetP.id] = currentPErrors;
        }

        return { ...prevErrors, passengers: pErrors };
      } else if (category === 'contact' && typeof indexOrField === 'string') {
        const val = contactDetails[indexOrField];
        let err: string | null = null;
        if (indexOrField === 'email') err = validateEmail(val);
        else if (indexOrField === 'phone') err = validatePhone(val);

        const cErrors = { ...prevErrors.contact };
        if (!err) {
          delete cErrors[indexOrField];
        } else {
          cErrors[indexOrField] = err;
        }

        return { ...prevErrors, contact: cErrors };
      }
      return prevErrors;
    });
  }, [passengers, contactDetails]);

  const applyCoupon = useCallback((coupon: Coupon) => {
    setAppliedCoupon(coupon);
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const validateBookingForm = useCallback((): boolean => {
    const pErrors: Record<string, Record<string, string>> = {};
    const cErrors: Record<string, string> = {};

    passengers.forEach((p) => {
      const pFieldErrors: Record<string, string> = {};
      const fNameErr = validateName(p.firstName, 'First name');
      if (fNameErr) pFieldErrors.firstName = fNameErr;

      const lNameErr = validateName(p.lastName, 'Last name');
      if (lNameErr) pFieldErrors.lastName = lNameErr;

      const dobErr = validateDOB(p.dateOfBirth);
      if (dobErr) pFieldErrors.dateOfBirth = dobErr;

      if (Object.keys(pFieldErrors).length > 0) {
        pErrors[p.id] = pFieldErrors;
      }
    });

    const emailErr = validateEmail(contactDetails.email);
    if (emailErr) cErrors.email = emailErr;

    const phoneErr = validatePhone(contactDetails.phone);
    if (phoneErr) cErrors.phone = phoneErr;

    setFormErrors({ passengers: pErrors, contact: cErrors });

    return Object.keys(pErrors).length === 0 && Object.keys(cErrors).length === 0;
  }, [passengers, contactDetails]);

  const confirmBooking = useCallback((): Booking | null => {
    if (!selectedFlight || !selectedFare || !priceBreakdown) return null;

    const newBooking = bookingService.createBooking(
      selectedFlight,
      selectedFare,
      searchParams,
      passengers,
      contactDetails,
      appliedCoupon,
      priceBreakdown
    );

    setCurrentBookingState(newBooking);
    storageService.setCurrentBooking(newBooking);
    return newBooking;
  }, [selectedFlight, selectedFare, searchParams, passengers, contactDetails, appliedCoupon, priceBreakdown]);

  const clearBooking = useCallback(() => {
    setCurrentBookingState(null);
    storageService.setCurrentBooking(null);
  }, []);

  return (
    <BookingContext.Provider
      value={{
        currentBooking,
        passengers,
        setPassengers,
        contactDetails,
        setContactDetails,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        priceBreakdown,
        formErrors,
        validateBookingForm,
        confirmBooking,
        clearBooking,
        updatePassenger,
        addPassenger,
        removePassenger,
        updateContactField,
        validateSingleField,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
};
