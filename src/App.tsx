import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { DiseaseDetection } from './components/DiseaseDetection';
import { VoiceAssistant } from './components/VoiceAssistant';
import { ResultScreen } from './components/ResultScreen';
import { ReportsScreen } from './components/ReportsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { YieldPrediction } from './components/YieldPrediction';
import { IrrigationAdvice } from './components/IrrigationAdvice';
import { WeatherForecast } from './components/WeatherForecast';

export type Language = 'en' | 'ur';
export type Screen = 'splash' | 'home' | 'disease' | 'voice' | 'yield' | 'irrigation' | 'weather' | 'result' | 'reports' | 'notifications' | 'profile';
export type ResultType = 'disease' | 'yield' | 'irrigation' | 'weather' | 'voice';

export interface AppState {
  currentScreen: Screen;
  language: Language;
  resultType?: ResultType;
  showSplash: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    language: 'en',
    showSplash: true
  });

  const navigateToScreen = (screen: Screen, resultType?: ResultType) => {
    setAppState(prev => ({
      ...prev,
      currentScreen: screen,
      resultType,
      showSplash: false
    }));
  };

  const toggleLanguage = () => {
    setAppState(prev => ({
      ...prev,
      language: prev.language === 'en' ? 'ur' : 'en'
    }));
  };

  const renderScreen = () => {
    switch (appState.currentScreen) {
      case 'splash':
        return (
          <SplashScreen 
            language={appState.language}
            onLanguageToggle={toggleLanguage}
            onContinue={() => navigateToScreen('home')}
          />
        );
      case 'home':
        return (
          <HomeScreen 
            language={appState.language}
            onNavigate={navigateToScreen}
            onLanguageToggle={toggleLanguage}
          />
        );
      case 'disease':
        return (
          <DiseaseDetection 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'voice':
        return (
          <VoiceAssistant 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'yield':
        return (
          <YieldPrediction 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'irrigation':
        return (
          <IrrigationAdvice 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'weather':
        return (
          <WeatherForecast 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'result':
        return (
          <ResultScreen 
            language={appState.language}
            resultType={appState.resultType!}
            onNavigate={navigateToScreen}
          />
        );
      case 'reports':
        return (
          <ReportsScreen 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'notifications':
        return (
          <NotificationsScreen 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      case 'profile':
        return (
          <ProfileScreen 
            language={appState.language}
            onNavigate={navigateToScreen}
          />
        );
      default:
        return (
          <HomeScreen 
            language={appState.language}
            onNavigate={navigateToScreen}
            onLanguageToggle={toggleLanguage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto min-h-screen bg-white shadow-lg">
        {renderScreen()}
      </div>
    </div>
  );
}