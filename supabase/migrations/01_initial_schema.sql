-- Create profiles table (connects to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL,
  access_level TEXT,
  status TEXT NOT NULL,
  paystack_reference TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT NOT NULL,
  paystack_reference TEXT NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE,
  retry_count INTEGER DEFAULT 0,
  last_retry_date TIMESTAMP WITH TIME ZONE,
  final_failure_date TIMESTAMP WITH TIME ZONE,
  admin_notified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create failed payment notifications table
CREATE TABLE IF NOT EXISTS public.failed_payment_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  notification_sent_at TIMESTAMP WITH TIME ZONE,
  retry_attempts INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team invitations table
CREATE TABLE IF NOT EXISTS public.team_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invited_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  invited_email TEXT NOT NULL,
  invitation_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + interval '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create helper functions
CREATE OR REPLACE FUNCTION public.generate_invitation_token() 
RETURNS TEXT
LANGUAGE SQL
AS $$
  SELECT encode(gen_random_bytes(24), 'hex');
$$;

-- Create subscription access check function
CREATE OR REPLACE FUNCTION public.check_subscription_access(user_uuid UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  subscription_status TEXT;
  subscription_end_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get the latest active subscription for the user
  SELECT status, end_date INTO subscription_status, subscription_end_date
  FROM public.subscriptions
  WHERE user_id = user_uuid
  AND (end_date IS NULL OR end_date > NOW())
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no subscription is found
  IF subscription_status IS NULL THEN
    RETURN 'no_subscription';
  END IF;
  
  -- Check subscription status
  IF subscription_status = 'active' THEN
    RETURN 'active';
  ELSIF subscription_status = 'trial' THEN
    -- Check if trial is expired
    IF subscription_end_date < NOW() THEN
      -- Update subscription status to expired
      UPDATE public.subscriptions
      SET status = 'expired'
      WHERE user_id = user_uuid AND status = 'trial' AND end_date < NOW();
      
      RETURN 'expired';
    ELSE
      RETURN 'trial';
    END IF;
  ELSE
    RETURN subscription_status; -- This could be 'expired', 'cancelled', etc.
  END IF;
END;
$$;

-- Create Row Level Security (RLS) policies
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.failed_payment_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invitations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Subscriptions: Users can read their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- Payments: Users can read their own payments
CREATE POLICY "Users can view their own payments" 
  ON public.payments FOR SELECT 
  USING (auth.uid() = user_id);

-- Failed Payment Notifications: Users can read their own notifications
CREATE POLICY "Users can view their own payment notifications" 
  ON public.failed_payment_notifications FOR SELECT 
  USING (auth.uid() = user_id);

-- Team Invitations: Users can see invitations for their company or where they are invited
CREATE POLICY "Users can view team invitations where they are the company or invited by" 
  ON public.team_invitations FOR SELECT 
  USING (auth.uid() = company_id OR auth.uid() = invited_by);

-- Create trigger to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_team_invitations_updated_at
  BEFORE UPDATE ON public.team_invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to sync profiles with auth.users
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_after_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.create_profile_for_new_user();
