import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Quick anonymous session for business submission
  const createAnonymousSession = async () => {
    try {
      console.log('🔍 Attempting anonymous login...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
      
      const { data, error } = await supabase.auth.signInAnonymously();
      
      console.log('📊 Anonymous auth response:', { data, error });
      
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('❌ Anonymous auth error:', error);
      return null;
    }
  };

  return { user, loading, createAnonymousSession };
}; 