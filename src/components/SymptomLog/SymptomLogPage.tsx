import React, { useState } from 'react';
import { VoiceInput } from './VoiceInput';
import { TextInput } from './TextInput';
import { SymptomHistory } from './SymptomHistory';
import { generateSymptomHistory } from '../../utils/mockData';
export const SymptomLogPage = () => {
  const [symptoms, setSymptoms] = useState(generateSymptomHistory());
  const [inputType, setInputType] = useState<'voice' | 'text'>('text');
  const addSymptom = (symptom: {
    date: string;
    type: string;
    severity: number;
  }) => {
    setSymptoms([symptom, ...symptoms]);
  };
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Symptom Logger
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
            <button onClick={() => setInputType('voice')} className={`px-4 py-2 rounded-lg text-sm font-medium ${inputType === 'voice' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              Voice Input
            </button>
            <button onClick={() => setInputType('text')} className={`px-4 py-2 rounded-lg text-sm font-medium ${inputType === 'text' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}>
              Text Input
            </button>
          </div>
        </div>
        {inputType === 'voice' ? <VoiceInput onSymptomLogged={addSymptom} /> : <TextInput onSymptomLogged={addSymptom} />}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Symptom History
        </h3>
        <SymptomHistory symptoms={symptoms} />
      </div>
    </div>;
};