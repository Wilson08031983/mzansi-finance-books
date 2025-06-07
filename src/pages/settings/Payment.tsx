import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  cardHolder: z.string().min(3, 'Card holder name is required'),
  cardNumber: z.string()
    .min(16, 'Card number must be at least 16 digits')
    .max(19, 'Card number cannot exceed 19 digits')
    .regex(/^[0-9]+$/, 'Card number must contain only digits'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in format MM/YY'),
  cvv: z.string()
    .length(3, 'CVV must be 3 digits')
    .regex(/^[0-9]+$/, 'CVV must contain only digits'),
});

type FormValues = z.infer<typeof formSchema>;

const Payment = () => {
  const navigate = useNavigate();
  const { subscription, updateSubscriptionStatus } = useSubscription();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardHolder: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Here you would integrate with your payment processor (Stripe, PayFast, etc.)
      // For now, we'll simulate a successful payment update
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('You must be logged in to update your payment method');
        navigate('/auth/login');
        return;
      }
      
      // Get user's company email for notifications
      const { data: profile } = await supabase
        .from('profiles')
        .select('email, company_id')
        .eq('id', user.id)
        .single();
        
      if (!profile) {
        toast.error('User profile not found');
        return;
      }
      
      // Update subscription status if it was in payment_failed state
      if (subscription?.status === 'payment_failed') {
        const { error } = await supabase
          .from('subscriptions')
          .update({ 
            status: 'active',
            payment_method_id: `simulated_updated_${Date.now()}`, // Simulated payment method ID
          })
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error updating subscription status:', error);
          toast.error('Failed to update your subscription status');
          return;
        }
        
        // Send success email notification
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
              subscription_type: subscription?.plan_type === 'monthly' ? 'Monthly' : 'Annual'
            })
          }).catch(err => console.error('Error sending email notification:', err));
        }
        
        // Add payment record
        await supabase
          .from('payment_history')
          .insert([
            {
              user_id: user.id,
              company_id: profile.company_id,
              amount: subscription?.plan_type === 'monthly' ? 499 : 4990,
              status: 'succeeded',
              description: `${subscription?.plan_type === 'monthly' ? 'Monthly' : 'Annual'} subscription payment`,
              payment_method: 'card',
              payment_method_id: `simulated_updated_${Date.now()}`,
            }
          ]);
          
        // Update subscription state in context
        await updateSubscriptionStatus();
      }
      
      toast.success('Payment method updated successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error updating payment method:', error);
      toast.error('Failed to update payment method. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <div className="mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-slate-100 transition-all"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      <Card className="shadow-lg border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
          <CardTitle className="text-2xl flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            Update Payment Method
          </CardTitle>
          <CardDescription>
            Update your card details to continue your subscription
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Holder Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        {...field}
                        autoComplete="cc-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="1234 5678 9012 3456" 
                        {...field}
                        autoComplete="cc-number"
                        onChange={(e) => {
                          // Format with spaces for readability and limit length
                          const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MM/YY" 
                          {...field}
                          autoComplete="cc-exp"
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^\d/]/g, '');
                            if (value.length === 2 && !value.includes('/') && field.value.length < value.length) {
                              value += '/';
                            }
                            value = value.substring(0, 5);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input 
                          type="password"
                          placeholder="123" 
                          {...field}
                          autoComplete="cc-csc"
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <p>We use secure encryption to protect your payment information.</p>
                <p>Your card will be charged immediately if there are any outstanding payments.</p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  'Update Payment Method'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-center">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact our support at support@mokmzansibooks.com
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
