import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Subscription, SubscriptionContextType } from '@/types/subscription';

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Computed properties
  const isExpired = subscription?.status === 'expired';
  const isTrial = subscription?.plan_type === 'trial';
  const isPaid = subscription?.plan_type === 'monthly' || subscription?.plan_type === 'annual';
  const trialDaysLeft = subscription?.trial_days_left || null;
  
  // Check if payment failure has lasted more than 7 days
  const paymentFailedTooLong = subscription?.status === 'payment_failed' && 
    subscription.updated_at ? 
    (Date.now() - new Date(subscription.updated_at).getTime()) > (7 * 24 * 60 * 60 * 1000) :
    false;
    
  // Only limit features if expired, no subscription, or payment failed for more than 7 days
  const isLimitedFeatures = isExpired || (!subscription) || paymentFailedTooLong;

  useEffect(() => {
    fetchSubscription();
    
    // Subscribe to subscription changes
    const subscriptionChannel = supabase
      .channel('subscription-changes')
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'subscriptions' }, 
        (payload) => {
          fetchSubscription();
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscriptionChannel);
    };
  }, []);
  
  // Fetch user's subscription
  const fetchSubscription = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error) {
        console.error('Error fetching subscription:', error);
        if (error.code !== 'PGRST116') { // Not found
          toast.error('Failed to load subscription information');
        }
      } else {
        setSubscription(data as Subscription);
        
        // Show notifications for important subscription states
        if (data?.status === 'expired' && data?.plan_type === 'trial') {
          toast.warning('Your free trial has expired. Please subscribe to continue using all features.');
        } else if (data?.status === 'payment_failed') {
          toast.error('Payment failed. Please update your payment method.');
        }
      }
    } catch (error) {
      console.error('Error in subscription check:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to manually update subscription status
  const updateSubscriptionStatus = async () => {
    await fetchSubscription();
  };
  
  // Start free trial
  const startTrial = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth/login');
        return;
      }
      
      // Get user's company ID
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single();
        
      if (!profile?.company_id) {
        toast.error('Please set up your company first');
        navigate('/company');
        return;
      }
      
      // Create trial subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: user.id,
            company_id: profile.company_id,
            plan_type: 'trial',
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            trial_days_left: 30
          }
        ])
        .select()
        .single();
        
      if (error) {
        toast.error('Failed to start your free trial');
        console.error('Error starting trial:', error);
        return;
      }
      
      setSubscription(data as Subscription);
      toast.success('Your 30-day free trial has started!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error starting trial:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Start paid subscription (monthly/annual)
  const startSubscription = async (plan: 'monthly' | 'annual') => {
    try {
      setIsLoading(true);
      // Here we would integrate with Stripe/PayFast for South Africa
      // For now, we'll just simulate a successful payment
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth/login');
        return;
      }
      
      // Get user's company ID and details
      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id, email')
        .eq('id', user.id)
        .single();
        
      if (!profile?.company_id) {
        toast.error('Please set up your company first');
        navigate('/company');
        return;
      }
      
      // Get company name
      const { data: company } = await supabase
        .from('companies')
        .select('name')
        .eq('id', profile.company_id)
        .single();
      
      // Calculate end date based on subscription type
      const now = new Date();
      let endDate: Date;
      
      if (plan === 'monthly') {
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      } else {
        endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      }
      
      // Create or update subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .upsert(
          {
            user_id: user.id,
            company_id: profile.company_id,
            plan_type: plan,
            status: 'active',
            start_date: now.toISOString(),
            end_date: endDate.toISOString(),
            trial_days_left: null,
            payment_method_id: 'simulated_payment_method',
            payment_customer_id: 'simulated_customer',
            payment_subscription_id: `simulated_${plan}_${Date.now()}`
          },
          { onConflict: 'user_id' }
        )
        .select()
        .single();
        
      if (error) {
        toast.error(`Failed to start your ${plan} subscription`);
        console.error('Error starting subscription:', error);
        return;
      }
      
      setSubscription(data as Subscription);
      
      // Send success email
      if (profile.email) {
        // Call the subscription-emails edge function
        fetch(`https://oymlikmotraabukjqkkx.functions.supabase.co/subscription-emails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({
            type: 'payment_success',
            email: profile.email,
            company_name: company?.name || 'Your Company',
            subscription_type: plan === 'monthly' ? 'Monthly' : 'Annual'
          })
        }).catch(err => console.error('Error sending email notification:', err));
      }
      
      toast.success(`Your ${plan} subscription has started!`);
      navigate('/thank-you');
    } catch (error) {
      console.error('Error starting subscription:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update payment method
  const updatePaymentMethod = async () => {
    try {
      navigate('/settings/payment');
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };
  
  // Cancel subscription
  const cancelSubscription = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return;
      }
      
      const { error } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('user_id', user.id);
        
      if (error) {
        toast.error('Failed to cancel your subscription');
        console.error('Error canceling subscription:', error);
        return;
      }
      
      await fetchSubscription();
      toast.success('Your subscription has been canceled');
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const value = {
    subscription,
    isLoading,
    isExpired,
    isTrial,
    isPaid,
    trialDaysLeft,
    isLimitedFeatures,
    updateSubscriptionStatus,
    startTrial,
    startSubscription,
    updatePaymentMethod,
    cancelSubscription
  };
  
  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Hook moved to useSubscriptionContext.ts file
