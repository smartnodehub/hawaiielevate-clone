import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

// Season configuration
const SEASONS = [
  {
    slug: "joulu",
    title: { 
      fi: "Joulukylä", 
      en: "Christmas Village" 
    },
    subtitle: {
      fi: "Rauhallista joulua - perheajan tarjoukset",
      en: "Peaceful Christmas - family time offers"
    },
    icon: "🎅",
    bgGradient: "from-red-100 via-green-50 to-white",
    active: { start: "12-01", end: "12-31" },
    categories: ["gifts", "catering", "sauna", "church", "transport", "cleaning"]
  },
  {
    slug: "talviloma",
    title: { 
      fi: "Talviloma-keskus", 
      en: "Winter Holiday Center" 
    },
    subtitle: {
      fi: "Lappi kutsuu - hiihtolomien parhaat",
      en: "Lapland calls - best ski holiday deals"
    },
    icon: "⛷️",
    bgGradient: "from-blue-100 via-purple-50 to-white",
    active: { start: "02-15", end: "03-15" },
    categories: ["skiing", "accommodation", "equipment", "transport", "guides", "restaurants"]
  },
  {
    slug: "juhannus",
    title: { 
      fi: "Juhannus-paviljonki", 
      en: "Midsummer Pavilion" 
    },
    subtitle: {
      fi: "Valoisin yö - mökkielämän palvelut",
      en: "Brightest night - cottage life services"
    },
    icon: "🔥",
    bgGradient: "from-blue-100 via-yellow-50 to-white",
    active: { start: "06-20", end: "06-26" },
    categories: ["cottage", "sauna", "boats", "catering", "events", "fishing"]
  },
  {
    slug: "ruska",
    title: { 
      fi: "Ruska-paviljonki", 
      en: "Autumn Colors Pavilion" 
    },
    subtitle: {
      fi: "Lapin väriloisto - syksyn retket",
      en: "Lapland colors - autumn excursions"
    },
    icon: "🍁",
    bgGradient: "from-orange-100 via-red-50 to-white",
    active: { start: "09-15", end: "10-10" },
    categories: ["hiking", "photography", "accommodation", "guides", "transport", "equipment"]
  },
  {
    slug: "kesaloma",
    title: { 
      fi: "Kesäloma-tori", 
      en: "Summer Holiday Market" 
    },
    subtitle: {
      fi: "4 viikkoa mökkielämää - kesän palvelut",
      en: "4 weeks at cottage - summer services"
    },
    icon: "☀️",
    bgGradient: "from-yellow-50 via-blue-50 to-white",
    active: { start: "06-01", end: "08-31" },
    categories: ["cottage", "boats", "fishing", "sauna", "maintenance", "catering"]
  },
  {
    slug: "vappu",
    title: { 
      fi: "Vappu-tori", 
      en: "May Day Market" 
    },
    subtitle: {
      fi: "Kevään riemu - juhlapalvelut",
      en: "Spring joy - celebration services"
    },
    icon: "🎈",
    bgGradient: "from-pink-100 via-purple-50 to-white",
    active: { start: "04-30", end: "05-01" },
    categories: ["catering", "events", "cleaning", "transport", "entertainment"]
  },
  {
    slug: "paasiäinen",
    title: { 
      fi: "Pääsiäismarkkinat", 
      en: "Easter Market" 
    },
    subtitle: {
      fi: "Pääsiäisen perinteet - perheen aika",
      en: "Easter traditions - family time"
    },
    icon: "🐰",
    bgGradient: "from-yellow-50 via-green-50 to-white",
    active: { start: "03-20", end: "04-15" },
    categories: ["catering", "gifts", "church", "events", "cleaning", "decoration"]
  },
  {
    slug: "syysloma",
    title: { 
      fi: "Syysloma-palvelut", 
      en: "Autumn Break Services" 
    },
    subtitle: {
      fi: "Viikon hengähdys - syksyn aktiviteetit",
      en: "Week break - autumn activities"
    },
    icon: "🎃",
    bgGradient: "from-orange-50 via-yellow-50 to-white",
    active: { start: "10-15", end: "10-25" },
    categories: ["activities", "accommodation", "restaurants", "entertainment", "transport"]
  }
];

// Countdown Timer Component
function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft(t('seasonal.offerExpired') || "Tarjous päättynyt");
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days}pv ${hours}h`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, t]);

  return (
    <span className="text-xs text-gray-600">{timeLeft}</span>
  );
}

const SeasonalPage = () => {
  const { season } = useParams();
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [isActive, setIsActive] = useState(false);

  // Find season configuration
  const seasonConfig = SEASONS.find(s => s.slug === season);

  // Check if campaign is active
  useEffect(() => {
    if (!seasonConfig) return;

    const now = new Date();
    const currentYear = now.getFullYear();
    const [startMonth, startDay] = seasonConfig.active.start.split("-");
    const [endMonth, endDay] = seasonConfig.active.end.split("-");
    
    const start = new Date(currentYear, parseInt(startMonth) - 1, parseInt(startDay));
    const end = new Date(currentYear, parseInt(endMonth) - 1, parseInt(endDay));
    
    // Handle year transition (e.g., Christmas campaign)
    if (end < start) {
      end.setFullYear(currentYear + 1);
    }
    
    setIsActive(now >= start && now <= end);
  }, [seasonConfig]);

  useEffect(() => {
    if (seasonConfig) {
      // Set document title
      const currentTitle = seasonConfig.title[i18n.language] || seasonConfig.title.fi;
      document.title = `${currentTitle} | Yrityspolku`;
      
      // Load seasonal data
      loadSeasonalData();
    }
  }, [season, seasonConfig, i18n.language]);

  const loadSeasonalData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://api.example.com';
      const response = await fetch(`${apiUrl}/businesses?season=${season}&plan=PRO&locale=${i18n.language}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch seasonal data');
      }
      
      const businesses = await response.json();
      
      // Sort: Premium first, then by rating
      const sortedData = businesses.sort((a, b) => {
        if (a.isPremium && !b.isPremium) return -1;
        if (!a.isPremium && b.isPremium) return 1;
        return (b.rating || 0) - (a.rating || 0);
      });
      
      setData(sortedData);
    } catch (err) {
      console.warn('API call failed, using mock data:', err.message);
      setData(getMockData(season));
    } finally {
      setLoading(false);
    }
  };

  const getMockData = (season) => {
    const mockData = {
      joulu: [
        {
          id: 'christmas-1',
          name: 'Jõuluturg Café',
          logoUrl: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=400&h=240&fit=crop',
          offer: '🎄 Jõulumenu ja glögi-erikoisuudet',
          offerEndDate: '2024-12-31T23:59:59',
          city: 'Helsinki',
          category: 'catering',
          rating: 4.9,
          reviewCount: 234,
          isPremium: true
        },
        {
          id: 'christmas-2',
          name: 'Lapland Christmas Magic',
          logoUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=240&fit=crop',
          offer: '🛷 Jõulupukin vierailut ja porotaxi-ajot',
          city: 'Rovaniemi',
          category: 'transport',
          rating: 4.8,
          reviewCount: 456,
          isPremium: false
        }
      ],
      juhannus: [
        {
          id: 'summer-1',
          name: 'Kesäkahvila Aurinko',
          logoUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=240&fit=crop',
          offer: '🌻 Juhannus-menu -20% + ilmainen jälkiruoka',
          city: 'Helsinki',
          category: 'catering',
          rating: 4.5,
          reviewCount: 127,
          isPremium: false
        },
        {
          id: 'summer-2',
          name: 'Mökki & Sauna Resort',
          logoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop',
          offer: '🏡 Juhannus-paketti: mökki + sauna + grillivarustus',
          city: 'Tampere',
          category: 'cottage',
          rating: 4.6,
          reviewCount: 89,
          isPremium: true
        }
      ],
      ruska: [
        {
          id: 'autumn-1',
          name: 'Ruska Restaurant',
          logoUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=240&fit=crop',
          offer: '🍂 Syksyn sieni- ja riistamenu erikoishinnoin',
          city: 'Rovaniemi',
          category: 'restaurants',
          rating: 4.7,
          reviewCount: 134,
          isPremium: false
        }
      ]
    };
    
    return mockData[season] || [];
  };

  // Handle invalid season
  if (!seasonConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hooaeg ei leitud</h1>
          <p className="text-gray-600 mb-8">Valitud hooajalist lehe ei leitud.</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Tagasi avaleht</span>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laadib hooajalisi pakkumisi...</p>
        </div>
      </div>
    );
  }

  const categories = seasonConfig.categories || [];
  const filteredData = filter === "all" 
    ? data 
    : data.filter(b => b.category === filter);

  const currentTitle = seasonConfig.title[i18n.language] || seasonConfig.title.fi;
  const currentSubtitle = seasonConfig.subtitle[i18n.language] || seasonConfig.subtitle.fi;

  return (
    <>
      {/* Hero Section */}
      <section className={`relative py-16 text-center bg-gradient-to-b ${seasonConfig.bgGradient} overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-bounce">{seasonConfig.icon}</div>
          <div className="absolute bottom-10 right-10 text-8xl animate-pulse">{seasonConfig.icon}</div>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold flex items-center justify-center gap-3">
            <span className="text-6xl">{seasonConfig.icon}</span>
            {currentTitle}
          </h1>
          
          <p className="mt-4 text-xl max-w-2xl mx-auto px-4">
            {currentSubtitle}
          </p>

          {!isActive && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-sm">
              <span>⏰</span>
              <span>Kampaania pole hetkel aktiivne</span>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/pricing"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white font-semibold hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">Liitu Pro-ga</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </Link>
            
            <Link
              to="/seasons"
              className="rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold hover:border-gray-400 transition"
            >
              Kõik hooajad
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      {categories.length > 0 && (
        <div className="sticky top-0 z-20 bg-white border-b shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-4 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Kõik kategooriad ({data.length})
            </button>
            {categories.map(cat => {
              const count = data.filter(b => b.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                    filter === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800">Viga pakkumiste laadimisel</p>
          </div>
        )}

        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">Pakkumisi ei leitud</h2>
            <p className="text-gray-600 mb-6">Kontrolli hiljem uuesti</p>
            <Link
              to="/pricing"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Ole esimene, kes liitub
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((business) => (
              <Link
                key={business.id}
                to={`/business/${business.id}`}
                className="group relative rounded-2xl border bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {business.isPremium && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    ⭐ PREMIUM
                  </div>
                )}

                <div className="relative h-32 mb-4">
                  <img
                    src={business.logoUrl || "/images/placeholder-business.png"}
                    alt={business.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h2 className="text-xl font-semibold text-center group-hover:text-blue-600 transition">
                  {business.name}
                </h2>
                
                <p className="mt-1 text-sm text-center text-gray-600">{business.city}</p>

                {business.rating && (
                  <div className="mt-2 flex items-center justify-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{business.rating.toFixed(1)}</span>
                    <span className="text-sm text-gray-500">({business.reviewCount})</span>
                  </div>
                )}

                <div className="mt-4 rounded-lg bg-gradient-to-r from-lime-100 to-green-100 p-3">
                  <p className="text-center font-medium text-green-800">
                    {business.offer}
                  </p>
                  {business.offerEndDate && (
                    <div className="mt-1 text-center">
                      <CountdownTimer endDate={business.offerEndDate} />
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1 text-sm text-blue-600 group-hover:gap-2 transition-all">
                    Vaata detaile
                    <span>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA section */}
        <section className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Tahad oma äri siia?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
            Hooajalised kampaaniad toovad sulle kuni 300% rohkem kliente. Liitu täna!
          </p>
          <Link
            to="/pricing"
            className="inline-block rounded-xl bg-white text-blue-600 px-8 py-4 font-semibold hover:shadow-xl transition"
          >
            Alusta Pro prooviversiooni
          </Link>
        </section>
      </div>
    </>
  );
};

export default SeasonalPage; 