import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { FeatureTier } from '@/lib/subscription-types';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LockIcon } from 'lucide-react';



interface FeatureLimiterProps {
  children: ReactNode;
  tier: FeatureTier;
  featureName: string;
  fallback?: ReactNode;
}

/**
 * FeatureLimiter - A component that restricts access to features based on subscription status
 * 
 * @param children - The feature content to display if allowed
 * @param tier - The tier level required to access the feature
 * @param featureName - Name of the feature (shown in restriction dialog)
 * @param fallback - Optional fallback UI to show instead of the restriction dialog
 */
const FeatureLimiter: React.FC<FeatureLimiterProps> = ({ 
  children, 
  tier, 
  featureName,
  fallback
}) => {
  const { 
    subscription, 
    isLoading,
    isPaid,
    isTrial,
    isExpired
  } = useSubscription();
  
  const [showRestrictionDialog, setShowRestrictionDialog] = React.useState(false);
  
  // If subscription data is loading, show nothing yet
  if (isLoading) return null;
  
  // Determine if the user has access to this feature
  const hasAccess = (): boolean => {
    // Free tier is available to everyone
    if (tier === FeatureTier.FREE) return true;
    
    // If no subscription exists, only allow FREE tier
    if (!subscription) return false;
    
    // If subscription is expired, restrict to FREE tier
    if (isExpired) return false;
    
    // Trial tier is available to active trial users and paid users
    if (tier === FeatureTier.TRIAL) {
      return (isTrial && subscription.status === 'active') || isPaid;
    }
    
    // Paid tier is only available to paid users
    if (tier === FeatureTier.PAID) {
      return isPaid && subscription.status === 'active';
    }
    
    return false;
  };
  
  // If user has access, render the feature
  if (hasAccess()) {
    return <>{children}</>;
  }
  
  // If fallback provided, show that instead of standard dialog
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Otherwise, show a restriction dialog when clicked
  const handleClick = () => {
    setShowRestrictionDialog(true);
  };
  
  return (
    <>
      <div 
        onClick={handleClick}
        className="relative w-full h-full min-h-[120px] cursor-not-allowed group"
      >
        <div className="absolute inset-0 bg-gray-100 bg-opacity-70 backdrop-blur-[1px] 
          flex flex-col items-center justify-center z-10 border border-dashed 
          border-gray-300 rounded-md transition-all duration-300 
          group-hover:bg-opacity-80">
          <LockIcon className="h-8 w-8 text-gray-500 mb-2" />
          <p className="text-sm font-medium text-gray-700">{featureName}</p>
          <p className="text-xs text-gray-600 mt-1">
            {isExpired && isTrial 
              ? 'Trial expired. Upgrade to access this feature.' 
              : 'Requires subscription upgrade.'}
          </p>
          <div className="mt-2">
            <Link 
              to="/pricing" 
              className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md 
                hover:bg-blue-700 transition-colors duration-300"
            >
              Upgrade Now
            </Link>
          </div>
        </div>
        <div className="opacity-20 pointer-events-none">
          {children}
        </div>
      </div>
      
      <AlertDialog open={showRestrictionDialog} onOpenChange={setShowRestrictionDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feature Restricted</AlertDialogTitle>
            <AlertDialogDescription>
              {isExpired && isTrial ? (
                <>
                  Your free trial has expired. To access <strong>{featureName}</strong> and other premium features, 
                  please upgrade to a paid subscription.
                </>
              ) : !subscription ? (
                <>
                  <strong>{featureName}</strong> is only available to 
                  {tier === FeatureTier.TRIAL ? ' trial and ' : ' '}
                  paid subscribers. Start your free trial or subscribe now to access this feature.
                </>
              ) : (
                <>
                  <strong>{featureName}</strong> is only available with a paid subscription.
                  Upgrade your plan to unlock this and other premium features.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Link to="/pricing">
              <AlertDialogAction>
                {isExpired && isTrial ? 'Subscribe Now' : (!subscription ? 'Start Free Trial' : 'Upgrade Plan')}
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeatureLimiter;
