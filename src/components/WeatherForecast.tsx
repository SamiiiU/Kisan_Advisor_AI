import React, { useState } from 'react';
import { Cloud, ArrowLeft, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface WeatherForecastProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    title: "Weather Forecast",
    subtitle: "Get weather insights for your farm",
    location: "Farm Location",
    locationPlaceholder: "Enter your city or area",
    getForecast: "Get Weather Forecast",
    gettingForecast: "Getting forecast...",
    back: "Back",
    useCurrentLocation: "Use Current Location",
    popularLocations: "Popular Locations:",
    locations: [
      "Lahore, Punjab",
      "Karachi, Sindh",
      "Faisalabad, Punjab",
      "Multan, Punjab",
      "Hyderabad, Sindh"
    ]
  },
  ur: {
    title: "موسمی پیش گوئی",
    subtitle: "اپنے کھیت کے لیے موسمی معلومات حاصل کریں",
    location: "کھیت کا مقام",
    locationPlaceholder: "اپنا شہر یا علاقہ درج کریں",
    getForecast: "موسمی پیش گوئی حاصل کریں",
    gettingForecast: "پیش گوئی حاصل کی جا رہی ہے...",
    back: "واپس",
    useCurrentLocation: "موجودہ مقام استعمال کریں",
    popularLocations: "مشہور مقامات:",
    locations: [
      "لاہور، پنجاب",
      "کراچی، سندھ",
      "فیصل آباد، پنجاب",
      "ملتان، پنجاب",
      "حیدرآباد، سندھ"
    ]
  }
};

export function WeatherForecast({ language, onNavigate }: WeatherForecastProps) {
  const [location, setLocation] = useState('');
  const [isGettingForecast, setIsGettingForecast] = useState(false);
  const t = translations[language];

  const handleGetForecast = () => {
    if (location.trim()) {
      setIsGettingForecast(true);
      setTimeout(() => {
        setIsGettingForecast(false);
        onNavigate('result', 'weather');
      }, 2000);
    }
  };

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleCurrentLocation = () => {
    setLocation('Current Location');
    // Simulate getting current location
    setTimeout(() => {
      setLocation('Lahore, Punjab (Current Location)');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
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
        <p className="text-purple-100">
          {t.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-6">
          {/* Location Input */}
          <Card className="p-6">
            <div className="space-y-4">
              <Label>{t.location}</Label>
              <div className="space-y-3">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleGetForecast()}
                />
                
                <Button
                  onClick={handleCurrentLocation}
                  variant="outline"
                  className="w-full"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.useCurrentLocation}
                </Button>
              </div>
            </div>
          </Card>

          {/* Popular Locations */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">{t.popularLocations}</h3>
            {t.locations.map((loc, index) => (
              <Card
                key={index}
                className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-purple-50"
                onClick={() => handleLocationSelect(loc)}
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-purple-600" />
                  <span className="text-gray-700">{loc}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Get Forecast Button */}
          <Button
            onClick={handleGetForecast}
            disabled={!location.trim() || isGettingForecast}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
          >
            {isGettingForecast ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t.gettingForecast}
              </div>
            ) : (
              <div className="flex items-center">
                <Cloud className="w-4 h-4 mr-2" />
                {t.getForecast}
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="weather"
        onNavigate={onNavigate}
      />
    </div>
  );
}