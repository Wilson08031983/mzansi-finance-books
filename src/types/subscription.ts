// Types for subscription management

export type SubscriptionPlan = 'trial' | 'monthly' | 'annual' | 'none';

export interface Subscription {
  id: string;
  user_id: string;
  company_id: string;
  plan_type: SubscriptionPlan;
  status: 'active' | 'expired' | 'canceled' | 'payment_failed';
  start_date: string;
  end_date: string;
  trial_days_left: number | null;
  payment_method_id?: string;
  payment_customer_id?: string;
  payment_subscription_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionContextType {
  subscription: Subscription | null;
  isLoading: boolean;
  isExpired: boolean;
  isTrial: boolean;
  isPaid: boolean;
  trialDaysLeft: number | null;
  isLimitedFeatures: boolean;
  updateSubscriptionStatus: () => Promise<void>;
  startTrial: () => Promise<void>;
  startSubscription: (plan: 'monthly' | 'annual') => Promise<void>;
  updatePaymentMethod: () => Promise<void>;
  cancelSubscription: () => Promise<void>;
}
