
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import { PAYSTACK_CONFIG, SUBSCRIPTION_PLANS } from '@/lib/paystack';
import { 
  generatePaymentReference, 
  storeSubscriptionData, 
  createTrialSubscription, 
  createActiveSubscription 
} from '@/utils/paymentUtils';

export const usePayment = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const createPaymentConfig = (email: string) => ({
    reference: generatePaymentReference(),
    email: email || 'user@example.com',
    amount: selectedPlan ? SUBSCRIPTION_PLANS[selectedPlan as keyof typeof SUBSCRIPTION_PLANS].price : 0,
    publicKey: PAYSTACK_CONFIG.publicKey,
  });

  const handlePaymentSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    setIsProcessing(false);
    setShowPaymentModal(false);
    
    const subscriptionData = createActiveSubscription(selectedPlan!, reference.reference);
    storeSubscriptionData(subscriptionData);
    
    navigate('/thank-you');
  };

  const handlePaymentClose = () => {
    console.log('Payment closed or failed');
    setIsProcessing(false);
    setShowPaymentModal(false);
    // TODO: Implement retry logic for 7 days
  };

  const handleSelectPlan = (planKey: string) => {
    setSelectedPlan(planKey);
    
    if (planKey === 'trial') {
      const trialData = createTrialSubscription('trial');
      storeSubscriptionData(trialData);
      navigate('/dashboard');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const initiatePayment = (email: string) => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    setIsProcessing(true);
    
    const config = createPaymentConfig(email);
    const initializePayment = usePaystackPayment(config);
    
    initializePayment({
      onSuccess: handlePaymentSuccess,
      onClose: handlePaymentClose,
    });
  };

  return {
    selectedPlan,
    showPaymentModal,
    isProcessing,
    handleSelectPlan,
    initiatePayment,
    setShowPaymentModal,
  };
};
