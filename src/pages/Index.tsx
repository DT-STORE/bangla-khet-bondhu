import React, { useState } from 'react';
import Home from './Home';
import CropSelection from './CropSelection';
import { Crop } from '@/types';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const handleSelectCrop = (crop: Crop) => {
    setSelectedCrop(crop);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'crop-selection':
        return (
          <CropSelection
            selectedCrop={selectedCrop}
            onSelectCrop={handleSelectCrop}
            onBack={handleBack}
          />
        );
      case 'home':
      default:
        return (
          <Home
            selectedCrop={selectedCrop}
            onSelectCrop={() => setCurrentPage('crop-selection')}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return renderCurrentPage();
};

export default Index;
