import React, { useState } from 'react';
import { Send } from 'lucide-react';
interface TextInputProps {
  onSymptomLogged: (symptom: {
    date: string;
    type: string;
    severity: number;
  }) => void;
}
export const TextInput = ({
  onSymptomLogged
}: TextInputProps) => {
  const [symptomType, setSymptomType] = useState('');
  const [severity, setSeverity] = useState<number>(3);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptomType.trim() === '') return;
    const today = new Date().toISOString().split('T')[0];
    onSymptomLogged({
      date: today,
      type: symptomType,
      severity
    });
    // Reset form
    setSymptomType('');
    setSeverity(3);
  };
  const symptomOptions = ['Shortness of Breath', 'Coughing', 'Wheezing', 'Chest Tightness', 'Fatigue', 'Mucus Production', 'Other'];
  return <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-6">
        <label htmlFor="symptom-type" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Symptom Type
        </label>
        <select id="symptom-type" value={symptomType} onChange={e => setSymptomType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" required>
          <option value="" disabled>
            Select a symptom
          </option>
          {symptomOptions.map(option => <option key={option} value={option}>
              {option}
            </option>)}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Severity (1-5)
        </label>
        <div className="flex items-center">
          <input type="range" min="1" max="5" value={severity} onChange={e => setSeverity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
          <span className="ml-4 text-2xl font-bold text-blue-600 dark:text-blue-400 min-w-[1.5rem] text-center">
            {severity}
          </span>
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
          <span>Mild</span>
          <span>Severe</span>
        </div>
      </div>
      <button type="submit" className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center" disabled={symptomType === ''}>
        Log Symptom
        <Send size={16} className="ml-2" />
      </button>
    </form>;
};