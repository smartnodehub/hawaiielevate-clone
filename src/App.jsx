import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Phone, Mail, MapPin, Star, Users, Award, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PricingPage from './PricingPage';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnually, setIsAnnually] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const languageDropdownRef = useRef(null);
  const authDropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    nimi: '',
    kategoria: '',
    kunta: '',
    kaupunki: '',
    osoite: '',
    puhelinnumero: '',
    sahkoposti: '',
    kotisivu: '',
    kuvaus: ''
  });

  const [authFormData, setAuthFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const kategoriad = ['Ravintolat', 'Hotellit', 'Kiertoajelut', 'Ostokset', 'Palvelut', 'Kiinteistöt'];
  const kunnat = ['Helsinki', 'Tampere', 'Turku', 'Oulu', 'Espoo', 'Vantaa'];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      nimi: '',
      kategoria: '',
      kunta: '',
      kaupunki: '',
      osoite: '',
      puhelinnumero: '',
      sahkoposti: '',
      kotisivu: '',
      kuvaus: ''
    });
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsAuthDropdownOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsAuthDropdownOpen(false);
  };

  const closeAuthModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setAuthFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthInputChange = (e) => {
    const { name, value } = e.target;
    setAuthFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validatsioon
    const requiredFields = ['nimi', 'kategoria', 'kunta', 'kaupunki', 'osoite', 'puhelinnumero', 'sahkoposti'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Täida kõik kohustuslikud väljad!');
      return;
    }

    // Siin saaks salvestada andmebaasi
    console.log('Yritys lisatud:', formData);
    alert('Yritys lisatud edukalt!');
    closeModal();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validation
    if (!authFormData.email) {
      alert(t('auth.emailRequired'));
      return;
    }
    if (!authFormData.password) {
      alert(t('auth.passwordRequired'));
      return;
    }

    // Here you would handle login logic
    console.log('Login attempt:', { email: authFormData.email });
    alert('Login successful!');
    closeAuthModals();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validation
    if (!authFormData.firstName) {
      alert(t('auth.firstNameRequired'));
      return;
    }
    if (!authFormData.lastName) {
      alert(t('auth.lastNameRequired'));
      return;
    }
    if (!authFormData.email) {
      alert(t('auth.emailRequired'));
      return;
    }
    if (!authFormData.password) {
      alert(t('auth.passwordRequired'));
      return;
    }
    if (authFormData.password !== authFormData.confirmPassword) {
      alert(t('auth.passwordsDontMatch'));
      return;
    }

    // Here you would handle registration logic
    console.log('Registration attempt:', { 
      firstName: authFormData.firstName,
      lastName: authFormData.lastName,
      email: authFormData.email 
    });
    alert('Registration successful!');
    closeAuthModals();
  };

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageOpen(false);
  };

  const languages = [
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const businessCards = [
    {
      id: 1,
      title: t('businessesByTags.bigIslandActivities'),
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: t('businessesByTags.kauaiRestaurants'),
      image: null,
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      id: 3,
      title: t('businessesByTags.mauiRestaurants'),
      image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 4,
      title: t('businessesByTags.mauiShopLocal'),
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 5,
      title: t('businessesByTags.oahuRestaurants'),
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const visibleCards = 3;
  const maxSlides = Math.max(0, businessCards.length - visibleCards);

  const getVisibleCards = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      if (currentSlide >= businessCards.length - newVisibleCards) {
        setCurrentSlide(Math.max(0, businessCards.length - newVisibleCards));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [businessCards.length, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < maxSlides) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
      if (authDropdownRef.current && !authDropdownRef.current.contains(event.target)) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-800 text-white sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                <span className="text-black font-bold text-lg">↗</span>
              </div>
              <a href="/" className="text-2xl font-bold hover:text-yellow-400 transition-colors">YRITTÄJÄPOLKU</a>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">{t('nav.home')}</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">{t('nav.services')}</a>
              <a href="#restaurants" className="text-gray-300 hover:text-white transition-colors">{t('nav.restaurants')}</a>
              <a href="#designers" className="text-gray-300 hover:text-white transition-colors">{t('nav.services')}</a>
              <a href="#breakfast" className="text-gray-300 hover:text-white transition-colors">{t('nav.bb')}</a>
              <a href="#todo" className="text-gray-300 hover:text-white transition-colors">{t('nav.tours')}</a>
              <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">{t('nav.pricing')}</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</a>
            </nav>

            <div className="flex items-center space-x-4">
              <span className="text-sm">📞 (808) 555-0123</span>
              
              {/* Language Switcher */}
              <div className="relative" ref={languageDropdownRef}>
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 text-sm hover:text-gray-300 transition-colors"
                >
                  <span>🌐</span>
                  <span>{currentLanguage.flag}</span>
                  <span>{currentLanguage.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-10">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Auth Dropdown */}
              <div className="relative" ref={authDropdownRef}>
                <button
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center space-x-2 text-sm hover:text-gray-300 transition-colors"
                >
                  <span>👤</span>
                  <span>{t('auth.login')}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-10">
                    <button
                      onClick={openLoginModal}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {t('auth.login')}
                    </button>
                    <button
                      onClick={openRegisterModal}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {t('auth.register')}
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                {t('addBusiness')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder={t('hero.searchPlaceholder')}
              className="flex-1 px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <select className="px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
              <option>{t('hero.allMunicipalities')}</option>
              {kunnat.map(kunta => (
                <option key={kunta}>{kunta}</option>
              ))}
            </select>
            <select className="px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
              <option>{t('hero.allCategories')}</option>
              {kategoriad.map(kategoria => (
                <option key={kategoria}>{kategoria}</option>
              ))}
            </select>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              {t('hero.searchButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Businesses by Tags Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">{t('businessesByTags.title')}</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
              {t('businessesByTags.seeAllListings')} →
            </a>
          </div>
          
          <div className="relative">
            {/* Left Arrow */}
            {currentSlide > 0 && (
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
                style={{ marginLeft: '-20px' }}
              >
                <ChevronLeft size={24} className="text-gray-600 hover:text-blue-600" />
              </button>
            )}
            
            {/* Right Arrow */}
            {currentSlide < maxSlides && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
                style={{ marginRight: '-20px' }}
              >
                <ChevronRight size={24} className="text-gray-600 hover:text-blue-600" />
              </button>
            )}
            
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {businessCards.map((card) => (
                  <div
                    key={card.id}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {card.image ? (
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}></div>
                      ) : (
                        <div className={`h-48 bg-gradient-to-r ${card.gradient}`}></div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                        <p className="text-gray-600 text-sm">Discover amazing businesses in this category</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('welcome.description')}
          </p>
          
          <h3 className="text-2xl font-bold text-gray-800 mb-8">Selaa yritysluokkia</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategoriad.map((kategoria, index) => {
              const colors = [
                'from-red-400 to-red-600',
                'from-purple-400 to-purple-600', 
                'from-green-400 to-green-600',
                'from-blue-400 to-blue-600',
                'from-yellow-400 to-yellow-600',
                'from-indigo-400 to-indigo-600'
              ];
              
              return (
                <div 
                  key={kategoria}
                  className={`h-32 bg-gradient-to-r ${colors[index]} rounded-lg flex items-center justify-center text-white text-xl font-semibold hover:shadow-lg transition-shadow cursor-pointer`}
                >
                  {kategoria}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                  <span className="text-black font-bold text-sm">↗</span>
                </div>
                <h3 className="text-xl font-bold">YRITTÄJÄPOLKU</h3>
              </div>
              <p className="text-gray-400">
                Yhdistämme suomalaiset yritykset yhteisön kanssa. Sinun paikallinen yrityshakemistosi.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Restaurants</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Hotels</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  (808) 555-0123
                </p>
                <p className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  info@yrittajapolku.com
                </p>
                <p className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Helsinki, Suomi
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 YRITTÄJÄPOLKU. Kaikki oikeudet pidätetään.</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{t('modal.title')}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Yrityksen nimi */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.businessName')} *
                  </label>
                  <input
                    type="text"
                    name="nimi"
                    value={formData.nimi}
                    onChange={handleInputChange}
                    placeholder={t('modal.businessNamePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Kategoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.category')} *
                  </label>
                  <select
                    name="kategoria"
                    value={formData.kategoria}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t('modal.categoryPlaceholder')}</option>
                    {kategoriad.map(kategoria => (
                      <option key={kategoria} value={kategoria}>{kategoria}</option>
                    ))}
                  </select>
                </div>

                {/* Kunta */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.municipality')} *
                  </label>
                  <select
                    name="kunta"
                    value={formData.kunta}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t('modal.municipalityPlaceholder')}</option>
                    {kunnat.map(kunta => (
                      <option key={kunta} value={kunta}>{kunta}</option>
                    ))}
                  </select>
                </div>

                {/* Kaupunki */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kaupunki/Kunta *
                  </label>
                  <input
                    type="text"
                    name="kaupunki"
                    value={formData.kaupunki}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Osoite */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.address')} *
                  </label>
                  <input
                    type="text"
                    name="osoite"
                    value={formData.osoite}
                    onChange={handleInputChange}
                    placeholder={t('modal.addressPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Puhelinnumero */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="puhelinnumero"
                    value={formData.puhelinnumero}
                    onChange={handleInputChange}
                    placeholder={t('modal.phonePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Sähköposti */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.email')} *
                  </label>
                  <input
                    type="email"
                    name="sahkoposti"
                    value={formData.sahkoposti}
                    onChange={handleInputChange}
                    placeholder={t('modal.emailPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Kotisivu */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.website')}
                  </label>
                  <input
                    type="url"
                    name="kotisivu"
                    value={formData.kotisivu}
                    onChange={handleInputChange}
                    placeholder={t('modal.websitePlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Kuvaus */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('modal.description')}
                  </label>
                  <textarea
                    name="kuvaus"
                    value={formData.kuvaus}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder={t('modal.descriptionPlaceholder')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t('modal.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('modal.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{t('auth.loginTitle')}</h2>
              <button 
                onClick={closeAuthModals}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleLogin} className="p-6">
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={authFormData.email}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.password')} *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={authFormData.password}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.password')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col space-y-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('auth.loginButton')}
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t('auth.noAccount')}{' '}
                    <button
                      type="button"
                      onClick={switchToRegister}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t('auth.register')}
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">{t('auth.registerTitle')}</h2>
              <button 
                onClick={closeAuthModals}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleRegister} className="p-6">
              <div className="space-y-4">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.firstName')} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={authFormData.firstName}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.firstName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.lastName')} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={authFormData.lastName}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.lastName')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={authFormData.email}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.email')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.password')} *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={authFormData.password}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.password')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.confirmPassword')} *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={authFormData.confirmPassword}
                    onChange={handleAuthInputChange}
                    placeholder={t('auth.confirmPassword')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col space-y-4 mt-6 pt-4 border-t">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('auth.registerButton')}
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {t('auth.haveAccount')}{' '}
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {t('auth.login')}
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
};

export default App; 