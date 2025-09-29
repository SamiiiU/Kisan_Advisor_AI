import React from 'react';
import { ArrowLeft, Volume2, AlertTriangle, TrendingUp, Droplets, Cloud, MessageCircle, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface ResultScreenProps {
  language: Language;
  resultType: ResultType;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    back: "Back",
    playAudio: "Play Audio",
    retake: "Retake Photo",
    newPrediction: "New Prediction",
    newAdvice: "New Advice",
    newForecast: "New Forecast",
    askAgain: "Ask Again",
    saveToReports: "Save to Reports",
    disease: {
      title: "Disease Detection Result",
      detected: "Detected Disease",
      treatment: "Recommended Treatment",
      prevention: "Prevention Tips",
      severity: "Severity Level",
      confidence: "Confidence",
      result: {
        disease: "Leaf Blight",
        treatment: "Apply copper-based fungicide spray every 7-10 days",
        prevention: "Keep fields dry and ensure proper air circulation",
        severity: "Medium",
        confidence: "95%"
      }
    },
    yield: {
      title: "Yield Prediction Result",
      crop: "Crop",
      expectedYield: "Expected Yield",
      perAcre: "per acre",
      recommendation: "Recommendation",
      factors: "Key Factors",
      result: {
        crop: "Wheat (گندم)",
        yield: "35 mann",
        recommendation: "Use timely fertilizer application for optimal yield",
        factors: ["Good soil moisture", "Favorable weather", "Proper fertilization"]
      }
    },
    irrigation: {
      title: "Irrigation Advice",
      waterRequired: "Water Required",
      nextIrrigation: "Next Irrigation",
      method: "Recommended Method",
      timing: "Best Timing",
      result: {
        water: "10 mm per acre",
        next: "In 5 days",
        method: "Drip irrigation recommended",
        timing: "Early morning (6-8 AM)"
      }
    },
    weather: {
      title: "Weather Forecast",
      temperature: "Temperature",
      humidity: "Humidity",
      rainPrediction: "Rain Prediction",
      farmingAdvice: "Farming Advice",
      result: {
        temp: "32°C",
        humidity: "65%",
        rain: "Rain expected in 3 days",
        advice: "Delay harvest operations until after rain"
      }
    },
    voice: {
      title: "Voice Assistant Response",
      question: "Your Question",
      answer: "AI Response",
      relatedTopics: "Related Topics",
      result: {
        question: "Best fertilizer for wheat crop?",
        answer: "For wheat crop, use balanced NPK fertilizer (20:20:20) at sowing time, followed by urea application at tillering stage.",
        topics: ["Wheat farming", "Fertilizer application", "Crop nutrition"]
      }
    }
  },
  ur: {
    back: "واپس",
    playAudio: "آڈیو چلائیں",
    retake: "دوبارہ تصویر لیں",
    newPrediction: "نئی پیش گوئی",
    newAdvice: "نئی رہنمائی",
    newForecast: "نئی پیش گوئی",
    askAgain: "دوبارہ پوچھیں",
    saveToReports: "رپورٹس میں محفوظ کریں",
    disease: {
      title: "بیماری کی تشخیص کا نتیجہ",
      detected: "تشخیص شدہ بیماری",
      treatment: "تجویز کردہ علاج",
      prevention: "احتیاطی تدابیر",
      severity: "شدت کی سطح",
      confidence: "اعتماد",
      result: {
        disease: "پتوں کا جھلساؤ",
        treatment: "ہر 7-10 دن بعد کاپر بیسڈ فنگی سائیڈ اسپرے کریں",
        prevention: "کھیتوں کو خشک رکھیں اور مناسب ہوا کی فراہمی یقینی بنائیں",
        severity: "درمیانہ",
        confidence: "95%"
      }
    },
    yield: {
      title: "پیداوار کی پیش گوئی کا نتیجہ",
      crop: "فصل",
      expectedYield: "متوقع پیداوار",
      perAcre: "فی ایکڑ",
      recommendation: "تجویز",
      factors: "اہم عوامل",
      result: {
        crop: "گندم (Wheat)",
        yield: "35 من",
        recommendation: "بہترین پیداوار کے لیے وقت پر کھاد کا استعمال کریں",
        factors: ["مٹی میں اچھی نمی", "موافق موسم", "مناسب کھاد"]
      }
    },
    irrigation: {
      title: "آبپاشی کی رہنمائی",
      waterRequired: "پانی کی ضرورت",
      nextIrrigation: "اگلی آبپاشی",
      method: "تجویز کردہ طریقہ",
      timing: "بہترین وقت",
      result: {
        water: "10 ملی میٹر فی ایکڑ",
        next: "5 دن بعد",
        method: "ڈرپ آبپاشی تجویز کی جاتی ہے",
        timing: "صبح سویرے (6-8 بجے)"
      }
    },
    weather: {
      title: "موسمی پیش گوئی",
      temperature: "درجہ حرارت",
      humidity: "نمی",
      rainPrediction: "بارش کی پیش گوئی",
      farmingAdvice: "کھیتی کی رہنمائی",
      result: {
        temp: "32°C",
        humidity: "65%",
        rain: "3 دن میں بارش کی توقع",
        advice: "بارش کے بعد تک فصل کاٹنے میں تاخیر کریں"
      }
    },
    voice: {
      title: "آوازی مددگار کا جواب",
      question: "آپ کا سوال",
      answer: "AI کا جواب",
      relatedTopics: "متعلقہ موضوعات",
      result: {
        question: "گندم کی فصل کے لیے بہترین کھاد کون سی ہے؟",
        answer: "گندم کی فصل کے لیے بوائی کے وقت متوازن NPK کھاد (20:20:20) استعمال کریں، اس کے بعد کلّوں کے مرحلے میں یوریا کا اطلاق کریں۔",
        topics: ["گندم کی کھیتی", "کھاد کا اطلاق", "فصل کی خوراک"]
      }
    }
  }
};

export function ResultScreen({ language, resultType, onNavigate }: ResultScreenProps) {
  const t = translations[language];
  const resultData = t[resultType];

  const getIcon = () => {
    switch (resultType) {
      case 'disease': return Camera;
      case 'yield': return TrendingUp;
      case 'irrigation': return Droplets;
      case 'weather': return Cloud;
      case 'voice': return MessageCircle;
      default: return AlertTriangle;
    }
  };

  const getColor = () => {
    switch (resultType) {
      case 'disease': return 'red';
      case 'yield': return 'blue';
      case 'irrigation': return 'cyan';
      case 'weather': return 'purple';
      case 'voice': return 'green';
      default: return 'gray';
    }
  };

  const IconComponent = getIcon();
  const color = getColor();

  const handlePlayAudio = () => {
    // Simulate audio playback
    alert(language === 'en' ? 'Playing audio response...' : 'آڈیو چل رہا ہے...');
  };

  const handleSaveToReports = () => {
    // Simulate saving to reports
    alert(language === 'en' ? 'Saved to reports!' : 'رپورٹس میں محفوظ ہو گیا!');
  };

  const getActionButtonText = () => {
    switch (resultType) {
      case 'disease': return t.retake;
      case 'yield': return t.newPrediction;
      case 'irrigation': return t.newAdvice;
      case 'weather': return t.newForecast;
      case 'voice': return t.askAgain;
      default: return t.back;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-b from-${color}-50 to-white`}>
      {/* Header */}
      <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 p-6 text-white`}>
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/20 p-2 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <IconComponent className="w-6 h-6 mr-3" />
          <h1 className="text-2xl font-bold">
            {resultData.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-6">
          {/* Result Card */}
          <Card className="p-6">
            {resultType === 'disease' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-red-800">{resultData.detected}</h3>
                  <Badge variant="destructive">{resultData.result.severity}</Badge>
                </div>
                <p className="text-lg font-medium text-gray-800">{resultData.result.disease}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.treatment}</h4>
                    <p className="text-gray-600">{resultData.result.treatment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.prevention}</h4>
                    <p className="text-gray-600">{resultData.result.prevention}</p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{resultData.confidence}</span>
                    <span className="font-medium text-green-600">{resultData.result.confidence}</span>
                  </div>
                </div>
              </div>
            )}

            {resultType === 'yield' && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">{resultData.crop}</h3>
                  <p className="text-lg font-medium text-gray-800">{resultData.result.crop}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">{resultData.expectedYield}</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {resultData.result.yield} <span className="text-lg">{resultData.perAcre}</span>
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.recommendation}</h4>
                  <p className="text-gray-600">{resultData.result.recommendation}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{resultData.factors}</h4>
                  <ul className="space-y-1">
                    {resultData.result.factors.map((factor: string, index: number) => (
                      <li key={index} className="text-gray-600 text-sm">• {factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {resultType === 'irrigation' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.waterRequired}</h4>
                    <p className="font-semibold text-cyan-600">{resultData.result.water}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.nextIrrigation}</h4>
                    <p className="font-semibold text-cyan-600">{resultData.result.next}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.method}</h4>
                  <p className="text-gray-600">{resultData.result.method}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.timing}</h4>
                  <p className="text-gray-600">{resultData.result.timing}</p>
                </div>
              </div>
            )}

            {resultType === 'weather' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.temperature}</h4>
                    <p className="text-2xl font-bold text-purple-600">{resultData.result.temp}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">{resultData.humidity}</h4>
                    <p className="text-2xl font-bold text-purple-600">{resultData.result.humidity}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.rainPrediction}</h4>
                  <p className="text-gray-600">{resultData.result.rain}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.farmingAdvice}</h4>
                  <p className="text-gray-600">{resultData.result.advice}</p>
                </div>
              </div>
            )}

            {resultType === 'voice' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.question}</h4>
                  <p className="text-gray-600">{resultData.result.question}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">{resultData.answer}</h4>
                  <p className="text-gray-800">{resultData.result.answer}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">{resultData.relatedTopics}</h4>
                  <div className="flex flex-wrap gap-2">
                    {resultData.result.topics.map((topic: string, index: number) => (
                      <Badge key={index} variant="secondary">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handlePlayAudio}
                variant="outline"
                className="w-full"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                {t.playAudio}
              </Button>
              
              <Button
                onClick={handleSaveToReports}
                variant="outline"
                className="w-full"
              >
                {t.saveToReports}
              </Button>
            </div>
            
            <Button
              onClick={() => onNavigate(resultType)}
              className={`w-full bg-${color}-600 hover:bg-${color}-700 text-white py-3`}
            >
              {getActionButtonText()}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="result"
        onNavigate={onNavigate}
      />
    </div>
  );
}