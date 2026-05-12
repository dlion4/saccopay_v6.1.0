import React from 'react';
import { addons } from '../../data/subscriptionData';
import { 
  MessageIcon, WhatsAppIcon, EmailIcon, IdCardIcon, CreditCardIcon, 
  FingerprintIcon, QRCodeIcon, BankIcon, MobileIcon, ChartIcon, 
  RobotIcon, HeadsetIcon 
} from '../icons/Icons';

interface AddonSelectorProps {
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
}

const getAddonIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'sms': <MessageIcon className="w-5 h-5" />,
    'whatsapp': <WhatsAppIcon className="w-5 h-5" />,
    'email': <EmailIcon className="w-5 h-5" />,
    'id-card': <IdCardIcon className="w-5 h-5" />,
    'credit-card': <CreditCardIcon className="w-5 h-5" />,
    'fingerprint': <FingerprintIcon className="w-5 h-5" />,
    'qr-code': <QRCodeIcon className="w-5 h-5" />,
    'building-columns': <BankIcon className="w-5 h-5" />,
    'mobile': <MobileIcon className="w-5 h-5" />,
    'chart-bar': <ChartIcon className="w-5 h-5" />,
    'robot': <RobotIcon className="w-5 h-5" />,
    'headset': <HeadsetIcon className="w-5 h-5" />,
  };
  return iconMap[iconName] || <MessageIcon className="w-5 h-5" />;
};

export const AddonSelector: React.FC<AddonSelectorProps> = ({ selectedAddons, onToggleAddon }) => {
  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Premium Add-ons</h2>
          <p className="text-sm text-gray-600">
            These features cost us to provide — billed separately. Select only what you need.
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
          {selectedAddons.length} Active
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {addons.map((addon) => {
          const isSelected = selectedAddons.includes(addon.id);
          
          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className={`
                rounded-xl p-4 cursor-pointer transition-all duration-200 border-2
                ${isSelected
                  ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm'}
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  ${isSelected ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}
                `}>
                  {getAddonIcon(addon.icon)}
                </div>
                <span className={`font-bold text-sm ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {formatPrice(addon.price)}/mo
                </span>
              </div>
              <h3 className={`font-semibold text-sm mb-1 ${isSelected ? 'text-emerald-900' : 'text-gray-900'}`}>
                {addon.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{addon.description}</p>
              
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-emerald-200">
                  <span className="text-xs font-medium text-emerald-600">✓ Added to your plan</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
