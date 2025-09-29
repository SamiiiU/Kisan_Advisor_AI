import React, { useState } from 'react';
import { Camera, Upload, ArrowLeft, Image } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface DiseaseDetectionProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    title: "Disease Detection",
    subtitle: "Upload or take a photo of your crop",
    camera: "Take Photo",
    upload: "Upload Photo",
    analyze: "Analyze Photo",
    selectMethod: "Choose how to add your photo:",
    analyzing: "Analyzing...",
    back: "Back"
  },
  ur: {
    title: "بیماری کی تشخیص",
    subtitle: "اپنی فصل کی تصویر اپ لوڈ یا لیں",
    camera: "تصویر لیں",
    upload: "تصویر اپ لوڈ کریں",
    analyze: "تصویر کا تجزیہ کریں",
    selectMethod: "اپنی تصویر شامل کرنے کا طریقہ منتخب کریں:",
    analyzing: "تجزیہ ہو رہا ہے...",
    back: "واپس"
  }
};

export function DiseaseDetection({ language, onNavigate }: DiseaseDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const t = translations[language];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // Simulate camera capture with a placeholder image
    setSelectedImage('/api/placeholder/300/200');
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      onNavigate('result', 'disease');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-white">
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
        <p className="text-red-100">
          {t.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {!selectedImage ? (
          <div className="space-y-6">
            <p className="text-gray-700 text-center mb-6">
              {t.selectMethod}
            </p>
            
            {/* Camera Option */}
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
              <button 
                onClick={handleCameraCapture}
                className="w-full text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t.camera}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Use your phone camera
                    </p>
                  </div>
                </div>
              </button>
            </Card>

            {/* Upload Option */}
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-l-green-500">
              <label className="w-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {t.upload}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Choose from gallery
                    </p>
                  </div>
                </div>
              </label>
            </Card>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Selected Image */}
            <Card className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                {selectedImage === '/api/placeholder/300/200' ? (
                  <div className="w-full h-full flex items-center justify-center bg-green-100">
                    <div className="text-center">
                      <Image className="w-16 h-16 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700">Sample Crop Image</p>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={selectedImage} 
                    alt="Selected crop" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t.analyzing}
                    </div>
                  ) : (
                    t.analyze
                  )}
                </Button>
                
                <Button
                  onClick={() => setSelectedImage(null)}
                  variant="outline"
                  className="w-full"
                >
                  Choose Different Photo
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="disease"
        onNavigate={onNavigate}
      />
    </div>
  );
}