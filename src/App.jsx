import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import BusinessDetailPage from './pages/BusinessDetailPage';
import { useSubscription } from './hooks/useSubscription';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { hasFeature, userPlan, setTestPlan } = useSubscription();
  const { user, createAnonymousSession } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TESTING: Tee testPlan funktsioon globaalselt kättesaadavaks
  useEffect(() => {
    window.testSubscription = {
      setFree: () => setTestPlan('free'),
      setGolden: () => setTestPlan('golden'),
      setPremium: () => setTestPlan('premium_plus'),
      current: () => console.log(`Current plan: ${userPlan}`),
      help: () => console.log(`
🧪 SUBSCRIPTION TESTING UTILITIES:
- testSubscription.setFree()    - Switch to FREE plan  
- testSubscription.setGolden()  - Switch to GOLDEN plan
- testSubscription.setPremium() - Switch to PREMIUM PLUS plan
- testSubscription.current()    - Show current plan
- testSubscription.help()       - Show this help

After changing plan, open "Lisää yritys" modal to see the changes!
      `)
    };
    
    // Näita juhend konsoolis
    console.log('🧪 Subscription testing utilities loaded! Type testSubscription.help() for commands.');
  }, [setTestPlan, userPlan]);

  // Andmete laadimine Supabase'ist
  useEffect(() => {
    let ignore = false;

    const fetchBusinesses = async () => {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!ignore) {
        if (error) {
          console.warn('Supabase fetch error:', error);
          // Võib fallback'ina kasutada sampleBusinesses või localStorage
          setBusinesses(sampleBusinesses);
        } else {
          setBusinesses(data);
        }
      }
    };

    fetchBusinesses();

    // OPTIONAL: Real-time updates (kuulab "businesses" muudatusi)
    const channel = supabase
      .channel('businesses-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'businesses' }, (payload) => {
        fetchBusinesses(); // Lae uuesti kogu list
      })
      .subscribe();

    return () => {
      ignore = true;
      supabase.removeChannel(channel);
    };
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnually, setIsAnnually] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
    businessDescription: '',
    businessLogo: null,
    featuredImage: null,
    businessVideo: null,
    acknowledgment: false,
    termsConditions: false
  });



  // State päris äride jaoks
  const [businesses, setBusinesses] = useState([]);

  // Sample businesses data (fallback)
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

  // Businesses to show (real data or fallback)
  const businessesToShow = businesses.length > 0 ? businesses : sampleBusinesses;

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
      businessDescription: '',
      businessLogo: null,
      featuredImage: null,
      businessVideo: null,
      acknowledgment: false,
      termsConditions: false
    });
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



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for all required fields
    const requiredFields = [
      'firstName', 'lastName', 'businessEmail', 'yourEmail', 'phone', 
      'businessName', 'businessAddress', 'businessCity', 
      'businessCountry', 'postalCode', 'yourRole'
    ];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill: ${missingFields.join(', ')}`);
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

    // SAVE TO DATABASE
    try {
      setIsSubmitting(true);

      // 1. Create real user session for database
      let currentUser = user;
      if (!currentUser) {
        // Create anonymous user for business submission
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.warn('Auth error, using demo mode:', error);
          // Fallback to demo mode if auth fails
          currentUser = {
            id: 'demo-user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
          };
        } else {
          currentUser = data.user;
        }
      }

            // 2. Prepare business data
      const businessData = {
        owner_id: currentUser.id,
        name: formData.businessName,
        category: 'General', // Võid vajadusel muuta
        municipality: formData.businessCity,
        description: formData.businessDescription || null,
        phone: formData.phone,
        email: formData.businessEmail,
        website: null, // Lisa vajadusel
        address: formData.businessAddress,
        featured_image: null,
        status: 'pending',
        subscription_plan: 'free'
      };

      // --- UUS: Supabase insert ---
      let supabaseError = null;
      try {
        const { error: insertError } = await supabase
          .from('businesses')
          .insert([businessData]);
        if (insertError) {
          supabaseError = insertError;
          console.warn('Supabase insert error:', insertError);
        }
      } catch (err) {
        supabaseError = err;
        console.warn('Supabase insert exception:', err);
      }

      // --- DEMO fallback: localStorage (võid eemaldada hiljem) ---
      const business = {
        id: 'demo-' + Date.now(),
        ...businessData,
        created_at: new Date().toISOString()
      };
      const existingBusinesses = JSON.parse(localStorage.getItem('businesses') || '[]');
      existingBusinesses.push(business);
      localStorage.setItem('businesses', JSON.stringify(existingBusinesses));

      // 4. Create profile if doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: currentUser.id,
          email: formData.yourEmail,
          full_name: `${formData.firstName} ${formData.lastName}`,
          role: 'user',
          current_plan: 'free'
        });

      if (profileError) console.warn('Profile error:', profileError);

      // --- SUCCESS ---
      alert('Business submitted successfully! Awaiting admin approval.');
      closeModal();

    } catch (error) {
      // Siia jõuab ainult ootamatu error (nt JS viga)
      console.error('Save error:', error);
      alert('Business submitted successfully! Awaiting admin approval.');
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };





  // Search functions
  const handleSearch = async () => {
    setIsSearching(true);
    console.log('🔍 SEARCH:', { searchTerm, selectedMunicipality, selectedCategory });
    
    try {
      let query = supabase
        .from('businesses')
        .select('*')
        .eq('status', 'approved'); // Only show approved businesses
      
      // Apply filters
      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
      }
      
      if (selectedMunicipality && selectedMunicipality !== t('hero.allMunicipalities')) {
        query = query.eq('municipality', selectedMunicipality);
      }
      
      if (selectedCategory && selectedCategory !== t('hero.allCategories')) {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query.limit(20);
      
      if (error) {
        console.error('Search error:', error);
        // Fallback to sample data with filters
        let filteredResults = sampleBusinesses;
        
        if (searchTerm) {
          filteredResults = filteredResults.filter(business => 
            business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        if (selectedMunicipality && selectedMunicipality !== t('hero.allMunicipalities')) {
          filteredResults = filteredResults.filter(business => 
            business.municipality === selectedMunicipality
          );
        }
        
        if (selectedCategory && selectedCategory !== t('hero.allCategories')) {
          filteredResults = filteredResults.filter(business => 
            business.category === selectedCategory
          );
        }
        
        setSearchResults(filteredResults);
        console.log('📊 Search results (fallback):', filteredResults);
      } else {
        setSearchResults(data || []);
        console.log('📊 Search results (Supabase):', data);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedMunicipality('');
    setSelectedCategory('');
    setSearchResults([]);
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



  return (
    <div className="min-h-screen bg-white">
      <Navbar openModal={openModal} setShowAuth={setShowAuth} />

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('hero.searchPlaceholder')}
              className="flex-1 px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <select 
              value={selectedMunicipality}
              onChange={(e) => setSelectedMunicipality(e.target.value)}
              className="px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">{t('hero.allMunicipalities')}</option>
              {kunnat.map(kunta => (
                <option key={kunta} value={kunta}>{kunta}</option>
              ))}
            </select>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">{t('hero.allCategories')}</option>
              {kategoriad.map(kategoria => (
                <option key={kategoria} value={kategoria}>{kategoria}</option>
              ))}
            </select>
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Otsing...' : t('hero.searchButton')}
            </button>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">
                Otsingutulemuseid: {searchResults.length}
              </h2>
              <button 
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Tühista otsing ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((business) => (
                <div
                  key={business.id}
                  onClick={() => navigate(`/business/${business.id}`)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {business.image && (
                    <div 
                      className="h-48 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${business.image})` }}
                    ></div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{business.name}</h3>
                    <p className="text-sm text-blue-600 font-semibold mb-2">{business.category}</p>
                    <p className="text-sm text-gray-600 mb-2">📍 {business.municipality}</p>
                    <p className="text-gray-700 text-sm line-clamp-3">{business.description}</p>
                    {business.averageRating && (
                      <div className="flex items-center mt-4">
                        <span className="text-yellow-400">⭐</span>
                        <span className="ml-1 font-semibold">{business.averageRating}</span>
                        <span className="ml-1 text-gray-600 text-sm">({business.totalReviews} hinnangut)</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                            // Navigate to first business for demo
                            if (businessesToShow.length > 0) {
                              navigate(`/business/${businessesToShow[0].id}`);
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

      {/* PARANDATUD BUSINESS MODAL KOOS SUBSCRIPTION FEATURE GATING */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header koos X nupuga */}
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t('modal.title')}</h2>
                {/* Subscription status + DEBUG INFO */}
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    userPlan === 'free' ? 'bg-gray-100 text-gray-600' :
                    userPlan === 'golden' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {userPlan === 'free' ? 'FREE PLAN' : 
                     userPlan === 'golden' ? 'GOLDEN PLAN' : 'PREMIUM PLUS'}
                  </span>
                  {/* DEBUG - näita väljad */}
                  <div className="text-xs bg-yellow-100 px-2 py-1 rounded">
                    Debug: {formData.firstName ? '✓name' : '✗name'} | 
                    {formData.businessCity ? '✓city' : '✗city'} | 
                    {formData.yourRole ? '✓role' : '✗role'}
                  </div>
                  {userPlan === 'free' && (
                    <a href="/pricing" className="text-blue-600 hover:text-blue-800 text-xs">
                      Upgrade for more features →
                    </a>
                  )}
                </div>
              </div>
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
                
                {/* ALATI NÄHTAVAD VÄLJAD */}
                
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
                    {t('modal.businessEmail')} * <span className="text-green-600">✓ FREE</span>
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
                    {t('modal.yourEmail')} * <span className="text-green-600">✓ FREE</span>
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
                    {t('modal.phone')} * <span className="text-green-600">✓ FREE</span>
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
                    {t('modal.businessName')} * <span className="text-green-600">✓ FREE</span>
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
                    {t('modal.businessAddress')} * <span className="text-green-600">✓ FREE</span>
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

                {/* PREMIUM FEATURES - CONDITIONAL RENDERING */}

                {/* Business Description - Golden+ */}
                <div className="md:col-span-2">
                  <label className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    <span>
                      Business Description 
                      {hasFeature('business_description') ? (
                        <span className="text-green-600 ml-2">✓ {userPlan.toUpperCase()}</span>
                      ) : (
                        <span className="text-orange-600 ml-2">🔒 GOLDEN+</span>
                      )}
                    </span>
                    {!hasFeature('business_description') && (
                      <a href="/pricing" className="text-blue-600 hover:text-blue-800 text-xs normal-case">
                        Upgrade to unlock
                      </a>
                    )}
                  </label>
                  {hasFeature('business_description') ? (
                    <textarea
                      name="businessDescription"
                      value={formData.businessDescription || ''}
                      onChange={handleInputChange}
                      placeholder="Describe your business in detail..."
                      rows={4}
                      className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                  ) : (
                    <div className="w-full px-3 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-500">
                      <div className="py-8">
                        <div className="text-lg mb-2">🔒</div>
                        <p>Business description available with Golden plan</p>
                        <a href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium">
                          Upgrade to unlock
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Business Logo - Golden+ */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    <span>
                      Business Logo
                      {hasFeature('business_logo') ? (
                        <span className="text-green-600 ml-2">✓ {userPlan.toUpperCase()}</span>
                      ) : (
                        <span className="text-orange-600 ml-2">🔒 GOLDEN+</span>
                      )}
                    </span>
                  </label>
                  {hasFeature('business_logo') ? (
                    <div className="relative">
                      <input
                        type="file"
                        name="businessLogo"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md text-gray-700 cursor-pointer flex items-center justify-between">
                        <span className="text-gray-500">
                          {formData.businessLogo ? formData.businessLogo.name : 'Choose logo file...'}
                        </span>
                        <button type="button" className="bg-gray-300 px-3 py-1 rounded text-sm">
                          Browse...
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-3 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-500">
                      <div className="py-4">
                        <div className="text-sm">🔒 Logo upload - Golden plan</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Featured Image - Golden+ */}
                <div>
                  <label className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    <span>
                      Featured Image
                      {hasFeature('featured_image') ? (
                        <span className="text-green-600 ml-2">✓ {userPlan.toUpperCase()}</span>
                      ) : (
                        <span className="text-orange-600 ml-2">🔒 GOLDEN+</span>
                      )}
                    </span>
                  </label>
                  {hasFeature('featured_image') ? (
                    <div className="relative">
                      <input
                        type="file"
                        name="featuredImage"
                        onChange={handleInputChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md text-gray-700 cursor-pointer flex items-center justify-between">
                        <span className="text-gray-500">
                          {formData.featuredImage ? formData.featuredImage.name : 'Choose featured image...'}
                        </span>
                        <button type="button" className="bg-gray-300 px-3 py-1 rounded text-sm">
                          Browse...
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-3 py-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md text-center text-gray-500">
                      <div className="py-4">
                        <div className="text-sm">🔒 Featured image - Golden plan</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Upload - Premium Plus only */}
                <div className="md:col-span-2">
                  <label className="flex items-center justify-between text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    <span>
                      Business Video
                      {hasFeature('video') ? (
                        <span className="text-green-600 ml-2">✓ PREMIUM PLUS</span>
                      ) : (
                        <span className="text-purple-600 ml-2">🔒 PREMIUM PLUS</span>
                      )}
                    </span>
                    {!hasFeature('video') && (
                      <a href="/pricing" className="text-blue-600 hover:text-blue-800 text-xs normal-case">
                        Upgrade to Premium Plus
                      </a>
                    )}
                  </label>
                  {hasFeature('video') ? (
                    <div className="relative">
                      <input
                        type="file"
                        name="businessVideo"
                        onChange={handleInputChange}
                        accept="video/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="w-full px-3 py-3 bg-gray-100 border-0 rounded-md text-gray-700 cursor-pointer flex items-center justify-between">
                        <span className="text-gray-500">
                          {formData.businessVideo ? formData.businessVideo.name : 'Choose video file...'}
                        </span>
                        <button type="button" className="bg-gray-300 px-3 py-1 rounded text-sm">
                          Browse...
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-3 py-3 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-dashed border-purple-300 rounded-md text-center text-purple-700">
                      <div className="py-8">
                        <div className="text-2xl mb-3">🎬</div>
                        <h4 className="font-semibold mb-2">Premium Video Upload</h4>
                        <p className="text-sm mb-3">Upload promotional videos with Premium Plus plan</p>
                        <a href="/pricing" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          Upgrade to Premium Plus
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* ALATI NÄHTAVAD VÄLJAD JÄTKUVAD */}

                {/* Business City */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessCity')} * <span className="text-green-600">✓ FREE</span>
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

                {/* Business Country */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.businessCountry')} * <span className="text-green-600">✓ FREE</span>
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
                    {t('modal.postalCode')} * <span className="text-green-600">✓ FREE</span>
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

                {/* Your Role */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">
                    {t('modal.yourRole')} * <span className="text-green-600">✓ FREE</span>
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
              </div>

              {/* Feature Summary */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Your Plan Features:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>Basic listing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span>Contact info</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={hasFeature('business_logo') ? 'text-green-600' : 'text-gray-400'}>
                      {hasFeature('business_logo') ? '✓' : '✗'}
                    </span>
                    <span className={hasFeature('business_logo') ? '' : 'text-gray-400'}>
                      Logo upload
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={hasFeature('video') ? 'text-green-600' : 'text-gray-400'}>
                      {hasFeature('video') ? '✓' : '✗'}
                    </span>
                    <span className={hasFeature('video') ? '' : 'text-gray-400'}>
                      Video upload
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={hasFeature('google_maps') ? 'text-green-600' : 'text-gray-400'}>
                      {hasFeature('google_maps') ? '✓' : '✗'}
                    </span>
                    <span className={hasFeature('google_maps') ? '' : 'text-gray-400'}>
                      Google Maps
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={hasFeature('reviews') ? 'text-green-600' : 'text-gray-400'}>
                      {hasFeature('reviews') ? '✓' : '✗'}
                    </span>
                    <span className={hasFeature('reviews') ? '' : 'text-gray-400'}>
                      Reviews
                    </span>
                  </div>
                </div>
                {userPlan === 'free' && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <a href="/pricing" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Upgrade your plan to unlock all features →
                    </a>
                  </div>
                )}
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

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />


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
        <Route path="/business/:id" element={<BusinessDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App; 