/**
 * 🍽️ CONFIGURATION DU RESTAURANT
 * 
 * Ce fichier contient TOUTES les informations de votre restaurant.
 * Modifiez uniquement les valeurs entre guillemets.
 * 
 * ⚠️ IMPORTANT: Après modification, redémarrez le serveur (npm run dev)
 */

export const restaurantConfig = {
  // === INFORMATIONS GÉNÉRALES ===
  name: "Le Petit Bistro",
  slogan: "Cuisine française authentique",
  
  // === CONTACT (Modifiez avec vos vraies informations) ===
  phone: "+213 77 68 63 561",        // Format: +XXX XX XX XX XXX
  whatsapp: "+213776863561",          // Format: +XXXXXXXXXXX (sans espaces)
  email: "contact@petitbistro.fr",
  address: "15 Rue de la Paix, 75002 Paris, France",

  // === HORAIRES D'OUVERTURE ===
  hours: {
    weekday: "12h00 - 14h30, 19h00 - 22h30",
    weekend: "12h00 - 23h00",
    closed: "Fermé le dimanche",
  },

  // === À PROPOS ===
  about: "Le Petit Bistro vous propose une cuisine française authentique dans une ambiance chaleureuse. Découvrez nos plats traditionnels préparés avec des produits frais et locaux.",

  // === CARTE / MENU ===
  // Pour chaque plat:
  // - name: Nom du plat
  // - category: "Entrées" | "Plats principaux" | "Desserts"
  // - image: Nom du fichier dans /public/images/dishes/ (1.jpg, 2.jpg, etc.)
  // - description: Description courte du plat
  // - price: Prix en euros (optionnel)
  menu: [
    {
      name: "Soupe à l'oignon",
      category: "Entrées",
      image: "1.jpg",
      description: "Soupe gratinée traditionnelle avec croûtons et fromage Gruyère fondu",
      price: "8.50"
    },
    {
      name: "Escargots de Bourgogne",
      category: "Entrées",
      image: "2.jpg",
      description: "6 escargots au beurre persillé, ail et fines herbes",
      price: "12.00"
    },
    {
      name: "Bœuf Bourguignon",
      category: "Plats principaux",
      image: "3.jpg",
      description: "Bœuf mijoté au vin rouge de Bourgogne, lardons, champignons et oignons grelots. Servi avec pommes de terre",
      price: "22.00"
    },
    {
      name: "Coq au Vin",
      category: "Plats principaux",
      image: "4.jpg",
      description: "Poulet fermier mijoté au vin rouge, lardons fumés, champignons de Paris et oignons. Accompagné de tagliatelles fraîches",
      price: "19.50"
    },
    {
      name: "Crème Brûlée",
      category: "Desserts",
      image: "5.jpg",
      description: "Crème onctueuse à la vanille de Madagascar, caramélisée au sucre",
      price: "7.50"
    },
    {
      name: "Tarte Tatin",
      category: "Desserts",
      image: "6.jpg",
      description: "Tarte renversée aux pommes caramélisées, servie tiède avec crème fraîche",
      price: "8.00"
    },
  ],

  // === RÉSEAUX SOCIAUX ===
  // Remplacez par vos vrais liens de réseaux sociaux
  social: {
    facebook: "https://facebook.com/petitbistro",
    instagram: "https://instagram.com/petitbistro",
    tripadvisor: "https://tripadvisor.com/petitbistro",
  },

  // === SEO & MÉTADONNÉES ===
  seo: {
    title: "Le Petit Bistro — Cuisine française authentique | Restaurant Français à Paris",
    description: "Le Petit Bistro vous propose une cuisine française authentique dans une ambiance chaleureuse. Réservez votre table en ligne via WhatsApp.",
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
    ] as string[],
    // Modifiez avec votre vrai domaine
    siteUrl: "https://example.com",
    // Image principale pour les réseaux sociaux
    ogImage: "/images/hero/restaurant-interior.jpg",
  },

  // === COULEURS DU THÈME ===
  // Ces couleurs sont définies dans globals.css
  // Pour les modifier, allez dans src/app/globals.css
  theme: {
    primary: "#C0392B",    // Rouge burgundy
    secondary: "#F39C12",  // Or/jaune
    dark: "#2C3E50",       // Bleu foncé
    light: "#FFFFFF",      // Blanc
  },
};

// Types TypeScript pour l'autocomplétion
export type RestaurantConfig = typeof restaurantConfig;
export type MenuItem = typeof restaurantConfig.menu[number];
