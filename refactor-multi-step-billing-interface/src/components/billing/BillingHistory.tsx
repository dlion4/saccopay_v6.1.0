import React from 'react';
import { billingHistory } from '../../data/subscriptionData';
import { DownloadIcon, DocumentIcon } from '../icons/Icons';

export const BillingHistory: React.FC = () => {
  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      paid: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      completed: 'bg-gray-100 text-gray-700',
      failed: 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Billing History & Invoices</h2>
          <p className="text-sm text-gray-600">View and download your past invoices and contracts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <DownloadIcon className="w-4 h-4" />
          Export All
        </button>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600">Description</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-4 px-5 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-right py-4 px-5 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-5">
                    <p className="font-medium text-sm text-gray-900">{item.description}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Invoice #{item.invoiceNumber}
                      {item.contractNumber && ` · Contract #${item.contractNumber}`}
                      {item.paymentMethod && ` · ${item.paymentMethod}`}
                    </p>
                  </td>
                  <td className="py-4 px-5 font-medium text-gray-900">
                    {formatPrice(item.amount)}
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-600">{item.date}</td>
                  <td className="py-4 px-5">{getStatusBadge(item.status)}</td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <DocumentIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {billingHistory.map((item) => (
            <div key={item.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-grow">
                  <p className="font-medium text-sm text-gray-900">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Invoice #{item.invoiceNumber}
                  </p>
                </div>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="font-bold text-gray-900">{formatPrice(item.amount)}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <DocumentIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                    <DownloadIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Showing 1-4 of 12 transactions</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            3
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
