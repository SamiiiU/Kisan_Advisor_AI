import React, { useState } from 'react';
import { Droplets, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface IrrigationAdviceProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    title: "Irrigation Advice",
    subtitle: "Get smart water management tips",
    cropType: "Crop Type",
    selectCrop: "Select your crop",
    fieldSize: "Field Size (Acres)",
    soilType: "Soil Type",
    selectSoil: "Select soil type",
    lastIrrigation: "Last Irrigation Date",
    weatherCondition: "Current Weather",
    selectWeather: "Select weather condition",
    getAdvice: "Get Irrigation Advice",
    calculating: "Calculating advice...",
    back: "Back",
    crops: {
      wheat: "Wheat (گندم)",
      rice: "Rice (چاول)",
      cotton: "Cotton (کپاس)",
      corn: "Corn (مکئی)",
      vegetables: "Vegetables (سبزیاں)"
    },
    soilTypes: {
      clay: "Clay (مٹی)",
      sandy: "Sandy (ریتیلی)",
      loam: "Loam (دوماٹ)",
      silt: "Silt (باریک مٹی)"
    },
    weather: {
      sunny: "Sunny (دھوپ)",
      cloudy: "Cloudy (ابر آلود)",
      rainy: "Rainy (بارش)",
      humid: "Humid (نمی)"
    }
  },
  ur: {
    title: "آبپاشی کی رہنمائی",
    subtitle: "پانی کے ذکی انتظام کے نکات حاصل کریں",
    cropType: "فصل کی قسم",
    selectCrop: "اپنی فصل منتخب کریں",
    fieldSize: "کھیت کا رقبہ (ایکڑ)",
    soilType: "مٹی کی قسم",
    selectSoil: "مٹی کی قسم منتخب کریں",
    lastIrrigation: "آخری آبپاشی کی تاریخ",
    weatherCondition: "موجودہ موسم",
    selectWeather: "موسمی حالات منتخب کریں",
    getAdvice: "آبپاشی کی رہنمائی حاصل کریں",
    calculating: "رہنمائی کا حساب لگایا جا رہا ہے...",
    back: "واپس",
    crops: {
      wheat: "گندم (Wheat)",
      rice: "چاول (Rice)",
      cotton: "کپاس (Cotton)",
      corn: "مکئی (Corn)",
      vegetables: "سبزیاں (Vegetables)"
    },
    soilTypes: {
      clay: "مٹی (Clay)",
      sandy: "ریتیلی (Sandy)",
      loam: "دوماٹ (Loam)",
      silt: "باریک مٹی (Silt)"
    },
    weather: {
      sunny: "دھوپ (Sunny)",
      cloudy: "ابر آلود (Cloudy)",
      rainy: "بارش (Rainy)",
      humid: "نمی (Humid)"
    }
  }
};

export function IrrigationAdvice({ language, onNavigate }: IrrigationAdviceProps) {
  const [cropType, setCropType] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [soilType, setSoilType] = useState('');
  const [lastIrrigation, setLastIrrigation] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const t = translations[language];

  const handleGetAdvice = () => {
    if (cropType && fieldSize && soilType && lastIrrigation && weatherCondition) {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        onNavigate('result', 'irrigation');
      }, 2000);
    }
  };

  const isFormValid = cropType && fieldSize && soilType && lastIrrigation && weatherCondition;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-white">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/20 p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {t.title}
          </h1>
        </div>
        <p className="text-cyan-100">
          {t.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <Card className="p-6">
          <div className="space-y-6">
            {/* Crop Type */}
            <div className="space-y-2">
              <Label>{t.cropType}</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCrop} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">{t.crops.wheat}</SelectItem>
                  <SelectItem value="rice">{t.crops.rice}</SelectItem>
                  <SelectItem value="cotton">{t.crops.cotton}</SelectItem>
                  <SelectItem value="corn">{t.crops.corn}</SelectItem>
                  <SelectItem value="vegetables">{t.crops.vegetables}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Field Size */}
            <div className="space-y-2">
              <Label>{t.fieldSize}</Label>
              <Input
                type="number"
                value={fieldSize}
                onChange={(e) => setFieldSize(e.target.value)}
                placeholder="e.g., 5"
                min="0.1"
                step="0.1"
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label>{t.soilType}</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectSoil} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clay">{t.soilTypes.clay}</SelectItem>
                  <SelectItem value="sandy">{t.soilTypes.sandy}</SelectItem>
                  <SelectItem value="loam">{t.soilTypes.loam}</SelectItem>
                  <SelectItem value="silt">{t.soilTypes.silt}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Last Irrigation */}
            <div className="space-y-2">
              <Label>{t.lastIrrigation}</Label>
              <Input
                type="date"
                value={lastIrrigation}
                onChange={(e) => setLastIrrigation(e.target.value)}
              />
            </div>

            {/* Weather Condition */}
            <div className="space-y-2">
              <Label>{t.weatherCondition}</Label>
              <Select value={weatherCondition} onValueChange={setWeatherCondition}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectWeather} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunny">{t.weather.sunny}</SelectItem>
                  <SelectItem value="cloudy">{t.weather.cloudy}</SelectItem>
                  <SelectItem value="rainy">{t.weather.rainy}</SelectItem>
                  <SelectItem value="humid">{t.weather.humid}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Get Advice Button */}
            <Button
              onClick={handleGetAdvice}
              disabled={!isFormValid || isCalculating}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3"
            >
              {isCalculating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t.calculating}
                </div>
              ) : (
                <div className="flex items-center">
                  <Droplets className="w-4 h-4 mr-2" />
                  {t.getAdvice}
                </div>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="irrigation"
        onNavigate={onNavigate}
      />
    </div>
  );
}