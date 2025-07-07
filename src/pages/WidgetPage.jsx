import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TodayWidget from '../components/TodayWidget';

const WidgetPage = () => {
  const [searchParams] = useSearchParams();
  
  const city = searchParams.get('city') || 'helsinki';
  const theme = searchParams.get('theme') || 'light';

  return (
    <TodayWidget 
      city={city} 
      theme={theme} 
      isIframe={true}
    />
  );
};

export default WidgetPage; 