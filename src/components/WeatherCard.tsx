import React from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  condition: string;
  rainfall?: number;
  windSpeed?: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  condition,
  rainfall = 0,
  windSpeed = 0,
}) => {
  const { t } = useLanguage();

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain')) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (lowerCondition.includes('cloud')) return <Cloud className="w-8 h-8 text-gray-500" />;
    return <Sun className="w-8 h-8 text-yellow-500" />;
  };

  const getConditionBangla = (condition: string) => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('rain')) return 'বৃষ্টি';
    if (lowerCondition.includes('cloud')) return 'মেঘলা';
    if (lowerCondition.includes('sun')) return 'রোদ';
    return 'পরিষ্কার';
  };

  return (
    <Card className="farmer-card gradient-sky text-card-foreground">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {t('todays-weather', "Today's Weather", 'আজকের আবহাওয়া')}
            </h3>
            <p className="text-sm opacity-90">
              {t('weather-condition', condition, getConditionBangla(condition))}
            </p>
          </div>
          {getWeatherIcon(condition)}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-red-500" />
            <div>
              <div className="text-2xl font-bold">{temperature}°C</div>
              <div className="text-xs opacity-80">
                {t('temperature', 'Temperature', 'তাপমাত্রা')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{humidity}%</div>
              <div className="text-xs opacity-80">
                {t('humidity', 'Humidity', 'আর্দ্রতা')}
              </div>
            </div>
          </div>

          {rainfall > 0 && (
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-lg font-bold">{rainfall}mm</div>
                <div className="text-xs opacity-80">
                  {t('rainfall', 'Rainfall', 'বৃষ্টিপাত')}
                </div>
              </div>
            </div>
          )}

          {windSpeed > 0 && (
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-lg font-bold">{windSpeed} km/h</div>
                <div className="text-xs opacity-80">
                  {t('wind-speed', 'Wind Speed', 'বাতাসের গতি')}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default WeatherCard;