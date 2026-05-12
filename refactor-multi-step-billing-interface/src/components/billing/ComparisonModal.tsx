import React from 'react';
import { Modal } from '../ui/Modal';
import { comparisonData } from '../../data/subscriptionData';
import { CheckIcon, XIcon, TrophyIcon } from '../icons/Icons';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose }) => {
  const renderCell = (value: string, isSaccoPay: boolean = false) => {
    const isPositive = value.includes('Included') || value.includes('Growth+') || value.includes('Add-on') || value.includes('Quarterly');
    const isNegative = value.includes('Not offered') || value.includes('Extra fee') || value.includes('Annual lock') || value.includes('Rare');
    
    return (
      <span className={`
        flex items-center gap-1 text-sm
        ${isSaccoPay ? 'font-medium' : ''}
        ${isSaccoPay && isPositive ? 'text-emerald-600' : ''}
        ${isNegative ? 'text-red-500' : ''}
        ${!isPositive && !isNegative ? 'text-gray-600' : ''}
      `}>
        {isPositive && isSaccoPay && <CheckIcon className="w-4 h-4 flex-shrink-0" />}
        {isNegative && <XIcon className="w-4 h-4 flex-shrink-0" />}
        {value}
      </span>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="How We Compare — Kenya SACCO PSP Market"
      subtitle="Research-Based · May 2026 · 5 Leading Kenya SACCO PSPs"
      size="xl"
    >
      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-3 text-sm font-bold text-gray-700">Feature</th>
              <th className="text-left py-3 px-3 text-sm font-bold text-emerald-600 bg-emerald-50">SACCOPay</th>
              <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Kwara</th>
              <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Coretec</th>
              <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">SaccoTek</th>
              <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Others</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-3 text-sm font-medium text-gray-900">{row.feature}</td>
                <td className="py-3 px-3 bg-emerald-50">{renderCell(row.saccopay, true)}</td>
                <td className="py-3 px-3">{renderCell(row.kwara)}</td>
                <td className="py-3 px-3">{renderCell(row.coretec)}</td>
                <td className="py-3 px-3">{renderCell(row.saccotek)}</td>
                <td className="py-3 px-3">{renderCell(row.others)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <p className="text-sm text-emerald-700 flex items-start gap-2">
          <TrophyIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Why SACCOPay Wins:</strong> At KES 75,000/month, our Growth Plan includes CRM, HR, full analytics, and unlimited branches — features competitors charge separately for or don't offer at all. We built advanced tech, but we charge less because we're a fintech, not a legacy bank.
          </span>
        </p>
      </div>
    </Modal>
  );
};
