import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Reminder } from '@/types';
import { Bell, Droplet, Zap, Bug, ShoppingCart, CloudRain, CheckCircle } from 'lucide-react';

interface ReminderCardProps {
  reminder: Reminder;
  onComplete: (id: string) => void;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ reminder, onComplete }) => {
  const { t } = useLanguage();

  const getIcon = (type: string) => {
    switch (type) {
      case 'watering': return <Droplet className="w-6 h-6 text-blue-500" />;
      case 'fertilizer': return <Zap className="w-6 h-6 text-green-500" />;
      case 'pesticide': return <Bug className="w-6 h-6 text-red-500" />;
      case 'harvest': return <ShoppingCart className="w-6 h-6 text-orange-500" />;
      case 'weather': return <CloudRain className="w-6 h-6 text-gray-500" />;
      default: return <Bell className="w-6 h-6 text-primary" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('bn-BD', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  if (reminder.isCompleted) {
    return (
      <Card className="farmer-card opacity-60">
        <div className="flex items-center gap-4">
          <CheckCircle className="w-6 h-6 text-success" />
          <div className="flex-1">
            <h4 className="font-semibold text-success">
              {t('reminder-title', reminder.title, reminder.titleBangla)}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('completed', 'Completed', 'সম্পন্ন')}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="farmer-card border-l-4 border-l-primary">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          {getIcon(reminder.type)}
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">
              {t('reminder-title', reminder.title, reminder.titleBangla)}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              {t('reminder-description', reminder.description, reminder.descriptionBangla)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t('due-date', 'Due:', 'নির্ধারিত:')} {formatDate(reminder.dueDate)}
            </p>
          </div>
        </div>
        
        <Button
          variant="farmer-success"
          size="farmer-large"
          onClick={() => onComplete(reminder.id)}
          className="w-full"
        >
          {t('mark-complete', 'Mark Complete', 'সম্পন্ন করুন')}
        </Button>
      </div>
    </Card>
  );
};

export default ReminderCard;