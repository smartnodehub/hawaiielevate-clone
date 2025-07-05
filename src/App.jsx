import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Phone, User, Plus, Menu, X, MapPin, Star, Clock, Globe, ChevronDown } from 'lucide-react';

const App = () => {
  const { t, i18n } = useTranslation();

  // Update document title when language changes
  useEffect(() => {
    document.title = `${t('site_title')} - ${t('site_subtitle')}`;
  }, [t, i18n.language]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(t('all_counties'));
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  const languages = [
    { code: 'fi', name: 'Suomi' },
    { code: 'en', name: 'English' },
    { code: 'sv', name: 'Svenska' }
  ];
  const regions = [
    'Kaikki maakunnat',
    'Uusimaa',
    'Varsinais-Suomi',
    'Satakunta',
    'Kanta-Häme',
    'Pirkanmaa',
    'Päijät-Häme',
    'Kymenlaakso',
    'Etelä-Karjala',
    'Etelä-Savo',
    'Pohjois-Savo',
    'Pohjois-Karjala',
    'Keski-Suomi',
    'Etelä-Pohjanmaa',
    'Pohjanmaa',
    'Keski-Pohjanmaa',
    'Pohjois-Pohjanmaa',
    'Kainuu',
    'Lappi',
    'Ahvenanmaa'
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
    // Update selected region text when language changes
    if (selectedRegion === 'Kaikki maakunnat' || selectedRegion === 'All Counties' || selectedRegion === 'Alla landskap') {
      setSelectedRegion(t('all_counties'));
    }
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language)?.name || 'Suomi';

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 py-2">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="text-white font-bold text-base">HT</div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-base font-semibold text-gray-800">Hawaii Thrive</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex space-x-6">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.home')}</a>
              <a href="#restaurants" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.restaurants')}</a>
              <a href="#interior-designers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.interior_designers')}</a>
              <a href="#bed-breakfast" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.bed_breakfast')}</a>
              <a href="#things-to-do" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.things_to_do')}</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.pricing')}</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm">{t('navigation.about')}</a>
            </nav>
            
            {/* Right Side - Phone, Language, Login, Add Business */}
            <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
              {/* Phone Number */}
              <div className="hidden lg:flex items-center space-x-1 text-gray-700">
                <Phone size={16} />
                <span className="font-medium text-sm">(808) 555-0123</span>
              </div>
              
              {/* Language Selector */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors p-1"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <Globe size={16} />
                  <span className="hidden md:inline text-sm">{currentLanguage}</span>
                  <ChevronDown size={14} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Login/Register */}
              <button className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors p-1">
                <User size={16} />
                <span className="text-sm">{t('login_register')}</span>
              </button>
              
              {/* Add New Business */}
              <button className="bg-blue-600 text-white px-2 md:px-3 py-1.5 md:py-2 rounded font-medium hover:bg-blue-700 transition-colors flex items-center space-x-1">
                <Plus size={14} className="md:w-4 md:h-4" />
                <span className="hidden md:inline text-xs md:text-sm">{t('add_new_business')}</span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="xl:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="xl:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 z-40">
              <nav className="flex flex-col space-y-4 px-4">
                <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.home')}</a>
                <a href="#restaurants" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.restaurants')}</a>
                <a href="#interior-designers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.interior_designers')}</a>
                <a href="#bed-breakfast" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.bed_breakfast')}</a>
                <a href="#things-to-do" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.things_to_do')}</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.pricing')}</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">{t('navigation.about')}</a>
                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-1 text-gray-700 mb-2">
                    <User size={18} />
                    <span>{t('login_register')}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Phone size={18} />
                    <span>(808) 555-0123</span>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with City Background */}
      <section className="relative min-h-[400px] md:h-96 bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 600\'%3E%3Cdefs%3E%3ClinearGradient id=\'hawaiiCity\' x1=\'0%25\' y1=\'0%25\' x2=\'100%25\' y2=\'100%25\'%3E%3Cstop offset=\'0%25\' style=\'stop-color:%23087CB8;stop-opacity:1\' /%3E%3Cstop offset=\'100%25\' style=\'stop-color:%2306B6D4;stop-opacity:1\' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=\'1200\' height=\'600\' fill=\'url(%23hawaiiCity)\'/%3E%3C!-- Buildings silhouette --%3E%3Crect x=\'50\' y=\'300\' width=\'80\' height=\'300\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3Crect x=\'150\' y=\'250\' width=\'60\' height=\'350\' fill=\'%23ffffff\' opacity=\'0.8\'/%3E%3Crect x=\'230\' y=\'280\' width=\'90\' height=\'320\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3Crect x=\'340\' y=\'200\' width=\'70\' height=\'400\' fill=\'%23ffffff\' opacity=\'0.95\'/%3E%3Crect x=\'430\' y=\'220\' width=\'85\' height=\'380\' fill=\'%23ffffff\' opacity=\'0.85\'/%3E%3Crect x=\'540\' y=\'180\' width=\'75\' height=\'420\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3Crect x=\'640\' y=\'240\' width=\'95\' height=\'360\' fill=\'%23ffffff\' opacity=\'0.8\'/%3E%3Crect x=\'760\' y=\'260\' width=\'65\' height=\'340\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3Crect x=\'850\' y=\'220\' width=\'80\' height=\'380\' fill=\'%23ffffff\' opacity=\'0.85\'/%3E%3Crect x=\'950\' y=\'290\' width=\'70\' height=\'310\' fill=\'%23ffffff\' opacity=\'0.8\'/%3E%3Crect x=\'1040\' y=\'250\' width=\'90\' height=\'350\' fill=\'%23ffffff\' opacity=\'0.9\'/%3E%3C!-- Palm trees --%3E%3Cpath d=\'M100,400 Q90,380 80,400 Q90,420 100,400 M120,400 Q110,380 100,400 Q110,420 120,400\' fill=\'%2316A085\' opacity=\'0.7\'/%3E%3Cpath d=\'M900,420 Q890,400 880,420 Q890,440 900,420 M920,420 Q910,400 900,420 Q910,440 920,420\' fill=\'%2316A085\' opacity=\'0.7\'/%3E%3C/svg%3E")'
               }}>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-3 py-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-3xl">
            {t('site_title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 font-light max-w-3xl">
            {t('site_subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-4xl mx-auto px-3">
            <div className="flex flex-col lg:flex-row gap-2 md:gap-3">
              {/* Search Input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder={t('search_placeholder')}
                  className="w-full px-3 py-3 text-base md:text-lg text-gray-800 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
              </div>
              
              {/* Region Dropdown */}
              <div className="relative w-full lg:w-48 flex-shrink-0">
                <button 
                  className="w-full px-3 py-3 text-base md:text-lg text-gray-800 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center justify-between"
                  onClick={() => setIsRegionOpen(!isRegionOpen)}
                >
                  <span className="truncate">{selectedRegion}</span>
                  <ChevronDown size={18} className="flex-shrink-0 ml-2" />
                </button>
                {isRegionOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg py-2 z-50 max-h-60 overflow-y-auto">
                    {regions.map((region) => (
                      <button
                        key={region}
                        className="block w-full text-left px-3 py-2 text-sm md:text-base text-gray-800 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          setSelectedRegion(region);
                          setIsRegionOpen(false);
                        }}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Search Button */}
              <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-base md:text-lg w-full lg:w-auto flex-shrink-0">
                {t('search_button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-3 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {t('welcome_title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            {t('welcome_subtitle')}
          </p>
        </div>
      </section>

      {/* Business Categories */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-12 text-center">{t('browse_categories')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {/* Restaurants */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-red-500 to-orange-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.restaurants.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.restaurants.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.restaurants.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>

            {/* Interior Designers */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.interior_designers.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.interior_designers.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.interior_designers.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>

            {/* Bed & Breakfast */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-green-500 to-teal-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.bed_breakfast.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.bed_breakfast.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.bed_breakfast.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>

            {/* Things To Do */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-cyan-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.things_to_do.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.things_to_do.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.things_to_do.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>

            {/* Home Services */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-yellow-500 to-orange-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.home_services.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.home_services.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.home_services.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>

            {/* Local Businesses */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
              <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-500 relative">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{t('categories.local_businesses.title')}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{t('categories.local_businesses.description')}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>{t('categories.local_businesses.action')}</span>
                  <Search className="ml-2" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-3">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-12 text-center">{t('featured_businesses')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-teal-400"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Aloha Restaurant</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-current" size={16} />
                    <span className="ml-1 text-gray-600">4.8</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">Traditional Hawaiian Cuisine</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} />
                  <span className="ml-1">Honolulu, HI</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Island Interiors</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-current" size={16} />
                    <span className="ml-1 text-gray-600">4.9</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">Interior Design Studio</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} />
                  <span className="ml-1">Maui, HI</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-blue-400"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Paradise B&B</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-current" size={16} />
                    <span className="ml-1 text-gray-600">4.7</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">Luxury Bed & Breakfast</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin size={14} />
                  <span className="ml-1">Kauai, HI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-3 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{t('ready_to_grow')}</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            {t('grow_description')}
          </p>
          <button className="bg-white text-blue-600 px-6 md:px-8 py-3 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors w-full sm:w-auto">
            {t('add_business_now')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="text-white font-bold">HT</div>
                </div>
                <h3 className="text-xl font-bold">Hawaii Thrive</h3>
              </div>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.categories_title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('navigation.restaurants')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('navigation.interior_designers')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('navigation.bed_breakfast')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('navigation.things_to_do')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.business_title')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.add_business')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('navigation.pricing')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.business_login')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.support')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.contact_title')}</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>(808) 555-0123</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>Honolulu, Hawaii</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;