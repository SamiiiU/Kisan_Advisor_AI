import React from 'react';
import { Camera, TrendingUp, Droplets, Cloud, Mic, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface HomeScreenProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
  onLanguageToggle: () => void;
}

const translations = {
  en: {
    welcome: "Welcome to Kisan Advisor",
    subtitle: "Choose a service to get started",
    diseaseDetection: "Disease Detection",
    diseaseDesc: "Upload crop photo for diagnosis",
    yieldPrediction: "Yield Prediction",
    yieldDesc: "Predict your crop yield",
    irrigationAdvice: "Irrigation Advice",
    irrigationDesc: "Get water management tips",
    weatherForecast: "Weather Forecast",
    weatherDesc: "Check weather conditions",
    voiceAssistant: "Voice Assistant",
    voiceDesc: "Ask questions in Urdu",
    language: "اردو"
  },
  ur: {
    welcome: "کسان ایڈوائزر میں خوش آمدید",
    subtitle: "شروع کرنے کے لیے ایک سروس منتخب کریں",
    diseaseDetection: "بیماری کی تشخیص",
    diseaseDesc: "تشخیص کے لیے فصل کی تصویر اپ لوڈ کریں",
    yieldPrediction: "پیداوار کی پیش گوئی",
    yieldDesc: "اپنی فصل کی پیداوار کا اندازہ لگائیں",
    irrigationAdvice: "آبپاشی کی رہنمائی",
    irrigationDesc: "پانی کے انتظام کے نکات حاصل کریں",
    weatherForecast: "موسمی پیش گوئی",
    weatherDesc: "موسمی حالات چیک کریں",
    voiceAssistant: "آوازی مددگار",
    voiceDesc: "اردو میں سوالات پوچھیں",
    language: "English"
  }
};

export function HomeScreen({ language, onNavigate, onLanguageToggle }: HomeScreenProps) {
  const t = translations[language];

  const services = [
    {
      id: 'disease' as Screen,
      icon: Camera,
      title: t.diseaseDetection,
      description: t.diseaseDesc,
      color: 'bg-red-100 text-red-600',
      bgGradient: 'from-red-50 to-red-100'
    },
    {
      id: 'yield' as Screen,
      icon: TrendingUp,
      title: t.yieldPrediction,
      description: t.yieldDesc,
      color: 'bg-blue-100 text-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      id: 'irrigation' as Screen,
      icon: Droplets,
      title: t.irrigationAdvice,
      description: t.irrigationDesc,
      color: 'bg-cyan-100 text-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100'
    },
    {
      id: 'weather' as Screen,
      icon: Cloud,
      title: t.weatherForecast,
      description: t.weatherDesc,
      color: 'bg-purple-100 text-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      id: 'voice' as Screen,
      icon: Mic,
      title: t.voiceAssistant,
      description: t.voiceDesc,
      color: 'bg-green-100 text-green-600',
      bgGradient: 'from-green-50 to-green-100'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white relative">
        <Button
          variant="ghost"
          onClick={onLanguageToggle}
          className="absolute top-4 right-4 text-white hover:bg-white/20"
        >
          <Languages className="w-4 h-4 mr-2" />
          {t.language}
        </Button>
        
        <h1 className="text-2xl font-bold mb-2 pr-20">
          {t.welcome}
        </h1>
        <p className="text-green-100">
          {t.subtitle}
        </p>
      </div>

      {/* Services Grid */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-4">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r ${service.bgGradient} border-l-4 border-l-green-500`}
                onClick={() => onNavigate(service.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${service.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="home"
        onNavigate={onNavigate}
      />
    </div>
  );
}