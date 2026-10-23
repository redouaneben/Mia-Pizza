/**
 * Allergènes majeurs (UE) déduits des ingrédients carte.
 * Pâte à pizza → gluten ; mozzarella / fromages → lait.
 * À faire valider sur l’affiche officielle en boutique.
 */
export const PIZZA_ALLERGENS: Record<string, string[]> = {
  Margherita: ["Gluten", "Lait"],
  Chorizo: ["Gluten", "Lait"],
  Pescatora: ["Gluten", "Lait", "Poisson"],
  Napolitaine: ["Gluten", "Lait", "Poisson"],
  Prosciutto: ["Gluten", "Lait"],
  Sicilienne: ["Gluten", "Lait", "Poisson"],
  Reine: ["Gluten", "Lait"],
  Dauphinoise: ["Gluten", "Lait"],
  Végétalia: ["Gluten", "Lait"],
  Tonio: ["Gluten", "Lait", "Œufs"],
  Basquaise: ["Gluten", "Lait"],
  Andalouse: ["Gluten", "Lait"],
  "Chèvre miel": ["Gluten", "Lait"],
  "4 saisons": ["Gluten", "Lait"],
  Campagnarde: ["Gluten", "Lait"],
  Bolonaise: ["Gluten", "Lait", "Œufs"],
  Chef: ["Gluten", "Lait", "Œufs"],
  "4 fromages": ["Gluten", "Lait"],
  Forestière: ["Gluten", "Lait"],
  Patron: ["Gluten", "Lait"],
  "Fruits de mer": ["Gluten", "Lait", "Crustacés", "Mollusques"],
  "San Gennaro": ["Gluten", "Lait"],
  Diavola: ["Gluten", "Lait"],
  "Pizza du mois": [
    "Recette variable — voir affiche ou Facebook",
  ],
  Elio: ["Gluten", "Lait", "Sulfites"],
  "Mia pizza": ["Gluten", "Lait"],
  Bressane: ["Gluten", "Lait"],
  Dolce: ["Gluten", "Lait"],
  Tartiflette: ["Gluten", "Lait"],
  Cocotte: ["Gluten", "Lait"],
  Fontina: ["Gluten", "Lait"],
  Cosi: ["Gluten", "Lait"],
  Prima: ["Gluten", "Lait", "Sulfites"],
  Truffelia: ["Gluten", "Lait"],
};

export const ALLERGEN_DISCLAIMER =
  "En cas d’allergie sévère, confirmez en boutique ou au 04 72 71 76 25.";

/** Libellés allergènes uniquement (sans mention ingrédients ni disclaimer) */
export function getPizzaAllergenTags(pizzaName: string): string[] {
  const tags = PIZZA_ALLERGENS[pizzaName];
  if (tags?.length) return tags;
  return ["Non répertoriée — affiche en boutique"];
}
