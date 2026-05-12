import React, { useState } from 'react';
import { PaymentMethod } from '../../types/subscription';
import { paymentMethods, addons, regions, contractOptions, paygOptions } from '../../data/subscriptionData';
import { MobileIcon, BankIcon, WalletIcon, CreditCardIcon, LockIcon, CheckIcon } from '../icons/Icons';

interface PaymentCheckoutProps {
  paymentMethod: PaymentMethod['id'];
  onPaymentMethodChange: (method: PaymentMethod['id']) => void;
  calculations: {
    basePlanPrice: number;
    addonsTotal: number;
    regionsTotal: number;
    discountPercentage: number;
    discountAmount: number;
    paygFeePercentage: number;
    paygFeeAmount: number;
    monthlyTotal: number;
    paygPercentage: number;
    upfrontPayment: number;
    activeAddonsCount: number;
  };
  selectedAddons: string[];
  selectedRegions: string[];
  selectedContract: string;
  selectedPayg: string;
  planName: string;
}

const getPaymentIcon = (id: PaymentMethod['id']) => {
  const icons: Record<PaymentMethod['id'], React.ReactNode> = {
    mpesa: <MobileIcon className="w-6 h-6" />,
    bank: <BankIcon className="w-6 h-6" />,
    wallet: <WalletIcon className="w-6 h-6" />,
    card: <CreditCardIcon className="w-6 h-6" />,
  };
  return icons[id];
};

export const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  calculations,
  selectedAddons,
  selectedRegions,
  selectedContract,
  selectedPayg,
  planName,
}) => {
  const [mpesaPhone, setMpesaPhone] = useState('712345678');
  const [bankDetails, setBankDetails] = useState({ bankName: '', accountNumber: '', accountName: '' });
  const [walletId, setWalletId] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '', name: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const contract = contractOptions.find(c => c.id === selectedContract);
  const payg = paygOptions.find(p => p.id === selectedPayg);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  // Get selected addon names for breakdown
  const selectedAddonNames = selectedAddons.map(id => addons.find(a => a.id === id)?.name || id);
  const selectedRegionNames = selectedRegions
    .filter(id => id !== 'kenya')
    .map(id => regions.find(r => r.id === id)?.name || id);

  const renderPaymentInputs = () => {
    switch (paymentMethod) {
      case 'mpesa':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 font-medium">
                  +254
                </span>
                <input
                  type="tel"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  placeholder="712345678"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                STK push will be sent to your phone. Enter M-Pesa PIN to confirm.
              </p>
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Bank
              </label>
              <select
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white"
              >
                <option value="">Choose your bank...</option>
                <option value="equity">Equity Bank</option>
                <option value="kcb">Kenya Commercial Bank (KCB)</option>
                <option value="coop">Co-operative Bank</option>
                <option value="family">Family Bank</option>
                <option value="dtb">Diamond Trust Bank (DTB)</option>
                <option value="ncba">NCBA Bank</option>
                <option value="absa">Absa Bank Kenya</option>
                <option value="stanbic">Stanbic Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                placeholder="Enter your bank account number"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Holder Name
              </label>
              <input
                type="text"
                value={bankDetails.accountName}
                onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                placeholder="Name as it appears on your account"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <p className="text-xs text-gray-500">
              Bank transfers take 2-4 hours to verify. You'll receive a confirmation email once processed.
            </p>
          </div>
        );
      
      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-900">SACCOPay Wallet Balance</p>
                  <p className="text-2xl font-bold text-emerald-600">KES 124,850</p>
                </div>
                <WalletIcon className="w-10 h-10 text-emerald-600" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Wallet ID
              </label>
              <input
                type="text"
                value={walletId}
                onChange={(e) => setWalletId(e.target.value)}
                placeholder="Enter your SACCOPay Wallet ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Your Wallet ID can be found in your SACCOPay app under Settings → Wallet Info.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckIcon className="w-4 h-4" />
              <span>Instant payment • No transaction fees</span>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                placeholder="Name on card"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <LockIcon className="w-4 h-4" />
              <span>Secured by Stripe • 256-bit SSL encryption</span>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Initiated!</h2>
        <p className="text-gray-600 mb-6">
          {paymentMethod === 'mpesa' && 'Check your phone for the M-Pesa STK push prompt.'}
          {paymentMethod === 'bank' && 'Your bank transfer is being processed. We\'ll notify you once verified.'}
          {paymentMethod === 'wallet' && 'Payment completed successfully from your SACCOPay Wallet.'}
          {paymentMethod === 'card' && 'Your card payment has been processed successfully.'}
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Bill Breakdown */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Bill Breakdown</h2>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{planName} Plan (Base)</span>
              <span className="font-medium">{formatPrice(calculations.basePlanPrice)}</span>
            </div>
            
            {calculations.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>{contract?.label} Discount ({calculations.discountPercentage}%)</span>
                <span>- {formatPrice(Math.round(calculations.discountAmount))}</span>
              </div>
            )}
            
            {selectedAddonNames.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-2">Add-ons ({selectedAddons.length})</p>
                </div>
                {selectedAddonNames.map((name, idx) => {
                  const addon = addons.find(a => a.name === name);
                  return (
                    <div key={idx} className="flex justify-between text-gray-600">
                      <span className="truncate pr-4">{name}</span>
                      <span className="font-medium flex-shrink-0">
                        {formatPrice(addon?.price || 0)}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
            
            {selectedRegionNames.length > 0 && (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-xs text-gray-500 mb-2">Regions</p>
                </div>
                {selectedRegionNames.map((name, idx) => {
                  const region = regions.find(r => r.name === name);
                  return (
                    <div key={idx} className="flex justify-between text-gray-600">
                      <span>{name}</span>
                      <span className="font-medium">{formatPrice(region?.price || 0)}</span>
                    </div>
                  );
                })}
              </>
            )}
            
            {calculations.paygFeeAmount > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>{payg?.percentage}% PAYG (+{calculations.paygFeePercentage}% fee)</span>
                <span>{formatPrice(Math.round(calculations.paygFeeAmount))}</span>
              </div>
            )}
            
            <div className="border-t-2 border-gray-300 pt-3 mt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Monthly Total</span>
                <span className="text-emerald-600">{formatPrice(Math.round(calculations.monthlyTotal))}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-sm text-emerald-700">
              <LockIcon className="w-4 h-4 inline mr-1" />
              <strong>Price locked</strong> for {contract?.duration}. No increases during contract term.
            </p>
          </div>
        </div>
        
        {/* Payment Summary Card */}
        <div className="mt-4 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5 text-white">
          <p className="text-emerald-200 text-sm mb-1">Amount Due Today</p>
          <p className="text-3xl font-bold mb-2">
            {formatPrice(Math.round(calculations.upfrontPayment))}
          </p>
          <p className="text-emerald-200 text-sm">
            {payg?.percentage}% upfront of {formatPrice(Math.round(calculations.monthlyTotal * (parseInt(selectedContract.split('-')[0]) || 3)))} total
          </p>
        </div>
      </div>
      
      {/* Payment Method Selection */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
        
        <div className="space-y-3 mb-6">
          {paymentMethods.map((method) => {
            const isSelected = paymentMethod === method.id;
            
            return (
              <label
                key={method.id}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-emerald-600 bg-emerald-50' 
                    : 'border-gray-200 bg-white hover:border-emerald-300'}
                `}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={isSelected}
                  onChange={() => onPaymentMethodChange(method.id)}
                  className="w-5 h-5 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                />
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <div className={isSelected ? 'text-emerald-600' : 'text-gray-400'}>
                  {getPaymentIcon(method.id)}
                </div>
              </label>
            );
          })}
        </div>
        
        {/* Payment Inputs */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {paymentMethod === 'mpesa' && 'M-Pesa Details'}
            {paymentMethod === 'bank' && 'Bank Account Details'}
            {paymentMethod === 'wallet' && 'SACCOPay Wallet'}
            {paymentMethod === 'card' && 'Card Details'}
          </h3>
          {renderPaymentInputs()}
        </div>
        
        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
            flex items-center justify-center gap-3
            ${isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700'}
          `}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              Pay {formatPrice(Math.round(calculations.upfrontPayment))}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
        
        <p className="text-center text-xs text-gray-500 mt-3">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};
