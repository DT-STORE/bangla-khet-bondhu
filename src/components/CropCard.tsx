import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crop } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CropCardProps {
  crop: Crop;
  onSelect: (crop: Crop) => void;
  isSelected?: boolean;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onSelect, isSelected = false }) => {
  const { t } = useLanguage();

  return (
    <Card className={`farmer-card cursor-pointer transition-all ${
      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
    }`}>
      <div className="text-center space-y-4">
        <div className="text-6xl">
          {crop.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            {t('crop-name', crop.name, crop.nameBangla)}
          </h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {t('crop-description', crop.description, crop.descriptionBangla)}
          </p>
        </div>
        <Button
          variant="farmer"
          size="farmer-large"
          onClick={() => onSelect(crop)}
          className="w-full"
        >
          {t('select-crop', 'Select Crop', 'ফসল নির্বাচন করুন')}
        </Button>
      </div>
    </Card>
  );
};

export default CropCard;