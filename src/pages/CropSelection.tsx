import React from 'react';
import { Button } from '@/components/ui/button';
import CropCard from '@/components/CropCard';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Crop } from '@/types';
import { crops } from '@/data/crops';
import { ArrowLeft } from 'lucide-react';

interface CropSelectionProps {
  selectedCrop: Crop | null;
  onSelectCrop: (crop: Crop) => void;
  onBack: () => void;
}

const CropSelection: React.FC<CropSelectionProps> = ({ 
  selectedCrop, 
  onSelectCrop, 
  onBack 
}) => {
  const { t } = useLanguage();

  const handleCropSelect = (crop: Crop) => {
    onSelectCrop(crop);
    // Navigate back to home after selection
    setTimeout(() => {
      onBack();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="farmer-icon-button w-12 h-12"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {t('select-crop-title', 'Select Your Crop', 'আপনার ফসল নির্বাচন করুন')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('select-crop-subtitle', 'Choose the crop you are growing', 'আপনি যে ফসল চাষ করছেন তা নির্বাচন করুন')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Current Selection */}
        {selectedCrop && (
          <div className="mb-6 p-4 bg-primary/10 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="text-3xl">{selectedCrop.icon}</div>
              <div>
                <h3 className="font-semibold text-primary">
                  {t('currently-selected', 'Currently Selected', 'বর্তমানে নির্বাচিত')}
                </h3>
                <p className="text-lg">
                  {t('crop-name', selectedCrop.name, selectedCrop.nameBangla)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              onSelect={handleCropSelect}
              isSelected={selectedCrop?.id === crop.id}
            />
          ))}
        </div>

        {/* Information Section */}
        <div className="mt-8 p-6 bg-muted/50 rounded-2xl">
          <h3 className="text-lg font-semibold mb-4">
            {t('crop-info-title', 'About Crop Selection', 'ফসল নির্বাচন সম্পর্কে')}
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              {t('crop-info-1', 
                'Select the crop you are currently growing or planning to grow.',
                'আপনি বর্তমানে যে ফসল চাষ করছেন বা করার পরিকল্পনা করছেন তা নির্বাচন করুন।'
              )}
            </p>
            <p>
              {t('crop-info-2',
                'The app will provide customized guidance, reminders, and care tips for your selected crop.',
                'অ্যাপটি আপনার নির্বাচিত ফসলের জন্য কাস্টমাইজড গাইডেন্স, অনুস্মারক এবং যত্নের টিপস প্রদান করবে।'
              )}
            </p>
            <p>
              {t('crop-info-3',
                'You can change your crop selection anytime from the home screen.',
                'আপনি হোম স্ক্রিন থেকে যেকোনো সময় আপনার ফসল নির্বাচন পরিবর্তন করতে পারেন।'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropSelection;