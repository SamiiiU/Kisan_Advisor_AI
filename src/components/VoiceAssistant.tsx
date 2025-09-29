import React, { useState } from 'react';
import { Mic, MicOff, ArrowLeft, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { BottomNavigation } from './BottomNavigation';
import { Language, Screen, ResultType } from '../App';

interface VoiceAssistantProps {
  language: Language;
  onNavigate: (screen: Screen, resultType?: ResultType) => void;
}

const translations = {
  en: {
    title: "Voice Assistant",
    subtitle: "Ask your farming questions in Urdu or English",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    recording: "Recording...",
    orTypeQuestion: "Or type your question:",
    askQuestion: "Ask Question",
    placeholder: "Type your question here...",
    back: "Back",
    exampleQuestions: "Example questions:",
    examples: [
      "What fertilizer should I use for wheat?",
      "When is the best time to plant cotton?",
      "How to treat leaf spots on tomatoes?"
    ]
  },
  ur: {
    title: "آوازی مددگار",
    subtitle: "اردو یا انگریزی میں اپنے کھیتی کے سوالات پوچھیں",
    startRecording: "ریکارڈنگ شروع کریں",
    stopRecording: "ریکارڈنگ بند کریں",
    recording: "ریکارڈ ہو رہا ہے...",
    orTypeQuestion: "یا اپنا سوال ٹائپ کریں:",
    askQuestion: "سوال پوچھیں",
    placeholder: "یہاں اپنا سوال ٹائپ کریں...",
    back: "واپس",
    exampleQuestions: "مثالی سوالات:",
    examples: [
      "گندم کے لیے کون سا کھاد استعمال کروں؟",
      "کپاس بونے کا بہترین وقت کب ہے؟",
      "ٹماٹر کے پتوں پر دھبوں کا علاج کیسے کریں؟"
    ]
  }
};

export function VoiceAssistant({ language, onNavigate }: VoiceAssistantProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [textQuestion, setTextQuestion] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const t = translations[language];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onNavigate('result', 'voice');
      }, 1500);
    }, 3000);
  };

  const handleTextSubmit = () => {
    if (textQuestion.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        onNavigate('result', 'voice');
      }, 1500);
    }
  };

  const handleExampleClick = (example: string) => {
    setTextQuestion(example);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
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
        <p className="text-green-100">
          {t.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-6">
          {/* Voice Recording */}
          <Card className="p-6 text-center">
            <div className="mb-6">
              <Button
                onClick={handleStartRecording}
                disabled={isRecording || isProcessing}
                className={`w-24 h-24 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-green-500 hover:bg-green-600'
                } text-white shadow-lg`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
            </div>
            
            <p className="text-gray-700 mb-2">
              {isRecording ? t.recording : t.startRecording}
            </p>
            
            {isRecording && (
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce delay-200"></div>
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mr-2"></div>
                <span className="text-gray-600">Processing...</span>
              </div>
            )}
          </Card>

          {/* Text Input */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">{t.orTypeQuestion}</h3>
            <Card className="p-4">
              <div className="flex space-x-2">
                <Input
                  value={textQuestion}
                  onChange={(e) => setTextQuestion(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                />
                <Button
                  onClick={handleTextSubmit}
                  disabled={!textQuestion.trim() || isProcessing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Example Questions */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-800">{t.exampleQuestions}</h3>
            {t.examples.map((example, index) => (
              <Card
                key={index}
                className="p-3 cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-green-50"
                onClick={() => handleExampleClick(example)}
              >
                <p className="text-gray-700 text-sm">{example}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        language={language}
        currentScreen="voice"
        onNavigate={onNavigate}
      />
    </div>
  );
}