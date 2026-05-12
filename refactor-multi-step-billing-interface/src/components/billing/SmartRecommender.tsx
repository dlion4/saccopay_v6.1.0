import React from 'react';
import { LightbulbIcon, WandIcon } from '../icons/Icons';

interface SmartRecommenderProps {
  onSuggest: () => void;
}

export const SmartRecommender: React.FC<SmartRecommenderProps> = ({ onSuggest }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <LightbulbIcon className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">
              Not sure which package fits your SACCO?
            </h3>
            <p className="text-sm text-gray-600">
              Based on your profile — <strong>1,284 members</strong>, <strong>3 branches</strong>, <strong>Kenya-based</strong> — we can suggest the best plan.
            </p>
          </div>
        </div>
        <button
          onClick={onSuggest}
          className="recommendation-pulse flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors whitespace-nowrap shadow-lg"
        >
          <WandIcon className="w-5 h-5" />
          Auto-Suggest My Package
        </button>
      </div>
    </div>
  );
};
