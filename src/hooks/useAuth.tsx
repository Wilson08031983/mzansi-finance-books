
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

// Define user data interface to replace 'any' type
interface UserMetadata {
  first_name?: string;
  last_name?: string;
  company_name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: UserMetadata) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Flag to avoid state updates if the component unmounts during async operations
    let isMounted = true;
    
    const getSession = async () => {
      try {
        console.log("🔍 Checking for existing auth session...");
        const { data: { session } } = await supabase.auth.getSession();
        if (isMounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            console.log("✅ User is authenticated:", session.user.email);
          } else {
            console.log("ℹ️ No authenticated user found");
          }
        }
      } catch (error) {
        console.error("❌ Error fetching auth session:", error);
        // Prevent white screen by not blocking the UI even if auth fails
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Set a timeout to ensure loading state is cleared even if everything fails
    const fallbackTimer = setTimeout(() => {
      if (isMounted && loading) {
        console.warn("⚠️ Auth check is taking too long, forcing UI to load");
        setLoading(false);
      }
    }, 5000); // 5 second fallback

    getSession();

    let authSubscription: { unsubscribe: () => void } | null = null;

    try {
      console.log("🔄 Setting up auth state change listener...");
      const { data } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (isMounted) {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        }
      );
      
      authSubscription = data.subscription;
    } catch (error) {
      console.error("❌ Error setting up auth state change listener:", error);
      if (isMounted) {
        setLoading(false);
      }
    }

    // Cleanup function
    return () => {
      isMounted = false;
      clearTimeout(fallbackTimer);
      if (authSubscription) {
        try {
          authSubscription.unsubscribe();
        } catch (error) {
          console.error("Error unsubscribing from auth events:", error);
        }
      }
    };
  }, [loading]);

  const signUp = async (email: string, password: string, userData: UserMetadata) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
