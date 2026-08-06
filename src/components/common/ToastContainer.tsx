import React from 'react';
import { ToastMessage } from '../../hooks/useToast';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  if (toasts.length === 0) return null;

  const icons = {
    info: <Info className="text-sky-500 shrink-0" size={20} />,
    success: <CheckCircle className="text-emerald-500 shrink-0" size={20} />,
    warning: <AlertTriangle className="text-amber-500 shrink-0" size={20} />,
    error: <AlertCircle className="text-red-500 shrink-0" size={20} />,
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white rounded-xl p-4 shadow-xl border border-slate-800 flex items-start gap-3 animate-fadeIn transition-all duration-300"
        >
          {icons[toast.type]}
          <div className="flex-1">
            {toast.title && <h4 className="font-semibold text-sm leading-snug">{toast.title}</h4>}
            <p className="text-xs text-slate-300 mt-0.5">{toast.message}</p>
          </div>
          <button
            onClick={() => onClose(toast.id)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
