export interface Crop {
  id: string;
  name: string;
  nameBangla: string;
  icon: string;
  description: string;
  descriptionBangla: string;
  growthStages: string[];
  commonDiseases: string[];
  careTips: string[];
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  conditionBangla: string;
  rainfall: number;
  windSpeed: number;
}

export interface Reminder {
  id: string;
  type: 'watering' | 'fertilizer' | 'pesticide' | 'harvest' | 'weather';
  title: string;
  titleBangla: string;
  description: string;
  descriptionBangla: string;
  dueDate: Date;
  isCompleted: boolean;
  cropId?: string;
}

export interface Language {
  code: 'en' | 'bn';
  name: string;
  nativeName: string;
}

export interface CropObservation {
  id: string;
  cropId: string;
  date: Date;
  photos: string[];
  notes: string;
  notesBangla: string;
  healthStatus: 'healthy' | 'warning' | 'disease' | 'pest';
  recommendedActions: string[];
}