import React, { useState } from 'react';
import { PlanSelector } from './PlanSelector';
import { AddonSelector } from './AddonSelector';
import { RegionSelector } from './RegionSelector';
import { ContractSelector } from './ContractSelector';
import { PaymentCheckout } from './PaymentCheckout';
import { OrderSummary } from './OrderSummary';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { useBilling } from '../../hooks/useBilling';

const steps = [
  { id: 1, name: 'Select Plan', description: 'Choose your base subscription' },
  { id: 2, name: 'Add-ons & Extras', description: 'Customize with additional features' },
  { id: 3, name: 'Contract Terms', description: 'Duration and payment schedule' },
  { id: 4, name: 'Checkout', description: 'Review and pay' },
];

export const BillingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { state, calculations, actions } = useBilling();

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || step === currentStep + 1) {
      setCurrentStep(step);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlanSelector
            selectedPlan={state.selectedPlan}
            onSelectPlan={actions.selectPlan}
          />
        );
      case 2:
        return (
          <div className="space-y-8">
            <AddonSelector
              selectedAddons={state.selectedAddons}
              onToggleAddon={actions.toggleAddon}
            />
            <RegionSelector
              selectedRegions={state.selectedRegions}
              onToggleRegion={actions.toggleRegion}
              memberCount={state.memberCount}
              branchCount={state.branchCount}
              currency={state.currency}
              onMemberCountChange={actions.setMemberCount}
              onBranchCountChange={actions.setBranchCount}
              onCurrencyChange={actions.setCurrency}
            />
          </div>
        );
      case 3:
        return (
          <ContractSelector
            selectedContract={state.contractDuration}
            selectedPayg={state.paygOption}
            onSelectContract={actions.setContractDuration}
            onSelectPayg={actions.setPaygOption}
            calculations={calculations}
          />
        );
      case 4:
        return (
          <PaymentCheckout
            paymentMethod={state.paymentMethod}
            onPaymentMethodChange={actions.setPaymentMethod}
            calculations={calculations}
            selectedAddons={state.selectedAddons}
            selectedRegions={state.selectedRegions}
            selectedContract={state.contractDuration}
            selectedPayg={state.paygOption}
            planName={state.selectedPlan?.name || 'Growth'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > currentStep + 1}
                  className={`
                    flex items-center gap-3 flex-shrink-0 transition-all
                    ${step.id <= currentStep + 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                  `}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                      transition-all duration-300
                      ${isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                          ? 'bg-emerald-600 text-white step-active'
                          : 'bg-gray-200 text-gray-500'}
                    `}
                  >
                    {isCompleted ? <CheckIcon className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className={`text-sm font-medium ${isCurrent ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </button>
                
                {index < steps.length - 1 && (
                  <div className="flex-grow mx-4 hidden sm:block">
                    <div className={`h-1 rounded-full transition-all duration-300 ${
                      currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-200'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content Area with Summary Sidebar */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className={`${currentStep === 4 ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            {renderStepContent()}
          </div>
        </div>

        {/* Sidebar Summary - Hidden on Checkout */}
        {currentStep < 4 && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                calculations={calculations}
                selectedAddons={state.selectedAddons}
                selectedRegions={state.selectedRegions}
                selectedContract={state.contractDuration}
                selectedPayg={state.paygOption}
                planName={state.selectedPlan?.name || 'Growth'}
                onProceed={nextStep}
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all
            ${currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}
          `}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Previous
        </button>
        
        {currentStep < 4 && (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
          >
            Continue to {steps[currentStep]?.name || 'Next'}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
