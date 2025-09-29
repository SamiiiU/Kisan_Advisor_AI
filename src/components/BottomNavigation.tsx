import React from 'react';
import { Home, FileText, Bell, User } from 'lucide-react';
import { Language, Screen } from '../App';

interface BottomNavigationProps {
  language: Language;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  en: {
    home: "Home",
    reports: "Reports",
    notifications: "Alerts",
    profile: "Profile"
  },
  ur: {
    home: "ہوم",
    reports: "رپورٹس",
    notifications: "اطلاعات",
    profile: "پروفائل"
  }
};

export function BottomNavigation({ language, currentScreen, onNavigate }: BottomNavigationProps) {
  const t = translations[language];

  const navItems = [
    { id: 'home' as Screen, icon: Home, label: t.home },
    { id: 'reports' as Screen, icon: FileText, label: t.reports },
    { id: 'notifications' as Screen, icon: Bell, label: t.notifications },
    { id: 'profile' as Screen, icon: User, label: t.profile }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 flex-1 ${
                isActive 
                  ? 'text-green-600' 
                  : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <IconComponent className={`w-5 h-5 mb-1 ${isActive ? 'text-green-600' : ''}`} />
              <span className="text-xs truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}