import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Phone, Mail, MapPin, Star, Users, Award, Heart, X } from 'lucide-react';
import Navbar from './components/Navbar';
import { plans } from './data/plans';

const PricingPage = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnually, setIsAnnually] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
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

  const kategoriad = [
  // Teenused
  'Ravintolat ja kahvilat',
  'Hotellit ja majoitus',
  'Kauneuspalvelut',
  'Hiuspalvelut', 
  'Kynsipalvelut',
  'Hieronta ja spa',
  'Hammaslääkärit',
  'Lääkärit',
  'Eläinlääkärit',
  
  // Kauppa
  'Ruokakaupat',
  'Vaatekaupat',
  'Elektroniikka',
  'Huonekalut',
  'Kirjakaupat',
  'Kukkakauparát',
  'Apteekit',
  
  // Palvelut
  'Lakipalvelut',
  'Kirjanpitopalvelut', 
  'IT-palvelut',
  'Markkinointipalvelut',
  'Siivouspalvelut',
  'Rakennuspalvelut',
  'Korjauspalvelut',
  'Autokorjaamot',
  
  // Viihde & Urheilu
  'Kuntosalit',
  'Uimahallir',
  'Elokuvateatterit',
  'Museot',
  'Kiertoajelut',
  
  // Koulutus
  'Koulut',
  'Päiväkodit',
  'Musiikkikoulut',
  'Kielikoulut',
  
  // Muut
  'Pankit',
  'Vakuutusyhtiöt',
  'Kiinteistöpalvelut',
  'Kuljetuspalvelut'
];
  const kunnat = [
  'Akaa', 'Alajärvi', 'Alavieska', 'Alavus', 'Asikkala', 'Askola', 'Aura',
  'Brändö', 'Eckerö', 'Enonkoski', 'Enontekiö', 'Espoo', 'Eura', 'Eurajoki', 'Evijärvi',
  'Finström', 'Forssa', 'Föglö', 'Geta',
  'Haapajärvi', 'Haapavesi', 'Hailuoto', 'Halsua', 'Hamina', 'Hammarland', 'Hankasalmi', 'Hanko', 'Harjavalta', 'Hartola', 'Hattula', 'Hausjärvi', 'Heinola', 'Heinävesi', 'Helsinki', 'Hirvensalmi', 'Hollola', 'Huittinen', 'Humppila', 'Hyrynsalmi', 'Hyvinkää', 'Hämeenkyrö', 'Hämeenlinna',
  'Ii', 'Iisalmi', 'Iitti', 'Ikaalinen', 'Ilmajoki', 'Ilomantsi', 'Imatra', 'Inari', 'Inkoo', 'Isojoki', 'Isokyrö',
  'Jalasjärvi', 'Janakkala', 'Joensuu', 'Jokioinen', 'Jomala', 'Joroinen', 'Joutsa', 'Juuka', 'Juupajoki', 'Juva', 'Jyväskylä', 'Jämijärvi', 'Jämsä', 'Järvenpää',
  'Kaarina', 'Kaavi', 'Kajaani', 'Kalajoki', 'Kangasala', 'Kangasniemi', 'Kankaanpää', 'Kannonkoski', 'Kannus', 'Karijoki', 'Karkkila', 'Karstula', 'Karvia', 'Kaskinen', 'Kauhajoki', 'Kauhava', 'Kauniainen', 'Kaustinen', 'Keitele', 'Kemi', 'Kemijärvi', 'Keminmaa', 'Kemiönsaari', 'Kempele', 'Kerava', 'Keuruu', 'Kihniö', 'Kinnula', 'Kirkkonummi', 'Kitee', 'Kittilä', 'Kiuruvesi', 'Kivijärvi', 'Kokemäki', 'Kokkola', 'Kolari', 'Konnevesi', 'Kontiolahti', 'Korsnäs', 'Koski Tl', 'Kotka', 'Kouvola', 'Kristiinankaupunki', 'Kruunupyy', 'Kuhmo', 'Kuhmoinen', 'Kumlinge', 'Kuopio', 'Kuortane', 'Kurikka', 'Kustavi', 'Kuusamo', 'Kyyjärvi', 'Kärkölä', 'Kärsämäki', 'Kökar', 'Köyliö',
  'Lahti', 'Laihia', 'Laitila', 'Lapinjärvi', 'Lapinlahti', 'Lappajärvi', 'Lappeenranta', 'Lapua', 'Laukaa', 'Lavia', 'Lemi', 'Lemland', 'Lempäälä', 'Leppävirta', 'Lestijärvi', 'Lieksa', 'Lieto', 'Liminka', 'Liperi', 'Lohja', 'Loimaa', 'Loppi', 'Loviisa', 'Luhanka', 'Lumijoki', 'Lumparland', 'Luoto', 'Luumäki', 'Länsi-Turunmaa',
  'Maalahti', 'Maarianhamina', 'Marttila', 'Masku', 'Merijärvi', 'Merikarvia', 'Miehikkälä', 'Mikkeli', 'Muhos', 'Multia', 'Muonio', 'Mustasaari', 'Muurame', 'Mynämäki', 'Myrskylä', 'Mäntsälä', 'Mäntyharju', 'Mänttä-Vilppula',
  'Naantali', 'Nakkila', 'Nastola', 'Nilsiä', 'Nivala', 'Nokia', 'Noormarkku', 'Nousiainen', 'Nurmes', 'Nurmijärvi', 'Närpiö', 'Nykarleby',
  'Orimattila', 'Oripää', 'Orivesi', 'Oulainen', 'Oulu', 'Outokumpu', 'Outokumpu',
  'Padasjoki', 'Paimio', 'Paltamo', 'Parainen', 'Parikkala', 'Parkano', 'Pedersöre', 'Pelkosenniemi', 'Pello', 'Perho', 'Pertunmaa', 'Petäjävesi', 'Pieksämäki', 'Pielavesi', 'Pietarsaari', 'Pihtipudas', 'Pirkkala', 'Polvijärvi', 'Pomarkku', 'Pori', 'Pornainen', 'Porvoo', 'Posio', 'Pudasjärvi', 'Pukkila', 'Punkalaidun', 'Puolanka', 'Puumala', 'Pyhtää', 'Pyhäjoki', 'Pyhäjärvi', 'Pyhäntä', 'Pyhäranta', 'Pälkäne', 'Pöytyä',
  'Raahe', 'Raasepori', 'Raisio', 'Rantasalmi', 'Ranua', 'Rauma', 'Rautalampi', 'Rautavaara', 'Rautjärvi', 'Reisjärvi', 'Riihimäki', 'Ristiina', 'Ristijärvi', 'Rovaniemi', 'Ruokolahti', 'Ruovesi', 'Rusko', 'Rääkkylä',
  'Saarijärvi', 'Salla', 'Salo', 'Saltvik', 'Sastamala', 'Sauvo', 'Savitaipale', 'Savonlinna', 'Savukoski', 'Seinäjoki', 'Sievi', 'Siikainen', 'Siikajoki', 'Siilinjärvi', 'Simo', 'Sipoo', 'Siuntio', 'Sodankylä', 'Soini', 'Somero', 'Sonkajärvi', 'Sotkamo', 'Sottunga', 'Sulkava', 'Sund', 'Suomussalmi', 'Suonenjoki', 'Sysmä', 'Säkylä', 'Särkisalo',
  'Taipalsaari', 'Taivalkoski', 'Taivassalo', 'Tammela', 'Tampere', 'Tarvasjoki', 'Tervo', 'Tervola', 'Teuva', 'Tohmajärvi', 'Toholampi', 'Toivakka', 'Tornio', 'Turku', 'Tuusniemi', 'Tuusula', 'Tyrnävä', 'Tähti', 'Töysä',
  'Ulvila', 'Urjala', 'Utajärvi', 'Utsjoki', 'Uurainen', 'Uusikaarlepyy', 'Uusikaupunki',
  'Vaala', 'Vaasa', 'Valkeakoski', 'Valtimo', 'Vantaa', 'Varkaus', 'Vehmaa', 'Velha', 'Vesanto', 'Vesilahti', 'Veteli', 'Vieremä', 'Vihti', 'Viitasaari', 'Vimpeli', 'Virolahti', 'Virrat', 'Vårdö', 'Vöyri',
  'Ylitornio', 'Ylivieska', 'Ylöjärvi', 'Ypäjä', 'Ähtäri', 'Äänekoski'
];

  // ... existing code for handlers ...
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



  useEffect(() => {
    const handleClickOutside = (event) => {
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
      <Navbar openModal={openModal} setShowAuth={() => {}} />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('pricing.title')}</h2>
            
            {/* Monthly/Annually Toggle */}
            <div className="flex justify-center items-center space-x-4 mb-12">
              <span className="text-lg font-medium text-blue-600">{t('pricing.monthly')}</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-12 h-6 bg-gray-300 rounded-full cursor-pointer"></div>
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform"></div>
              </div>
              <span className="text-lg font-medium text-gray-600">{t('pricing.annually')}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* FREE plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('pricing.plans.free.name')}</h3>
                <div className="text-3xl font-bold text-gray-800 mb-1">{t('pricing.plans.free.price')}</div>
                <div className="text-gray-600">{t('pricing.plans.free.period')}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.blogs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.events')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.jobs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.newsFeeds')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.businessDescription')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.additionalDetails')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.address')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.phone')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.website')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.emailAddress')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.featuredImage')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.teams')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googleMapConfiguration')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.reviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googleReviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.businessHourConfigurations')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.video')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googlePlaceImages')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.companyLogo')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.extraLinks')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.socialMedia')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.featuredBlogArticle')} <span className="text-blue-600">{t('pricing.features.value75')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.onlineVisibilityReport')} <span className="text-blue-600">{t('pricing.features.value99')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googleBusinessProfileOptimization')} <span className="text-blue-600">{t('pricing.features.value299')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.aiSocialPosts')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.aiVideos')}</span>
                </li>
              </ul>
              
              <button className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors">
                {t('pricing.plans.free.button')}
              </button>
            </div>
            
            {/* Capital Premium Plus */}
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 relative transform scale-105">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{t('pricing.plans.capitalPremium.name')}</h3>
                <div className="text-3xl font-bold mb-1">{t('pricing.plans.capitalPremium.price')}</div>
                <div className="text-blue-100">{t('pricing.plans.capitalPremium.period')}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.blogs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.events')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.jobs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.newsFeeds')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.businessDescription')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.additionalDetails')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.address')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.phone')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.website')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.emailAddress')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.featuredImage')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.teams')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.googleMapConfiguration')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.reviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.googleReviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.businessHourConfigurations')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.video')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.googlePlaceImages')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.companyLogo')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.extraLinks')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.socialMedia')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.featuredBlogArticle')} <span className="text-yellow-300">{t('pricing.features.value75')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.onlineVisibilityReport')} <span className="text-yellow-300">{t('pricing.features.value99')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.googleBusinessProfileOptimization')} <span className="text-yellow-300">{t('pricing.features.value299')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.aiSocialPosts')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>{t('pricing.features.aiVideos')}</span>
                </li>
              </ul>
              
              <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {t('pricing.plans.capitalPremium.button')}
              </button>
            </div>
            
            {/* Golden Premium */}
            <div className="bg-white rounded-lg shadow-lg p-8 relative">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('pricing.plans.goldenPremium.name')}</h3>
                <div className="text-3xl font-bold text-gray-800 mb-1">{t('pricing.plans.goldenPremium.price')}</div>
                <div className="text-gray-600">{t('pricing.plans.goldenPremium.period')}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.blogs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.events')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.jobs')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.newsFeeds')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.businessDescription')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.additionalDetails')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.address')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.phone')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.website')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.emailAddress')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.featuredImage')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.teams')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.googleMapConfiguration')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.reviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.googleReviews')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.businessHourConfigurations')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.video')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googlePlaceImages')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.companyLogo')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.extraLinks')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.socialMedia')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-800">{t('pricing.features.featuredBlogArticle')} <span className="text-blue-600">{t('pricing.features.value75')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.onlineVisibilityReport')} <span className="text-blue-600">{t('pricing.features.value99')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.googleBusinessProfileOptimization')} <span className="text-blue-600">{t('pricing.features.value299')}</span></span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.aiSocialPosts')}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-3">✗</span>
                  <span className="text-gray-600">{t('pricing.features.aiVideos')}</span>
                </li>
              </ul>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t('pricing.plans.goldenPremium.button')}
              </button>
            </div>
            
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

      {/* Modals - same as in main App */}
      {/* Add business modal, login modal, register modal would go here */}
    </div>
  );
};

export default PricingPage; 