export const restaurantConfig = {
  name: "Le Petit Bistro",
  slogan: "Cuisine française authentique",
  whatsapp: "+213776863561",
  phone: "+213 77 68 63 561",
  email: "contact@petitbistro.fr",
  address: "15 Rue de la Paix, 75002 Paris, France",

  hours: {
    weekday: "12h00 - 14h30, 19h00 - 22h30",
    weekend: "12h00 - 23h00",
    closed: "Fermé le dimanche",
  },

  about:
    "Le Petit Bistro vous propose une cuisine française authentique dans une ambiance chaleureuse. Découvrez nos plats traditionnels préparés avec des produits frais et locaux.",

  menu: [
    { 
      name: "Soupe à l'oignon", 
      category: "Entrées", 
      image: "1.jpg",
      description: "Soupe gratinée traditionnelle avec croûtons et fromage Gruyère fondu"
    },
    { 
      name: "Escargots de Bourgogne", 
      category: "Entrées", 
      image: "2.jpg",
      description: "6 escargots au beurre persillé, ail et fines herbes"
    },
    { 
      name: "Bœuf Bourguignon", 
      category: "Plats principaux", 
      image: "3.jpg",
      description: "Bœuf mijoté au vin rouge de Bourgogne, lardons, champignons et oignons grelots. Servi avec pommes de terre"
    },
    { 
      name: "Coq au Vin", 
      category: "Plats principaux", 
      image: "4.jpg",
      description: "Poulet fermier mijoté au vin rouge, lardons fumés, champignons de Paris et oignons. Accompagné de tagliatelles fraîches"
    },
    { 
      name: "Crème Brûlée", 
      category: "Desserts", 
      image: "5.jpg",
      description: "Crème onctueuse à la vanille de Madagascar, caramélisée au sucre"
    },
    { 
      name: "Tarte Tatin", 
      category: "Desserts", 
      image: "6.jpg",
      description: "Tarte renversée aux pommes caramélisées, servie tiède avec crème fraîche"
    },
  ],

  social: {
    facebook: "https://facebook.com/petitbistro",
    instagram: "https://instagram.com/petitbistro",
    tripadvisor: "https://tripadvisor.com/petitbistro",
  },

  // SEO metadata (added to align with TypeScript config)
  seo: {
    title: "Le Petit Bistro — Cuisine française authentique | Restaurant Français à Paris",
    description:
      "Le Petit Bistro vous propose une cuisine française authentique dans une ambiance chaleureuse. Réservez votre table en ligne via WhatsApp.",
    keywords: [
      "restaurant français",
      "cuisine française",
      "Paris",
      "bistro",
      "gastronomie française",
      "restaurant Paris",
      "réservation restaurant",
      "bœuf bourguignon",
      "coq au vin",
      "cuisine traditionnelle",
      "restaurant authentique",
    ],
    siteUrl: "https://example.com",
    ogImage: "/images/hero/restaurant-interior.jpg",
  },
};
