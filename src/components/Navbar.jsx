import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { supabase } from '../supabaseClient';

const Navbar = ({ openModal, setShowAuth }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageDropdownRef = useRef(null);

  const languages = [
    { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsLanguageOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center h-16">
          {/* Vasak: Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
              <span className="text-black font-bold text-lg">↗</span>
            </div>
            <a href="/" className="text-2xl font-bold hover:text-yellow-400 transition-colors">YRITTÄJÄPOLKU</a>
          </div>
          
          {/* Keskosa: Menüü */}
          <nav className="hidden lg:flex items-center space-x-10 flex-1 justify-center">
            <a href="/" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">{t('nav.home')}</a>
            <a href="#services" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">{t('nav.services')}</a>
            <a href="#restaurants" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">{t('nav.restaurants')}</a>
            <a href="/today" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">{t('nav.tours')}</a>
            <div className="relative group">
              <button className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1 font-medium text-sm uppercase tracking-wide">
                <span>{t('nav.seasons')}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link to="/season/juhannus" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-t-lg">🌞 Juhannus</Link>
                <Link to="/season/ruska" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">🍁 Ruska</Link>
                <Link to="/season/joulu" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-b-lg">🎅 Jõul</Link>
              </div>
            </div>
            <a href="/pricing" className="text-gray-300 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide">{t('nav.pricing')}</a>
          </nav>
          
          {/* Parem: nupud ja keelevahetus */}
          <div className="flex items-center gap-x-3 shrink-0">
            {/* Keelevahetus */}
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

            {/* Auth Section */}
            {!user ? (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center space-x-2 text-sm hover:text-gray-300 transition-colors shrink-0"
              >
                <span>👤</span>
                <span>Kirjaudu</span>
              </button>
            ) : (
              <button
                onClick={async () => { await supabase.auth.signOut(); }}
                className="flex items-center space-x-2 text-sm hover:text-gray-300 transition-colors shrink-0"
              >
                <span>👤</span>
                <span>Logi välja</span>
              </button>
            )}
            
            <button 
              onClick={openModal}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
            >
              {t('addBusiness')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 