/**
 * Identité & coordonnées — remplir par client (blueprint resto).
 * URL canonique : NEXT_PUBLIC_SITE_URL en prod (Vercel).
 */
const defaultUrl = "https://mia-pizza.fr";

export const siteConfig = {
  name: "Mia Pizza",
  /** Nom légal / mentions (à compléter avant facturation) */
  legalName: "Mia Pizza",
  tagline: "Pizzeria artisanale",
  pickupLabel: "PIZZA À EMPORTER",
  heroTagline:
    "Pizzeria de proximité — artisanale, conviviale et traditionnelle.",
  footerLine: "Pizza à emporter",
  locale: "fr_FR" as const,
  language: "fr" as const,

  url: (process.env.NEXT_PUBLIC_SITE_URL ?? defaultUrl).replace(/\/$/, ""),

  phone: {
    display: "04 72 71 76 25",
    href: "tel:+33472717625",
  },

  address: {
    streetAddress: "26 place Dr Joseph Cinelli",
    postalCode: "69360",
    addressLocality: "Saint-Symphorien-d'Ozon",
    addressCountry: "FR",
  },

  facebook: {
    href: "https://fr-fr.facebook.com/Mia-pizza-607814769657019/",
    label: "Facebook",
  },

  map: {
    embedUrl:
      "https://maps.google.com/maps?q=26+place+Dr+Joseph+Cinelli,+69360+Saint-Symphorien-d%27Ozon&z=16&output=embed",
  },

  seo: {
    title: "Mia Pizza | Pizzeria Artisanale à Saint-Symphorien-d'Ozon",
    description:
      "Pizza à emporter à Saint-Symphorien-d'Ozon. Carte en ligne (base tomate & crème), horaires, adresse et commande au 04 72 71 76 25. Pizzeria artisanale de proximité.",
    keywords: [
      "Mia Pizza",
      "pizzeria",
      "Saint-Symphorien-d'Ozon",
      "pizza à emporter",
      "Ozon",
      "commande pizza",
    ],
    ogDescription:
      "Consultez la carte, les horaires et commandez votre pizza à emporter au 04 72 71 76 25.",
    twitterDescription:
      "Pizza à emporter — carte en ligne, horaires et téléphone 04 72 71 76 25.",
    ogImageAlt:
      "Mia Pizza — pizzeria artisanale à Saint-Symphorien-d'Ozon",
  },

  /** Schema.org Restaurant */
  business: {
    servesCuisine: "Pizza",
    priceRange: "€€",
  },
} as const;

export function getAddressLines(): [string, string] {
  const { streetAddress, postalCode, addressLocality } = siteConfig.address;
  return [streetAddress, `${postalCode} ${addressLocality}`];
}

export function getFullAddress(): string {
  const [l1, l2] = getAddressLines();
  return `${l1}, ${l2}`;
}
