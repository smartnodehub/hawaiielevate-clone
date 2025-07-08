// Ühtsed hinnaplaanid kõigile komponentidele
export const PLANS_CONFIG = {
  fi: {
    title: "Valitse Täydellinen Paketti Meiltä",
    monthly: "Kuukausittain",
    annually: "Vuosittain",
    plans: {
      free: {
        name: "ILMAINEN",
        price: "ILMAINEN",
        monthlyPrice: 0,
        annualPrice: 0,
        period: "Kuukausittain",
        button: "LISÄÄ YRITYKSESI",
        features: [
          "Perusyrityksen tiedot",
          "Osoite ja yhteystiedot",
          "Yrityksen kuvaus",
          "Aukioloajat",
          "Peruslistaus hakemistossa"
        ]
      },
      golden: {
        name: "Golden Premium",
        price: "€20",
        monthlyPrice: 20,
        annualPrice: 200,
        period: "Kuukausittain",
        button: "Osta Nyt",
        features: [
          "Kaikki ILMAINEN-tason ominaisuudet",
          "Yrityksen logo",
          "Kuvagalleria (max 10 kuvaa)",
          "Asiakasarvostelut",
          "Google Maps -integraatio",
          "Sosiaalisen median linkit",
          "Prioriteettilistaus"
        ]
      },
      capitalPremium: {
        name: "Capital Premium Plus",
        price: "€45",
        monthlyPrice: 45,
        annualPrice: 450,
        period: "Kuukausittain",
        button: "Osta Nyt",
        features: [
          "Kaikki Golden Premium -ominaisuudet",
          "Rajoittamaton kuvagalleria",
          "Video-esittely",
          "Blogit ja uutiset",
          "Tapahtumat",
          "Työpaikkailmoitukset",
          "Google Business Profile -optimointi",
          "5 AI sosiaalisen median julkaisua",
          "5 AI-videota",
          "Online näkyvyysraportti",
          "Premium-tuki"
        ]
      }
    }
  },
  en: {
    title: "Choose Your Perfect Plan From Us",
    monthly: "Monthly",
    annually: "Annually",
    plans: {
      free: {
        name: "FREE",
        price: "FREE",
        monthlyPrice: 0,
        annualPrice: 0,
        period: "Monthly",
        button: "ADD YOUR BUSINESS",
        features: [
          "Basic business information",
          "Address and contact details",
          "Business description",
          "Business hours",
          "Basic directory listing"
        ]
      },
      golden: {
        name: "Golden Premium",
        price: "€20",
        monthlyPrice: 20,
        annualPrice: 200,
        period: "Monthly",
        button: "Buy Now",
        features: [
          "All FREE features",
          "Company logo",
          "Photo gallery (max 10 photos)",
          "Customer reviews",
          "Google Maps integration",
          "Social media links",
          "Priority listing"
        ]
      },
      capitalPremium: {
        name: "Capital Premium Plus",
        price: "€45",
        monthlyPrice: 45,
        annualPrice: 450,
        period: "Monthly",
        button: "Buy Now",
        features: [
          "All Golden Premium features",
          "Unlimited photo gallery",
          "Video showcase",
          "Blogs and news",
          "Events",
          "Job listings",
          "Google Business Profile optimization",
          "5 AI social media posts",
          "5 AI videos",
          "Online visibility report",
          "Premium support"
        ]
      }
    }
  },
  sv: {
    title: "Välj Din Perfekta Plan Från Oss",
    monthly: "Månatlig",
    annually: "Årlig",
    plans: {
      free: {
        name: "GRATIS",
        price: "GRATIS",
        monthlyPrice: 0,
        annualPrice: 0,
        period: "Månatlig",
        button: "LÄGG TILL DITT FÖRETAG",
        features: [
          "Grundläggande företagsinformation",
          "Adress och kontaktuppgifter",
          "Företagsbeskrivning",
          "Öppettider",
          "Grundläggande kataloglistning"
        ]
      },
      golden: {
        name: "Golden Premium",
        price: "€20",
        monthlyPrice: 20,
        annualPrice: 200,
        period: "Månatlig",
        button: "Köp Nu",
        features: [
          "Alla GRATIS-funktioner",
          "Företagslogga",
          "Fotogalleri (max 10 foton)",
          "Kundrecensioner",
          "Google Maps-integration",
          "Sociala medier-länkar",
          "Prioritetslistning"
        ]
      },
      capitalPremium: {
        name: "Capital Premium Plus",
        price: "€45",
        monthlyPrice: 45,
        annualPrice: 450,
        period: "Månatlig",
        button: "Köp Nu",
        features: [
          "Alla Golden Premium-funktioner",
          "Obegränsat fotogalleri",
          "Videovisning",
          "Bloggar och nyheter",
          "Evenemang",
          "Jobbannonser",
          "Google Business Profile-optimering",
          "5 AI sociala medier-inlägg",
          "5 AI-videor",
          "Online synlighetsrapport",
          "Premium-support"
        ]
      }
    }
  }
};

export const getPlansByLanguage = (language) => {
  return PLANS_CONFIG[language] || PLANS_CONFIG.fi;
}; 