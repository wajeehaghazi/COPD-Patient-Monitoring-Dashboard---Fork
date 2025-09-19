import React from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
interface SymptomHistoryProps {
  symptoms: {
    date: string;
    type: string;
    severity: number;
  }[];
}
export const SymptomHistory = ({
  symptoms
}: SymptomHistoryProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 2:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 3:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 4:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 5:
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  return <div>
      {symptoms.length === 0 ? <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No symptoms logged yet
          </p>
        </div> : <div className="space-y-4">
          {symptoms.map((symptom, index) => <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    {symptom.type}
                  </h4>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    {formatDate(symptom.date)}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(symptom.severity)}`}>
                  {symptom.severity === 4 || symptom.severity === 5 ? <div className="flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      Severity {symptom.severity}
                    </div> : `Severity ${symptom.severity}`}
                </div>
              </div>
            </div>)}
        </div>}
    </div>;
};