import React, { useState } from 'react';
import { AlertBanner } from './AlertBanner';
import { AlertHistory } from './AlertHistory';
import { generateAlerts } from '../../utils/mockData';
export const AlertsPage = () => {
  const [alerts] = useState(generateAlerts());
  const [showCriticalAlert] = useState(true);
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Health Alerts
      </h2>
      {showCriticalAlert && <AlertBanner title="Low Oxygen Saturation" content="Your SpO2 level has been below 90% for more than 10 minutes. Consider using your prescribed oxygen therapy and contact your healthcare provider if symptoms worsen." severity="high" />}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Alert History
        </h3>
        <AlertHistory alerts={alerts} />
      </div>
    </div>;
};