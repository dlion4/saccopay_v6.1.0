import { Plan, Addon, Region, ContractOption, PaygOption, PaymentMethod, BillingHistory } from '../types/subscription';

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    memberLimit: 'Up to 200 members',
    price: 35000,
    description: 'For newly registered SACCOs starting digital operations.',
    features: [
      { text: 'Member Registry (200)', included: true },
      { text: 'Basic Loan Processing', included: true },
      { text: 'M-Pesa Integration', included: true },
      { text: 'Savings & Deposits', included: true },
      { text: 'SASRA Basic Reports', included: true },
      { text: '1 Branch', included: true },
      { text: '2 Admin Users', included: true },
      { text: 'CRM, HR, Analytics', included: false },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    memberLimit: 'Up to 500 members',
    price: 55000,
    description: 'For small SACCOs with growing operations.',
    features: [
      { text: 'Member Registry (500)', included: true },
      { text: 'Full Loan Management', included: true },
      { text: 'M-Pesa + Airtel Money', included: true },
      { text: 'Shares & Withdrawals', included: true },
      { text: 'SASRA Full Reports', included: true },
      { text: 'Up to 3 Branches', included: true },
      { text: '5 Admin Users', included: true },
      { text: 'Basic CRM Suite', included: true },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    memberLimit: 'Up to 2,500 members',
    price: 75000,
    description: 'For mid-sized SACCOs with full operational needs.',
    popular: true,
    features: [
      { text: 'Member Registry (2,500)', included: true },
      { text: 'Advanced Loan Portfolio', included: true },
      { text: 'All Mobile Money + Banks', included: true },
      { text: 'Full CRM Suite', included: true },
      { text: 'HR & Staff Management', included: true },
      { text: 'Unlimited Branches', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Unlimited Admin Users', included: true },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    memberLimit: 'Up to 10,000 members',
    price: 110000,
    description: 'For large SACCOs with diaspora & API needs.',
    features: [
      { text: 'Everything in Growth', included: true },
      { text: 'Diaspora & Cross-Border', included: true },
      { text: 'Multi-Currency Support', included: true },
      { text: 'Full API Access', included: true },
      { text: 'Custom Branding', included: true },
      { text: 'Priority 4hr Support', included: true },
      { text: 'Audit & Compliance', included: true },
      { text: 'White-label Member App', included: true },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    memberLimit: 'Unlimited members',
    price: 180000,
    description: 'For SACCO federations & national cooperatives.',
    features: [
      { text: 'Everything in Professional', included: true },
      { text: 'Unlimited Sub-SACCOs', included: true },
      { text: 'Custom Integrations', included: true },
      { text: 'Dedicated Account Manager', included: true },
      { text: 'Quarterly Business Reviews', included: true },
      { text: 'Virtual Staff Training', included: true },
      { text: 'SLA Guarantees', included: true },
      { text: 'Compliance Advisory', included: true },
    ],
  },
];

export const addons: Addon[] = [
  { id: 'sms', name: 'Bulk SMS Suite', price: 3500, description: 'Custom Sender ID across Safaricom, Airtel & Telkom. 1,000 SMS/mo. Extra at KES 0.50/unit.', icon: 'sms' },
  { id: 'whatsapp', name: 'WhatsApp Business API', price: 4200, description: 'Rich messages for loan approvals, reminders, statements. 2,000 msgs/mo. Two-way chat.', icon: 'whatsapp' },
  { id: 'email', name: 'Bulk Email Campaigns', price: 2800, description: 'Branded newsletters, AGM notices, dividend announcements. 10,000 emails/mo. HTML + analytics.', icon: 'email' },
  { id: 'employment', name: 'Employment Verification API', price: 5500, description: 'Verify member employment status in real-time. Employer database integration. 500 checks/mo.', icon: 'id-card' },
  { id: 'credit', name: 'Credit Bureau Checks', price: 6000, description: 'CRB, Metropol & TransUnion integration. Check credit status before loan approval. 300 checks/mo.', icon: 'credit-card' },
  { id: 'iprs', name: 'IPRS Live Verification', price: 4500, description: 'Real-time national ID validation via IPRS Kenya. KYC compliance. 500 verifications/mo.', icon: 'fingerprint' },
  { id: 'mpesa-paybill', name: 'M-Pesa Paybill Integration', price: 5500, description: 'Live paybill with real-time posting. Auto-reconciliation daily. Disbursement via M-Pesa B2C.', icon: 'qr-code' },
  { id: 'bank-recon', name: 'Bank Reconciliation (Extra)', price: 4000, description: 'Live reconciliation with Equity, KCB, Co-op, Family Bank, DTB. Up to 3 extra accounts.', icon: 'building-columns' },
  { id: 'ussd', name: 'Dedicated USSD Code', price: 8500, description: 'Your own USSD short code. Members check balances, apply loans, get statements without internet.', icon: 'mobile' },
  { id: 'bi-dashboard', name: 'Advanced BI Dashboard', price: 5000, description: '50+ custom reports, scheduled email reports, exportable PDF/Excel. Portfolio health & trends.', icon: 'chart-bar' },
  { id: 'ai-scoring', name: 'AI Credit Scoring', price: 7500, description: 'ML-based assessment using savings history & repayment behavior. Risk profiling per member.', icon: 'robot' },
  { id: 'account-manager', name: 'Dedicated Account Manager', price: 6000, description: 'Named contact, monthly strategy calls, priority issue resolution. 2-hour response SLA.', icon: 'headset' },
];

export const regions: Region[] = [
  { id: 'kenya', name: 'Kenya Only (Local)', description: 'M-Pesa, Airtel Money, bank transfers within Kenya', price: 0, included: true },
  { id: 'east-africa', name: 'East Africa Region', description: 'Uganda, Tanzania, Rwanda — mobile money & banks', price: 1500 },
  { id: 'uk-europe', name: 'UK / Europe', description: 'Diaspora remittances, SEPA, international wires', price: 3000 },
  { id: 'usa-canada', name: 'USA / Canada', description: 'ACH, wire transfers, diaspora member contributions', price: 3000 },
  { id: 'middle-east', name: 'Middle East (UAE, Qatar, Saudi)', description: 'Remittance corridors from Gulf states', price: 2000 },
  { id: 'rest-of-world', name: 'Rest of World', description: 'Australia, Asia, other African countries', price: 4000 },
];

export const contractOptions: ContractOption[] = [
  { id: '3-months', duration: '3 Months', label: 'Quarterly Review', discount: 5, description: 'Save approx. KES 11,250 on Growth plan. Review and adjust every quarter.', badge: 'RECOMMENDED', recommended: true },
  { id: '6-months', duration: '6 Months', label: 'Semi-Annual', discount: 10, description: 'Save approx. KES 45,000 on Growth plan. Mid-term review included.', badge: 'POPULAR' },
  { id: '12-months', duration: '12 Months', label: 'Annual Commitment', discount: 18, description: 'Save approx. KES 162,000 on Growth plan. Quarterly check-ins included.', badge: 'BEST VALUE' },
];

export const paygOptions: PaygOption[] = [
  { id: 'payg-50', percentage: 50, fee: 2.5, label: 'Upfront Today' },
  { id: 'payg-60', percentage: 60, fee: 1.5, label: 'Upfront Today', popular: true },
  { id: 'payg-100', percentage: 100, fee: 0, label: 'Pay in Full' },
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'mpesa', name: 'M-Pesa STK Push', description: 'Safaricom M-Pesa · Instant debit', icon: 'mobile-screen' },
  { id: 'bank', name: 'Bank Transfer', description: 'Equity Bank · 2-4 hours verification', icon: 'building-columns' },
  { id: 'wallet', name: 'SACCOPay Wallet', description: 'Balance: KES 124,850 · Instant · No fees', icon: 'wallet' },
  { id: 'card', name: 'Card Payment', description: 'Visa, Mastercard · Secured by Stripe', icon: 'credit-card' },
];

export const billingHistory: BillingHistory[] = [
  {
    id: '1',
    description: 'Growth Plan — April 2026 (Installment 3/3)',
    invoiceNumber: 'INV-2026-0048',
    contractNumber: 'SP-2026-0091',
    amount: 52500,
    date: 'Apr 1, 2026',
    status: 'paid',
  },
  {
    id: '2',
    description: 'Growth Plan — March 2026 (Installment 2/3)',
    invoiceNumber: 'INV-2026-0032',
    amount: 52500,
    date: 'Mar 1, 2026',
    status: 'paid',
    paymentMethod: 'Wallet Payment',
  },
  {
    id: '3',
    description: 'Growth Plan — February 2026 (Installment 1/3)',
    invoiceNumber: 'INV-2026-0015',
    amount: 58575,
    date: 'Feb 1, 2026',
    status: 'paid',
    paymentMethod: 'M-Pesa',
  },
  {
    id: '4',
    description: 'Basic Plan — Contract #SP-2025-0044 (Completed)',
    invoiceNumber: 'Full Contract',
    amount: 105000,
    date: 'Jan 31, 2026',
    status: 'completed',
  },
];

export const featureTiers = {
  free: {
    title: 'Free / Core',
    description: 'These features are included in every plan at no extra charge.',
    categories: [
      {
        title: 'Member Management',
        icon: 'users',
        features: [
          'Member registration & KYC capture',
          'Savings & deposit accounts',
          'Basic member profile',
          'Member self-service portal',
        ],
      },
      {
        title: 'Reporting',
        icon: 'chart-pie',
        features: [
          'SASRA basic reports',
          'Monthly summary sheets',
          'Member statements (PDF)',
          'Basic audit trail',
        ],
      },
      {
        title: 'Security & Access',
        icon: 'shield-halved',
        features: [
          'SSL encryption',
          '2-factor authentication',
          'Role-based access (2 admins)',
          'Daily automated backups',
        ],
      },
    ],
  },
  standard: {
    title: 'Standard',
    description: 'Enhanced features for growing SACCOs.',
    categories: [
      {
        title: 'Loan Processing',
        icon: 'hand-holding-dollar',
        features: [
          'Full loan lifecycle management',
          'Guarantor tracking',
          'Automated interest calculation',
          'Loan schedule generation',
          'Default tracking',
        ],
      },
      {
        title: 'Payments',
        icon: 'mobile-screen-button',
        features: [
          'M-Pesa C2B integration',
          'Airtel Money integration',
          'Manual bank reconciliation',
          'Real-time balance updates',
        ],
      },
      {
        title: 'Operations',
        icon: 'building',
        features: [
          'Up to 3 branches',
          '5 admin users',
          'Basic CRM (contacts & notes)',
          'Email notifications (in-app)',
        ],
      },
    ],
  },
  premium: {
    title: 'Premium',
    description: 'Advanced features for established SACCOs.',
    categories: [
      {
        title: 'Analytics & Intelligence',
        icon: 'chart-line',
        features: [
          'Advanced BI dashboards',
          'Portfolio health metrics',
          'Member growth trends',
          'Predictive insights',
          'Custom report builder',
        ],
      },
      {
        title: 'HR & Staff',
        icon: 'briefcase',
        features: [
          'Full HR module',
          'Payroll processing',
          'Leave management',
          'NSSF/NHIF/PAYE compliance',
          'Performance tracking',
        ],
      },
      {
        title: 'Scale',
        icon: 'network-wired',
        features: [
          'Unlimited branches',
          'Unlimited admin users',
          'Full CRM suite',
          'Treasury management',
          'Advanced KYC workflows',
        ],
      },
    ],
  },
  advanced: {
    title: 'Advanced',
    description: 'Enterprise-grade features for large organizations.',
    categories: [
      {
        title: 'Cross-Border',
        icon: 'globe',
        features: [
          'Multi-currency (USD/GBP/EUR)',
          'Diaspora member management',
          'International remittance tracking',
          'Cross-border compliance',
        ],
      },
      {
        title: 'Developer & API',
        icon: 'code',
        features: [
          'Full REST API access',
          'Webhook support',
          'API documentation',
          'Sandbox environment',
          'Custom integrations',
        ],
      },
      {
        title: 'Premium Support',
        icon: 'star',
        features: [
          'White-label member app',
          'Custom branding',
          'Dedicated account manager',
          '4-hour support SLA',
          'Quarterly business reviews',
        ],
      },
    ],
  },
};

export const comparisonData = [
  { feature: 'Core Banking', saccopay: 'Included', kwara: 'Included', coretec: 'Included', saccotek: 'Included', others: 'Varies' },
  { feature: 'CRM Suite', saccopay: 'Growth+', kwara: 'Extra fee', coretec: 'Extra fee', saccotek: 'Basic', others: 'Rare' },
  { feature: 'HR & Payroll', saccopay: 'Growth+', kwara: 'Not offered', coretec: 'Extra fee', saccotek: 'Not offered', others: 'Rare' },
  { feature: 'WhatsApp API', saccopay: 'Add-on', kwara: 'Not offered', coretec: 'Not offered', saccotek: 'Not offered', others: 'Rare' },
  { feature: 'Credit Bureau Check', saccopay: 'Add-on', kwara: 'Not offered', coretec: 'Not offered', saccotek: 'Not offered', others: 'Rare' },
  { feature: 'Employment Verify', saccopay: 'Add-on', kwara: 'Not offered', coretec: 'Not offered', saccotek: 'Not offered', others: 'Not offered' },
  { feature: 'Growth Plan Price', saccopay: 'KES 75,000/mo', kwara: 'KES 95,000+/mo', coretec: 'KES 80,000+/mo', saccotek: 'KES 70,000+/mo', others: 'KES 85,000+/mo' },
  { feature: 'Contract Flexibility', saccopay: 'Quarterly', kwara: 'Annual lock', coretec: '6-month min', saccotek: '6-month min', others: 'Annual lock' },
];
