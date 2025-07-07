import { useState, useEffect } from 'react';

export const useSubscription = () => {
  // Mock subscription data - päris rakenduses tuleks see API-st
  const [userPlan, setUserPlan] = useState('free'); // 'free', 'golden', 'premium_plus'
  
  // Feature access mapping
  const featuresByPlan = {
    free: [
      'basic_listing',
      'contact_info'
    ],
    golden: [
      'basic_listing',
      'contact_info',
      'business_logo',
      'featured_image', 
      'business_description',
      'google_maps'
    ],
    premium_plus: [
      'basic_listing',
      'contact_info',
      'business_logo',
      'featured_image',
      'business_description',
      'google_maps',
      'video',
      'reviews',
      'analytics',
      'priority_support'
    ]
  };

  // Check if user has access to specific feature
  const hasFeature = (featureName) => {
    const userFeatures = featuresByPlan[userPlan] || [];
    return userFeatures.includes(featureName);
  };

  // Mock function to upgrade plan
  const upgradePlan = (newPlan) => {
    setUserPlan(newPlan);
    // TESTING: Salvesta localStorage'sse
    localStorage.setItem('test_subscription_plan', newPlan);
    // Päris rakenduses siin oleks API kutse
  };

  // TESTING UTILITY: Plaani vahetamine testimiseks
  const setTestPlan = (plan) => {
    if (['free', 'golden', 'premium_plus'].includes(plan)) {
      localStorage.setItem('test_subscription_plan', plan);
      setUserPlan(plan);
      console.log(`🔄 Test plan changed to: ${plan.toUpperCase()}`);
    }
  };

  // Mock function to load user subscription from API
  useEffect(() => {
    // Päris rakenduses siin laaditaks kasutaja subscription andmed
    // fetch('/api/user/subscription').then(...)
    
    // TESTING: Kontrolli localStorage'st test plaani
    const testPlan = localStorage.getItem('test_subscription_plan');
    if (testPlan && ['free', 'golden', 'premium_plus'].includes(testPlan)) {
      setUserPlan(testPlan);
    } else {
      // Default 'free' plaan
      setUserPlan('free');
    }
  }, []);

  return {
    userPlan,
    hasFeature,
    upgradePlan,
    featuresByPlan,
    setTestPlan // TESTING utility
  };
}; 