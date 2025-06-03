
export const generatePaymentReference = () => {
  return new Date().getTime().toString();
};

export const storeSubscriptionData = (subscriptionData: any) => {
  localStorage.setItem('subscription', JSON.stringify(subscriptionData));
};

export const createTrialSubscription = (planKey: string) => {
  return {
    plan: planKey,
    status: 'trial',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
};

export const createActiveSubscription = (planKey: string, reference: string) => {
  return {
    plan: planKey,
    reference: reference,
    status: 'active',
    startDate: new Date().toISOString(),
  };
};
