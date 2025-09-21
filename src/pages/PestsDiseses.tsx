import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { dragonFruitPestsDiseses } from '@/data/dragonFruit';
import { ArrowLeft, Bug, AlertTriangle, Shield, Droplets } from 'lucide-react';

interface PestsDiseasesProps {
  onBack: () => void;
}

const PestsDiseses: React.FC<PestsDiseasesProps> = ({ onBack }) => {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const pests = dragonFruitPestsDiseses.filter(item => item.type === 'pest');
  const diseases = dragonFruitPestsDiseses.filter(item => item.type === 'disease');

  const PestDiseaseCard = ({ item }: { item: any }) => (
    <Card className="farmer-card cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            item.type === 'pest' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
          }`}>
            {item.type === 'pest' ? <Bug className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">
              {t(`${item.type}-${item.id}`, item.name, item.nameBangla)}
            </CardTitle>
            <Badge variant={item.type === 'pest' ? 'destructive' : 'secondary'} className="mt-1">
              {t(item.type, item.type === 'pest' ? 'Pest' : 'Disease', item.type === 'pest' ? 'পোকা' : 'রোগ')}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      {selectedItem === item.id && (
        <CardContent className="space-y-6">
          {/* Symptoms */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              {t('symptoms', 'Symptoms', 'লক্ষণসমূহ')}
            </h4>
            <ul className="space-y-2">
              {item.symptoms.map((symptom: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                  {t(`symptom-${item.id}-${index}`, symptom, item.symptomsBangla[index])}
                </li>
              ))}
            </ul>
          </div>

          {/* Treatment */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              {t('treatment', 'Treatment', 'চিকিৎসা')}
            </h4>
            <ul className="space-y-2">
              {item.treatment.map((treatment: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  {t(`treatment-${item.id}-${index}`, treatment, item.treatmentBangla[index])}
                </li>
              ))}
            </ul>
          </div>

          {/* Prevention */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              {t('prevention', 'Prevention', 'প্রতিরোধ')}
            </h4>
            <ul className="space-y-2">
              {item.prevention.map((prevention: string, index: number) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  {t(`prevention-${item.id}-${index}`, prevention, item.preventionBangla[index])}
                </li>
              ))}
            </ul>
          </div>

          {/* Pesticides */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">
              {t('recommended-pesticides', 'Recommended Pesticides', 'প্রস্তাবিত কীটনাশক')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.pesticides.map((pesticide: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {t(`pesticide-${item.id}-${index}`, pesticide, item.pesticidesBangla[index])}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );

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
                  {t('pests-diseases', 'Pests & Diseases', 'পোকামাকড় ও রোগ')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('identify-treat', 'Identify and treat common problems', 'সাধারণ সমস্যা চিহ্নিত ও চিকিৎসা করুন')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Guide */}
        <Card className="farmer-card mb-6 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bug className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 text-primary">
                  {t('early-detection', 'Early Detection is Key', 'প্রাথমিক সনাক্তকরণই মূল চাবিকাঠি')}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('detection-tip', 
                    'Regular inspection of your dragon fruit plants helps catch problems early when they are easier and cheaper to treat.',
                    'নিয়মিত ড্রাগন ফল গাছ পরিদর্শন করলে সমস্যাগুলি প্রাথমিক পর্যায়ে ধরা পড়ে যখন সেগুলি সহজ ও সস্তায় চিকিৎসা করা যায়।'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Pests and Diseases */}
        <Tabs defaultValue="diseases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 farmer-tabs">
            <TabsTrigger value="diseases" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {t('diseases', 'Diseases', 'রোগসমূহ')}
              <Badge variant="secondary" className="ml-1">
                {diseases.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pests" className="flex items-center gap-2">
              <Bug className="w-4 h-4" />
              {t('pests', 'Pests', 'পোকামাকড়')}
              <Badge variant="secondary" className="ml-1">
                {pests.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diseases" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {t('common-diseases', 'Common Dragon Fruit Diseases', 'ড্রাগন ফলের সাধারণ রোগসমূহ')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('disease-desc', 'Tap on any disease to learn more about symptoms and treatment', 'লক্ষণ ও চিকিৎসা সম্পর্কে জানতে যেকোনো রোগে ট্যাপ করুন')}
              </p>
            </div>
            {diseases.map(disease => (
              <PestDiseaseCard key={disease.id} item={disease} />
            ))}
          </TabsContent>

          <TabsContent value="pests" className="space-y-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {t('common-pests', 'Common Dragon Fruit Pests', 'ড্রাগন ফলের সাধারণ পোকামাকড়')}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t('pest-desc', 'Tap on any pest to learn more about identification and control', 'সনাক্তকরণ ও নিয়ন্ত্রণ সম্পর্কে জানতে যেকোনো পোকায় ট্যাপ করুন')}
              </p>
            </div>
            {pests.map(pest => (
              <PestDiseaseCard key={pest.id} item={pest} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="farmer-card mt-8 bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2 text-red-800">
                  {t('severe-infestation', 'Severe Infestation?', 'মারাত্মক আক্রমণ?')}
                </h4>
                <p className="text-sm text-red-700 mb-3">
                  {t('expert-help-text', 
                    'If your plants show severe symptoms or home treatments are not working, contact your local agricultural extension officer immediately.',
                    'যদি আপনার গাছে মারাত্মক লক্ষণ দেখা দেয় বা ঘরোয়া চিকিৎসা কাজ না করে, তৎক্ষণাৎ আপনার স্থানীয় কৃষি সম্প্রসারণ কর্মকর্তার সাথে যোগাযোগ করুন।'
                  )}
                </p>
                <Button variant="farmer-warning" size="farmer-large">
                  {t('contact-expert', 'Contact Expert', 'বিশেষজ্ঞের সাথে যোগাযোগ')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PestsDiseses;