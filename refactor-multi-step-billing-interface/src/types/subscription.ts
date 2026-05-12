export interface Plan {
  id: string;
  name: string;
  memberLimit: string;
  price: number;
  description: string;
  features: { text: string; included: boolean }[];
  popular?: boolean;
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
}

export interface Region {
  id: string;
  name: string;
  description: string;
  price: number;
  included?: boolean;
}

export interface ContractOption {
  id: string;
  duration: string;
  label: string;
  discount: number;
  description: string;
  badge: string;
  recommended?: boolean;
}

export interface PaygOption {
  id: string;
  percentage: number;
  fee: number;
  label: string;
  popular?: boolean;
}

export interface PaymentMethod {
  id: 'mpesa' | 'bank' | 'wallet' | 'card';
  name: string;
  description: string;
  icon: string;
}

export interface BillingState {
  selectedPlan: Plan | null;
  selectedAddons: string[];
  selectedRegions: string[];
  contractDuration: string;
  paygOption: string;
  paymentMethod: PaymentMethod['id'];
  memberCount: number;
  branchCount: number;
  currency: string;
}

export interface BillingHistory {
  id: string;
  description: string;
  invoiceNumber: string;
  contractNumber?: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'completed' | 'failed';
  paymentMethod?: string;
}
