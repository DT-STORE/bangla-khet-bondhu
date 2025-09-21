import { Crop } from '@/types';

export const crops: Crop[] = [
  {
    id: 'rice',
    name: 'Rice',
    nameBangla: 'ধান',
    icon: '🌾',
    description: 'The staple food crop of Bangladesh',
    descriptionBangla: 'বাংলাদেশের প্রধান খাদ্য শস্য',
    growthStages: ['Seedling', 'Tillering', 'Flowering', 'Grain filling', 'Maturity'],
    commonDiseases: ['Blast', 'Brown spot', 'Sheath blight'],
    careTips: [
      'Maintain proper water level',
      'Apply fertilizer at right time',
      'Monitor for pests regularly'
    ]
  },
  {
    id: 'dragon-fruit',
    name: 'Dragon Fruit',
    nameBangla: 'ড্রাগন ফল',
    icon: '🐉',
    description: 'High-value tropical fruit with growing demand',
    descriptionBangla: 'উচ্চ মূল্যের গ্রীষ্মকালীন ফল যার চাহিদা বাড়ছে',
    growthStages: ['Planting', 'Vegetative growth', 'Flowering', 'Fruit development', 'Harvest'],
    commonDiseases: ['Root rot', 'Stem canker', 'Anthracnose'],
    careTips: [
      'Provide proper support structure',
      'Ensure good drainage',
      'Regular pruning needed'
    ]
  },
  {
    id: 'jute',
    name: 'Jute',
    nameBangla: 'পাট',
    icon: '🌱',
    description: 'Traditional fiber crop of Bangladesh',
    descriptionBangla: 'বাংলাদেশের ঐতিহ্যবাহী আঁশ জাতীয় ফসল',
    growthStages: ['Germination', 'Vegetative growth', 'Flowering', 'Fiber formation', 'Harvest'],
    commonDiseases: ['Stem rot', 'Root rot', 'Leaf spot'],
    careTips: [
      'Sow at right time',
      'Maintain proper plant spacing',
      'Harvest at right maturity'
    ]
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    nameBangla: 'সবজি',
    icon: '🥬',
    description: 'Various vegetables including tomato, eggplant, cabbage',
    descriptionBangla: 'টমেটো, বেগুন, বাঁধাকপি সহ বিভিন্ন সবজি',
    growthStages: ['Seedling', 'Vegetative growth', 'Flowering', 'Fruit development', 'Harvest'],
    commonDiseases: ['Blight', 'Wilt', 'Aphid infestation'],
    careTips: [
      'Regular watering needed',
      'Apply organic fertilizer',
      'Monitor for pest attacks'
    ]
  }
];

export const getCropById = (id: string): Crop | undefined => {
  return crops.find(crop => crop.id === id);
};