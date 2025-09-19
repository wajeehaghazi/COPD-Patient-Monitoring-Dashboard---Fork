import React, { useEffect, useState } from 'react';
import { VitalsCard } from './VitalsCard';
import { RiskGauge } from './RiskGauge';
import { TrendChart } from './TrendChart';
import { EnvironmentalCard } from './EnvironmentalCard';
import { generateVitals, generateRiskScore, generateAirQuality, generateWeather, generateTrendData } from '../../utils/mockData';
export const DashboardPage = () => {
  const [vitals, setVitals] = useState(generateVitals());
  const [riskScore, setRiskScore] = useState(generateRiskScore());
  const [airQuality, setAirQuality] = useState(generateAirQuality());
  const [weather, setWeather] = useState(generateWeather());
  const [trendData, setTrendData] = useState(generateTrendData());
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(generateVitals());
      setRiskScore(generateRiskScore());
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 py-2 border-b-2 border-blue-500 dark:border-blue-400 inline-block">
        Patient Monitoring Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalsCard vitals={vitals} />
        <RiskGauge riskScore={riskScore} />
        <EnvironmentalCard airQuality={airQuality} weather={weather} />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border-t-4 border-blue-500 dark:border-blue-400">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Symptom Trends (Last 7 Days)
        </h3>
        <TrendChart data={trendData} />
      </div>
    </div>;
};