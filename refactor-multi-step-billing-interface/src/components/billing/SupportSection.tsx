import React from 'react';
import { HeadsetIcon, DocumentIcon, MessageIcon, ClockIcon } from '../icons/Icons';

export const SupportSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <a 
          href="#"
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-200 transition-colors">
            <HeadsetIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Talk to Support</p>
            <p className="text-xs text-gray-500">Available 24/7</p>
          </div>
        </a>
        
        <a 
          href="#"
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
            <DocumentIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Documentation</p>
            <p className="text-xs text-gray-500">Guides & tutorials</p>
          </div>
        </a>
        
        <a 
          href="#"
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-200 transition-colors">
            <MessageIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Live Chat</p>
            <p className="text-xs text-gray-500">Quick questions</p>
          </div>
        </a>
        
        <a 
          href="#"
          className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all group"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 group-hover:bg-amber-200 transition-colors">
            <ClockIcon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Schedule Call</p>
            <p className="text-xs text-gray-500">Book a demo</p>
          </div>
        </a>
      </div>
    </div>
  );
};
