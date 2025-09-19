import React from 'react';
import { AlertTriangle, Bell, Clock } from 'lucide-react';
interface AlertHistoryProps {
  alerts: {
    id: number;
    title: string;
    content: string;
    timestamp: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}
export const AlertHistory = ({
  alerts
}: AlertHistoryProps) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle size={16} className="mr-1" />;
      case 'medium':
        return <Bell size={16} className="mr-1" />;
      default:
        return <Bell size={16} className="mr-1" />;
    }
  };
  return <div className="space-y-4">
      {alerts.length === 0 ? <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No alerts</p>
        </div> : alerts.map(alert => <div key={alert.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                  {alert.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {alert.content}
                </p>
                <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={12} className="mr-1" />
                  {formatTimestamp(alert.timestamp)}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getSeverityStyles(alert.severity)}`}>
                {getSeverityIcon(alert.severity)}
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </div>
            </div>
          </div>)}
    </div>;
};