import React, { useState } from 'react';
import { AlertTriangle, X, PhoneCall } from 'lucide-react';
interface AlertBannerProps {
  title: string;
  content: string;
  severity: 'low' | 'medium' | 'high';
}
export const AlertBanner = ({
  title,
  content,
  severity
}: AlertBannerProps) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const getSeverityStyles = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-800 dark:text-orange-400';
      case 'low':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-400';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-400';
    }
  };
  return <div className={`border-l-4 rounded-lg p-4 ${getSeverityStyles()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <AlertTriangle className="mt-0.5 mr-3 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="mt-1 text-sm opacity-90">{content}</p>
            <div className="mt-3">
              <button className="inline-flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 font-medium text-sm border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <PhoneCall size={16} className="mr-2" />
                Contact Healthcare Provider
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => setDismissed(true)} className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Dismiss alert">
          <X size={18} />
        </button>
      </div>
    </div>;
};