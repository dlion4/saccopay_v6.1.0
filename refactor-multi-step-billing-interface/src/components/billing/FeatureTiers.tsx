import React, { useState } from 'react';
import { featureTiers } from '../../data/subscriptionData';
import { UsersIcon, ChartIcon, ShieldIcon, InfoIcon } from '../icons/Icons';

const getIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    users: <UsersIcon className="w-5 h-5" />,
    'chart-pie': <ChartIcon className="w-5 h-5" />,
    'shield-halved': <ShieldIcon className="w-5 h-5" />,
    'hand-holding-dollar': <UsersIcon className="w-5 h-5" />,
    'mobile-screen-button': <UsersIcon className="w-5 h-5" />,
    building: <UsersIcon className="w-5 h-5" />,
    'chart-line': <ChartIcon className="w-5 h-5" />,
    briefcase: <UsersIcon className="w-5 h-5" />,
    'network-wired': <UsersIcon className="w-5 h-5" />,
    globe: <UsersIcon className="w-5 h-5" />,
    code: <UsersIcon className="w-5 h-5" />,
    star: <UsersIcon className="w-5 h-5" />,
  };
  return iconMap[iconName] || <UsersIcon className="w-5 h-5" />;
};

type TierKey = 'free' | 'standard' | 'premium' | 'advanced';

export const FeatureTiers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TierKey>('free');

  const tabs: { key: TierKey; label: string }[] = [
    { key: 'free', label: 'Free / Core' },
    { key: 'standard', label: 'Standard' },
    { key: 'premium', label: 'Premium' },
    { key: 'advanced', label: 'Advanced' },
  ];

  const activeTier = featureTiers[activeTab];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-1">What's Included in Each Tier</h2>
        <p className="text-sm text-gray-600">See exactly what you get at every level. No hidden costs.</p>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 px-5 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                ${activeTab === tab.key
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <div className="grid md:grid-cols-3 gap-5">
          {activeTier.categories.map((category, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-emerald-600">{getIcon(category.icon)}</span>
                {category.title}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {category.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-0.5">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {activeTab === 'free' && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-sm text-emerald-700">
              <InfoIcon className="w-4 h-4 inline mr-1" />
              <strong>Free Core:</strong> These features are included in every plan at no extra charge. They form the foundation of your SACCO's digital operations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
