import React from 'react';
import { Wind, Activity } from 'lucide-react';
interface RecommendationCardProps {
  recommendation: {
    id: number;
    title: string;
    content: string;
    icon: string;
  };
}
export const RecommendationCard = ({
  recommendation
}: RecommendationCardProps) => {
  const getIcon = () => {
    switch (recommendation.icon) {
      case 'inhaler':
        return <div size={20} />;
      case 'breathing':
        return <Activity size={20} />;
      case 'environment':
        return <Wind size={20} />;
      default:
        return <div size={20} />;
    }
  };
  return <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-400">
          {getIcon()}
        </div>
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200">
            {recommendation.title}
          </h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {recommendation.content}
          </p>
        </div>
      </div>
    </div>;
};