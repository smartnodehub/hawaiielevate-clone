import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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

  // Upgrade plan function (päris andmebaasis)
  const upgradePlan = async (newPlan) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Uuenda andmebaasi
        const { error } = await supabase
          .from('profiles')
          .update({ current_plan: newPlan })
          .eq('id', user.id);
        
        if (error) {
          console.error('Error updating subscription:', error);
          // Fallback localStorage'le
          localStorage.setItem('test_subscription_plan', newPlan);
        } else {
          console.log(`✅ Subscription updated to ${newPlan} in database`);
        }
      } else {
        // Kasutaja pole sisse logitud - kasuta localStorage'i
        localStorage.setItem('test_subscription_plan', newPlan);
        console.log(`🧪 Test plan updated to ${newPlan} (localStorage)`);
      }
      
      // Uuenda local state
      setUserPlan(newPlan);
    } catch (error) {
      console.error('Error in upgradePlan:', error);
      // Fallback localStorage'le
      localStorage.setItem('test_subscription_plan', newPlan);
      setUserPlan(newPlan);
    }
  };

  // TESTING UTILITY: Plaani vahetamine testimiseks
  const setTestPlan = (plan) => {
    if (['free', 'golden', 'premium_plus'].includes(plan)) {
      localStorage.setItem('test_subscription_plan', plan);
      setUserPlan(plan);
      console.log(`🔄 Test plan changed to: ${plan.toUpperCase()}`);
    }
  };

  // Load user subscription from Supabase
  useEffect(() => {
    const loadUserSubscription = async () => {
      try {
        // Kontrolli kas kasutaja on sisse logitud
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Lae kasutaja profiil ja subscription andmed
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('current_plan')
            .eq('id', user.id)
            .single();
          
          if (error) {
            console.error('Error loading user subscription:', error);
            // Fallback testing plan'ile
            const testPlan = localStorage.getItem('test_subscription_plan');
            setUserPlan(testPlan || 'free');
          } else {
            // Kasuta päris andmebaasi plaani
            setUserPlan(profile?.current_plan || 'free');
          }
        } else {
          // Kasutaja pole sisse logitud - kasuta test plaani
          const testPlan = localStorage.getItem('test_subscription_plan');
          setUserPlan(testPlan || 'free');
        }
      } catch (error) {
        console.error('Error in loadUserSubscription:', error);
        // Fallback testing plan'ile
        const testPlan = localStorage.getItem('test_subscription_plan');
        setUserPlan(testPlan || 'free');
      }
    };

    loadUserSubscription();
  }, []);

  return {
    userPlan,
    hasFeature,
    upgradePlan,
    featuresByPlan,
    setTestPlan // TESTING utility
  };
}; 