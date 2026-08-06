import React from 'react';
import { SpecialFareType } from '../../types/search';
import { AlertCircle } from 'lucide-react';

interface SpecialFareAlertProps {
  specialFare: SpecialFareType;
}

export const SpecialFareAlert: React.FC<SpecialFareAlertProps> = ({ specialFare }) => {
  if (specialFare === 'regular') return null;

  const messages: Record<SpecialFareType, string> = {
    regular: '',
    student: 'Student Special Fare: Valid Student ID card must be presented at airport check-in counter.',
    'armed-forces': 'Armed Forces Special Fare: Official Military / Defense Force ID card required during check-in.',
    'senior-citizen': 'Senior Citizen Special Fare: Valid Age Proof (Aadhaar / Passport) showing 60+ years required at airport.',
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-800 text-xs">
      <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
      <div>
        <strong className="font-extrabold uppercase block mb-0.5">Verification Required</strong>
        <span>{messages[specialFare]}</span>
      </div>
    </div>
  );
};
