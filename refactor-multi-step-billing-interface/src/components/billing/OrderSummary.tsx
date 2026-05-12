import React from 'react';
import { LockIcon, ChevronRightIcon } from '../icons/Icons';
import { addons, regions, contractOptions } from '../../data/subscriptionData';

interface OrderSummaryProps {
  calculations: {
    basePlanPrice: number;
    addonsTotal: number;
    regionsTotal: number;
    discountPercentage: number;
    discountAmount: number;
    paygFeePercentage: number;
    paygFeeAmount: number;
    monthlyTotal: number;
    contractMonths: number;
    totalContractValue: number;
    paygPercentage: number;
    upfrontPayment: number;
    activeAddonsCount: number;
  };
  selectedAddons: string[];
  selectedRegions: string[];
  selectedContract: string;
  selectedPayg: string;
  planName: string;
  onProceed: () => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  calculations,
  selectedAddons,
  selectedRegions,
  selectedContract,
  planName,
  onProceed,
}) => {
  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;
  const contract = contractOptions.find(c => c.id === selectedContract);

  // Get selected addon names for breakdown
  const selectedAddonDetails = selectedAddons.map(id => addons.find(a => a.id === id));
  const selectedRegionDetails = selectedRegions
    .filter(id => id !== 'kenya')
    .map(id => regions.find(r => r.id === id));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-teal-600">
        <h2 className="text-lg font-bold text-white">Order Summary</h2>
        <p className="text-sm text-emerald-100">Review your selections before checkout</p>
      </div>
      
      <div className="p-5">
        {/* Plan */}
        <div className="mb-5">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">BASE PLAN</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-900">{planName} Plan</p>
              <p className="text-xs text-gray-500">Monthly subscription</p>
            </div>
            <p className="font-bold text-gray-900">{formatPrice(calculations.basePlanPrice)}</p>
          </div>
        </div>
        
        {/* Discount */}
        {calculations.discountAmount > 0 && (
          <div className="flex justify-between items-center py-3 border-t border-gray-100 text-emerald-600">
            <span className="text-sm">{contract?.label} Discount ({calculations.discountPercentage}%)</span>
            <span className="font-medium">- {formatPrice(Math.round(calculations.discountAmount))}</span>
          </div>
        )}
        
        {/* Add-ons */}
        {selectedAddonDetails.length > 0 && (
          <div className="py-3 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">ADD-ONS ({selectedAddons.length})</h3>
            <div className="space-y-2">
              {selectedAddonDetails.map((addon) => addon && (
                <div key={addon.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-2">{addon.name}</span>
                  <span className="font-medium text-gray-900 flex-shrink-0">{formatPrice(addon.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Regions */}
        {selectedRegionDetails.length > 0 && (
          <div className="py-3 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">REGIONS</h3>
            <div className="space-y-2">
              {selectedRegionDetails.map((region) => region && (
                <div key={region.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{region.name}</span>
                  <span className="font-medium text-gray-900">{formatPrice(region.price)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* PAYG Fee */}
        {calculations.paygFeeAmount > 0 && (
          <div className="flex justify-between items-center py-3 border-t border-gray-100 text-amber-600">
            <span className="text-sm">PAYG Fee ({calculations.paygFeePercentage}%)</span>
            <span className="font-medium">{formatPrice(Math.round(calculations.paygFeeAmount))}</span>
          </div>
        )}
        
        {/* Total */}
        <div className="pt-4 mt-2 border-t-2 border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Monthly Total</span>
            <span className="text-2xl font-bold text-emerald-600">
              {formatPrice(Math.round(calculations.monthlyTotal))}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Contract: {calculations.contractMonths} months • Total: {formatPrice(Math.round(calculations.totalContractValue))}
          </p>
        </div>
        
        {/* Price Lock Notice */}
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700 flex items-center gap-2">
            <LockIcon className="w-4 h-4" />
            <span><strong>Price locked</strong> for {contract?.duration}. No increases during term.</span>
          </p>
        </div>
        
        {/* Upfront Payment */}
        <div className="mt-4 p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl text-white">
          <p className="text-gray-400 text-sm">Amount Due Today ({calculations.paygPercentage}% upfront)</p>
          <p className="text-3xl font-bold mt-1">{formatPrice(Math.round(calculations.upfrontPayment))}</p>
        </div>
        
        {/* Proceed Button */}
        <button
          onClick={onProceed}
          className="w-full mt-4 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          Proceed to Payment
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
