import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { storageService, CropObservation } from '@/services/storage';
import { ArrowLeft, Calendar, Camera, Leaf, AlertCircle, CheckCircle, AlertTriangle, Bug } from 'lucide-react';
import { format } from 'date-fns';

interface ObservationHistoryProps {
  cropId: string;
  onBack: () => void;
}

const ObservationHistory: React.FC<ObservationHistoryProps> = ({ cropId, onBack }) => {
  const { t, currentLanguage } = useLanguage();
  const [observations, setObservations] = useState<CropObservation[]>([]);
  const [selectedObservation, setSelectedObservation] = useState<string | null>(null);

  useEffect(() => {
    const loadObservations = () => {
      const allObservations = cropId === 'all' 
        ? storageService.getObservations()
        : storageService.getObservationsByCrop(cropId);
      
      // Sort by date (newest first)
      const sorted = allObservations.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setObservations(sorted);
    };

    loadObservations();
  }, [cropId]);

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'disease': return 'bg-orange-500';
      case 'pest': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'disease': return <AlertCircle className="w-4 h-4" />;
      case 'pest': return <Bug className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStageLabel = (stage: string) => {
    const stages = {
      nursery: { en: 'Nursery', bn: 'নার্সারি' },
      vegetative: { en: 'Vegetative', bn: 'উদ্ভিদ বৃদ্ধি' },
      flowering: { en: 'Flowering', bn: 'ফুল ফোটা' },
      fruiting: { en: 'Fruiting', bn: 'ফল ধরা' },
      harvest: { en: 'Harvest', bn: 'ফসল তোলা' }
    };
    return stages[stage as keyof typeof stages]?.[currentLanguage.code] || stage;
  };

  const getHealthLabel = (status: string) => {
    const statuses = {
      healthy: { en: 'Healthy', bn: 'সুস্থ' },
      warning: { en: 'Needs Attention', bn: 'সতর্কতা প্রয়োজন' },
      disease: { en: 'Disease Symptoms', bn: 'রোগের লক্ষণ' },
      pest: { en: 'Pest Problem', bn: 'পোকামাকড়ের সমস্যা' }
    };
    return statuses[status as keyof typeof statuses]?.[currentLanguage.code] || status;
  };

  if (observations.length === 0) {
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
                    {t('observation-history', 'Observation History', 'পর্যবেক্ষণের ইতিহাস')}
                  </h1>
                </div>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <Card className="farmer-card text-center">
            <CardContent className="pt-6">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">
                {t('no-observations', 'No Observations Yet', 'এখনো কোনো পর্যবেক্ষণ নেই')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('start-observing', 'Start recording your crop observations to track progress', 'অগ্রগতি ট্র্যাক করতে আপনার ফসলের পর্যবেক্ষণ রেকর্ড করা শুরু করুন')}
              </p>
              <Button variant="farmer" size="farmer-large" onClick={onBack}>
                {t('start-observing', 'Start Observing', 'পর্যবেক্ষণ শুরু করুন')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                  {t('observation-history', 'Observation History', 'পর্যবেক্ষণের ইতিহাস')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('total-observations', `${observations.length} observations`, `${observations.length}টি পর্যবেক্ষণ`)}
                </p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-4">
        {observations.map((observation) => (
          <Card 
            key={observation.id} 
            className="farmer-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setSelectedObservation(
              selectedObservation === observation.id ? null : observation.id
            )}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(observation.date), 'dd MMM yyyy, HH:mm')}
                  </span>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    {getStageLabel(observation.growthStage)}
                  </Badge>
                  <Badge variant="outline" className={`flex items-center gap-1 ${getHealthStatusColor(observation.healthStatus)} text-white border-transparent`}>
                    {getHealthStatusIcon(observation.healthStatus)}
                    {getHealthLabel(observation.healthStatus)}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            {selectedObservation === observation.id && (
              <CardContent className="space-y-4">
                {/* Photos */}
                {observation.photos.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Camera className="w-4 h-4" />
                      {t('photos', 'Photos', 'ছবিসমূহ')} ({observation.photos.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {observation.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Observation ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {(observation.notes || observation.notesBangla) && (
                  <div>
                    <h4 className="font-semibold mb-2">
                      {t('notes', 'Notes', 'নোট')}
                    </h4>
                    {currentLanguage.code === 'bn' ? (
                      <div className="space-y-2">
                        {observation.notesBangla && (
                          <p className="text-sm bg-muted/50 p-3 rounded-lg" 
                             style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            {observation.notesBangla}
                          </p>
                        )}
                        {observation.notes && (
                          <p className="text-sm bg-muted/30 p-3 rounded-lg text-muted-foreground">
                            <em>{t('english-note', 'English note:', 'ইংরেজি নোট:')}</em><br />
                            {observation.notes}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {observation.notes && (
                          <p className="text-sm bg-muted/50 p-3 rounded-lg">
                            {observation.notes}
                          </p>
                        )}
                        {observation.notesBangla && (
                          <p className="text-sm bg-muted/30 p-3 rounded-lg text-muted-foreground" 
                             style={{ fontFamily: 'SolaimanLipi, Arial, sans-serif' }}>
                            <em>{t('bangla-note', 'Bangla note:', 'বাংলা নোট:')}</em><br />
                            {observation.notesBangla}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Sync Status */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full ${observation.synced ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  {observation.synced 
                    ? t('synced', 'Synced', 'সিঙ্ক হয়েছে')
                    : t('pending-sync', 'Pending sync', 'সিঙ্কের অপেক্ষায়')
                  }
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {/* Summary Stats */}
        <Card className="farmer-card bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 text-primary">
              {t('observation-summary', 'Observation Summary', 'পর্যবেক্ষণের সারসংক্ষেপ')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {observations.filter(obs => obs.healthStatus === 'healthy').length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('healthy', 'Healthy', 'সুস্থ')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {observations.filter(obs => obs.healthStatus === 'warning').length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('warning', 'Warning', 'সতর্কতা')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {observations.filter(obs => obs.healthStatus === 'disease').length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('disease', 'Disease', 'রোগ')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {observations.filter(obs => obs.healthStatus === 'pest').length}
                </div>
                <div className="text-xs text-muted-foreground">
                  {t('pest', 'Pest', 'পোকা')}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ObservationHistory;