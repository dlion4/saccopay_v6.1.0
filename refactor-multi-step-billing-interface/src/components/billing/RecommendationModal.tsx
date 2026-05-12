import React from 'react';
import { Modal } from '../ui/Modal';
import { CheckIcon, ClockIcon, StarIcon, PlusIcon, InfoIcon } from '../icons/Icons';

interface RecommendationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

export const RecommendationModal: React.FC<RecommendationModalProps> = ({ isOpen, onClose, onApply }) => {
  const handleApply = () => {
    onApply();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Smart Package Suggestion"
      subtitle="Based on your SACCO registration profile"
      size="lg"
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            I'll Choose My Own
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            Apply This Recommendation
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Notice */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              We don't yet have your transaction history, but based on your <strong>1,284 members</strong>, <strong>3 branches</strong>, and <strong>Kenya + UK/Europe regions</strong>, here's what we suggest.
            </p>
          </div>
        </div>
        
        {/* Recommended Plan */}
        <div className="border-2 border-emerald-600 bg-emerald-50 rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <StarIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Recommended: Growth Plan</h3>
              <p className="text-sm text-gray-600">Best fit for your current profile</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              'Your 1,284 members fit well within the 2,500 limit',
              '3 branches — unlimited included, room to expand',
              'Full CRM + HR needed for your staff size',
              'Advanced analytics for portfolio oversight',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Suggestions Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Suggested Add-ons</h4>
            <ul className="space-y-2">
              {[
                { name: 'WhatsApp Business API', reason: 'member engagement' },
                { name: 'IPRS Verification', reason: 'KYC compliance' },
                { name: 'M-Pesa Paybill', reason: 'automate collections' },
                { name: 'UK/Europe Region', reason: 'diaspora remittances' },
              ].map((addon, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <PlusIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    <strong>{addon.name}</strong> — {addon.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Consider Later</h4>
            <ul className="space-y-2">
              {[
                { name: 'Credit Bureau Checks', reason: 'when loan book grows' },
                { name: 'Employment Verify', reason: 'for salary-backed loans' },
                { name: 'AI Credit Scoring', reason: 'at 2,000+ members' },
                { name: 'Dedicated USSD', reason: 'if rural membership grows' },
              ].map((addon, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong>{addon.name}</strong> — {addon.reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
