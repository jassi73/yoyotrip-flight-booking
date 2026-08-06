import React, { useState } from 'react';
import { Coupon } from '../../types/coupon';
import { flightService } from '../../services/flightService';
import { Tag, CheckCircle2, X } from 'lucide-react';
import { formatCurrency } from '../../utils/currency';

interface CouponSectionProps {
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon) => void;
  onRemoveCoupon: () => void;
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const coupons = flightService.getCoupons();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const codeUpper = inputCode.trim().toUpperCase();

    const found = coupons.find((c) => c.code === codeUpper);
    if (!found) {
      setErrorMsg('Invalid coupon code. Try "YOVOAI" or "WELCOME500".');
      return;
    }

    onApplyCoupon(found);
    setInputCode('');
  };

  const handleSelectPredefined = (coupon: Coupon) => {
    setErrorMsg('');
    onApplyCoupon(coupon);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
        <Tag className="text-yovo-red" size={20} />
        <h4 className="text-sm font-extrabold text-slate-900">Promo Code & Coupons</h4>
      </div>

      {appliedCoupon ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={20} />
            <div>
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                Code Applied: {appliedCoupon.code}
              </span>
              <p className="text-xs text-emerald-700 mt-0.5">{appliedCoupon.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="p-1 text-emerald-700 hover:text-red-600 transition-colors"
            title="Remove Coupon"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code (e.g. YOVOAI)"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="flex-1 uppercase font-bold text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-yovo-red focus:bg-white"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-yovo-slate text-white text-xs font-bold rounded-xl hover:bg-yovo-navy transition-colors shadow-xs"
            >
              Apply
            </button>
          </div>

          {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}

          {/* Predefined Coupons */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Available Offers
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {coupons.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelectPredefined(c)}
                  className="p-2.5 rounded-xl border border-dashed border-pink-200 bg-pink-50/50 hover:bg-pink-50 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-yovo-red">{c.code}</span>
                    <span className="text-[10px] font-bold text-emerald-600">Save up to {formatCurrency(c.maxDiscount || 0)}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">{c.description}</p>
                </button>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
