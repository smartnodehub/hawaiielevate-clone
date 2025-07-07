import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Award } from 'lucide-react';

const SEASONS = [
  {
    slug: "joulu",
    title: { fi: "Joulukylä", en: "Christmas Village" },
    description: { 
      fi: "Jõulutunde ja talvised elamused kogu perele",
      en: "Christmas spirit and winter experiences for the whole family"
    },
    icon: "🎅",
    active: { start: "12-01", end: "12-31" },
    color: "from-red-500 to-green-600",
    businessCount: 15
  },
  {
    slug: "talviloma",
    title: { fi: "Talviloma-keskus", en: "Winter Holiday Center" },
    description: { 
      fi: "Lappi kutsuu - hiihtolomien parhaat",
      en: "Lapland calls - best ski holiday deals"
    },
    icon: "⛷️",
    active: { start: "02-15", end: "03-15" },
    color: "from-blue-500 to-purple-600",
    businessCount: 12
  },
  {
    slug: "paasiäinen",
    title: { fi: "Pääsiäismarkkinat", en: "Easter Market" },
    description: { 
      fi: "Pääsiäisen perinteet - perheen aika",
      en: "Easter traditions - family time"
    },
    icon: "🐰",
    active: { start: "03-20", end: "04-15" },
    color: "from-yellow-400 to-pink-500",
    businessCount: 8
  },
  {
    slug: "vappu",
    title: { fi: "Vappu-tori", en: "May Day Market" },
    description: { 
      fi: "Kevään riemu - juhlapalvelut",
      en: "Spring joy - celebration services"
    },
    icon: "🎈",
    active: { start: "04-30", end: "05-01" },
    color: "from-pink-500 to-purple-600",
    businessCount: 6
  },
  {
    slug: "juhannus",
    title: { fi: "Juhannus-paviljonki", en: "Midsummer Pavilion" },
    description: { 
      fi: "Keskiyön auringon juhla erikoisruokien ja -juomien kera",
      en: "Midnight sun celebration with special foods and drinks"
    },
    icon: "🔥",
    active: { start: "06-20", end: "06-26" },
    color: "from-yellow-400 to-orange-500",
    businessCount: 12
  },
  {
    slug: "kesaloma",
    title: { fi: "Kesäloma-tori", en: "Summer Holiday Market" },
    description: { 
      fi: "4 viikkoa mökkielämää - kesän palvelut",
      en: "4 weeks at cottage - summer services"
    },
    icon: "☀️",
    active: { start: "06-01", end: "08-31" },
    color: "from-yellow-400 to-blue-500",
    businessCount: 18
  },
  {
    slug: "ruska",
    title: { fi: "Ruska-paviljonki", en: "Autumn Colors Pavilion" },
    description: { 
      fi: "Syksyn värikkäimmät kokemukset ja ruska-retket",
      en: "Autumn's most colorful experiences and foliage trips"
    },
    icon: "🍁",
    active: { start: "09-15", end: "10-10" },
    color: "from-orange-500 to-red-600",
    businessCount: 8
  },
  {
    slug: "syysloma",
    title: { fi: "Syysloma-palvelut", en: "Autumn Break Services" },
    description: { 
      fi: "Viikon hengähdys - syksyn aktiviteetit",
      en: "Week break - autumn activities"
    },
    icon: "🎃",
    active: { start: "10-15", end: "10-25" },
    color: "from-orange-600 to-purple-600",
    businessCount: 7
  }
];

function SeasonCard({ season, isActive }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'fi';
  const title = season.title[currentLang] || season.title.fi;
  const description = season.description[currentLang] || season.description.fi;

  return (
    <Link
      to={`/season/${season.slug}`}
      className="group bg-gradient-to-br bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${season.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          AKTIIVNE
        </div>
      )}
      
      <div className="relative z-10">
        <div className="text-4xl mb-3">{season.icon}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {description}
        </p>
        <div className="bg-white bg-opacity-50 rounded-lg p-2 text-xs mb-3">
          <span className="font-semibold">Aktiivne:</span> {' '}
          {new Date(new Date().getFullYear() + '-' + season.active.start).toLocaleDateString(currentLang, { day: 'numeric', month: 'short' })} - {' '}
          {new Date(new Date().getFullYear() + '-' + season.active.end).toLocaleDateString(currentLang, { day: 'numeric', month: 'short' })}
        </div>
        <div className="text-xs font-semibold text-blue-600">
          {season.businessCount}+ Pro-yritykst →
        </div>
      </div>
    </Link>
  );
}

export default function SeasonalSection() {
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

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Hooajalised Eripakkumised</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Avasta hooaja parimad pakkumised meie Pro-liikmetelt. Piiratud aja erikampaaniad!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {SEASONS.map(season => (
            <SeasonCard 
              key={season.slug} 
              season={season} 
              isActive={checkIfActive(season)}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/seasons"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition mr-4"
          >
            Vaata kõiki hooaegu
          </Link>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl">
            <Award className="h-6 w-6" />
            <span className="text-lg font-semibold">Ainult Pro-liikmetelt</span>
          </div>
        </div>
      </div>
    </section>
  );
} 