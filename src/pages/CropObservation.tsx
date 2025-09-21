import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { storageService, type CropObservation } from '@/services/storage';
import { ArrowLeft, Camera, Save, Image, Trash } from 'lucide-react';
import { toast } from 'sonner';

interface CropObservationProps {
  cropId: string;
  onBack: () => void;
}

const CropObservation: React.FC<CropObservationProps> = ({ cropId, onBack }) => {
  const { t, currentLanguage } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [notesBangla, setNotesBangla] = useState('');
  const [growthStage, setGrowthStage] = useState<string>('');
  const [healthStatus, setHealthStatus] = useState<string>('');
  const [isLoading, setSaving] = useState(false);

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          setPhotos(prev => [...prev, base64]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!growthStage || !healthStatus) {
      toast.error(
        currentLanguage.code === 'bn' 
          ? 'অনুগ্রহ করে সব ক্ষেত্র পূরণ করুন'
          : 'Please fill all required fields'
      );
      return;
    }

    setSaving(true);
    try {
      const observation: Omit<CropObservation, 'id' | 'synced'> = {
        cropId,
        date: new Date().toISOString(),
        photos,
        notes: currentLanguage.code === 'bn' ? notesBangla : notes,
        notesBangla,
        growthStage: growthStage as any,
        healthStatus: healthStatus as any,
      };

      const saved = storageService.saveObservation(observation);
      
      toast.success(
        currentLanguage.code === 'bn' 
          ? 'পর্যবেক্ষণ সফলভাবে সংরক্ষিত হয়েছে'
          : 'Observation saved successfully'
      );

      // Reset form
      setPhotos([]);
      setNotes('');
      setNotesBangla('');
      setGrowthStage('');
      setHealthStatus('');
      
    } catch (error) {
      toast.error(
        currentLanguage.code === 'bn' 
          ? 'সংরক্ষণে ত্রুটি হয়েছে'
          : 'Error saving observation'
      );
    } finally {
      setSaving(false);
    }
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
                  {t('crop-observation', 'Crop Observation', 'ফসল পর্যবেক্ষণ')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('record-progress', 'Record your crop progress', 'আপনার ফসলের অগ্রগতি রেকর্ড করুন')}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Photo Section */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              {t('photos', 'Photos', 'ছবিসমূহ')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              capture="environment"
              onChange={handlePhotoCapture}
              className="hidden"
            />
            
            <Button
              variant="farmer"
              size="farmer-large"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              <Camera className="w-5 h-5 mr-2" />
              {t('take-photos', 'Take Photos', 'ছবি তুলুন')}
            </Button>

            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Crop photo ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 w-8 h-8"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Growth Stage */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle>
              {t('growth-stage', 'Growth Stage', 'বৃদ্ধির পর্যায়')} *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={growthStage} onValueChange={setGrowthStage}>
              <SelectTrigger className="farmer-input">
                <SelectValue placeholder={
                  t('select-stage', 'Select growth stage', 'বৃদ্ধির পর্যায় নির্বাচন করুন')
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nursery">
                  {t('nursery', 'Nursery', 'নার্সারি')}
                </SelectItem>
                <SelectItem value="vegetative">
                  {t('vegetative', 'Vegetative Growth', 'উদ্ভিদ বৃদ্ধি')}
                </SelectItem>
                <SelectItem value="flowering">
                  {t('flowering', 'Flowering', 'ফুল ফোটা')}
                </SelectItem>
                <SelectItem value="fruiting">
                  {t('fruiting', 'Fruiting', 'ফল ধরা')}
                </SelectItem>
                <SelectItem value="harvest">
                  {t('harvest', 'Harvest Ready', 'ফসল তোলার উপযুক্ত')}
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Health Status */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle>
              {t('health-status', 'Health Status', 'স্বাস্থ্যের অবস্থা')} *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={healthStatus} onValueChange={setHealthStatus}>
              <SelectTrigger className="farmer-input">
                <SelectValue placeholder={
                  t('select-health', 'Select health status', 'স্বাস্থ্যের অবস্থা নির্বাচন করুন')
                } />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    {t('healthy', 'Healthy', 'সুস্থ')}
                  </div>
                </SelectItem>
                <SelectItem value="warning">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    {t('warning', 'Needs Attention', 'সতর্কতা প্রয়োজন')}
                  </div>
                </SelectItem>
                <SelectItem value="disease">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full" />
                    {t('disease', 'Disease Symptoms', 'রোগের লক্ষণ')}
                  </div>
                </SelectItem>
                <SelectItem value="pest">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    {t('pest', 'Pest Problem', 'পোকামাকড়ের সমস্যা')}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="farmer-card">
          <CardHeader>
            <CardTitle>
              {t('notes', 'Notes', 'নোট')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentLanguage.code === 'en' ? (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('notes-english', 'Notes (English)', 'নোট (ইংরেজি)')}
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('enter-notes', 'Enter your observations...', 'আপনার পর্যবেক্ষণ লিখুন...')}
                  className="farmer-input min-h-[100px]"
                />
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {t('notes-bangla', 'Notes (Bangla)', 'নোট (বাংলা)')}
                </label>
                <Textarea
                  value={notesBangla}
                  onChange={(e) => setNotesBangla(e.target.value)}
                  placeholder={t('enter-notes-bangla', 'আপনার পর্যবেক্ষণ লিখুন...', 'Enter your observations...')}
                  className="farmer-input min-h-[100px]"
                  style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}
                />
              </div>
            )}
            
            {/* Always show both if one is filled */}
            {((currentLanguage.code === 'en' && notesBangla) || (currentLanguage.code === 'bn' && notes)) && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {currentLanguage.code === 'en' 
                    ? t('notes-bangla', 'Notes (Bangla)', 'নোট (বাংলা)')
                    : t('notes-english', 'Notes (English)', 'নোট (ইংরেজি)')
                  }
                </label>
                <Textarea
                  value={currentLanguage.code === 'en' ? notesBangla : notes}
                  onChange={(e) => currentLanguage.code === 'en' ? setNotesBangla(e.target.value) : setNotes(e.target.value)}
                  placeholder={
                    currentLanguage.code === 'en'
                      ? 'আপনার পর্যবেক্ষণ বাংলায় লিখুন...'
                      : 'Enter your observations in English...'
                  }
                  className="farmer-input min-h-[100px]"
                  style={{ 
                    fontFamily: currentLanguage.code === 'en' 
                      ? 'SolaimanLipi, Arial, sans-serif' 
                      : 'Arial, sans-serif' 
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          variant="farmer"
          size="farmer-xl"
          onClick={handleSave}
          disabled={isLoading || !growthStage || !healthStatus}
          className="w-full"
        >
          <Save className="w-5 h-5 mr-2" />
          {isLoading 
            ? t('saving', 'Saving...', 'সংরক্ষণ করা হচ্ছে...')
            : t('save-observation', 'Save Observation', 'পর্যবেক্ষণ সংরক্ষণ করুন')
          }
        </Button>

        {/* Offline Notice */}
        <Card className="farmer-card bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                i
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium mb-1">
                  {t('offline-storage', 'Offline Storage', 'অফলাইন সংরক্ষণ')}
                </p>
                <p className="text-muted-foreground">
                  {t('offline-notice', 
                    'Your observations are saved locally on your device and will sync when internet is available.',
                    'আপনার পর্যবেক্ষণগুলি আপনার ডিভাইসে স্থানীয়ভাবে সংরক্ষিত হয় এবং ইন্টারনেট উপলব্ধ হলে সিঙ্ক হবে।'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropObservation;