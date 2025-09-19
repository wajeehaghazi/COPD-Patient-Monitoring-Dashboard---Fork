import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface TrendChartProps {
  data: {
    name: string;
    breathlessness: number;
    coughing: number;
    wheezing: number;
  }[];
}
export const TrendChart = ({
  data
}: TrendChartProps) => {
  return <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
        right: 30,
        left: 0,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey="name" className="text-xs fill-gray-500 dark:fill-gray-400" />
          <YAxis className="text-xs fill-gray-500 dark:fill-gray-400" domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tickFormatter={value => `${value}`} />
          <Tooltip contentStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '0.5rem',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }} />
          <Legend />
          <Line type="monotone" dataKey="breathlessness" stroke="#3b82f6" strokeWidth={2} activeDot={{
          r: 6
        }} />
          <Line type="monotone" dataKey="coughing" stroke="#10b981" strokeWidth={2} />
          <Line type="monotone" dataKey="wheezing" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>;
};