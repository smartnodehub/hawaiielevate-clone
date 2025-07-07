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
    // Päris rakenduses siin oleks API kutse
  };

  // Mock function to load user subscription from API
  useEffect(() => {
    // Päris rakenduses siin laaditaks kasutaja subscription andmed
    // fetch('/api/user/subscription').then(...)
    
    // Demo jaoks näitame erinevaid plaane
    const mockPlans = ['free', 'golden', 'premium_plus'];
    const randomPlan = mockPlans[Math.floor(Math.random() * mockPlans.length)];
    // setUserPlan(randomPlan);
    
    // Testime praegu 'free' plaaniga
    setUserPlan('free');
  }, []);

  return {
    userPlan,
    hasFeature,
    upgradePlan,
    featuresByPlan
  };
}; 