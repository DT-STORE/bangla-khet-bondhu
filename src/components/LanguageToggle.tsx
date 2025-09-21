import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const currentIndex = languages.findIndex(lang => lang.code === currentLanguage.code);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <Button
      variant="farmer-outline"
      size="farmer-large"
      onClick={toggleLanguage}
      className="flex items-center gap-3"
    >
      <Globe className="w-5 h-5" />
      <span className="font-semibold">
        {currentLanguage.nativeName}
      </span>
    </Button>
  );
};

export default LanguageToggle;