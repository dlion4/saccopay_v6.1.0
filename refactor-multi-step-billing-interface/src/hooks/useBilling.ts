import { useState, useMemo, useCallback } from 'react';
import { BillingState, Plan } from '../types/subscription';
import { plans, addons, regions, contractOptions, paygOptions } from '../data/subscriptionData';

const initialState: BillingState = {
  selectedPlan: plans.find(p => p.id === 'growth') || null,
  selectedAddons: ['sms', 'whatsapp', 'iprs', 'mpesa-paybill', 'bi-dashboard'],
  selectedRegions: ['kenya', 'uk-europe'],
  contractDuration: '3-months',
  paygOption: 'payg-60',
  paymentMethod: 'mpesa',
  memberCount: 1284,
  branchCount: 3,
  currency: 'KES',
};

export function useBilling() {
  const [state, setState] = useState<BillingState>(initialState);

  const selectPlan = useCallback((plan: Plan) => {
    setState(prev => ({ ...prev, selectedPlan: plan }));
  }, []);

  const toggleAddon = useCallback((addonId: string) => {
    setState(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter(id => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }));
  }, []);

  const toggleRegion = useCallback((regionId: string) => {
    // Kenya is always included
    if (regionId === 'kenya') return;
    setState(prev => ({
      ...prev,
      selectedRegions: prev.selectedRegions.includes(regionId)
        ? prev.selectedRegions.filter(id => id !== regionId)
        : [...prev.selectedRegions, regionId],
    }));
  }, []);

  const setContractDuration = useCallback((duration: string) => {
    setState(prev => ({ ...prev, contractDuration: duration }));
  }, []);

  const setPaygOption = useCallback((option: string) => {
    setState(prev => ({ ...prev, paygOption: option }));
  }, []);

  const setPaymentMethod = useCallback((method: BillingState['paymentMethod']) => {
    setState(prev => ({ ...prev, paymentMethod: method }));
  }, []);

  const setMemberCount = useCallback((count: number) => {
    setState(prev => ({ ...prev, memberCount: count }));
  }, []);

  const setBranchCount = useCallback((count: number) => {
    setState(prev => ({ ...prev, branchCount: count }));
  }, []);

  const setCurrency = useCallback((currency: string) => {
    setState(prev => ({ ...prev, currency: currency }));
  }, []);

  const calculations = useMemo(() => {
    const basePlanPrice = state.selectedPlan?.price || 0;
    
    // Calculate addons total
    const addonsTotal = state.selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);

    // Calculate regions total
    const regionsTotal = state.selectedRegions.reduce((sum, regionId) => {
      const region = regions.find(r => r.id === regionId);
      return sum + (region?.price || 0);
    }, 0);

    // Get contract discount
    const contract = contractOptions.find(c => c.id === state.contractDuration);
    const discountPercentage = contract?.discount || 0;
    const discountAmount = (basePlanPrice * discountPercentage) / 100;

    // Subtotal before PAYG
    const subtotalBeforePayg = basePlanPrice - discountAmount + addonsTotal + regionsTotal;

    // Get PAYG fee
    const paygOpt = paygOptions.find(p => p.id === state.paygOption);
    const paygFeePercentage = paygOpt?.fee || 0;
    const paygPercentage = paygOpt?.percentage || 100;
    const paygFeeAmount = (subtotalBeforePayg * paygFeePercentage) / 100;

    // Monthly total
    const monthlyTotal = subtotalBeforePayg + paygFeeAmount;

    // Contract months
    const contractMonths = parseInt(state.contractDuration.split('-')[0]) || 3;
    const totalContractValue = monthlyTotal * contractMonths;

    // Upfront payment
    const upfrontPayment = (totalContractValue * paygPercentage) / 100;
    const remainingBalance = totalContractValue - upfrontPayment;
    const installmentAmount = remainingBalance > 0 ? (remainingBalance + (remainingBalance * paygFeePercentage / 100)) / (contractMonths - 1) : 0;

    return {
      basePlanPrice,
      addonsTotal,
      regionsTotal,
      discountPercentage,
      discountAmount,
      subtotalBeforePayg,
      paygFeePercentage,
      paygFeeAmount,
      monthlyTotal,
      contractMonths,
      totalContractValue,
      paygPercentage,
      upfrontPayment,
      remainingBalance,
      installmentAmount,
      activeAddonsCount: state.selectedAddons.length,
    };
  }, [state]);

  return {
    state,
    calculations,
    actions: {
      selectPlan,
      toggleAddon,
      toggleRegion,
      setContractDuration,
      setPaygOption,
      setPaymentMethod,
      setMemberCount,
      setBranchCount,
      setCurrency,
    },
  };
}
