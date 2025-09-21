import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LanguageToggle from '@/components/LanguageToggle';
import WeatherCard from '@/components/WeatherCard';
import ReminderCard from '@/components/ReminderCard';
import { Crop, Reminder, WeatherData } from '@/types';
import { crops } from '@/data/crops';
import { Camera, Leaf, BookOpen, Phone, Plus } from 'lucide-react';
import heroImage from '@/assets/farmer-hero.jpg';

interface HomeProps {
  selectedCrop: Crop | null;
  onSelectCrop: () => void;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ selectedCrop, onSelectCrop, onNavigate }) => {
  const { t } = useLanguage();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [weather] = useState<WeatherData>({
    temperature: 28,
    humidity: 75,
    condition: 'Partly Cloudy',
    conditionBangla: 'আংশিক মেঘলা',
    rainfall: 0,
    windSpeed: 12,
  });

  useEffect(() => {
    // Simulate some reminders
    const mockReminders: Reminder[] = [
      {
        id: '1',
        type: 'watering',
        title: 'Water your crops',
        titleBangla: 'ফসলে পানি দিন',
        description: 'Morning watering recommended',
        descriptionBangla: 'সকালে পানি দেওয়ার পরামর্শ',
        dueDate: new Date(),
        isCompleted: false,
        cropId: selectedCrop?.id,
      },
      {
        id: '2',
        type: 'fertilizer',
        title: 'Apply fertilizer',
        titleBangla: 'সার প্রয়োগ করুন',
        description: 'Time for organic fertilizer application',
        descriptionBangla: 'জৈব সার প্রয়োগের সময়',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        isCompleted: false,
        cropId: selectedCrop?.id,
      },
    ];
    setReminders(mockReminders);
  }, [selectedCrop]);

  const handleCompleteReminder = (reminderId: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === reminderId
          ? { ...reminder, isCompleted: true }
          : reminder
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {t('app-title', 'Farmer Assistant', 'কৃষক সহায়ক')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('welcome-message', 'Your farming companion', 'আপনার কৃষিকাজের সঙ্গী')}
              </p>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <Card className="farmer-card overflow-hidden">
          <div 
            className="h-48 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">
                  {t('hero-title', 'Smart Farming', 'স্মার্ট কৃষিকাজ')}
                </h2>
                <p className="text-lg opacity-90">
                  {t('hero-subtitle', 'Grow better with technology', 'প্রযুক্তির সাথে ভালো ফসল')}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Selected Crop Section */}
        {selectedCrop ? (
          <Card className="farmer-card">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{selectedCrop.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">
                  {t('selected-crop', 'Selected Crop', 'নির্বাচিত ফসল')}
                </h3>
                <p className="text-lg text-primary font-semibold">
                  {t('crop-name', selectedCrop.name, selectedCrop.nameBangla)}
                </p>
              </div>
              <Button variant="farmer-outline" onClick={onSelectCrop}>
                {t('change-crop', 'Change', 'পরিবর্তন')}
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="farmer-card text-center">
            <div className="space-y-4">
              <div className="text-6xl">🌱</div>
              <div>
                <h3 className="text-xl font-bold">
                  {t('no-crop-selected', 'No Crop Selected', 'কোনো ফসল নির্বাচিত নেই')}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {t('select-crop-message', 'Choose your crop to get started', 'শুরু করতে আপনার ফসল নির্বাচন করুন')}
                </p>
              </div>
              <Button variant="farmer" size="farmer-xl" onClick={onSelectCrop}>
                {t('select-crop', 'Select Crop', 'ফসল নির্বাচন করুন')}
              </Button>
            </div>
          </Card>
        )}

        {/* Weather Card */}
        <WeatherCard
          temperature={weather.temperature}
          humidity={weather.humidity}
          condition={weather.condition}
          rainfall={weather.rainfall}
          windSpeed={weather.windSpeed}
        />

        {/* Reminders Section */}
        {reminders.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t('reminders', 'Reminders', 'অনুস্মারক')}
            </h3>
            {reminders.map(reminder => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onComplete={handleCompleteReminder}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {t('quick-actions', 'Quick Actions', 'দ্রুত কাজ')}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="farmer"
              size="farmer-xl"
              onClick={() => onNavigate('camera')}
              className="flex-col gap-3 h-24"
            >
              <Camera className="w-8 h-8" />
              <span>{t('take-photo', 'Take Photo', 'ছবি তুলুন')}</span>
            </Button>

            <Button
              variant="farmer-secondary"
              size="farmer-xl"
              onClick={() => onNavigate('guidance')}
              className="flex-col gap-3 h-24"
            >
              <Leaf className="w-8 h-8" />
              <span>{t('crop-guidance', 'Crop Guide', 'ফসলের গাইড')}</span>
            </Button>

            <Button
              variant="farmer-outline"
              size="farmer-xl"
              onClick={() => onNavigate('knowledge')}
              className="flex-col gap-3 h-24"
            >
              <BookOpen className="w-8 h-8" />
              <span>{t('knowledge-base', 'Knowledge', 'জ্ঞানভান্ডার')}</span>
            </Button>

            <Button
              variant="farmer-warning"
              size="farmer-xl"
              onClick={() => onNavigate('support')}
              className="flex-col gap-3 h-24"
            >
              <Phone className="w-8 h-8" />
              <span>{t('expert-help', 'Expert Help', 'বিশেষজ্ঞ সাহায্য')}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;