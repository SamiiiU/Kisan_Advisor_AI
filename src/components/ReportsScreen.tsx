import React from 'react';
import { FileText, Calendar, TrendingUp, Droplets, AlertTriangle, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen } from '../App';

interface ReportsScreenProps {
  language: Language;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  en: {
    title: "My Reports",
    subtitle: "View your farming analysis history",
    noReports: "No reports yet",
    noReportsDesc: "Start using Kisan Advisor AI to build your farming reports",
    viewDetails: "View Details",
    reports: [
      {
        id: 1,
        type: "Disease Detection",
        title: "Leaf Blight Detection",
        date: "2024-01-15",
        status: "Treated",
        crop: "Wheat",
        severity: "Medium"
      },
      {
        id: 2,
        type: "Yield Prediction",
        title: "Wheat Yield Forecast",
        date: "2024-01-12",
        status: "Predicted",
        crop: "Wheat",
        yield: "35 mann/acre"
      },
      {
        id: 3,
        type: "Irrigation Advice",
        title: "Water Management",
        date: "2024-01-10",
        status: "Applied",
        crop: "Cotton",
        water: "10mm"
      },
      {
        id: 4,
        type: "Weather Alert",
        title: "Rain Warning",
        date: "2024-01-08",
        status: "Alert",
        location: "Lahore",
        temp: "32°C"
      }
    ]
  },
  ur: {
    title: "میری رپورٹس",
    subtitle: "اپنی کھیتی کے تجزیے کی تاریخ دیکھیں",
    noReports: "ابھی کوئی رپورٹ نہیں",
    noReportsDesc: "اپنی کھیتی کی رپورٹس بنانے کے لیے کسان ایڈوائزر AI استعمال کرنا شروع کریں",
    viewDetails: "تفصیلات دیکھیں",
    reports: [
      {
        id: 1,
        type: "بیماری کی تشخیص",
        title: "پتوں کے جھلساؤ کی تشخیص",
        date: "2024-01-15",
        status: "علاج شدہ",
        crop: "گندم",
        severity: "درمیانہ"
      },
      {
        id: 2,
        type: "پیداوار کی پیش گوئی",
        title: "گندم کی پیداوار کی پیش گوئی",
        date: "2024-01-12",
        status: "پیش گوئی شدہ",
        crop: "گندم",
        yield: "35 من فی ایکڑ"
      },
      {
        id: 3,
        type: "آبپاشی کی رہنمائی",
        title: "پانی کا انتظام",
        date: "2024-01-10",
        status: "لاگو شدہ",
        crop: "کپاس",
        water: "10 ملی میٹر"
      },
      {
        id: 4,
        type: "موسمی انتباہ",
        title: "بارش کی وارننگ",
        date: "2024-01-08",
        status: "انتباہ",
        location: "لاہور",
        temp: "32°C"
      }
    ]
  }
};

export function ReportsScreen({ language, onNavigate }: ReportsScreenProps) {
  const t = translations[language];

  const getReportIcon = (type: string) => {
    if (type.includes('Disease') || type.includes('بیماری')) return AlertTriangle;
    if (type.includes('Yield') || type.includes('پیداوار')) return TrendingUp;
    if (type.includes('Irrigation') || type.includes('آبپاشی')) return Droplets;
    return FileText;
  };

  const getStatusColor = (status: string) => {
    if (status.includes('Treated') || status.includes('علاج')) return 'bg-green-100 text-green-800';
    if (status.includes('Predicted') || status.includes('پیش گوئی')) return 'bg-blue-100 text-blue-800';
    if (status.includes('Applied') || status.includes('لاگو')) return 'bg-cyan-100 text-cyan-800';
    if (status.includes('Alert') || status.includes('انتباہ')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
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
        {t.reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">{t.noReports}</h3>
            <p className="text-gray-500 text-center max-w-xs">{t.noReportsDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {t.reports.map((report) => {
              const IconComponent = getReportIcon(report.type);
              return (
                <Card key={report.id} className="p-4 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-green-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 truncate">
                            {report.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {report.type}
                          </p>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4 mr-1" />
                        {report.date}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {report.crop && <span>Crop: {report.crop}</span>}
                          {report.yield && <span>Yield: {report.yield}</span>}
                          {report.water && <span>Water: {report.water}</span>}
                          {report.location && <span>Location: {report.location}</span>}
                          {report.severity && <span>Severity: {report.severity}</span>}
                          {report.temp && <span>Temp: {report.temp}</span>}
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          {t.viewDetails}
                        </Button>
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
        currentScreen="reports"
        onNavigate={onNavigate}
      />
    </div>
  );
}