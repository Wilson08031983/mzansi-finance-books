
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePaystackPayment } from 'react-paystack';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowLeft } from 'lucide-react';
import { PAYSTACK_CONFIG, SUBSCRIPTION_PLANS, formatPrice } from '@/lib/paystack';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail || 'user@example.com',
    amount: selectedPlan ? SUBSCRIPTION_PLANS[selectedPlan as keyof typeof SUBSCRIPTION_PLANS].price : 0,
    publicKey: PAYSTACK_CONFIG.publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentSuccess = (reference: any) => {
    console.log('Payment successful:', reference);
    setIsProcessing(false);
    setShowPaymentModal(false);
    
    // Store subscription info in localStorage for now
    localStorage.setItem('subscription', JSON.stringify({
      plan: selectedPlan,
      reference: reference.reference,
      status: 'active',
      startDate: new Date().toISOString(),
    }));
    
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
      // Handle free trial
      localStorage.setItem('subscription', JSON.stringify({
        plan: 'trial',
        status: 'trial',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }));
      navigate('/dashboard');
      return;
    }
    
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (!userEmail) {
      alert('Please enter your email address');
      return;
    }
    
    setIsProcessing(true);
    
    initializePayment({
      onSuccess: handlePaymentSuccess,
      onClose: handlePaymentClose,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 text-gray-600 hover:text-purple-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the perfect plan for your South African business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
              <Card
                key={key}
                className={`relative transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  key === 'monthly'
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-purple-200'
                }`}
                onClick={() => handleSelectPlan(key)}
              >
                {key === 'monthly' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-800">
                      {plan.price === 0 ? 'Free' : formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600">
                        /{key === 'annual' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {key === 'annual' && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save 5% annually
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full h-12 font-semibold transition-all duration-300 ${
                      key === 'monthly'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.price === 0 ? 'Start Free Trial' : 'Choose Plan'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Complete Your Payment</DialogTitle>
            <DialogDescription className="text-center">
              You're about to subscribe to the{' '}
              {selectedPlan && SUBSCRIPTION_PLANS[selectedPlan as keyof typeof SUBSCRIPTION_PLANS].name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                {selectedPlan && formatPrice(SUBSCRIPTION_PLANS[selectedPlan as keyof typeof SUBSCRIPTION_PLANS].price)}
              </div>
              <div className="text-gray-600">
                {selectedPlan === 'annual' ? 'per year' : 'per month'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing || !userEmail}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
