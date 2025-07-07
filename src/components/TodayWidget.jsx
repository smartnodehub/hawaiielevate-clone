import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TodayWidget = ({ city = 'helsinki', theme = 'light', isIframe = false }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock API data for Pro businesses - multi-city
  const mockBusinesses = [
    // Helsinki businesses
    {
      id: 'pro-hel-1',
      name: 'Ravintola Keskiyön Aurinko',
      logoUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      offer: '🌅 Aamiaistarjous: 2 hengen aamiainen vain 25€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.8,
      reviewCount: 142,
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'pro-hel-2',
      name: 'Spa & Wellness Keskus',
      logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      offer: '🧘‍♀️ Rentoutumispäivä: Hieronta + sauna 45€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.9,
      reviewCount: 87,
      updatedAt: new Date('2024-01-14')
    },
    {
      id: 'pro-hel-3',
      name: 'Kiertoajelut Suomessa',
      logoUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      offer: '🚌 Kaupunkikierros: 3h opastettu kierros 19€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.7,
      reviewCount: 203,
      updatedAt: new Date('2024-01-13')
    },
    {
      id: 'pro-hel-4',
      name: 'Käsityöpaja Kultala',
      logoUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=300&fit=crop',
      offer: '🎨 Kultasepän kurssi: Oma koru 3h, 79€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.6,
      reviewCount: 56,
      updatedAt: new Date('2024-01-12')
    },
    {
      id: 'pro-hel-5',
      name: 'Kahvila Sieni',
      logoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
      offer: '☕ Erikoiskahvit: Tänään -20% kaikki kahvit',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.5,
      reviewCount: 89,
      updatedAt: new Date('2024-01-11')
    },
    {
      id: 'pro-hel-6',
      name: 'Vintage Boutique',
      logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      offer: '👗 Vintage-löydöt: Valitut tuotteet -50%',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.4,
      reviewCount: 124,
      updatedAt: new Date('2024-01-10')
    },
    {
      id: 'pro-hel-7',
      name: 'Sauna Kulttuuri',
      logoUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
      offer: '🔥 Löyly + olut: Perinteinen saunailta 32€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.8,
      reviewCount: 167,
      updatedAt: new Date('2024-01-09')
    },
    {
      id: 'pro-hel-8',
      name: 'Luonto & Liikunta',
      logoUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      offer: '🚴 Pyöräily + kahvi: Opastettu retki 25€',
      city: 'Helsinki',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.6,
      reviewCount: 98,
      updatedAt: new Date('2024-01-08')
    },
    // Tampere businesses
    {
      id: 'pro-tre-1',
      name: 'Tampere Makuravintola',
      logoUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop',
      offer: '🍽️ Lounasbuffet: Teollisuuden herkut, 18€',
      city: 'Tampere',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.7,
      reviewCount: 234,
      updatedAt: new Date('2024-01-16')
    },
    {
      id: 'pro-tre-2',
      name: 'Näsinneula Tours',
      logoUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
      offer: '🏗️ Näsinneula + Särkänniemi: Päivälippu 35€',
      city: 'Tampere',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.8,
      reviewCount: 156,
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 'pro-tre-3',
      name: 'Pyynikki Munkki',
      logoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      offer: '🍩 Kuuluisat munkit: Osta 5, saa 6!',
      city: 'Tampere',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.9,
      reviewCount: 445,
      updatedAt: new Date('2024-01-14')
    },
    // Oulu businesses
    {
      id: 'pro-oul-1',
      name: 'Pohjois-Suomen Aktiviteetit',
      logoUrl: 'https://images.unsplash.com/photo-1551524164-6cf2ac121c3c?w=400&h=300&fit=crop',
      offer: '❄️ Talvi-safari: Revontulet + moottorikelkka 89€',
      city: 'Oulu',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.7,
      reviewCount: 89,
      updatedAt: new Date('2024-01-17')
    },
    {
      id: 'pro-oul-2',
      name: 'Oulu Kala & Merentuotteet',
      logoUrl: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
      offer: '🐟 Perämeren lohi: Tuore kala suoraan kalastajalta',
      city: 'Oulu',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.6,
      reviewCount: 78,
      updatedAt: new Date('2024-01-16')
    },
    // Turku businesses
    {
      id: 'pro-tku-1',
      name: 'Aurajoki Cruise',
      logoUrl: 'https://images.unsplash.com/photo-1502550900787-e956c314a221?w=400&h=300&fit=crop',
      offer: '⛵ Aurajoki-risteily: 1h kaupunkikierros 22€',
      city: 'Turku',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.5,
      reviewCount: 167,
      updatedAt: new Date('2024-01-18')
    },
    {
      id: 'pro-tku-2',
      name: 'Turku Linna Guiding',
      logoUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&h=300&fit=crop',
      offer: '🏰 Turun linna: Opastettu kierros + kahvi 25€',
      city: 'Turku',
      plan: 'PRO',
      showInWidget: true,
      rating: 4.8,
      reviewCount: 198,
      updatedAt: new Date('2024-01-17')
    }
  ];

  // Mock API call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        // Filter businesses by city and shuffle
        const filteredBusinesses = mockBusinesses
          .filter(business => 
            business.plan === 'PRO' && 
            business.showInWidget && 
            business.city.toLowerCase() === city.toLowerCase()
          )
          .sort(() => Math.random() - 0.5) // Shuffle
          .slice(0, 8); // Take max 8 items
        
        setData(filteredBusinesses);
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, [city]);

  const bg = theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white text-gray-900';
  const cardBg = theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-200';
  const linkColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const today = new Date().toLocaleDateString('fi-FI', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`${bg} font-sans p-4 min-h-screen ${isIframe ? 'iframe-widget' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Mida teha {cityName} täna?
          </h1>
          <p className="text-sm opacity-75">{today}</p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm opacity-75">Laen pakkumisi...</p>
          </div>
        )}

        {/* Business listings */}
        {!loading && data && (
          <div className="space-y-4">
            {data.map((business) => (
              <div
                key={business.id}
                className={`flex items-center gap-4 rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow ${cardBg}`}
              >
                {/* Business logo */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={business.logoUrl}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Business info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{business.name}</h3>
                    <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      PRO
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-green-600 mb-2">
                    {business.offer}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm opacity-75">
                    <span>⭐ {business.rating.toFixed(1)}</span>
                    <span>({business.reviewCount} hinnangut)</span>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex-shrink-0">
                  {isIframe ? (
                    <a
                      href={`https://yrittajapolku.fi/business/${business.id}`}
                      target="_parent"
                      className={`${linkColor} hover:underline font-medium px-4 py-2 rounded-lg border transition-colors`}
                    >
                      Ava →
                    </a>
                  ) : (
                    <Link
                      to={`/business/${business.id}`}
                      className={`${linkColor} hover:underline font-medium px-4 py-2 rounded-lg border transition-colors`}
                    >
                      Ava →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No data state */}
        {!loading && (!data || data.length === 0) && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏪</div>
            <p className="text-lg mb-2">Hetkel pole {cityName} pakkumisi</p>
            <p className="text-sm opacity-75">Kontrolli hiljem uuesti</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center border-t pt-6">
          {isIframe ? (
            <a
              href={`https://yrittajapolku.fi/${city.toLowerCase()}`}
              target="_parent"
              className={`${linkColor} hover:underline text-sm font-medium`}
            >
              Vaata kõiki {cityName} pakkumisi →
            </a>
          ) : (
            <Link
              to={`/${city.toLowerCase()}`}
              className={`${linkColor} hover:underline text-sm font-medium`}
            >
              Vaata kõiki {cityName} pakkumisi →
            </Link>
          )}
          
          <div className="mt-4 text-xs opacity-50">
            Powered by Yrittäjäpolku
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayWidget; 