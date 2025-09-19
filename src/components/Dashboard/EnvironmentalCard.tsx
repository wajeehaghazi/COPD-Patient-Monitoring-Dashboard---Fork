import React from 'react';
import { Wind, Droplets, CloudSun } from 'lucide-react';
interface EnvironmentalCardProps {
  airQuality: {
    value: number;
    status: string;
    color: string;
  };
  weather: {
    condition: string;
    temperature: number;
    humidity: number;
  };
}
export const EnvironmentalCard = ({
  airQuality,
  weather
}: EnvironmentalCardProps) => {
  return <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20 rounded-2xl shadow-md p-6 col-span-1 md:col-span-2 lg:col-span-2 border-t-4 border-purple-500 dark:border-purple-400">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Environmental Conditions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Air Quality
            </h4>
            <span className={`text-sm ${airQuality.color}`}>
              {airQuality.status}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4">
              <Wind className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {airQuality.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                AQI (Air Quality Index)
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {airQuality.value < 50 ? 'Good air quality. Ideal for outdoor activities.' : airQuality.value < 100 ? 'Moderate air quality. Consider limiting extended outdoor activity.' : 'Poor air quality. Avoid prolonged outdoor exposure.'}
          </p>
        </div>
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-4 shadow-sm">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Weather Conditions
          </h4>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-4">
              <CloudSun className="text-orange-600 dark:text-orange-400" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {weather.temperature}°F
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {weather.condition}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mr-3">
              <Droplets className="text-teal-600 dark:text-teal-400" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Humidity: {weather.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};