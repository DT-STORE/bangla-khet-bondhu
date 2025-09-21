import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { dragonFruitStages, dragonFruitSoil, fertilizerSchedule } from '@/data/dragonFruit';
import { ArrowLeft, Clock, Leaf, Droplets } from 'lucide-react';

interface DragonFruitGuideProps {
  onBack: () => void;
}

const DragonFruitGuide: React.FC<DragonFruitGuideProps> = ({ onBack }) => {
  const { t } = useLanguage();

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
                  {t('dragon-fruit-guide', 'Dragon Fruit Guide', 'ড্রাগন ফল গাইড')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('complete-cultivation-guide', 'Complete cultivation guide', 'সম্পূর্ণ চাষাবাদ গাইড')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="farmer-card text-center">
          <CardContent className="pt-6">
            <div className="text-6xl mb-4">🐉</div>
            <h2 className="text-2xl font-bold mb-2">
              {t('dragon-fruit-title', 'Dragon Fruit Cultivation', 'ড্রাগন ফল চাষাবাদ')}
            </h2>
            <p className="text-muted-foreground">
              {t('high-value-crop', 'High-value tropical fruit with growing demand', 'উচ্চ মূল্যের গ্রীষ্মকালীন ফল যার চাহিদা বাড়ছে')}
            </p>
          </CardContent>
        </Card>

        {/* Growth Stages */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            {t('growth-stages', 'Growth Stages', 'বৃদ্ধির পর্যায়সমূহ')}
          </h3>
          
          {dragonFruitStages.map((stage, index) => (
            <Card key={stage.id} className="farmer-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {t(`stage-${stage.id}`, stage.name, stage.nameBangla)}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {t(`duration-${stage.id}`, stage.duration, stage.durationBangla)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  {t(`desc-${stage.id}`, stage.description, stage.descriptionBangla)}
                </p>
                
                <div>
                  <h4 className="font-semibold mb-2">
                    {t('care-tips', 'Care Tips', 'যত্নের টিপস')}
                  </h4>
                  <ul className="space-y-1">
                    {stage.careTips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        {t(`tip-${stage.id}-${tipIndex}`, tip, stage.careTipsBangla[tipIndex])}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Soil Requirements */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              {t('soil-requirements', 'Soil Requirements', 'মাটির প্রয়োজনীয়তা')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">
                  {t('soil-type', 'Soil Type', 'মাটির ধরন')}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {t('soil-type-desc', dragonFruitSoil.type, dragonFruitSoil.typeBangla)}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  {t('ph-level', 'pH Level', 'পিএইচ লেভেল')}
                </h4>
                <p className="text-sm text-muted-foreground">{dragonFruitSoil.ph}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">
                {t('drainage', 'Drainage', 'নিষ্কাশন')}
              </h4>
              <p className="text-sm text-muted-foreground">
                {t('drainage-desc', dragonFruitSoil.drainage, dragonFruitSoil.drainageBangla)}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                {t('nutrients', 'Key Nutrients', 'প্রধান পুষ্টি উপাদান')}
              </h4>
              <ul className="space-y-1">
                {dragonFruitSoil.nutrients.map((nutrient, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {t(`nutrient-${index}`, nutrient, dragonFruitSoil.nutrientsBangla[index])}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Fertilizer Schedule */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle>
              {t('fertilizer-schedule', 'Fertilizer Schedule', 'সার প্রয়োগের সময়সূচী')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fertilizerSchedule.map((schedule, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">
                    {t(`fert-stage-${index}`, schedule.stage, schedule.stageBangla)}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {schedule.fertilizers.map((fertilizer, fertIndex) => (
                      <li key={fertIndex} className="text-sm text-muted-foreground">
                        • {t(`fert-${index}-${fertIndex}`, fertilizer, schedule.fertilizersBangla[fertIndex])}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="farmer-card bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 text-primary">
              {t('quick-tips', 'Quick Tips for Success', 'সফলতার জন্য দ্রুত টিপস')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">
                  {t('planting-tips', 'Planting', 'রোপণ')}
                </h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• {t('tip-1', 'Plant during rainy season', 'বর্ষাকালে রোপণ করুন')}</li>
                  <li>• {t('tip-2', 'Space plants 2-3 meters apart', 'গাছে গাছে ২-৩ মিটার দূরত্ব রাখুন')}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  {t('care-tips', 'Care', 'যত্ন')}
                </h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• {t('tip-3', 'Mulch around plants', 'গাছের চারপাশে মালচ দিন')}</li>
                  <li>• {t('tip-4', 'Regular pruning essential', 'নিয়মিত ছাঁটাই অপরিহার্য')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DragonFruitGuide;