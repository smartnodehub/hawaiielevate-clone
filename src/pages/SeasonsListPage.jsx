import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

const SEASONS = [
  {
    slug: "joulu",
    title: { fi: "Joulukylä", en: "Christmas Village" },
    icon: "🎅",
    active: { start: "12-01", end: "12-31" },
    color: "from-red-500 to-green-600"
  },
  {
    slug: "talviloma",
    title: { fi: "Talviloma-keskus", en: "Winter Holiday Center" },
    icon: "⛷️",
    active: { start: "02-15", end: "03-15" },
    color: "from-blue-500 to-purple-600"
  },
  {
    slug: "paasiäinen",
    title: { fi: "Pääsiäismarkkinat", en: "Easter Market" },
    icon: "🐰",
    active: { start: "03-20", end: "04-15" },
    color: "from-yellow-400 to-pink-500"
  },
  {
    slug: "vappu",
    title: { fi: "Vappu-tori", en: "May Day Market" },
    icon: "🎈",
    active: { start: "04-30", end: "05-01" },
    color: "from-pink-500 to-purple-600"
  },
  {
    slug: "juhannus",
    title: { fi: "Juhannus-paviljonki", en: "Midsummer Pavilion" },
    icon: "🔥",
    active: { start: "06-20", end: "06-26" },
    color: "from-blue-400 to-yellow-500"
  },
  {
    slug: "kesaloma",
    title: { fi: "Kesäloma-tori", en: "Summer Holiday Market" },
    icon: "☀️",
    active: { start: "06-01", end: "08-31" },
    color: "from-yellow-400 to-blue-500"
  },
  {
    slug: "ruska",
    title: { fi: "Ruska-paviljonki", en: "Autumn Colors Pavilion" },
    icon: "🍁",
    active: { start: "09-15", end: "10-10" },
    color: "from-orange-500 to-red-600"
  },
  {
    slug: "syysloma",
    title: { fi: "Syysloma-palvelut", en: "Autumn Break Services" },
    icon: "🎃",
    active: { start: "10-15", end: "10-25" },
    color: "from-orange-600 to-purple-600"
  }
];

function SeasonCard({ season, isActive }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fi';
  const title = season.title[currentLang] || season.title.fi;

  return (
    <Link
      to={`/season/${season.slug}`}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${season.color} opacity-90`} />
      
      {isActive && (
        <div className="absolute top-4 right-4 bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          AKTIIVINEN
        </div>
      )}
      
      <div className="relative p-8 text-white">
        <div className="text-6xl mb-4">{season.icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-90">
          {new Date(new Date().getFullYear() + '-' + season.active.start).toLocaleDateString(currentLang, { day: 'numeric', month: 'long' })} - 
          {new Date(new Date().getFullYear() + '-' + season.active.end).toLocaleDateString(currentLang, { day: 'numeric', month: 'long' })}
        </p>
        
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
          <span>Katso tarjoukset</span>
          <span className="group-hover:translate-x-1 transition">→</span>
        </div>
      </div>
    </Link>
  );
}

export default function SeasonsListPage() {
  const { t } = useTranslation();
  
  const checkIfActive = (season) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const [startMonth, startDay] = season.active.start.split("-");
    const [endMonth, endDay] = season.active.end.split("-");
    
    const start = new Date(currentYear, parseInt(startMonth) - 1, parseInt(startDay));
    const end = new Date(currentYear, parseInt(endMonth) - 1, parseInt(endDay));
    
    if (end < start) {
      end.setFullYear(currentYear + 1);
    }
    
    return now >= start && now <= end;
  };

  // Set page title
  React.useEffect(() => {
    document.title = 'Kausikampanjat | YRITTÄJÄPOLKU';
  }, []);

  return (
    <>
      <Navbar openModal={() => {}} setShowAuth={() => {}} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">🎉 Vuoden Kausikampanjat</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Hyödynnä Suomen vuodenaikojen parhaat tarjoukset. 
              Pro-jäsenet saavat eksklusiivisen pääsyn kaikkiin kampanjoihin.
            </p>
          </div>
        </section>

        {/* Seasons Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SEASONS.map(season => (
              <SeasonCard 
                key={season.slug} 
                season={season} 
                isActive={checkIfActive(season)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Haluatko yrityksesi mukaan?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Pro-jäsenenä saat automaattisen pääsyn kaikkiin kausikampanjoihin 
              ja voit lisätä rajattomasti tarjouksia.
            </p>
            <Link
              to="/pricing"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition"
            >
              Aloita 14 päivän ilmainen kokeilu
            </Link>
          </div>
        </section>
      </div>
    </>
  );
} 