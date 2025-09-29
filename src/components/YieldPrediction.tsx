import React, { useState } from 'react';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface YieldPredictionProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    title: "Yield Prediction",
    subtitle: "Get crop yield predictions",
    cropType: "Crop Type",
    selectCrop: "Select your crop",
    fieldSize: "Field Size (Acres)",
    plantingDate: "Planting Date",
    currentStage: "Current Growth Stage",
    selectStage: "Select growth stage",
    predict: "Predict Yield",
    predicting: "Calculating prediction...",
    back: "Back",
    crops: {
      wheat: "Wheat (گندم)",
      rice: "Rice (چاول)",
      cotton: "Cotton (کپاس)",
      corn: "Corn (مکئی)",
      sugarcane: "Sugarcane (گنا)"
    },
    stages: {
      seedling: "Seedling Stage",
      vegetative: "Vegetative Stage",
      flowering: "Flowering Stage",
      maturity: "Maturity Stage"
    }
  },
  ur: {
    title: "پیداوار کی پیش گوئی",
    subtitle: "فصل کی پیداوار کا اندازہ حاصل کریں",
    cropType: "فصل کی قسم",
    selectCrop: "اپنی فصل منتخب کریں",
    fieldSize: "کھیت کا رقبہ (ایکڑ)",
    plantingDate: "بوائی کی تاریخ",
    currentStage: "موجودہ نمو کا مرحلہ",
    selectStage: "نمو کا مرحلہ منتخب کریں",
    predict: "پیداوار کی پیش گوئی کریں",
    predicting: "پیش گوئی کا حساب لگایا جا رہا ہے...",
    back: "واپس",
    crops: {
      wheat: "گندم (Wheat)",
      rice: "چاول (Rice)",
      cotton: "کپاس (Cotton)",
      corn: "مکئی (Corn)",
      sugarcane: "گنا (Sugarcane)"
    },
    stages: {
      seedling: "پودے کا ابتدائی مرحلہ",
      vegetative: "پتوں کا مرحلہ",
      flowering: "پھول آنے کا مرحلہ",
      پختگی: "پختگی کا مرحلہ"
    }
  }
};

export function YieldPrediction({ language, onNavigate }: YieldPredictionProps) {
  const [cropType, setCropType] = useState('');
  const [fieldSize, setFieldSize] = useState('');
  const [plantingDate, setPlantingDate] = useState('');
  const [currentStage, setCurrentStage] = useState('');
  const [isPredicting, setIsPredicting] = useState(false);
  const t = translations[language];

  const handlePredict = () => {
    if (cropType && fieldSize && plantingDate && currentStage) {
      setIsPredicting(true);
      setTimeout(() => {
        setIsPredicting(false);
        onNavigate('result', 'yield');
      }, 2000);
    }
  };

  const isFormValid = cropType && fieldSize && plantingDate && currentStage;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
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
        <p className="text-blue-100">
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
                  <SelectItem value="sugarcane">{t.crops.sugarcane}</SelectItem>
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

            {/* Planting Date */}
            <div className="space-y-2">
              <Label>{t.plantingDate}</Label>
              <Input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
              />
            </div>

            {/* Current Stage */}
            <div className="space-y-2">
              <Label>{t.currentStage}</Label>
              <Select value={currentStage} onValueChange={setCurrentStage}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectStage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seedling">{t.stages.seedling}</SelectItem>
                  <SelectItem value="vegetative">{t.stages.vegetative}</SelectItem>
                  <SelectItem value="flowering">{t.stages.flowering}</SelectItem>
                  <SelectItem value="maturity">{t.stages.maturity}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Predict Button */}
            <Button
              onClick={handlePredict}
              disabled={!isFormValid || isPredicting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isPredicting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t.predicting}
                </div>
              ) : (
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t.predict}
                </div>
              )}
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="yield"
        onNavigate={onNavigate}
      />
    </div>
  );
}