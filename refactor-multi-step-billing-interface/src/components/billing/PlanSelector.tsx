import React from 'react';
import { Plan } from '../../types/subscription';
import { plans } from '../../data/subscriptionData';
import { CheckIcon, XIcon } from '../icons/Icons';

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onSelectPlan: (plan: Plan) => void;
}

export const PlanSelector: React.FC<PlanSelectorProps> = ({ selectedPlan, onSelectPlan }) => {
  const formatPrice = (price: number) => {
    return `KES ${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Choose Your Base Plan</h2>
        <p className="text-sm text-gray-600">
          All plans include core banking, member management, and loan processing.{' '}
          <span className="text-emerald-600 font-semibold">More features. Less cost.</span>
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {plans.map((plan) => {
          const isSelected = selectedPlan?.id === plan.id;
          const isPopular = plan.popular;
          
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`
                relative bg-white rounded-2xl p-5 cursor-pointer transition-all duration-200
                border-2 flex flex-col h-full
                ${isSelected 
                  ? 'border-emerald-600 shadow-lg ring-2 ring-emerald-100' 
                  : isPopular 
                    ? 'border-emerald-600 shadow-lg' 
                    : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'}
              `}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="mb-3">
                <h3 className="font-bold text-gray-900">{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.memberLimit}</p>
              </div>
              
              <div className="mb-3">
                <span className={`text-2xl font-bold ${isPopular ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {formatPrice(plan.price)}
                </span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>
              
              <p className="text-xs text-gray-600 mb-4 flex-grow">{plan.description}</p>
              
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs">
                    {feature.included ? (
                      <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XIcon className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button
                className={`
                  w-full py-2.5 rounded-xl font-semibold text-sm transition-all
                  ${isSelected
                    ? 'bg-emerald-600 text-white'
                    : isPopular
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                `}
              >
                {isSelected ? '✓ Selected' : `Select ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
