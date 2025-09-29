import React, { useEffect } from 'react';
import { Sprout, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Language } from '../App';

interface SplashScreenProps {
  language: Language;
  onLanguageToggle: () => void;
  onContinue: () => void;
}

const translations = {
  en: {
    title: "Kisan Advisor AI",
    tagline: "Your Digital Farming Companion",
    continue: "Continue",
    language: "اردو"
  },
  ur: {
    title: "کسان ایڈوائزر اے آئی",
    tagline: "آپ کا ڈیجیٹل کھیتی ساتھی",
    continue: "جاری رکھیں",
    language: "English"
  }
};

export function SplashScreen({ language, onLanguageToggle, onContinue }: SplashScreenProps) {
  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-green-600 p-6 relative">
      {/* Language Toggle */}
      <Button
        variant="ghost"
        onClick={onLanguageToggle}
        className="absolute top-4 right-4 text-white hover:bg-white/20"
      >
        <Languages className="w-4 h-4 mr-2" />
        {t.language}
      </Button>

      {/* Logo */}
      <div className="bg-white rounded-full p-8 mb-8 shadow-lg">
        <Sprout className="w-16 h-16 text-green-600" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-4">
        {t.title}
      </h1>

      {/* Tagline */}
      <p className="text-xl text-green-100 text-center mb-8 max-w-xs">
        {t.tagline}
      </p>

      {/* Loading dots */}
      <div className="flex space-x-2 mb-8">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-200"></div>
      </div>

      {/* Continue Button */}
      <Button
        onClick={onContinue}
        className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-full shadow-lg"
      >
        {t.continue}
      </Button>
    </div>
  );
}