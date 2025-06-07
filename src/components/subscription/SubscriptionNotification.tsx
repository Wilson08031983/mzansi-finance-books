import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, CheckCircle, CreditCard } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

interface SubscriptionNotificationProps {
  onClose?: () => void;
}

const SubscriptionNotification: React.FC<SubscriptionNotificationProps> = ({ onClose }) => {
  const { 
    subscription, 
    isExpired,
    isTrial, 
    trialDaysLeft 
  } = useSubscription();

  if (!subscription) return null;
  
  // Expired trial notification
  if (isExpired && subscription.plan_type === 'trial') {
    return (
      <Link 
        to="/pricing"
        className="flex items-start p-4 rounded-lg bg-white hover:bg-slate-50 border-l-4 border-red-500 cursor-pointer"
        onClick={onClose}
      >
        <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 text-red-500 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-sm text-gray-900">Trial Expired</h4>
          <p className="text-xs text-gray-600 mt-1">
            Your free trial has expired. Subscribe now to continue using all features.
          </p>
        </div>
      </Link>
    );
  }
  
  // Trial ending soon notification (5 days or less)
  if (isTrial && trialDaysLeft !== null && trialDaysLeft <= 5 && subscription.status === 'active') {
    return (
      <Link 
        to="/pricing"
        className="flex items-start p-4 rounded-lg bg-white hover:bg-slate-50 border-l-4 border-amber-400 cursor-pointer"
        onClick={onClose}
      >
        <Clock className="h-5 w-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-sm text-gray-900">Trial Ending Soon</h4>
          <p className="text-xs text-gray-600 mt-1">
            Your free trial ends in {trialDaysLeft} {trialDaysLeft === 1 ? 'day' : 'days'}. 
            Subscribe now to avoid interruption.
          </p>
        </div>
      </Link>
    );
  }
  
  // Payment failed notification
  if (subscription.status === 'payment_failed') {
    return (
      <Link 
        to="/settings/payment"
        className="flex items-start p-4 rounded-lg bg-white hover:bg-slate-50 border-l-4 border-amber-500 cursor-pointer"
        onClick={onClose}
      >
        <CreditCard className="h-5 w-5 mr-3 mt-0.5 text-amber-500 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-sm text-gray-900">Payment Failed</h4>
          <p className="text-xs text-gray-600 mt-1">
            Your recent payment failed. Please update your payment details to avoid service interruption.
          </p>
        </div>
      </Link>
    );
  }
  
  return null;
};

export default SubscriptionNotification;
