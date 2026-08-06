import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { FlightProvider } from './context/FlightContext';
import { BookingProvider } from './context/BookingContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isNoFooterPage = location.pathname === '/results' || location.pathname === '/passenger';

  return (
    <div className="min-h-screen flex flex-col bg-yovo-bg font-sans">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isNoFooterPage && <Footer />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FlightProvider>
        <BookingProvider>
          <AppContent />
        </BookingProvider>
      </FlightProvider>
    </BrowserRouter>
  );
};

export default App;
