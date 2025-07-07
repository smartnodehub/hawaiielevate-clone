import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Phone, Mail, MapPin, Star, Users, Award, Heart, X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import PricingPage from './PricingPage';
import Reviews from './components/Reviews';
import StarRating from './components/StarRating';
import SeasonalPage from './pages/SeasonalPage';
import SeasonsListPage from './pages/SeasonsListPage';
import SeasonalSection from './components/SeasonalSection';
import TodayPage from './pages/TodayPage';
import WidgetPage from './pages/WidgetPage';

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
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showBusinessDetail, setShowBusinessDetail] = useState(false);
  const languageDropdownRef = useRef(null);
  const authDropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessEmail: '',
    yourEmail: '',
    phone: '',
    businessName: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessCountry: '',
    postalCode: '',
    yourRole: 'Owner',
    businessProfileImage: null,
    acknowledgment: false,
    termsConditions: false
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

  // Täielik maailma riikide nimekiri
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
    'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
    'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel',
    'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
    'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi',
    'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova',
    'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
    'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
    'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
    'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal',
    'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
    'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
    'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
    'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela',
    'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  // Rollide valikud automaatse tõlkimisega
  const getUserRoles = (language) => {
    const roles = {
      fi: ['Omistaja', 'Johtaja', 'Työntekijä', 'Muu'],
      en: ['Owner', 'Manager', 'Employee', 'Other'],
      sv: ['Ägare', 'Chef', 'Anställd', 'Annat']
    };
    return roles[language] || roles.en;
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      businessEmail: '',
      yourEmail: '',
      phone: '',
      businessName: '',
      businessAddress: '',
      businessCity: '',
      businessState: '',
      businessCountry: '',
      postalCode: '',
      yourRole: 'Owner',
      businessProfileImage: null,
      acknowledgment: false,
      termsConditions: false
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
    const { name, type, checked, files } = e.target;
    let value = e.target.value;
    
    if (type === 'checkbox') {
      value = checked;
    } else if (type === 'file') {
      value = files[0] || null;
    }
    
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
    
    // Validation for all required fields
    const requiredFields = [
      'firstName', 'lastName', 'businessEmail', 'yourEmail', 'phone', 
      'businessName', 'businessAddress', 'businessCity', 'businessState', 
      'businessCountry', 'postalCode', 'yourRole'
    ];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields!');
      return;
    }

    // Check if acknowledgment checkboxes are checked
    if (!formData.acknowledgment) {
      alert('Please acknowledge that you are the owner or authorized representative.');
      return;
    }
    
    if (!formData.termsConditions) {
      alert('Please agree to the terms and conditions.');
      return;
    }

    // Here you would save to database
    console.log('Business added:', formData);
    alert('Business added successfully!');
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

  // Sample businesses data
  const sampleBusinesses = [
    {
      id: 1,
      name: 'Ravintola Kultainen Kukko',
      category: 'Ravintolat ja kahvilat',
      municipality: 'Helsinki',
      address: 'Mannerheimintie 12, Helsinki',
      phone: '+358 9 1234567',
      email: 'info@kultainenkukko.fi',
      website: 'https://kultainenkukko.fi',
      description: 'Perinteinen suomalainen ravintola sydämessä Helsinkiä. Tarjoamme laadukasta ruokaa ja erinomaista palvelua.',
      averageRating: 4.5,
      totalReviews: 127,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      name: 'Hotel Aurora',
      category: 'Hotellit ja majoitus',
      municipality: 'Tampere',
      address: 'Hämeenkatu 15, Tampere',
      phone: '+358 3 9876543',
      email: 'booking@hotelaurora.fi',
      website: 'https://hotelaurora.fi',
      description: 'Moderni boutique-hotelli Tamperen keskustassa. Korkealaatuista majoitusta liikematkailijoille ja lomailijoille.',
      averageRating: 4.2,
      totalReviews: 89,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop'
    },
    {
      id: 3,
      name: 'Kauneusstudio Bella',
      category: 'Kauneuspalvelut',
      municipality: 'Turku',
      address: 'Yliopistonkatu 8, Turku',
      phone: '+358 2 5555555',
      email: 'info@studiobella.fi',
      website: 'https://studiobella.fi',
      description: 'Täyden palvelun kauneusstudio. Kasvohoitoja, hierontaa ja kauneushoitoja ammattitaitoisilta kosmetologeilta.',
      averageRating: 4.8,
      totalReviews: 203,
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop'
    }
  ];

  const openBusinessDetail = (business) => {
    setSelectedBusiness(business);
    setShowBusinessDetail(true);
  };

  const closeBusinessDetail = () => {
    setShowBusinessDetail(false);
    setSelectedBusiness(null);
  };

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
    },
    {
      id: 6,
      title: 'Maui Shop Local',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 7,
      title: 'Oahu Restaurants',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      id: 8,
      title: 'Helsinki Services',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 9,
      title: 'Tampere Hotels',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      id: 10,
      title: 'Turku Activities',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-emerald-500 to-teal-500'
    }
  ];

  // Dynamic visible cards based on screen size
  const [visibleCards, setVisibleCards] = useState(3);

  const getVisibleCards = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const maxSlides = Math.max(0, businessCards.length - visibleCards);

  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      
      // Adjust current slide if needed
      const newMaxSlides = Math.max(0, businessCards.length - newVisibleCards);
      if (currentSlide > newMaxSlides) {
        setCurrentSlide(newMaxSlides);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [businessCards.length, currentSlide]);

  const nextSlide = () => {
    const maxSlides = Math.max(0, businessCards.length - visibleCards);
    setCurrentSlide(prev => {
      if (prev >= maxSlides) {
        return 0; // Tagasi algusesse
      } else {
        return prev + 1;
      }
    });
  };

  const prevSlide = () => {
    const maxSlides = Math.max(0, businessCards.length - visibleCards);
    setCurrentSlide(prev => {
      if (prev <= 0) {
        return maxSlides; // Lõppu
      } else {
        return prev - 1;
      }
    });
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

    if (isLeftSwipe) {
      nextSlide(); // Alati võimalik infinite scroll tõttu
    }
    if (isRightSwipe) {
      prevSlide(); // Alati võimalik infinite scroll tõttu
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
              <a href="/today" className="text-gray-300 hover:text-white transition-colors">{t('what_to_do_today')}</a>
              <a href="#todo" className="text-gray-300 hover:text-white transition-colors">{t('nav.tours')}</a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1">
                  <span>Hooajad</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <Link to="/season/juhannus" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-t-lg">
                    🌞 Juhannus
                  </Link>
                  <Link to="/season/ruska" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                    🍁 Ruska
                  </Link>
                  <Link to="/season/joulu" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-b-lg">
                    🎅 Jõul
                  </Link>
                </div>
              </div>
              <a href="/pricing" className="text-gray-300 hover:text-white transition-colors">{t('nav.pricing')}</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">{t('nav.about')}</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t('nav.contact')}</a>
            </nav>

            <div className="flex items-center space-x-4">
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
            {/* Left Arrow - Always Active */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
              style={{ marginLeft: '-20px' }}
            >
              <ChevronLeft size={24} className="text-gray-600 hover:text-blue-600" />
            </button>
            
            {/* Right Arrow - Always Active */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
              style={{ marginRight: '-20px' }}
            >
              <ChevronRight size={24} className="text-gray-600 hover:text-blue-600" />
            </button>
            
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / visibleCards)}%)`,
                  width: `${(businessCards.length / visibleCards) * 100}%`
                }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {businessCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / businessCards.length}%` }}
                  >
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                      {card.image ? (
                        <div 
                          className="h-48 bg-cover bg-center transition-transform duration-300 hover:scale-110" 
                          style={{ backgroundImage: `url(${card.image})` }}
                        ></div>
                      ) : (
                        <div className={`h-48 bg-gradient-to-r ${card.gradient} transition-transform duration-300 hover:scale-110`}></div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{card.title}</h3>
                        <p className="text-gray-600 text-sm">Discover amazing businesses in this category</p>
                        <button 
                          onClick={() => {
                            // Open first sample business for demo
                            if (sampleBusinesses.length > 0) {
                              openBusinessDetail(sampleBusinesses[0]);
                            }
                          }}
                          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Businesses
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.max(0, businessCards.length - visibleCards) + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
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
          

        </div>
      </section>

      {/* Seasonal Promotions */}
      <SeasonalSection />

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

      {/* Modal - Parandatud versioon */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header koos X nupuga */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-gray-800">{t('modal.title')}</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Sulge modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* First Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.firstName')} *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder={t('modal.firstNamePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.lastName')} *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder={t('modal.lastNamePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessEmail')} *
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                    placeholder={t('modal.businessEmailPlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Your Email */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.yourEmail')} *
                  </label>
                  <input
                    type="email"
                    name="yourEmail"
                    value={formData.yourEmail}
                    onChange={handleInputChange}
                    placeholder={t('modal.yourEmailPlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('modal.phonePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessName')} *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder={t('modal.businessNamePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Business Address */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessAddress')} *
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    placeholder={t('modal.businessAddressPlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Business City - PARANDATUD: kasutab sama linna nimekirja mis otsing */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessCity')} *
                  </label>
                  <select
                    name="businessCity"
                    value={formData.businessCity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  >
                    <option value="">{t('modal.businessCityPlaceholder')}</option>
                    {kunnat.map(kunta => (
                      <option key={kunta} value={kunta}>{kunta}</option>
                    ))}
                  </select>
                </div>

                {/* Business State */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessState')} *
                  </label>
                  <input
                    type="text"
                    name="businessState"
                    value={formData.businessState}
                    onChange={handleInputChange}
                    placeholder={t('modal.businessStatePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Business Country - PARANDATUD: täielik riikide nimekiri */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessCountry')} *
                  </label>
                  <select
                    name="businessCountry"
                    value={formData.businessCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  >
                    <option value="">{t('modal.businessCountryPlaceholder')}</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.postalCode')} *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder={t('modal.postalCodePlaceholder')}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  />
                </div>

                {/* Your Role - PARANDATUD: proper dropdown menu */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.yourRole')} *
                  </label>
                  <select
                    name="yourRole"
                    value={formData.yourRole}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    required
                  >
                    <option value="">{t('modal.yourRolePlaceholder')}</option>
                    {getUserRoles(i18n.language).map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Business Profile Image */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessProfileImage')}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="businessProfileImage"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md text-gray-700 cursor-pointer flex items-center justify-between">
                      <span className="text-gray-500">
                        {formData.businessProfileImage ? formData.businessProfileImage.name : t('modal.businessProfileImagePlaceholder')}
                      </span>
                      <button type="button" className="bg-gray-300 px-3 py-1 rounded text-sm">
                        Selaa...
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acknowledgment Section */}
              <div className="mt-8 space-y-4">
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                  ACKNOWLEDGMENT
                </label>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="acknowledgment"
                    checked={formData.acknowledgment}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    {t('modal.acknowledgment')}
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="termsConditions"
                    checked={formData.termsConditions}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label className="text-sm text-gray-700 leading-relaxed">
                    {t('modal.termsConditions')}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
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

      {/* Business Detail Modal */}
      {showBusinessDetail && selectedBusiness && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeBusinessDetail}
                  className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6" />
                  <span>Tagasi</span>
                </button>
                <h1 className="text-2xl font-bold">{selectedBusiness.name}</h1>
                <div></div>
              </div>
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={selectedBusiness.image}
                      alt={selectedBusiness.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedBusiness.name}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {selectedBusiness.category}
                        </span>
                        <span>{selectedBusiness.municipality}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <StarRating 
                            rating={Math.round(selectedBusiness.averageRating)} 
                            readonly 
                            size="small" 
                          />
                          <span className="font-semibold text-gray-900">
                            {selectedBusiness.averageRating}
                          </span>
                          <span className="text-gray-600">
                            ({selectedBusiness.totalReviews} arvustust)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedBusiness.description}
                  </p>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Kontaktandmed
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{selectedBusiness.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <a
                        href={`tel:${selectedBusiness.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedBusiness.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <a
                        href={`mailto:${selectedBusiness.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {selectedBusiness.email}
                      </a>
                    </div>
                    {selectedBusiness.website && (
                      <div className="flex items-center space-x-3">
                        <span className="h-5 w-5 text-gray-400">🌐</span>
                        <a
                          href={selectedBusiness.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Koduleht
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="container mx-auto px-4">
            <Reviews business={selectedBusiness} />
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
        <Route path="/seasons" element={<SeasonsListPage />} />
        <Route path="/season/:season" element={<SeasonalPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/widget/today" element={<WidgetPage />} />
      </Routes>
    </Router>
  );
};

export default App; 