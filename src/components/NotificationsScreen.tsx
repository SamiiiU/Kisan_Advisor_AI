import React from 'react';
import { Bell, AlertTriangle, Cloud, Droplets, TrendingUp, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen } from '../App';

interface NotificationsScreenProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  en: {
    title: "Notifications & Alerts",
    subtitle: "Important farming updates",
    markAllRead: "Mark All Read",
    noNotifications: "No notifications",
    noNotificationsDesc: "You're all caught up! New alerts will appear here",
    timeAgo: {
      now: "Now",
      minutes: "min ago",
      hours: "h ago",
      days: "d ago"
    },
    notifications: [
      {
        id: 1,
        type: "weather",
        title: "Rain Alert",
        message: "Heavy rain expected tomorrow. Delay harvesting operations.",
        time: "2 h ago",
        priority: "high",
        read: false
      },
      {
        id: 2,
        type: "irrigation",
        title: "Irrigation Reminder",
        message: "Cotton field requires watering in next 24 hours.",
        time: "6 h ago",
        priority: "medium",
        read: false
      },
      {
        id: 3,
        type: "disease",
        title: "Disease Alert",
        message: "Leaf blight symptoms detected in nearby farms. Monitor your crops.",
        time: "1 d ago",
        priority: "high",
        read: true
      },
      {
        id: 4,
        type: "market",
        title: "Market Price Update",
        message: "Wheat prices increased by 15% this week. Good time to sell.",
        time: "2 d ago",
        priority: "low",
        read: true
      },
      {
        id: 5,
        type: "fertilizer",
        title: "Fertilizer Reminder",
        message: "Apply nitrogen fertilizer to wheat crop for better yield.",
        time: "3 d ago",
        priority: "medium",
        read: true
      }
    ]
  },
  ur: {
    title: "اطلاعات اور انتباہات",
    subtitle: "اہم کھیتی کی اپڈیٹس",
    markAllRead: "سب پڑھا ہوا نشان زد کریں",
    noNotifications: "کوئی اطلاع نہیں",
    noNotificationsDesc: "آپ کا کام مکمل ہے! نئی اطلاعات یہاں نظر آئیں گی",
    timeAgo: {
      now: "ابھی",
      minutes: "منٹ پہلے",
      hours: "گھنٹے پہلے",
      days: "دن پہلے"
    },
    notifications: [
      {
        id: 1,
        type: "weather",
        title: "بارش کا انتباہ",
        message: "کل بھاری بارش کی توقع ہے۔ فصل کاٹنے میں تاخیر کریں۔",
        time: "2 گھنٹے پہلے",
        priority: "high",
        read: false
      },
      {
        id: 2,
        type: "irrigation",
        title: "آبپاشی کی یاد دہانی",
        message: "کپاس کے کھیت کو اگلے 24 گھنٹوں میں پانی کی ضرورت ہے۔",
        time: "6 گھنٹے پہلے",
        priority: "medium",
        read: false
      },
      {
        id: 3,
        type: "disease",
        title: "بیماری کا انتباہ",
        message: "آس پاس کے کھیتوں میں پتوں کے جھلساؤ کی علامات دیکھی گئیں۔ اپنی فصلوں کی نگرانی کریں۔",
        time: "1 دن پہلے",
        priority: "high",
        read: true
      },
      {
        id: 4,
        type: "market",
        title: "بازاری قیمت کی اپڈیٹ",
        message: "اس ہفتے گندم کی قیمتوں میں 15% اضافہ ہوا ہے۔ فروخت کا اچھا وقت ہے۔",
        time: "2 دن پہلے",
        priority: "low",
        read: true
      },
      {
        id: 5,
        type: "fertilizer",
        title: "کھاد کی یاد دہانی",
        message: "بہتر پیداوار کے لیے گندم کی فصل میں نائٹروجن کھاد ڈالیں۔",
        time: "3 دن پہلے",
        priority: "medium",
        read: true
      }
    ]
  }
};

export function NotificationsScreen({ language, onNavigate }: NotificationsScreenProps) {
  const t = translations[language];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'weather': return Cloud;
      case 'irrigation': return Droplets;
      case 'disease': return AlertTriangle;
      case 'market': return TrendingUp;
      case 'fertilizer': return Bell;
      default: return Bell;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weather': return 'bg-purple-100 text-purple-600';
      case 'irrigation': return 'bg-cyan-100 text-cyan-600';
      case 'disease': return 'bg-red-100 text-red-600';
      case 'market': return 'bg-green-100 text-green-600';
      case 'fertilizer': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const unreadCount = t.notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">
            {t.title}
          </h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-500 text-white">
              {unreadCount}
            </Badge>
          )}
        </div>
        <p className="text-orange-100 mb-4">
          {t.subtitle}
        </p>
        
        {unreadCount > 0 && (
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            size="sm"
          >
            {t.markAllRead}
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        {t.notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <Bell className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">{t.noNotifications}</h3>
            <p className="text-gray-500 text-center max-w-xs">{t.noNotificationsDesc}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {t.notifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`p-4 hover:shadow-lg transition-all duration-200 ${
                    !notification.read ? 'border-l-4 border-l-orange-500 bg-orange-50/50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-semibold truncate ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          )}
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className={`text-sm mb-3 ${
                        !notification.read ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="notifications"
        onNavigate={onNavigate}
      />
    </div>
  );
}