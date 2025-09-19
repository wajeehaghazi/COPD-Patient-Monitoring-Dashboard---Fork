import React from 'react';
import { Heart, Thermometer, Droplets } from 'lucide-react';
interface VitalsCardProps {
  vitals: {
    spo2: number;
    heartRate: number;
    respiratoryRate: number;
    temperature: string;
  };
}
export const VitalsCard = ({
  vitals
}: VitalsCardProps) => {
  const getSpo2Color = (value: number) => {
    if (value >= 95) return 'text-green-500';
    if (value >= 90) return 'text-yellow-500';
    return 'text-red-500';
  };
  return <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl shadow-md overflow-hidden col-span-1 md:col-span-2 lg:col-span-1 border-t-4 border-blue-500 dark:border-blue-400">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Real-time Vitals
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                <Droplets className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">SpO2</p>
                <p className={`text-xl font-bold ${getSpo2Color(vitals.spo2)}`}>
                  {vitals.spo2}%
                </p>
              </div>
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              Real-time
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mr-3">
              <Heart className="text-pink-600 dark:text-pink-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Heart Rate
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {vitals.heartRate}{' '}
                <span className="text-sm font-normal">bpm</span>
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
              <div className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Respiratory Rate
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {vitals.respiratoryRate}{' '}
                <span className="text-sm font-normal">breaths/min</span>
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
              <Thermometer className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Temperature
              </p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {vitals.temperature}°F
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};