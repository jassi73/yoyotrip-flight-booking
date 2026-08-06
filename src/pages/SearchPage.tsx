import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/search/HeroSection';
import { AiTravelGuide } from '../components/search/AiTravelGuide';
import { PopularRoutes } from '../components/search/PopularRoutes';
import { HomeSearchSkeleton } from '../components/common/Skeleton';

export const SearchPage: React.FC = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  if (isPageLoading) {
    return <HomeSearchSkeleton />;
  }

  return (
    <div className="min-h-screen bg-yovo-bg pb-16">
      
      {/* Task-Oriented Above-The-Fold Hero & Search Card */}
      <HeroSection />

      {/* AI Travel Assistant Section */}
      <AiTravelGuide />

      {/* Popular Routes */}
      <PopularRoutes />

    </div>
  );
};
