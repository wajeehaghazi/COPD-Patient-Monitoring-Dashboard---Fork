import React, { useState } from 'react';
import { RecommendationCard } from './RecommendationCard';
import { ChatInterface } from './ChatInterface';
import { generateRecommendations, generateMessages } from '../../utils/mockData';
export const AIRecommendationsPage = () => {
  const [recommendations] = useState(generateRecommendations());
  const [messages] = useState(generateMessages());
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        AI Health Coach
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Personalized Recommendations
            </h3>
            <div className="space-y-4">
              {recommendations.map(recommendation => <RecommendationCard key={recommendation.id} recommendation={recommendation} />)}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md h-full">
            <ChatInterface messages={messages} />
          </div>
        </div>
      </div>
    </div>;
};