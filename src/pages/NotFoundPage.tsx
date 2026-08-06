import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-yovo-bg flex items-center justify-center p-4 text-center">
      <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-xl max-w-md w-full space-y-4">
        <div className="w-16 h-16 rounded-full bg-pink-50 text-yovo-red flex items-center justify-center mx-auto">
          <Plane size={32} className="rotate-45" />
        </div>

        <h2 className="text-3xl font-black text-slate-900">404 - Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The page or destination you are looking for has taken off or does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yovo-red text-white text-xs font-bold hover:bg-yovo-red-hover transition-colors shadow-md"
        >
          <Home size={16} />
          <span>Return to Flight Search</span>
        </Link>
      </div>
    </div>
  );
};
