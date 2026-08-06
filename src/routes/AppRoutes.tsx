import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FlightSkeleton } from '../components/common/Skeleton';

// Lazy loaded page components for optimal code-splitting and bundle performance
const SearchPage = lazy(() =>
  import('../pages/SearchPage').then((module) => ({ default: module.SearchPage }))
);
const ResultsPage = lazy(() =>
  import('../pages/ResultsPage').then((module) => ({ default: module.ResultsPage }))
);
const PassengerPage = lazy(() =>
  import('../pages/PassengerPage').then((module) => ({ default: module.PassengerPage }))
);
const ConfirmationPage = lazy(() =>
  import('../pages/ConfirmationPage').then((module) => ({ default: module.ConfirmationPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage }))
);

const PageLoader: React.FC = () => <FlightSkeleton />;

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/passenger" element={<PassengerPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
