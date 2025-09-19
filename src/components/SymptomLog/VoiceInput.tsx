import React, { useState } from 'react';
import { Mic, Square, AlertCircle } from 'lucide-react';
interface VoiceInputProps {
  onSymptomLogged: (symptom: {
    date: string;
    type: string;
    severity: number;
  }) => void;
}
export const VoiceInput = ({
  onSymptomLogged
}: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [processingVoice, setProcessingVoice] = useState(false);
  const startRecording = () => {
    setIsRecording(true);
    // In a real app, we would start recording here
  };
  const stopRecording = () => {
    setIsRecording(false);
    setProcessingVoice(true);
    // Simulate voice processing
    setTimeout(() => {
      setProcessingVoice(false);
      // Mock data - in a real app, this would come from voice recognition
      const today = new Date().toISOString().split('T')[0];
      onSymptomLogged({
        date: today,
        type: 'Shortness of Breath',
        severity: 3
      });
    }, 2000);
  };
  return <div className="flex flex-col items-center">
      <div className="mb-6 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Press the microphone button and describe your symptoms
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Example: "I'm experiencing shortness of breath, level 3 out of 5"
        </p>
      </div>
      <div className="relative">
        <button onClick={isRecording ? stopRecording : startRecording} className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white hover:bg-blue-600'}`} disabled={processingVoice}>
          {isRecording ? <Square size={32} /> : processingVoice ? <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : <Mic size={32} />}
        </button>
        {isRecording && <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 text-red-500 px-3 py-1 rounded-full text-xs font-medium shadow-md">
            Recording...
          </div>}
      </div>
      {processingVoice && <p className="mt-4 text-blue-600 dark:text-blue-400 animate-pulse">
          Processing your voice input...
        </p>}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg max-w-md">
        <div className="flex items-start">
          <AlertCircle className="text-blue-600 dark:text-blue-400 mt-0.5 mr-2 flex-shrink-0" size={18} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Speak clearly and include the type of symptom and its severity on a
            scale of 1-5, with 5 being the most severe.
          </p>
        </div>
      </div>
    </div>;
};