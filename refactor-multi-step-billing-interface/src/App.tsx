import { useState } from 'react';
import { Header } from './components/layout/Header';
import { ActiveSubscriptionBanner } from './components/billing/ActiveSubscriptionBanner';
import { SmartRecommender } from './components/billing/SmartRecommender';
import { BillingWizard } from './components/billing/BillingWizard';
import { BillingHistory } from './components/billing/BillingHistory';
import { FeatureTiers } from './components/billing/FeatureTiers';
import { ComparisonModal } from './components/billing/ComparisonModal';
import { RecommendationModal } from './components/billing/RecommendationModal';
import { SupportSection } from './components/billing/SupportSection';
import { ChartIcon, DocumentIcon, UsersIcon, CalendarIcon } from './components/icons/Icons';

type MainTab = 'subscription' | 'history';

function App() {
  const [mainTab, setMainTab] = useState<MainTab>('subscription');
  const [showComparison, setShowComparison] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleApplyRecommendation = () => {
    // This would apply the recommended settings
    console.log('Applying recommendation...');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Subscription Banner */}
        <div className="mb-6">
          <ActiveSubscriptionBanner />
        </div>

        {/* Smart Recommender */}
        <div className="mb-6">
          <SmartRecommender onSuggest={() => setShowRecommendation(true)} />
        </div>

        {/* Main Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setMainTab('subscription')}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                ${mainTab === 'subscription'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
              `}
            >
              <UsersIcon className="w-4 h-4" />
              Manage Subscription
            </button>
            <button
              onClick={() => setMainTab('history')}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors
                ${mainTab === 'history'
                  ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
              `}
            >
              <DocumentIcon className="w-4 h-4" />
              Billing History
            </button>
            <button
              onClick={() => setShowComparison(true)}
              className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors ml-auto"
            >
              <ChartIcon className="w-4 h-4" />
              Compare Plans
            </button>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">KES 97.6K</p>
              <p className="text-xs text-gray-500">Current Monthly</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">Growth</p>
              <p className="text-xs text-gray-500">Active Plan</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500">Active Add-ons</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <p className="text-lg font-bold text-gray-900">May 31</p>
              </div>
              <p className="text-xs text-gray-500">Contract Ends</p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {mainTab === 'subscription' ? (
          <div className="space-y-6">
            {/* Feature Tiers Reference */}
            <FeatureTiers />
            
            {/* Billing Wizard */}
            <BillingWizard />
            
            {/* Support Section */}
            <SupportSection />
          </div>
        ) : (
          <div className="space-y-6">
            <BillingHistory />
            <SupportSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  S
                </div>
                <span className="font-bold text-gray-900">SACCOPay</span>
              </div>
              <p className="text-sm text-gray-600">
                Modern financial technology for cooperative societies across Africa.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Features</a></li>
                <li><a href="#" className="hover:text-emerald-600">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-600">Add-ons</a></li>
                <li><a href="#" className="hover:text-emerald-600">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-600">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-600">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-emerald-600">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 SACCOPay. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">Regulated by Central Bank of Kenya</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-400">SASRA Compliant</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ComparisonModal 
        isOpen={showComparison} 
        onClose={() => setShowComparison(false)} 
      />
      <RecommendationModal 
        isOpen={showRecommendation} 
        onClose={() => setShowRecommendation(false)}
        onApply={handleApplyRecommendation}
      />
    </div>
  );
}

export default App;
