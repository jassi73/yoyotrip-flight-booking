import React from 'react';
import { ContactDetails } from '../../types/passenger';
import { Input } from '../common/Input';
import { Mail, Phone } from 'lucide-react';
import { useBookingContext } from '../../context/BookingContext';

interface ContactDetailsFormProps {
  contact: ContactDetails;
  errors?: Record<string, string>;
  onChange: (field: keyof ContactDetails, value: string) => void;
}

export const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({
  contact,
  errors = {},
  onChange,
}) => {
  const { validateSingleField } = useBookingContext();

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <Mail className="text-yovo-red" size={20} />
        <div>
          <h4 className="text-sm font-extrabold text-slate-900">Contact Details</h4>
          <p className="text-[11px] text-slate-500">Your ticket and booking status will be sent here.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <Input
          type="email"
          label="Email Address *"
          placeholder="e.g. traveler@domain.com"
          value={contact.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => validateSingleField('contact', 'email')}
          error={errors.email}
          leftIcon={<Mail size={16} />}
        />

        {/* Mobile Phone */}
        <div className="flex gap-2 items-start">
          <div className="w-24">
            <Input
              label="Code"
              value={contact.countryCode}
              onChange={(e) => onChange('countryCode', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="tel"
              label="Mobile Number *"
              placeholder="9876543210"
              value={contact.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              onBlur={() => validateSingleField('contact', 'phone')}
              error={errors.phone}
              leftIcon={<Phone size={16} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
