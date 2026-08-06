import React, { useState, useEffect } from 'react';
import { Passenger } from '../../types/passenger';
import { Input } from '../common/Input';
import { CustomSelectDropdown } from '../common/CustomSelectDropdown';
import { PassengerDatePicker } from '../common/PassengerDatePicker';
import { User, Armchair, Utensils, ChevronDown, CheckCircle2, AlertCircle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookingContext } from '../../context/BookingContext';

interface PassengerFormProps {
  passenger: Passenger;
  index: number;
  errors?: Record<string, string>;
  onChange: (index: number, field: keyof Passenger, value: string) => void;
  onRemove?: (index: number) => void;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({
  passenger,
  index,
  errors = {},
  onChange,
  onRemove,
}) => {
  const { validateSingleField } = useBookingContext();

  // First passenger (index === 0) is open by default, others collapsed
  const [isOpen, setIsOpen] = useState(index === 0);

  const hasErrors = Object.keys(errors).length > 0;
  const isFilled = Boolean(passenger.firstName.trim() && passenger.lastName.trim());

  // Automatically expand card if validation errors exist
  useEffect(() => {
    if (hasErrors) {
      setIsOpen(true);
    }
  }, [hasErrors]);

  const salutations = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Mrs', label: 'Mrs.' },
    { value: 'Ms', label: 'Ms.' },
    { value: 'Master', label: 'Master (Child)' },
  ];

  const seats = [
    { value: 'Window', label: 'Window Seat' },
    { value: 'Aisle', label: 'Aisle Seat' },
    { value: 'Middle', label: 'Middle Seat' },
    { value: 'Extra Legroom', label: 'Extra Legroom (+₹300)' },
  ];

  const meals = [
    { value: 'Standard', label: 'Standard Meal' },
    { value: 'Vegetarian', label: 'Vegetarian / Jain' },
    { value: 'Non-Veg', label: 'Non-Vegetarian' },
    { value: 'Fruit Platter', label: 'Fresh Fruit Platter' },
  ];

  const passengerNameDisplay = isFilled
    ? `${passenger.salutation}. ${passenger.firstName} ${passenger.lastName}`
    : 'Click to enter traveler details';

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 shadow-md text-slate-900 transition-all duration-200 relative ${
      isOpen ? 'z-20 overflow-visible' : 'z-10 overflow-hidden'
    }`}>
      
      {/* Accordion Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/60 transition-colors cursor-pointer rounded-t-3xl"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
            isFilled ? 'bg-emerald-100 text-emerald-700' : 'bg-yovo-red/10 text-yovo-red'
          }`}>
            {index + 1}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-extrabold text-slate-900">
                Passenger {index + 1} — {passenger.type}
              </h4>
              {index === 0 && (
                <span className="text-[9px] font-bold px-2 py-0.2 rounded-full bg-pink-50 text-yovo-red border border-pink-200 uppercase tracking-wider">
                  Primary
                </span>
              )}
            </div>
            {!isOpen && (
              <p className="text-[11px] font-semibold text-slate-400 truncate mt-0.5">
                {passengerNameDisplay}
              </p>
            )}
          </div>
        </div>

        {/* Right Status Badge, Trash Delete Button, & Arrow */}
        <div className="flex items-center gap-2 shrink-0">
          {hasErrors ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
              <AlertCircle size={12} />
              <span>Incomplete</span>
            </span>
          ) : isFilled ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <CheckCircle2 size={12} />
              <span>Filled</span>
            </span>
          ) : null}

          {/* Remove Traveler Button (For Passengers > 1) */}
          {index > 0 && onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(index);
              }}
              title="Remove Traveler"
              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors shadow-2xs"
            >
              <Trash2 size={13} />
            </button>
          )}

          <div className={`w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center transition-transform duration-200 ${isOpen ? 'rotate-180 bg-pink-50 text-yovo-red' : ''}`}>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Accordion Collapsible Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-visible"
          >
            <div className="p-5 pt-1 border-t border-slate-100 space-y-3.5 overflow-visible">
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 relative z-20">
                {/* Title / Salutation Custom Popover Dropdown */}
                <div className="sm:col-span-3">
                  <CustomSelectDropdown
                    label="Title *"
                    value={passenger.salutation}
                    onChange={(val) => onChange(index, 'salutation', val)}
                    options={salutations}
                  />
                </div>

                {/* First Name */}
                <div className="sm:col-span-4">
                  <Input
                    label="First & Middle Name *"
                    placeholder="As per Passport / Govt ID"
                    value={passenger.firstName}
                    onChange={(e) => onChange(index, 'firstName', e.target.value)}
                    onBlur={() => validateSingleField('passenger', index, 'firstName')}
                    error={errors.firstName}
                    leftIcon={<User size={15} />}
                  />
                </div>

                {/* Last Name */}
                <div className="sm:col-span-5">
                  <Input
                    label="Last Name *"
                    placeholder="As per Passport / Govt ID"
                    value={passenger.lastName}
                    onChange={(e) => onChange(index, 'lastName', e.target.value)}
                    onBlur={() => validateSingleField('passenger', index, 'lastName')}
                    error={errors.lastName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 relative z-10">
                {/* Date of Birth Custom Calendar Popover */}
                <div>
                  <PassengerDatePicker
                    label="Date of Birth *"
                    value={passenger.dateOfBirth}
                    onChange={(val) => onChange(index, 'dateOfBirth', val)}
                    error={errors.dateOfBirth}
                  />
                </div>

                {/* Seat Preference Custom Popover */}
                <div>
                  <CustomSelectDropdown
                    label="Seat Preference"
                    value={passenger.seatPreference || 'Window'}
                    onChange={(val) => onChange(index, 'seatPreference', val)}
                    options={seats}
                    leftIcon={<Armchair size={15} />}
                  />
                </div>

                {/* Meal Choice Custom Popover */}
                <div>
                  <CustomSelectDropdown
                    label="Meal Choice"
                    value={passenger.mealPreference || 'Standard'}
                    onChange={(val) => onChange(index, 'mealPreference', val)}
                    options={meals}
                    leftIcon={<Utensils size={15} />}
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
