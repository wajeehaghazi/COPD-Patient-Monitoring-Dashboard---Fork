import React from 'react';
import { AlertTriangle } from 'lucide-react';
interface RiskGaugeProps {
  riskScore: number;
}
export const RiskGauge = ({
  riskScore
}: RiskGaugeProps) => {
  const getRiskLevel = (score: number) => {
    if (score < 30) return {
      level: 'Low',
      color: 'bg-green-500'
    };
    if (score < 70) return {
      level: 'Moderate',
      color: 'bg-yellow-500'
    };
    return {
      level: 'High',
      color: 'bg-red-500'
    };
  };
  const {
    level,
    color
  } = getRiskLevel(riskScore);
  return <div className="bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-teal-900/20 rounded-2xl shadow-md p-6 border-t-4 border-teal-500 dark:border-teal-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Exacerbation Risk
        </h3>
        <div className="text-xs px-2 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
          24h Forecast
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="12" className="dark:stroke-gray-700" />
            {/* Progress circle */}
            <circle cx="60" cy="60" r="54" fill="none" stroke={color.replace('bg-', 'text-')} strokeWidth="12" strokeDasharray="339.3" strokeDashoffset={339.3 * (100 - riskScore) / 100} strokeLinecap="round" transform="rotate(-90 60 60)" />
            {/* Inner circle with text */}
            <circle cx="60" cy="60" r="40" className="fill-white dark:fill-gray-800" />
            <text x="60" y="55" textAnchor="middle" className="font-bold text-3xl fill-gray-800 dark:fill-white">
              {riskScore}%
            </text>
            <text x="60" y="75" textAnchor="middle" className="text-xs fill-gray-500 dark:fill-gray-400">
              Risk Score
            </text>
          </svg>
        </div>
        <div className={`mt-4 px-4 py-2 rounded-full ${color} text-white font-medium flex items-center`}>
          <AlertTriangle size={16} className="mr-1" />
          {level} Risk
        </div>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Based on vitals, symptoms, and environmental factors
        </p>
      </div>
    </div>;
};