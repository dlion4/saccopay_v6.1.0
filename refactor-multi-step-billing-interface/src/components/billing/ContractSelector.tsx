import React from 'react';
import { contractOptions, paygOptions } from '../../data/subscriptionData';
import { InfoIcon, CheckIcon } from '../icons/Icons';

interface ContractSelectorProps {
  selectedContract: string;
  selectedPayg: string;
  onSelectContract: (contractId: string) => void;
  onSelectPayg: (paygId: string) => void;
  calculations: {
    basePlanPrice: number;
    monthlyTotal: number;
    contractMonths: number;
    totalContractValue: number;
    paygPercentage: number;
    paygFeePercentage: number;
    upfrontPayment: number;
    remainingBalance: number;
    installmentAmount: number;
  };
}

export const ContractSelector: React.FC<ContractSelectorProps> = ({
  selectedContract,
  selectedPayg,
  onSelectContract,
  onSelectPayg,
  calculations,
}) => {
  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  // Generate payment schedule
  const generateSchedule = () => {
    const schedule = [];
    const { paygPercentage, totalContractValue, contractMonths, paygFeePercentage } = calculations;
    const upfront = (totalContractValue * paygPercentage) / 100;
    const remaining = totalContractValue - upfront;
    
    schedule.push({ label: `Upfront (${paygPercentage}%)`, date: 'Today', amount: upfront });
    
    if (remaining > 0 && contractMonths > 1) {
      const installmentsCount = contractMonths - 1;
      const feePerInstallment = (remaining * paygFeePercentage / 100) / installmentsCount;
      const baseInstallment = remaining / installmentsCount;
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = 4; // May 2026
      
      for (let i = 0; i < installmentsCount; i++) {
        const monthIdx = (currentMonth + i + 1) % 12;
        schedule.push({
          label: `Installment ${i + 1}`,
          date: `${months[monthIdx]} 1, 2026`,
          amount: baseInstallment + feePerInstallment,
        });
      }
    }
    
    return schedule;
  };

  const schedule = generateSchedule();
  const totalWithFees = schedule.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-8">
      {/* Contract Duration */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Contract Duration</h2>
          <p className="text-sm text-gray-600">
            All contracts are reviewed quarterly. Longer commitments earn greater discounts. A 30-day notice period applies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {contractOptions.map((contract) => {
            const isSelected = selectedContract === contract.id;
            
            return (
              <div
                key={contract.id}
                onClick={() => onSelectContract(contract.id)}
                className={`
                  rounded-xl p-5 cursor-pointer transition-all duration-200 border-2
                  ${isSelected
                    ? 'border-emerald-600 bg-emerald-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-emerald-300'}
                `}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`
                    text-xs font-semibold px-2 py-1 rounded
                    ${contract.recommended 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-200 text-gray-700'}
                  `}>
                    {contract.badge}
                  </span>
                  <span className={`font-bold ${contract.recommended ? 'text-emerald-600' : 'text-gray-700'}`}>
                    {contract.discount}% OFF
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{contract.duration}</h3>
                <p className="text-sm text-gray-500 mb-2">{contract.label}</p>
                <p className="text-xs text-gray-600">{contract.description}</p>
                
                {isSelected && (
                  <div className="mt-4 flex items-center gap-2 text-emerald-600">
                    <CheckIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Selected</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Contract Terms */}
        <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Contract Terms</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-800 mb-2">What You Commit To:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Pay agreed monthly fee for contract duration</li>
                <li>• 30-day written notice for early termination</li>
                <li>• Maintain accurate member count declarations</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-2">What We Guarantee:</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Price lock — no increases during contract term</li>
                <li>• 99.9% uptime SLA with service credits</li>
                <li>• Free feature upgrades during your term</li>
                <li>• Full data export anytime, free of charge</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            <InfoIcon className="w-4 h-4 inline mr-1" />
            Early exit within minimum term: 10% fee on remaining value. After minimum term: 30-day notice, zero penalty.
          </p>
        </div>
      </div>
      
      {/* Pay As You Go */}
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Pay As You Go — Flexible Billing</h2>
          <p className="text-sm text-gray-600">
            Split your quarterly payment into manageable installments. A signed contract is still required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {paygOptions.map((option) => {
            const isSelected = selectedPayg === option.id;
            
            return (
              <div
                key={option.id}
                onClick={() => onSelectPayg(option.id)}
                className={`
                  rounded-xl p-5 cursor-pointer transition-all duration-200 border-2 text-center
                  ${isSelected
                    ? 'border-emerald-600 bg-emerald-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-emerald-300'}
                `}
              >
                <p className={`text-3xl font-bold mb-1 ${isSelected ? 'text-emerald-600' : 'text-gray-900'}`}>
                  {option.percentage}%
                </p>
                <p className="text-sm text-gray-500 mb-1">{option.label}</p>
                <p className="text-xs text-gray-400 mb-3">
                  {option.fee > 0 ? `+ ${option.fee}% PAYG fee${option.popular ? ' (reduced)' : ''}` : '0% extra charge — best value'}
                </p>
                {option.popular && (
                  <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    POPULAR
                  </span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Payment Schedule */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">
            PAYG Schedule — {formatPrice(calculations.monthlyTotal)}/mo × {calculations.contractMonths} months = {formatPrice(calculations.totalContractValue)}
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-3 font-medium">Payment</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 font-medium text-gray-900">{item.label}</td>
                    <td className="py-3 text-gray-600">{item.date}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">
                      {formatPrice(Math.round(item.amount))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-emerald-50">
                  <td className="py-3 font-semibold text-emerald-900">
                    Total (with {calculations.paygFeePercentage}% fee)
                  </td>
                  <td className="py-3"></td>
                  <td className="py-3 text-right font-bold text-emerald-700">
                    {formatPrice(Math.round(totalWithFees))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <label className="flex items-center gap-3 mt-4 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-600">
              Enable auto-debit from SACCOPay Wallet or M-Pesa to waive the {calculations.paygFeePercentage}% PAYG fee entirely.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
