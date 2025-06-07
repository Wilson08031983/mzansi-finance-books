import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSubscription } from '@/contexts/SubscriptionContext';

const SubscriptionBanner = () => {
  const { 
    subscription, 
    isLoading,
    isExpired,
    isTrial, 
    isPaid,
    trialDaysLeft
  } = useSubscription();

  if (isLoading) return null;
  
  // Show nothing if user has active paid subscription
  if (isPaid && subscription?.status === 'active') return null;
  
  // Expired trial banner
  if (isExpired && subscription?.plan_type === 'trial') {
    return (
      <Alert className="bg-red-50 border-red-200 mb-6">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-red-700">
            Your free trial has expired. Subscribe now to continue using all features.
          </span>
          <Link to="/pricing">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Subscribe Now
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Payment failed banner
  if (subscription?.status === 'payment_failed') {
    return (
      <Alert className="bg-amber-50 border-amber-200 mb-6">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-amber-700">
            Your payment failed. Please update your payment details to avoid service interruption.
          </span>
          <Link to="/settings/payment">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Update Payment
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Trial days left banner
  if (isTrial && trialDaysLeft && subscription?.status === 'active') {
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-6">
        <Clock className="h-5 w-5 text-blue-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-blue-700">
            You have <strong>{trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'}</strong> left in your free trial.
          </span>
          <Link to="/pricing">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Upgrade Now
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Trial ending soon (5 days or less)
  if (isTrial && trialDaysLeft && trialDaysLeft <= 5 && subscription?.status === 'active') {
    return (
      <Alert className="bg-amber-50 border-amber-200 mb-6">
        <AlertTriangle className="h-5 w-5 text-amber-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-amber-700">
            Your free trial ends in <strong>{trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'}</strong>. Subscribe now to avoid interruption.
          </span>
          <Link to="/pricing">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Subscribe Now
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Subscription canceled
  if (subscription?.status === 'canceled') {
    return (
      <Alert className="bg-gray-50 border-gray-200 mb-6">
        <AlertTriangle className="h-5 w-5 text-gray-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-gray-700">
            Your subscription has been canceled and will end on {new Date(subscription.end_date).toLocaleDateString()}.
          </span>
          <Link to="/pricing">
            <Button variant="outline" className="border-gray-400 hover:bg-gray-100">
              Renew Subscription
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Default banner for new users without subscription
  if (!subscription) {
    return (
      <Alert className="bg-green-50 border-green-200 mb-6">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertDescription className="flex items-center justify-between w-full">
          <span className="text-green-700">
            Start your 30-day free trial to unlock all features.
          </span>
          <Button
            onClick={() => window.location.href = '/pricing'}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Start Free Trial
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
};

export default SubscriptionBanner;
