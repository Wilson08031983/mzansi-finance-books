import React from 'react';

interface AccessGuardProps {
  children: React.ReactNode;
  requiresFullAccess?: boolean;
  fallback?: React.ReactNode;
}

// Simplified AccessGuard that always renders its children for development purposes
const AccessGuard = ({ 
  children, 
  requiresFullAccess = false, 
  fallback 
}: AccessGuardProps) => {
  // Always render children to avoid white screens
  return <>{children}</>;
};

export default AccessGuard;
