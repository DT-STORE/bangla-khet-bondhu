// Detailed dragon fruit cultivation knowledge (offline-first)

export interface DragonFruitStage {
  id: string;
  name: string;
  nameBangla: string;
  duration: string;
  durationBangla: string;
  description: string;
  descriptionBangla: string;
  careTips: string[];
  careTipsBangla: string[];
  images: string[]; // URLs to stage images
}

export interface PestDisease {
  id: string;
  name: string;
  nameBangla: string;
  type: 'pest' | 'disease';
  symptoms: string[];
  symptomsBangla: string[];
  treatment: string[];
  treatmentBangla: string[];
  prevention: string[];
  preventionBangla: string[];
  pesticides: string[];
  pesticidesBangla: string[];
}

export interface SoilRequirement {
  type: string;
  typeBangla: string;
  ph: string;
  drainage: string;
  drainageBangla: string;
  nutrients: string[];
  nutrientsBangla: string[];
}

// Dragon fruit lifecycle stages
export const dragonFruitStages: DragonFruitStage[] = [
  {
    id: 'nursery',
    name: 'Nursery & Propagation',
    nameBangla: 'নার্সারি ও বংশবিস্তার',
    duration: '2-3 months',
    durationBangla: '২-৩ মাস',
    description: 'Start with healthy stem cuttings for best results',
    descriptionBangla: 'সর্বোত্তম ফলাফলের জন্য সুস্থ কাণ্ডের কাটিং দিয়ে শুরু করুন',
    careTips: [
      'Use 30-50 cm long stem cuttings',
      'Let cuttings dry for 2-3 days before planting',
      'Plant in well-draining sandy soil mix',
      'Keep in partial shade during rooting',
      'Water moderately - avoid overwatering'
    ],
    careTipsBangla: [
      '৩০-৫০ সেমি লম্বা কাণ্ডের কাটিং ব্যবহার করুন',
      'রোপণের আগে কাটিং ২-৩ দিন শুকাতে দিন',
      'ভালো নিষ্কাশনযুক্ত বালুকাময় মাটির মিশ্রণে রোপণ করুন',
      'শিকড় গজানোর সময় আংশিক ছায়ায় রাখুন',
      'পরিমিত পানি দিন - অতিরিক্ত পানি এড়িয়ে চলুন'
    ],
    images: []
  },
  {
    id: 'vegetative',
    name: 'Vegetative Growth',
    nameBangla: 'উদ্ভিদ বৃদ্ধি',
    duration: '12-18 months',
    durationBangla: '১২-১৮ মাস',
    description: 'Focus on strong stem and root development',
    descriptionBangla: 'শক্তিশালী কাণ্ড ও শিকড় বিকাশে মনোযোগ দিন',
    careTips: [
      'Provide strong support structure (trellis/pole)',
      'Regular watering but ensure good drainage',
      'Apply balanced fertilizer monthly',
      'Prune excess branches to maintain 2-3 main stems',
      'Monitor for pests and diseases'
    ],
    careTipsBangla: [
      'শক্তিশালী সাপোর্ট কাঠামো দিন (ট্রেলিস/খুঁটি)',
      'নিয়মিত পানি দিন কিন্তু ভালো নিষ্কাশন নিশ্চিত করুন',
      'মাসিক সুষম সার প্রয়োগ করুন',
      '২-৩টি প্রধান কাণ্ড রাখতে অতিরিক্ত ডাল ছাঁটাই করুন',
      'পোকামাকড় ও রোগের জন্য নিয়মিত পর্যবেক্ষণ করুন'
    ],
    images: []
  },
  {
    id: 'flowering',
    name: 'Flowering Stage',
    nameBangla: 'ফুল ফোটার পর্যায়',
    duration: '2-3 years after planting',
    durationBangla: 'রোপণের ২-৩ বছর পর',
    description: 'Beautiful white flowers bloom at night',
    descriptionBangla: 'সুন্দর সাদা ফুল রাতে ফোটে',
    careTips: [
      'Flowers bloom at night and close by morning',
      'Hand pollination increases fruit set',
      'Reduce nitrogen, increase phosphorus fertilizer',
      'Ensure adequate calcium for fruit development',
      'Protect flowers from strong winds and rain'
    ],
    careTipsBangla: [
      'ফুল রাতে ফোটে এবং সকালে বন্ধ হয়ে যায়',
      'হাতে পরাগায়ন করলে ফল বেশি হয়',
      'নাইট্রোজেন কমান, ফসফরাস সার বাড়ান',
      'ফল বিকাশের জন্য পর্যাপ্ত ক্যালসিয়াম নিশ্চিত করুন',
      'ফুলকে শক্তিশালী বাতাস ও বৃষ্টি থেকে রক্ষা করুন'
    ],
    images: []
  },
  {
    id: 'fruiting',
    name: 'Fruit Development',
    nameBangla: 'ফল বিকাশ',
    duration: '30-50 days after flowering',
    durationBangla: 'ফুল ফোটার ৩০-৫০ দিন পর',
    description: 'Green fruits develop and gradually change color',
    descriptionBangla: 'সবুজ ফল বিकশিত হয় এবং ধীরে ধীরে রং পরিবর্তন করে',
    careTips: [
      'Support heavy fruits with nets or bags',
      'Regular watering but avoid water on fruits',
      'Apply potassium-rich fertilizer',
      'Remove damaged or deformed fruits',
      'Monitor fruit flies and other pests'
    ],
    careTipsBangla: [
      'ভারী ফলগুলো জাল বা ব্যাগ দিয়ে সাপোর্ট দিন',
      'নিয়মিত পানি দিন কিন্তু ফলে পানি লাগানো এড়িয়ে চলুন',
      'পটাশিয়াম সমৃদ্ধ সার প্রয়োগ করুন',
      'ক্ষতিগ্রস্ত বা বিকৃত ফল সরিয়ে ফেলুন',
      'ফলের মাছি ও অন্যান্য পোকার জন্য নিয়মিত পর্যবেক্ষণ করুন'
    ],
    images: []
  },
  {
    id: 'harvest',
    name: 'Harvest Time',
    nameBangla: 'ফসল তোলার সময়',
    duration: 'When fruits turn red/pink',
    durationBangla: 'ফল লাল/গোলাপী হলে',
    description: 'Harvest when fruits are fully colored but still firm',
    descriptionBangla: 'ফল পুরোপুরি রং হলে কিন্তু শক্ত থাকতেই তুলুন',
    careTips: [
      'Harvest in early morning or evening',
      'Fruits should be firm with bright color',
      'Cut with sharp knife, leave small stem',
      'Handle carefully to avoid bruising',
      'Store in cool, dry place for 1-2 weeks'
    ],
    careTipsBangla: [
      'ভোর বেলা বা সন্ধ্যায় ফসল তুলুন',
      'ফল শক্ত ও উজ্জ্বল রঙের হতে হবে',
      'ধারালো ছুরি দিয়ে কাটুন, ছোট ডাঁটা রেখে দিন',
      'আঘাত এড়াতে সাবধানে হ্যান্ডেল করুন',
      'ঠান্ডা, শুকনো জায়গায় ১-২ সপ্তাহ সংরক্ষণ করুন'
    ],
    images: []
  }
];

// Soil requirements for dragon fruit
export const dragonFruitSoil: SoilRequirement = {
  type: 'Well-drained sandy loam',
  typeBangla: 'ভালো নিষ্কাশনযুক্ত বালুকাময় দোআঁশ',
  ph: '5.5 - 7.0 (slightly acidic to neutral)',
  drainage: 'Excellent drainage required - avoid waterlogged conditions',
  drainageBangla: 'চমৎকার নিষ্কাশন প্রয়োজন - জলাবদ্ধতা এড়িয়ে চলুন',
  nutrients: [
    'Rich in organic matter',
    'Good calcium content',
    'Adequate phosphorus and potassium',
    'Low to moderate nitrogen'
  ],
  nutrientsBangla: [
    'জৈব পদার্থে সমৃদ্ধ',
    'ভালো ক্যালসিয়ামের উপাদান',
    'পর্যাপ্ত ফসফরাস ও পটাশিয়াম',
    'কম থেকে মধ্যম নাইট্রোজেন'
  ]
};

// Common pests and diseases
export const dragonFruitPestsDiseses: PestDisease[] = [
  {
    id: 'anthracnose',
    name: 'Anthracnose',
    nameBangla: 'অ্যানথ্রাকনোজ',
    type: 'disease',
    symptoms: [
      'Dark, sunken spots on fruits',
      'Brown lesions on stems',
      'Premature fruit drop'
    ],
    symptomsBangla: [
      'ফলে কালো, গর্তযুক্ত দাগ',
      'কাণ্ডে বাদামী ক্ষত',
      'অকাল ফল ঝরা'
    ],
    treatment: [
      'Remove affected parts immediately',
      'Apply copper oxychloride spray',
      'Improve air circulation',
      'Avoid overhead watering'
    ],
    treatmentBangla: [
      'আক্রান্ত অংশ তৎক্ষণাৎ সরিয়ে ফেলুন',
      'কপার অক্সিক্লোরাইড স্প্রে করুন',
      'বায়ু চলাচল উন্নত করুন',
      'উপর থেকে পানি দেওয়া এড়িয়ে চলুন'
    ],
    prevention: [
      'Plant in well-ventilated areas',
      'Avoid water on leaves and fruits',
      'Regular pruning for air circulation',
      'Use disease-free planting material'
    ],
    preventionBangla: [
      'ভালো বায়ু চলাচলযুক্ত এলাকায় রোপণ করুন',
      'পাতা ও ফলে পানি লাগানো এড়িয়ে চলুন',
      'বায়ু চলাচলের জন্য নিয়মিত ছাঁটাই করুন',
      'রোগমুক্ত রোপণ উপাদান ব্যবহার করুন'
    ],
    pesticides: ['Copper oxychloride', 'Carbendazim', 'Mancozeb'],
    pesticidesBangla: ['কপার অক্সিক্লোরাইড', 'কার্বেন্ডাজিম', 'ম্যানকোজেব']
  },
  {
    id: 'stem-canker',
    name: 'Stem Canker',
    nameBangla: 'কাণ্ড ক্যানকার',
    type: 'disease',
    symptoms: [
      'Sunken, dark lesions on stems',
      'Yellowing and wilting of branches',
      'Cracking and splitting of bark'
    ],
    symptomsBangla: [
      'কাণ্ডে গর্তযুক্ত, কালো ক্ষত',
      'ডালের হলদে হয়ে যাওয়া ও ঢলে পড়া',
      'বাকল ফাটা ও চিড় ধরা'
    ],
    treatment: [
      'Cut and remove infected stems',
      'Apply fungicide paste on wounds',
      'Reduce watering frequency',
      'Improve drainage around plants'
    ],
    treatmentBangla: [
      'আক্রান্ত কাণ্ড কেটে সরিয়ে ফেলুন',
      'ক্ষতস্থানে ছত্রাকনাশক পেস্ট লাগান',
      'পানি দেওয়ার পরিমাণ কমান',
      'গাছের চারপাশে নিষ্কাশন উন্নত করুন'
    ],
    prevention: [
      'Avoid mechanical injuries',
      'Ensure proper drainage',
      'Apply balanced fertilizer',
      'Regular inspection of stems'
    ],
    preventionBangla: [
      'যান্ত্রিক আঘাত এড়িয়ে চলুন',
      'সঠিক নিষ্কাশন নিশ্চিত করুন',
      'সুষম সার প্রয়োগ করুন',
      'কাণ্ডের নিয়মিত পরীক্ষা করুন'
    ],
    pesticides: ['Copper fungicide', 'Bordeaux mixture'],
    pesticidesBangla: ['কপার ছত্রাকনাশক', 'বোর্দো মিশ্রণ']
  },
  {
    id: 'fruit-fly',
    name: 'Fruit Fly',
    nameBangla: 'ফলের মাছি',
    type: 'pest',
    symptoms: [
      'Small holes in ripe fruits',
      'Larvae inside fruits',
      'Premature fruit drop',
      'Rotting of infected fruits'
    ],
    symptomsBangla: [
      'পাকা ফলে ছোট ছিদ্র',
      'ফলের ভিতরে লার্ভা',
      'অকাল ফল ঝরা',
      'আক্রান্ত ফল পচে যাওয়া'
    ],
    treatment: [
      'Remove and destroy infected fruits',
      'Use pheromone traps',
      'Apply organic neem oil spray',
      'Harvest fruits slightly early'
    ],
    treatmentBangla: [
      'আক্রান্ত ফল সরিয়ে ধ্বংস করুন',
      'ফেরোমন ফাঁদ ব্যবহার করুন',
      'জৈব নিম তেল স্প্রে করুন',
      'ফল একটু তাড়াতাড়ি তুলুন'
    ],
    prevention: [
      'Cover developing fruits with bags',
      'Maintain garden cleanliness',
      'Remove fallen fruits immediately',
      'Use yellow sticky traps'
    ],
    preventionBangla: [
      'বিকশিত ফল ব্যাগ দিয়ে ঢেকে দিন',
      'বাগানের পরিচ্ছন্নতা বজায় রাখুন',
      'ঝরে পড়া ফল তৎক্ষণাৎ সরিয়ে ফেলুন',
      'হলুদ আঠালো ফাঁদ ব্যবহার করুন'
    ],
    pesticides: ['Neem oil', 'Spinosad', 'Malathion (if organic methods fail)'],
    pesticidesBangla: ['নিম তেল', 'স্পিনোস্যাড', 'ম্যালাথিয়ন (জৈব পদ্ধতি ব্যর্থ হলে)']
  }
];

// Fertilizer schedule
export const fertilizerSchedule = [
  {
    stage: 'Planting',
    stageBangla: 'রোপণ',
    fertilizers: [
      'Well-decomposed cow dung (5-10 kg per plant)',
      'Bone meal (200g per plant)'
    ],
    fertilizersBangla: [
      'ভালোভাবে পচা গোবর (প্রতি গাছে ৫-১০ কেজি)',
      'হাড়ের গুঁড়া (প্রতি গাছে ২০০ গ্রাম)'
    ]
  },
  {
    stage: 'Growth Phase',
    stageBangla: 'বৃদ্ধির পর্যায়',
    fertilizers: [
      'NPK 10:10:10 (100g per month)',
      'Organic compost (2kg every 3 months)'
    ],
    fertilizersBangla: [
      'এনপিকে ১০:১০:১০ (মাসে ১০০ গ্রাম)',
      'জৈব কম্পোস্ট (প্রতি ৩ মাসে ২ কেজি)'
    ]
  },
  {
    stage: 'Flowering',
    stageBangla: 'ফুল ফোটার সময়',
    fertilizers: [
      'High phosphorus fertilizer',
      'Calcium supplement',
      'Reduce nitrogen'
    ],
    fertilizersBangla: [
      'উচ্চ ফসফরাস সার',
      'ক্যালসিয়াম সাপ্লিমেন্ট',
      'নাইট্রোজেন কমান'
    ]
  }
];