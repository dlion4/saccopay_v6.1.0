import React from 'react';
import { regions } from '../../data/subscriptionData';
import { GlobeIcon } from '../icons/Icons';

interface RegionSelectorProps {
  selectedRegions: string[];
  onToggleRegion: (regionId: string) => void;
  memberCount: number;
  branchCount: number;
  currency: string;
  onMemberCountChange: (count: number) => void;
  onBranchCountChange: (count: number) => void;
  onCurrencyChange: (currency: string) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegions,
  onToggleRegion,
  memberCount,
  branchCount,
  currency,
  onMemberCountChange,
  onBranchCountChange,
  onCurrencyChange,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Transaction Region Setup</h2>
        <p className="text-sm text-gray-600">
          Tell us where your SACCO will be receiving member transactions from.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Regions List */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Where will you receive transactions?
          </label>
          <div className="space-y-2">
            {regions.map((region) => {
              const isSelected = selectedRegions.includes(region.id);
              const isKenyaOnly = region.id === 'kenya';
              
              return (
                <label
                  key={region.id}
                  className={`
                    flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all
                    ${isSelected ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-white hover:bg-gray-50'}
                  `}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleRegion(region.id)}
                    disabled={isKenyaOnly}
                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <div className="flex-grow">
                    <p className="font-medium text-sm text-gray-900">{region.name}</p>
                    <p className="text-xs text-gray-500">{region.description}</p>
                  </div>
                  <span className={`
                    text-xs font-medium px-2.5 py-1 rounded-full
                    ${region.included 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : isSelected 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600'}
                  `}>
                    {region.included ? 'Included' : `+ KES ${region.price.toLocaleString()}/mo`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        
        {/* Configuration Fields */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Active Members
            </label>
            <input
              type="number"
              value={memberCount}
              onChange={(e) => onMemberCountChange(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              Your Growth plan supports up to 2,500 members. Extra members: KES 20/member/month.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Branches / Offices
            </label>
            <input
              type="number"
              value={branchCount}
              onChange={(e) => onBranchCountChange(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              First 3 branches free on Growth. Extra branches: KES 2,000/branch/month.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Primary Currency
            </label>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
            >
              <option value="KES">Kenyan Shilling (KES)</option>
              <option value="USD">US Dollar (USD)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <GlobeIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Regional Fee Note</p>
                <p className="text-xs text-amber-700">
                  Regional fees cover compliance, international routing, and partner bank charges. 
                  You only pay for regions you actively use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
