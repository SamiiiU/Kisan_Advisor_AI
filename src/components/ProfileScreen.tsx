import React from 'react';
import { User, MapPin, Phone, Mail, Sprout, Settings, Languages, LogOut, Edit } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen } from '../App';

interface ProfileScreenProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  en: {
    title: "My Profile",
    subtitle: "Farmer information and settings",
    editProfile: "Edit Profile",
    settings: "Settings",
    language: "Language",
    logout: "Logout",
    personalInfo: "Personal Information",
    farmInfo: "Farm Information",
    statistics: "My Statistics",
    profile: {
      name: "Muhammad Ahmad",
      phone: "+92 300 1234567",
      email: "ahmad.farmer@gmail.com",
      location: "Lahore, Punjab",
      farmSize: "25 Acres",
      mainCrops: ["Wheat", "Cotton", "Rice"],
      experience: "15 Years",
      joinDate: "January 2024"
    },
    stats: {
      totalAdvice: "Total AI Advice",
      diseaseDetected: "Diseases Detected",
      yieldPredicted: "Yield Predictions",
      waterSaved: "Water Saved (Liters)"
    },
    values: {
      totalAdvice: "47",
      diseaseDetected: "8",
      yieldPredicted: "12",
      waterSaved: "15,000"
    }
  },
  ur: {
    title: "میری پروفائل",
    subtitle: "کسان کی معلومات اور ترتیبات",
    editProfile: "پروفائل میں تبدیلی",
    settings: "ترتیبات",
    language: "زبان",
    logout: "لاگ آؤٹ",
    personalInfo: "ذاتی معلومات",
    farmInfo: "کھیت کی معلومات",
    statistics: "میرے اعداد و شمار",
    profile: {
      name: "محمد احمد",
      phone: "+92 300 1234567",
      email: "ahmad.farmer@gmail.com",
      location: "لاہور، پنجاب",
      farmSize: "25 ایکڑ",
      mainCrops: ["گندم", "کپاس", "چاول"],
      experience: "15 سال",
      joinDate: "جنوری 2024"
    },
    stats: {
      totalAdvice: "کل AI رہنمائی",
      diseaseDetected: "بیماریاں تشخیص شدہ",
      yieldPredicted: "پیداوار کی پیش گوئیاں",
      waterSaved: "پانی کی بچت (لیٹر)"
    },
    values: {
      totalAdvice: "47",
      diseaseDetected: "8",
      yieldPredicted: "12",
      waterSaved: "15,000"
    }
  }
};

export function ProfileScreen({ language, onNavigate }: ProfileScreenProps) {
  const t = translations[language];

  const handleEdit = () => {
    alert(language === 'en' ? 'Edit profile functionality coming soon!' : 'پروفائل میں تبدیلی کی سہولت جلد آرہی ہے!');
  };

  const handleSettings = () => {
    alert(language === 'en' ? 'Settings functionality coming soon!' : 'ترتیبات کی سہولت جلد آرہی ہے!');
  };

  const handleLanguageChange = () => {
    alert(language === 'en' ? 'Language settings available in app header!' : 'زبان کی ترتیبات ایپ کے ہیڈر میں دستیاب ہیں!');
  };

  const handleLogout = () => {
    alert(language === 'en' ? 'Logout functionality coming soon!' : 'لاگ آؤٹ کی سہولت جلد آرہی ہے!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {t.title}
        </h1>
        <p className="text-green-100">
          {t.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="" />
                <AvatarFallback className="bg-green-100 text-green-600 text-xl">
                  {t.profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {t.profile.name}
                </h2>
                <p className="text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {t.profile.location}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {t.profile.joinDate}
                </p>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleEdit}>
                <Edit className="w-4 h-4 mr-1" />
                {t.editProfile}
              </Button>
            </div>
          </Card>

          {/* Personal Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{t.personalInfo}</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-700">{t.profile.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                <span className="text-gray-700">{t.profile.email}</span>
              </div>
            </div>
          </Card>

          {/* Farm Information */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{t.farmInfo}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Farm Size:</span>
                <span className="font-medium text-gray-800">{t.profile.farmSize}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium text-gray-800">{t.profile.experience}</span>
              </div>
              
              <div>
                <span className="text-gray-600 block mb-2">Main Crops:</span>
                <div className="flex flex-wrap gap-2">
                  {t.profile.mainCrops.map((crop, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      <Sprout className="w-3 h-3 mr-1" />
                      {crop}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Statistics */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">{t.statistics}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{t.values.totalAdvice}</div>
                <div className="text-sm text-gray-600">{t.stats.totalAdvice}</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{t.values.diseaseDetected}</div>
                <div className="text-sm text-gray-600">{t.stats.diseaseDetected}</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{t.values.yieldPredicted}</div>
                <div className="text-sm text-gray-600">{t.stats.yieldPredicted}</div>
              </div>
              
              <div className="text-center p-3 bg-cyan-50 rounded-lg">
                <div className="text-2xl font-bold text-cyan-600">{t.values.waterSaved}</div>
                <div className="text-sm text-gray-600">{t.stats.waterSaved}</div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleSettings}
            >
              <Settings className="w-4 h-4 mr-3" />
              {t.settings}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleLanguageChange}
            >
              <Languages className="w-4 h-4 mr-3" />
              {t.language}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-3" />
              {t.logout}
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="profile"
        onNavigate={onNavigate}
      />
    </div>
  );
}