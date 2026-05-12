import React from 'react';

export const ActiveSubscriptionBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 md:p-8 text-white shadow-xl">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <p className="text-emerald-200 text-sm font-medium mb-1">Active Subscription</p>
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            Growth Plan — Contract Ends May 31, 2026
          </h2>
          <p className="text-emerald-100 text-sm">
            Next billing: <strong className="text-white">KES 52,500</strong> on May 1, 2026.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">KES 52.5K</p>
            <p className="text-xs text-emerald-200">Monthly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">3-Mo</p>
            <p className="text-xs text-emerald-200">Quarterly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-emerald-200">Add-ons</p>
          </div>
        </div>
      </div>
    </div>
  );
};
