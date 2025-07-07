import { useState, useEffect } from "react";

const AdvancedWidgetDemo = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [visibleItems, setVisibleItems] = useState(3);

  const [city, setCity] = useState("oulu");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const mockData = [
    {
      id: "1",
      name: "Ravintola Sokeri-Jussi",
      logoUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=64&h=64&fit=crop&crop=center",
      offer: "Lounaspakkumine -20%",
      description: "Maitsev koduköök südamega valmistatud. Täna eriti hea kalasüü ja kodused korvikesed.",
      address: "Kirkkokatu 3, Oulu"
    },
    {
      id: "2", 
      name: "Aktiviteedi Keskus",
      logoUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=64&h=64&fit=crop&crop=center",
      offer: "Tasuta proovisessioon",
      description: "Kiipamine, bowlingu ja lasertag - kõik ühes kohas! Täna avatud kuni 22:00.",
      address: "Kauppurienkatu 23, Oulu"
    },
    {
      id: "3",
      name: "Oulu Kylpylä",
      logoUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=64&h=64&fit=crop&crop=center", 
      offer: "Saunaõhtu 50% soodustus",
      description: "Lõõgastav saunaõhtu koos massaažiga. Täna eriline temaatiline õhtu.",
      address: "Nahkatehtaankatu 4, Oulu"
    },
    {
      id: "4",
      name: "Kulttuurikeskus",
      logoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center",
      offer: "Kontsert täna 19:00",
      description: "Kohalik jazz-bänd esitab klassikuid. Atmosfäärikas õhtu muusika sõpradele.",
      address: "Kulttuurikatu 1, Oulu"
    },
    {
      id: "5",
      name: "Kohvik Aroma",
      logoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=64&h=64&fit=crop&crop=center",
      offer: "Kook + kohv 8€",
      description: "Värskelt küpsetatud kooke ja maailma parimaid kohvisegundasid. Täna erikooke!",
      address: "Pakkahuoneenkatu 12, Oulu"
    },
    {
      id: "6",
      name: "Adventure Park",
      logoUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=64&h=64&fit=crop&crop=center",
      offer: "Seikluspäev terele perele",
      description: "Zipline, takistusrajad ja loodusretk. Täna eriline pereprogram perega.",
      address: "Metsätie 15, Oulu"
    }
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("et-EE", { 
        hour: "2-digit", 
        minute: "2-digit" 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = false; // Always use light theme
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const today = new Date().toLocaleDateString("et-EE", {
    weekday: "long",
    day: "numeric", 
    month: "long",
  });

  const gradientClass = isDark 
    ? "from-slate-900 via-slate-800 to-slate-900" 
    : "from-blue-50 via-white to-indigo-50";

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl">
      {/* Demo Controls */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
        <h3 className="font-bold text-lg mb-3">Widget Demo Kontrollid</h3>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Linn:</label>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="oulu">Oulu</option>
              <option value="helsinki">Helsinki</option>
              <option value="tampere">Tampere</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Värskenda
            </button>
          </div>
        </div>
      </div>

      {/* Widget Preview */}
      <div className={`bg-gradient-to-br ${gradientClass} rounded-2xl overflow-hidden shadow-xl border-2 ${isDark ? 'border-slate-700' : 'border-white/20'}`}>
        <div className="relative min-h-[500px] overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500 rounded-full blur-xl animate-bounce delay-500"></div>
          </div>

          <div className="relative z-10 p-6">
            {/* Modern header */}
            <header className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <div>
                    <h1 className={`text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                      Mida teha {cityName}s täna?
                    </h1>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} flex items-center gap-2`}>
                      <span className="animate-pulse">🕐</span>
                      {today} • {currentTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-white/80 text-slate-600'} backdrop-blur-sm`}>
                    ✨ Live
                  </div>
                </div>
              </div>
            </header>

            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin advanced-reverse-spin delay-150"></div>
                </div>
                <p className={`mt-4 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} animate-pulse`}>
                  Otsime parimaid pakkumisi...
                </p>
              </div>
            )}

            {/* Business cards */}
            {!isLoading && (
              <div className="space-y-4">
                {mockData.slice(0, visibleItems).map((business, index) => (
                  <div
                    key={business.id}
                    className={`group relative overflow-hidden rounded-2xl ${
                      isDark ? 'bg-slate-800/50' : 'bg-white/80'
                    } backdrop-blur-sm border ${
                      isDark ? 'border-slate-700' : 'border-white/20'
                    } shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer advanced-fade-in-up`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative p-5">
                      <div className="flex items-start gap-4">
                        {/* Logo with hover effect */}
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <img
                              src={business.logoUrl}
                              alt={business.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          {/* Floating badge */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white text-xs">✨</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-blue-600 transition-colors`}>
                            {business.name}
                          </h3>
                          
                          <div className="mb-3">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium shadow-lg">
                              🎯 {business.offer}
                            </span>
                          </div>
                          
                          <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed advanced-line-clamp-2 mb-3`}>
                            {business.description}
                          </p>
                          
                          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-1`}>
                            <span className="text-blue-500">📍</span>
                            {business.address}
                          </p>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="flex-shrink-0">
                          <button className="group/btn relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105">
                            <span>Avasta</span>
                            <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show more button */}
                {mockData.length > visibleItems && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setVisibleItems(prev => Math.min(prev + 3, mockData.length))}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700 text-white hover:bg-slate-600' 
                          : 'bg-white/80 text-slate-700 hover:bg-white'
                      } backdrop-blur-sm border ${
                        isDark ? 'border-slate-600' : 'border-white/20'
                      } shadow-lg hover:shadow-xl hover:scale-105`}
                    >
                      <span>Näita rohkem</span>
                      <span className="animate-bounce">⬇️</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <footer className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <button className={`group inline-flex items-center gap-2 text-sm font-medium ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                } transition-colors`}>
                  <span>Vaata kõiki pakkumisi</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'} flex items-center gap-2`}>
                  <span className="animate-pulse">⚡</span>
                  <span>Reaalajas uuendatud</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedWidgetDemo; 