
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  description: string;
  features: string[];
  highlight?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: {
      monthly: 499,
      quarterly: 1299,
      yearly: 4999
    },
    description: 'Essential fitness guidance for beginners',
    features: [
      'Basic workout routines',
      'General meal suggestions',
      'Standard exercise library',
      'Weekly fitness tips',
      'Limited workout videos'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: {
      monthly: 999,
      quarterly: 2499,
      yearly: 8999
    },
    description: 'Comprehensive fitness solution for serious enthusiasts',
    features: [
      'Personalized workout plans',
      'Custom meal plans with recipes',
      'Full exercise video library',
      'Progress tracking',
      'Nutrition calculator',
      'Email support',
      '1 monthly coaching call'
    ],
    highlight: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    price: {
      monthly: 1999,
      quarterly: 4999,
      yearly: 15999
    },
    description: 'Elite training experience with personal guidance',
    features: [
      'All Premium features',
      'Priority 1-on-1 coaching',
      'Advanced performance analytics',
      'Personalized supplement advice',
      'Direct trainer chat support',
      'Weekly video consultations',
      'Custom training programs'
    ]
  }
];

const Subscription = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  
  const handleBillingChange = (period: 'monthly' | 'quarterly' | 'yearly') => {
    setBillingPeriod(period);
  };
  
  const formatPrice = (price: number) => {
    const rupees = Math.floor(price / 100);
    const paise = price % 100;
    return `₹${rupees}${paise ? `.${paise}` : ''}`;
  };
  
  const getDiscountPercentage = (plan: PricingPlan, period: 'quarterly' | 'yearly') => {
    const monthly = plan.price.monthly;
    const periodPrice = plan.price[period];
    
    let months = period === 'quarterly' ? 3 : 12;
    let regularPrice = monthly * months;
    let savings = regularPrice - periodPrice;
    let percentage = Math.round((savings / regularPrice) * 100);
    
    return percentage;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-fitDark to-fitDark/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1775&q=80')",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Upgrade Your Fitness Journey
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Unlock premium features, personalized workout plans, and expert guidance with our subscription plans.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Membership</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Select the plan that best suits your fitness goals and commitment level. 
              All plans include access to our core features with additional benefits as you upgrade.
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="inline-flex p-1 bg-fitDark border border-gray-700 rounded-full">
                <button
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingPeriod === 'monthly' 
                      ? 'bg-fitOrange text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => handleBillingChange('monthly')}
                >
                  Monthly
                </button>
                <button
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingPeriod === 'quarterly' 
                      ? 'bg-fitOrange text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => handleBillingChange('quarterly')}
                >
                  Quarterly
                </button>
                <button
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    billingPeriod === 'yearly' 
                      ? 'bg-fitOrange text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => handleBillingChange('yearly')}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map(plan => (
              <div 
                key={plan.id} 
                className={`relative rounded-xl overflow-hidden border ${
                  plan.highlight 
                    ? 'border-fitOrange/60 shadow-lg shadow-fitOrange/10' 
                    : 'border-gray-700'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 right-0 bg-fitOrange text-white px-4 py-1 rounded-bl-lg font-medium text-sm z-10">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-6 ${plan.highlight ? 'bg-card' : 'bg-fitDark/80'}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-300 text-sm mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-white">{formatPrice(plan.price[billingPeriod])}</span>
                      <span className="text-gray-400 ml-2">
                        / {billingPeriod === 'monthly' ? 'month' : billingPeriod === 'quarterly' ? 'quarter' : 'year'}
                      </span>
                    </div>
                    
                    {billingPeriod !== 'monthly' && (
                      <div className="mt-2 inline-block bg-fitOrange/20 text-fitOrange px-2 py-1 rounded text-xs font-medium">
                        Save {getDiscountPercentage(plan, billingPeriod)}%
                      </div>
                    )}
                  </div>
                  
                  <button className={`w-full py-3 rounded-lg font-medium ${
                    plan.highlight 
                      ? 'bg-fitOrange text-white hover:bg-orange-600' 
                      : 'bg-fitDark border border-gray-700 text-white hover:border-fitOrange'
                  }`}>
                    Get Started
                  </button>
                </div>
                
                <div className={`p-6 ${plan.highlight ? 'bg-card/80' : 'bg-fitDark/60'} border-t ${
                  plan.highlight ? 'border-fitOrange/30' : 'border-gray-800'
                }`}>
                  <h4 className="font-medium text-white mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${
                          plan.highlight ? 'text-fitOrange' : 'text-green-400'
                        }`} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-card p-8 rounded-xl border border-fitOrange/20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-white mb-2">Need help choosing?</h3>
                <p className="text-gray-300">
                  Contact us at <span className="text-fitOrange">7200954951</span> or consult with one of our fitness experts.
                </p>
              </div>
              <a 
                href="#" 
                className="fitness-btn-primary inline-flex self-start"
              >
                Schedule a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-fitDark/95">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Payment Options</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from our secure payment methods for a hassle-free subscription experience.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl border border-gray-700">
            <div className="flex flex-col gap-6">
              <div className="border-b border-gray-700 pb-6">
                <h3 className="text-lg font-medium text-white mb-4">Online Payment</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="p-3 bg-white/10 rounded-lg w-20 h-14 flex items-center justify-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/8/86/Google_Pay_Logo_%282020%29.svg" 
                      alt="Google Pay" 
                      className="h-8"
                    />
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg w-20 h-14 flex items-center justify-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                      alt="Razorpay" 
                      className="h-7"
                    />
                  </div>
                  
                  <div className="p-3 bg-white/10 rounded-lg w-20 h-14 flex items-center justify-center">
                    <span className="text-white font-medium">UPI</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Contact</h3>
                <p className="text-gray-300 mb-2">
                  For assistance or direct payment options:
                </p>
                <p className="flex items-center text-white font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-fitOrange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  7200954951
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-fitDark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <div className="bg-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">Can I cancel my subscription at any time?</h3>
                <p className="text-gray-300">
                  Yes, you can cancel your subscription at any time. For monthly plans, you'll have access until the end of your billing period. For quarterly and yearly plans, we offer prorated refunds upon cancellation.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">What's included in the personalized plans?</h3>
                <p className="text-gray-300">
                  Our personalized plans include custom workout routines based on your goals and fitness level, nutrition guidance tailored to your dietary preferences, and regular progress tracking to ensure you stay on track.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">How do I access premium workout videos?</h3>
                <p className="text-gray-300">
                  Premium workout videos are accessible immediately after subscribing to either our Premium or Ultimate plans. Simply log into your account and navigate to the Exercises or Workouts section to view the complete video library.
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">Do you offer any discounts for longer subscriptions?</h3>
                <p className="text-gray-300">
                  Yes! We offer substantial discounts for quarterly and yearly subscriptions compared to the monthly rate. The yearly plan provides the best value, with savings of up to 30%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Subscription;
