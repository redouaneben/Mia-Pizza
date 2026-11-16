import { siteConfig } from "@/config/site";
import { buildOpeningHoursSpecification } from "@/data/hours";

/** LocalBusiness / Restaurant pour Google */
export function buildRestaurantJsonLd() {
  const { name, url, phone, address, business, facebook } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name,
    url,
    telephone: phone.display.replace(/\s/g, " "),
    image: `${url}/opengraph-image`,
    servesCuisine: business.servesCuisine,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      postalCode: address.postalCode,
      addressLocality: address.addressLocality,
      addressCountry: address.addressCountry,
    },
    sameAs: facebook.href ? [facebook.href] : [],
    description: siteConfig.seo.description,
    openingHoursSpecification: buildOpeningHoursSpecification(),
    hasMenu: `${url}/#menu`,
  };
}

export function restaurantJsonLdString() {
  return JSON.stringify(buildRestaurantJsonLd()).replace(/</g, "\\u003c");
}
